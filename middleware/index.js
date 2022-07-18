

const validateField=require('../middleware/validateFields')
const rolValidate=require('../middleware/rolValidate')
const tokenValidate=require('../middleware/tokenValidate')
const  fileValidate= require('../middleware/fileValidate');

module.exports={
    ...validateField,
    ...rolValidate,
    ...tokenValidate,
    ...fileValidate
}