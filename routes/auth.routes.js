const {Router} = require("express");
const { loginPost, googleSIgnin, renewJWT } = require("../controllers/auth.controller");
const { tokenValidate } = require("../middleware");


const router= Router();

router.post("/login",loginPost)

router.post("/signin",googleSIgnin) 

router.get("/",[tokenValidate], renewJWT)


module.exports=router