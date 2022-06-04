const { response } = require("express")
const { query } = require("express-validator")
const { Product, Category } = require("../models")



const getProducts=async(req,res=response)=>{

    const query={state:true}
    const product=await Product.find(query)
        .populate('category',['name','state'])
        .populate('user',['name','rol','state'])
    const total= await Product.countDocuments(query)
    res.status(200).json({
        msg:"GET-Products",
        total,
        product
    })
}
const getProduct=async(req,res=response)=>{

    const {id}=req.params

    const product=await Product.findById(id)
    .populate('category',['name','state'])
    .populate('user',['name','rol','state'])
    console.log(product);
    if (!product) {
        return res.status(400).json({
            msg:'No existe ninguna categoria con este id en DB'
        })
    }
    if(!product.state){
        return res.status(400).json({
            msg:'No existe ningun Producto (BLOQUEADA)'
        })
    }
    res.status(200).json({
        msg:"GET-Product",
        product
    })
}
const postProduct=async(req,res=response)=>{

    const name=req.body.name.toUpperCase()
    console.log(name);
    const productDB=await Product.findOne({name})
    if (productDB) {
        res.status(400).json({
            msg:'Este producto ya existe en la DB'
        })
    }
    const catName =req.body.catName.toUpperCase()
    console.log(catName);
    const category=await Category.findOne({name:catName})
    if (!category) {
        res.status(400).json({
            msg:'No existe ninguna categoria con ese nombre'
        })
    }
    const product=new Product({
        name,
        price:req.body.price,
        description:req.body.description,
        category,
        user:category.user._id
    })
    await product.save();

    res.status(200).json({
        msg:"POST-Product",
        product
    })

}
const putProduct=async(req,res=response)=>{

    const {state,category,user,...rest} =req.body
    const {id}=req.params
    
    rest.name=req.body.name.toUpperCase()
    const product=await Product.findByIdAndUpdate(id,rest,{new:true})

    res.status(200).json({
        msg:"PUT-Product",
        product
    })
}
const deleteProduct=async(req,res=response)=>{

    const {id}= await req.params
    const product=await Product.findByIdAndUpdate(id,{state:false})
    res.status(200).json({
        msg:"DELETE-Product",
        product
    })
}

module.exports={
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}