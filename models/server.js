const { json } = require("express");
const express=require("express");
const fileUpload = require("express-fileupload");
const {dbConnection} = require("../database/config");
const cors= require('cors');
const { socketController } = require("../sockets/socketController");
 
class Server{

constructor(){
    this.app=express();
    this.server = require('http').createServer( this.app ); // or const
     this.io     = require('socket.io')( this.server );	//  or const

    this.path={
        auth:       "/auth",
        category:   "/auth",
        product:    '/auth',
        find:       "/api",
        upload:     "/api/upload",
        user:       "/api/users"
    }

    //Connect to DB
    this.dbConnect();

    //Middleware
    this.middleware();

    //Routes 
    this.routes();

    //Socket Config
	this.sockets()
};
    async dbConnect(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.path.auth,require("../routes/auth.routes"))
        this.app.use(this.path.category,require("../routes/categories.routes"))
        this.app.use(this.path.find,require("../routes/find.routes"))
        this.app.use(this.path.product,require("../routes/product.routes"))
        this.app.use(this.path.upload ,require("../routes/uploads.routes"))
        this.app.use(this.path.user ,require("../routes/users.routes"))

    }
 
    middleware(){
        //Public directory
        this.app.use(express.static("public"));

        this.app.use(cors({ origin: true, credentials: true }));

        //Read and parser body
        this.app.use(json())

        //Use temp files instead of memory for managing the upload process
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    sockets() 
	{
        this.io.on('connection',(socket)=> socketController(socket, this.io));  //controller is the server controller of sockets
	} 

    listen(){
        this.server.listen(process.env.PORT,()=>console.log(`Server started on port ${process.env.PORT}`))
    }

}; 


module.exports=Server; 