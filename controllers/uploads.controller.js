const { uploadFile } = require("../helpers/uploadFile");


const uploadFiles=async(req, res) => {
 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg:'No files were uploaded'});
        return;
    }
    try {
      //   const namePath= await uploadFile(req.files,['txt','md'],'text')
         const namePath= await uploadFile(req.files,undefined,'imgs')
         
        return res.json({namePath})

        } catch (error) {
        return  res.status(400).json({error})
        }
        
  } 

  const putUplaod =(req, res) => {
      const {id}=req.params
     res.json({id})
    }

    module.exports={
      uploadFiles,
      putUplaod
    }