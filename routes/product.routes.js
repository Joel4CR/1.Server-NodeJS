const { Router } = require("express");
const { check } = require("express-validator");
const { getProducts, getProduct, postProduct, putProduct, deleteProduct } = require("../controllers/product.controller");
const {  idExistProduct } = require("../helpers/db-validation");
const { tokenValidate, validateFields } = require("../middleware");


const router=Router()

router.get('/product',getProducts);
router.get('/product/:id',[
    tokenValidate,
    check('id','El ID no es de mongo').isMongoId(),
    check('id').custom(idExistProduct),
    validateFields
],getProduct);
router.post('/product',[
    tokenValidate,
    check('name','El nombre es obligatorio').notEmpty(),
    validateFields
],postProduct);
router.put('/product/:id',[
    tokenValidate,
    check('id','El ID no es de mongo').isMongoId(),
    check('id').custom(idExistProduct),
    validateFields
],putProduct);
router.delete('/product/:id',[
    tokenValidate,
    check('id','El ID no es de mongo').isMongoId(),
    check('id').custom(idExistProduct),
    validateFields
],deleteProduct);

module.exports=router