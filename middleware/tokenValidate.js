const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const Users = require("../models/users")

const tokenValidate=async(req=request,res=response,next)=>{

    const token=req.header('x-token')
    //Verificar si existe el token
        if(!token){
            return res.status(400).json({
                msg:'Se requiere de un token'
            })
        }

    try {
        //Verificar si el token es valido
        const {uid}= await jwt.verify(token,process.env.SECRETOPRIVATEKEY)
        //req.uid={uid}  //Reponer el valor del req para el sgte middleware

        const user=await Users.findById(uid);

        //Validar q exista usario (Caso de haberse borrado user fisicamente) 
        if(!user){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe en la DB'
            })
        }

        //Validar q usuario no este desactivado state:false
        if(!user.state){
            return res.status(401).json({
                msg:'No existe usuario - (Desactivado de la DB)'
            })
        }


        req.user=user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:'Unauthorizate'
        }) 
    }
    

    

}


module.exports={tokenValidate}