const jwebtoken = require('./jwebtoken');
const  dbValidator= require('./db-validation');
const uploadFile = require('./uploadFile');


module.exports={
    ...jwebtoken,
    ...dbValidator,
    ...uploadFile
}