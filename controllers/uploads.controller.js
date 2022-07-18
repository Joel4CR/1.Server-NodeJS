const fs = require('fs');
const path = require('path');
const { uploadFile } = require("../helpers/uploadFile");
const { Users, Product } = require("../models");
const fileValidate = require('../middleware');

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const getUploadFile= async(req, res) => {
  
  const {collection,id}=req.params
  let model

  switch (collection) {
    case 'user':
      model=await Users.findById(id)
      if (!model) {
        return res.status(500).json({msg:`No existe ningun ${collection} con ese id en la DB`})
      }
      break;
      case 'product':
        model=await Product.findById(id)
        if (!model) {
          return res.status(500).json({msg:`No existe ningun ${collection} con ese id en la DB`})
        }
        break;
    default:
      res.status(500).json({msg:`Internal Error: ${collection} no esta manejada aun`})
      break;
  }
    if (model.img) {
      const nameImg= path.join( __dirname,'../uploads',collection,model.img)    
      if (fs.existsSync(nameImg)) {
        return res.sendFile(nameImg)
      }
      
    }
    //No Img Found
    const noImg=path.join(__dirname,'../assets','no-image.jpg')
    return res.sendFile(noImg)
  };

const postUploadFiles=async(req, res) => {

    try {
      //   const namePath= await uploadFile(req.files,['txt','md'],'text')
         const namePath= await uploadFile(req.files,undefined,'imgs')
         
        return res.json({namePath})

        } catch (error) {
        return  res.status(400).json({error})
        }
        
  } 

  const putUplaod =async(req, res) => {
      const {collection,id}=req.params
      let model

      switch (collection) {
        case 'user':
          model=await Users.findById(id)
          if (!model) {
            return res.status(500).json({msg:`No existe ningun ${collection} con ese id en la DB`})
          }
          break;
          case 'product':
          model=await Product.findById(id)
          if (!model) {
            return res.status(500).json({msg:`No existe ningun ${collection} con ese id en la DB`})
          }
          break;
        default:
          res.status(500).json({msg:`Falta por actualizar la coleccion ${collection}`})
          break;
        }
        
        if (model.img) {
          const PathImg= path.join(__dirname,'../uploads',collection,model.img)
          if ( fs.existsSync(PathImg)) {
            fs.unlinkSync(PathImg)}   
        }

        const namePath= await uploadFile(req.files,['jpg','png','icon'],collection)
        model.img=namePath

        await model.save()
      

     res.json({
      model
    })
    }

    const putUplaodCloudinary =async(req, res) => {
      const {collection,id}=req.params
      let model

      switch (collection) {
        case 'user':
          model=await Users.findById(id)
          if (!model) {
            return res.status(500).json({msg:`No existe ningun ${collection} con ese id en la DB`})
          }
          break;
          case 'product':
          model=await Product.findById(id)
          if (!model) {
            return res.status(500).json({msg:`No existe ningun ${collection} con ese id en la DB`})
          }
          break;
        default:
          res.status(500).json({msg:`Falta por actualizar la coleccion ${collection}`})
          break;
        }
        
        if (model.img) {
          const nameArray=model.img.split('/')
          const name =nameArray[nameArray.length-1]
          const [public_id]=name.split('.')
          cloudinary.uploader.destroy(public_id)
        }

        //path  img temporal
        const{tempFilePath}=req.files.file
      
        //Resp of the page Cloudinary
       const {secure_url}= await cloudinary.uploader.upload(tempFilePath)
        model.img=secure_url

        await model.save()
     res.json({
      model
    })
    }
    module.exports={
      getUploadFile,
      postUploadFiles,
      putUplaod,
      putUplaodCloudinary
    }