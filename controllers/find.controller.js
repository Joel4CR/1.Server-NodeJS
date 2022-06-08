const {ObjectId} =require('mongoose').Types
const {Users, Category, Product} = require('../models');

const ControllerAllowed=[
    'product',
    'category',
    'user',
    'role'
]

    const findUsers=async(term="",res)=>{
        
        const isMongoId=ObjectId.isValid(term)
        if (isMongoId) {
            const user=await Users.findById(term)
            return res.json({result:user})
        }

        const regex = new RegExp(term,'i')

        const user= await Users.find({
            $or:[{name:regex},{mail:regex}],
            $and:[{state:true}]
        })
        res.json({result:user})

    }

    const findCategory=async(term="",res)=>{
        
        const isMongoId=ObjectId.isValid(term)
        if (isMongoId) {
            const category=await Category.findById(term)
                    .populate('user',["name","mail"])
            return res.json({result:category})
        }
        
        const regex=new RegExp(term,'i')
        const category=await Category.find(
            {name:regex,
            $and:[{state:true}]
            })
            .populate('user',["name","mail"])
        res.json({result:category})
    }
    const findProduct=async(term="",res)=>{
        
        const isMongoId=ObjectId.isValid(term.toUpperCase)
        if (isMongoId) {
            const product=await Product.findById(term)
                .populate('user',['name','mail'])
                .populate('category',['name','user'])
            return res.json({result:product})
        }
        const regex=new RegExp(term,'i')
        const product=await Product.find(
            {name:regex,
            $and:[{state:true}]
            })
            .populate('user',['name','mail'])
            .populate('category',['name'])
        res.json({result:product})
    }



const find=(req,res)=>{
    const {term,controller}=req.params

    if (!ControllerAllowed.includes(controller)) {
        return res.status(400).json({
            msg:`Controlador no permitido, debe incluirse: ${ControllerAllowed}`
        })
    }
    switch (controller) {
        case 'product':
            findProduct(term,res)
        break;
        case 'category':
            findCategory(term,res)
        break;
        case 'user':
            findUsers(term,res)
        break;

        default:
            res.status(500).json({
                msg:'Se le olvido hacer alguna busqueda'
            })
            break;
    }



}

module.exports = find