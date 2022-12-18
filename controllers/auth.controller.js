const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwebtoken");
const {OAuth2Client} = require('google-auth-library');
const jwt_decode = require('jwt-decode');
const Users = require("../models/users");



const loginPost=async(req,res=response)=>{

const {password, mail}=req.body

try {

    //Validar correo
    const user=await Users.findOne({mail});
    console.log(user);
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



const googleSIgnin=async(req,res=response)=>{
  
    const {id_token}=req.body
    console.log(id_token);

    const userGoogle=jwt_decode(id_token)

    const {name, email: mail,img}=userGoogle

    let user =await Users.findOne({mail})
    if (!user) {
        
        const data ={
            name,
            mail,
            img,
            password: ":P" ,   //Cualquier cosa se usa el Hash
            google:true
        }
        user =new Users(data)
        await user.save()
    } 
    if (!user.state) {
        return res.status(401).json({
            msg:"Hable con el Admin Usuario bloqueado"
        })
    } 

    const token = await generateJWT(user.id)
    console.log(token);
    console.log(user.id);
    res.json({
        user,
        token
    })
  /*   console.log("HI");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
console.log(client);
async function verify() {
    console.log("HI");
  const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_IDs_3]
  });
  console.log(ticket);
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domai
console.log(payload); */
  // const domain = payload['hd'];

/* verify().catch(console.error); */
}


const renewJWT = async( req,res=Response) => {

    const {user}=req

    const token = await generateJWT(user.id)

    res.json({
        user,
        token
    })
    
}

module.exports={
    loginPost,
    googleSIgnin,
    renewJWT
}