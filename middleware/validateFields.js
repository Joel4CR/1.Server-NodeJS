const { validationResult } = require("express-validator");

const validateFields=(req,res,next)=>{

      //Validation of errors from check() 
      const errors=validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json(errors);
      }

      //Si llega aqui sigue con el sigte middleware
      next();
    
}


module.exports={validateFields}