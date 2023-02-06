const { response } = require("express");
const jwt=require("jsonwebtoken");
const Users = require("../models/users");

const generateJWT=(uid="")=>{

    return new Promise((resolve,reject)=>{

        const payload ={uid}
        jwt.sign(payload,process.env.SECRETOPRIVATEKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }
            else{
                resolve(token)
            }
        })

    })}


    const checkJWT = async( token = '') => {
       
        try {
            
            if(  token.length < 10 ) {
                return null;
            }
         
            const { uid } = jwt.verify( token, process.env.SECRETOPRIVATEKEY );
          
            const user = await Users.findById( uid );

            if ( user ) {
                if ( user.state ) {
                    return user;
                } else {
                    return null;
                }
            } else {
                return null;
            }
    
        } catch (error) {
            return null;
        }
    
    }
    
  
    
    module.exports = {
        generateJWT,
        checkJWT,
        
    }
    