const { json } = require("express");
const express=require("express");
const {dbConnection} = require("../database/config");

 
class Server{

constructor(){
    this.app=express();

    this.path={
        auth:       "/auth",
        category:   "/auth",
        product:    '/auth',
        find:       "/api",
        user:       "/api/users"
    }

    //Connect to DB
    this.dbConnect();

    //MIddleware
    this.middleware();

    //Routes 
    this.routes();
};
    async dbConnect(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.path.auth,require("../routes/auth.routes"))
        this.app.use(this.path.category,require("../routes/categories.routes"))
        this.app.use(this.path.find,require("../routes/find.routes"))
        this.app.use(this.path.product,require("../routes/product.routes"))
        this.app.use(this.path.user ,require("../routes/users.routes"))

    }
 
    middleware(){
        //Public directory
        this.app.use(express.static("public"));

        //Read and parser body
        this.app.use(json())
    }

    listen(){
        this.app.listen(process.env.PORT,()=>console.log(`Server started on port ${process.env.PORT}`))
    }

}; 


module.exports=Server;