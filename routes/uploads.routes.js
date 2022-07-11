const { uploadFiles, putUplaod } = require('../controllers/uploads.controller');
const {check} = require('express-validator');
const { validateFields, tokenValidate } = require('../middleware');

const router = require('express').Router();

router.post('/upload', uploadFiles);

router.put('/upload/user/:id',[
check('id','No es un id de mongoDB').isMongoId(),
validateFields
],putUplaod);

module.exports = router