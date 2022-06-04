const { request, response } = require("express");

const rolValidate=(req=request,res=response,next)=>{

    if(!req.user){
        return res.status(500).json({
            msg:'Error al no validar token antes'
        })
    }

    const {rol,name}=req.user

    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} no esta autorizado para borrar`
        })
    }
    
    next();
}
const getRol=(...rest)=>{

    return (req,res,next)=>{
        if(!req.user){
            return res.status(500).json({
                msg:'Error al no validar token antes'
            })
        }
        if(!rest.includes(req.user.rol)){
            return res.status(401).json({
                msg:`El rol insertado debe incluir a estos: ${rest}`
            })
        }
        next();
    }
}


module.exports={
    rolValidate,
    getRol
}
