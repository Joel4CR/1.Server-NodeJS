const { Schema, model } = require("mongoose");

const productSchema=Schema({
    name:{
        type:String,
        required:[true,'EL nombre es obligatorio'],
        unique:true
    },
    state:{
        type:Boolean,
        default:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    description:{
        type:String
    },
    available:{
        type:String,
        default:true
    }

});
productSchema.methods.toJSON=function(){
    const {__v,_id,...rest}=this.toObject();
    return rest
}

module.exports=model('Product',productSchema)