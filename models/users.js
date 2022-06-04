const {Schema, model }=require("mongoose");

const userSchema=Schema({
    name:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    mail:{
        type:String,
        required:[true,"El correo es obligatorio"],
        unique:true
    }, 
    password:{
        type:String, 
        required:[true,"La contraseña es obligatoria"]
    }, 
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        enum:["ADMIN_ROLE","USER_ROLE","VENTAS_ROLE"]
    },
    state:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});
//Restringir los valores del objeto q quiero
// q el Front-End reciva
userSchema.methods.toJSON=function(){
    const {__v,_id,...rest}=this.toObject();
    rest.uid={_id};
    return rest
}


module.exports=model("User",userSchema)