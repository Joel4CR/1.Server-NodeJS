const {Router}=require("express");
const {check}=require("express-validator");

const { getUsers, postUsers, putUsers, deletetUsers, patchUsers } = require("../controllers/user.controller");

const {
    validateFields,
    getRol,
    rolValidate,
    tokenValidate
}=require('../middleware')

const { rolExist, mailExist, idExist } = require("../helpers/db-validation");



const router=Router()

//el sgundo argumento de tres argumentos
// en la funcion es el middleware

router.get("/",getUsers);

router.post("/",[
    check('name',"El nombre es obligatorio").notEmpty(),
    check('password','La contraseña  debe tener 6 caracteres como minimo').isLength({min:6}),
    check('mail',"El correo no es valido").isEmail(),
    check('mail').custom(mailExist),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(rolExist),
    validateFields
],postUsers);

router.put("/:id",[
    check('id','No es un id de MongoDB').isMongoId(),
    check('id').custom(idExist),
    check('mail').custom(mailExist),
    check('rol').custom(rolExist),
    validateFields
],putUsers);
router.delete("/:id",[
    tokenValidate,
    //rolValidate,
    getRol('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
    check('id','No es un id de MongoDB').isMongoId(),
    check('id').custom(idExist),
    validateFields
],deletetUsers);
router.patch("/",patchUsers);


module.exports=router