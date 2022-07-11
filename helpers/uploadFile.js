
const  {v4:uuidv4}= require('uuid');
const path = require('path');

const uploadFile=(files,validateExtension=['jpg','png','jpeg','gif'],folder='')=>{
    
    return  new Promise((resolve, reject) => {
       const {file} = files
    const nameFile= file.name.split('.')
    const extension=nameFile[nameFile.length-1]

    if (!validateExtension.includes(extension)) {
       return reject(`La extension ${extension} no esta permitida`)
    }
    const nameUuid=uuidv4()+ '.' + extension

      const uploadPath= path.join(__dirname ,'../uploads/',folder , nameUuid)
      
      file.mv(uploadPath, (err)=> {
        if (err) {
          reject(err);
        }
     
        resolve(nameUuid);
      });
    })

   
    } 


    module.exports={
        uploadFile
    }