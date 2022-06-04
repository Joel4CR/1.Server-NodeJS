
const { response } = require("express");
const {Schema,model}=require("mongoose");

const categorySchema=Schema({
    name:{
       type:String,
       required:[true,"El nombre es obligatorio"] ,
       unique:true
    },
    state:{
        type:Boolean,
        default:true,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

categorySchema.methods.toJSON=function(){
    const {__v,...rest}=this.toObject()
    return rest
};



module.exports=model("Category",categorySchema)