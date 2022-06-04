const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { Error } = require("mongoose");
const { generateJWT } = require("../helpers/jwebtoken");

const Users = require("../models/users");



const loginPost=async(req,res=response)=>{

const {password, mail}=req.body


try {

    //Validar correo
    const user=await Users.findOne({mail});
    if (!user) {
        return res.status(400).json({
            msg:"Este correo no existe en el servidor"
        }) 
    }
    
    //Si esta activo state=true
    if (!user.state) {
        return res.status(400).json({
            msg:"Este correo no existe en el servidor - state:false"
        }) 
    }
    
    //Verificar contraseña 
    const validatePassword=  bcryptjs.compareSync(password,user.password);
    if (!validatePassword) {
        return res.status(400).json({
            msg:"Login / Password Incorrectos"
        }) 
    }
   
    
    
    //Crear JWT(JSON Web Token)
    const token=await generateJWT(user.id);

    res.json({
        msg:"Post LOGIN",
    user,
    token
    })   
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        msg:"Algo salio mal en el servidor"
    })
}



}


module.exports={
    loginPost
}