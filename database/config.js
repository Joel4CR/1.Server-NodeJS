const mongoose=require("mongoose");

const dbConnection=async()=>{

    try {

      await mongoose.connect('mongodb://localhost:27017/UserServer', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");  
    } catch (error) {
        console.log(error)
        throw new Error("Error to conected to databse")
    }
    
}



module.exports={dbConnection}