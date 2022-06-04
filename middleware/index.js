

const validateField=require('../middleware/validateFields')
const rolValidate=require('../middleware/rolValidate')
const tokenValidate=require('../middleware/tokenValidate')


module.exports={
    ...validateField,
    ...rolValidate,
    ...tokenValidate
}