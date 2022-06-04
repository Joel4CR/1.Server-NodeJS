const { Router, response } = require("express");
const { check } = require("express-validator");
const { getCategory, postCategory, putCategory, getCategories, deleteCategory } = require("../controllers/categories.controller");
const { idExistCategory } = require("../helpers/db-validation");
const {tokenValidate, validateFields, rolValidate} = require("../middleware");


const router=Router();

//Get all of categories - public
router.get("/category",getCategories);

//Get a category by id - public
router.get("/category/:id",[
   check('id','Este no es un ID de MongoDB').isMongoId(),
   check('id').custom(idExistCategory),
   validateFields
],getCategory)

//Create category - private
router.post("/category",[
   tokenValidate,
   check('name','El nombre es obligatorio').notEmpty(),
   validateFields
],postCategory)

//Update - pirvate whatever with valid token
router.put("/category/:id",[
   tokenValidate,
   check('id','Este no es un ID de MongoDB').isMongoId(),
   check('id').custom(idExistCategory),
   check('name','El nombre es obligatorio').notEmpty(),
   validateFields
],putCategory)

//Delete a category - ADMIN
router.delete("/category/:id",[
   tokenValidate,
   check('id','Este no es un ID de MongoDB').isMongoId(),
   check('id').custom(idExistCategory),
   rolValidate,
   validateFields
],deleteCategory)


module.exports=router