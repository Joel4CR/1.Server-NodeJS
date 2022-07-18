const { putUplaod, postUploadFiles, getUploadFile, putUplaodCloudinary } = require('../controllers/uploads.controller');
const {check} = require('express-validator');
const { validateFields, fileValidate } = require('../middleware');
const { isCollectionExist } = require('../helpers/db-validation');

const router = require('express').Router();

router.get('/:collection/:id',[
    check('id','No es un id de mongoDB').isMongoId(),
    check('collection').custom(c=>isCollectionExist(c,['user','product'])),
    validateFields
],getUploadFile);

router.post('/',[fileValidate], postUploadFiles);

router.put('/:collection/:id',[
    check('id','No es un id de mongoDB').isMongoId(),
    fileValidate,
    check('collection').custom(c=>isCollectionExist(c,['user','product'])),
    validateFields
],putUplaodCloudinary);



module.exports = router