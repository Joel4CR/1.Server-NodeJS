const {request, response}=require("express")
const Users =require("../models/users")
const bcryptjs= require("bcryptjs")


const getUsers=async (req=request,res=response)=>{
  
    //  const {name="No name", apiKey="N/A"} =req.query
    const query={state:true}
    const total_users=Users.countDocuments(query)
    const {start=0, limit=total_users}=req.query

    const [ total , users]=await Promise.all([
    
        Users.countDocuments(query),
        Users.find(query)
            .limit(Number(limit))
            .skip(Number(start))
    ])

    res.status(200).json({
        msg:"Get-API-controller",
        //name,apiKey
        total,
        users
    }
    )
}
const postUsers= async(req,res)=>{


    const {name,password,mail,rol}=req.body
    const user= new Users({name,password,mail,rol}) 
    
   

    //Crypt password
    const salt=bcryptjs.genSaltSync();
    user.password=bcryptjs.hashSync(password,salt)
   
    await user.save()
    
    res.status(200).json({
            user
    });
    
};
const putUsers=async (req,res)=>{
    
    const {id}=req.params

    const {_id,password,google,correo,...rest}=req.body;

    if(password){
        const salt=bcryptjs.genSaltSync();
        rest.password=bcryptjs.hashSync(password,salt)
    }

    const user=await Users.findByIdAndUpdate(id,rest)

    res.status(200).json({
            msg:"Put-API-controller",
            user
        }
    )
};
const deletetUsers=async (req,res)=>{


    const {id}=req.params

    //Via perdiendo el usuario indefinido
    //const user=await Users.findByIdAndDelete(id)

    //const {uid}=req.uid

    const userAuthorizated=req.user;

    //Via que con el filtro del get se mantiene el rastro del usuario(solo se saca del filtro del GET)
    const user=await Users.findByIdAndUpdate(id,{state:false})
    res.status(200).json(
        {msg:"Usuario borrado con exito",
        user,
        userAuthorizated
    })
}
const patchUsers=(req,res)=>{
    res.status(200).json(
        {msg:"Patch-API-controller"}
    )
}




module.exports={
    getUsers,
    postUsers,
    putUsers,
    deletetUsers,
    patchUsers
}