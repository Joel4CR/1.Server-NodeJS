const {Router} = require("express");
const { loginPost } = require("../controllers/auth.controller");


const router= Router();

router.post("/login",loginPost)


module.exports=router