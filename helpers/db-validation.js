const { Error } = require("mongoose");
const Category = require("../models/category");
const Rols = require("../models/rols");
const Users = require("../models/users");

//Validate rol
 const rolExist= async(rol="")=>{
    const isExistRol=await Rols.findOne({rol});
    if(!isExistRol){
        throw new Error(`El rol ${rol} no existe en la DB`)
    }
}
 //Validate email   
 const mailExist=async(mail="")=>{

     const isExistMail=await Users.findOne({mail});
     if(isExistMail){
       throw new Error(`El correo ${mail} ya existe en la DB`)
        }
} 
const idExistUser=async(id="")=>{

    const isExistID=await Users.findById(id);
    if(!isExistID){
      throw new Error(`El id: ${id} no se ha utilizado en la DB`)
       }
} 
const idExistCategory=async(id="")=>{
    
    const isExistID=await Category.findById(id);
    if(!isExistID){
      throw new Error(`El id: ${id} no se ha utilizado en la DB`)
       }
} 
const idExistProduct=async(id="")=>{
    
  const isExistID=await Category.findById(id);
  if(!isExistID){
    throw new Error(`El id: ${id} no se ha utilizado en la DB`)
     }
} 


module.exports={    rolExist,
                    mailExist,
                    idExist: idExistUser,
                    idExistCategory,
                    idExistProduct
}