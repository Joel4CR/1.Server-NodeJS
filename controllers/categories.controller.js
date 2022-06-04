const { response } = require("express");
const { Category} = require("../models")

const getCategories=async(req,res=response)=>{

    const query={state:true}
    const count=await Category.countDocuments(query);
    if (count===0) {
        return res.status(400).json({
            msg:'No hay ninguna categoria'
        })
    }
    const categories=await Category.find(query).populate('user')
   
    res.json({
        msg:'GET_CATEGORY',
        count,
        categories
    })
}
const getCategory=async(req,res=response)=>{

    const {id}=req.params

    const category=await Category.findById(id).populate('user') 
    if (!category) {
        return res.status(400).json({
            msg:'No existe ninguna categoria con este id en DB'
        })
    }
    if(!category.state){
        return res.status(400).json({
            msg:'No existe ninguna Categoria (BLOQUEADA) '
        })
    }
    res.json({
        msg:'GET_PRODUCT',
        category,
    })
}
const postCategory=async(req,res=response)=>{ 
    const name=req.body.name.toUpperCase()

    const categoryDB=await Category.findOne({name})
    if (categoryDB) {
       return res.status(400).json({
            msg: `Ya existe la categoria ${categoryDB.name} en la DB`
        })
    }
    const category=new Category({
        name,
        user: req.user._id
    })
    await category.save()

    res.status(201).json({
        msg:'POST_CATEGORY',
        category
    })
}
const putCategory=async(req,res=response)=>{

    const {id}=req.params
    const name=req.body.name.toUpperCase()
    
    const category=await Category.findByIdAndUpdate(id,{name})

    res.json({
        msg:'PUT_PRODUCT',
        category
    })
}
const deleteCategory=async(req,res=response)=>{

    const {id}=req.params
    const category=await Category.findByIdAndUpdate(id,{state:false})
    res.json({
        msg:'DELETE_PRODUCT',
        category
    })
}

module.exports={
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
} 