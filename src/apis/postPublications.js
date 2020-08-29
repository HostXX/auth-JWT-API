const express = require('express')
const router = express.Router()
const { Post } = require('./database/models')


require('dotenv/config') 


//Get all the Post
router.get('/',async (req,res)=>{
    try {
        const post = await Post.find()
        res.json(post)
        console.log(post)
    } catch (err) {
        res.json({message : {
            error : err,
            message : "An error has ocurred"
         }})
        
    }
})

//Specific Post 
router.get('/:ID', async(req,res)=>{

    try {
        const post = await Post.findById(req.params.ID)
        res.json(post)
        console.log(post)
    } catch (err) {
        res.json({message : err})
    }
    
})

//Summit a Post
router.post('/',async (req,res)=> {
    console.log(req.body)

    const post = await new Post({
      title : req.body.title,
      description : req.body.description
    })
    
    try {
        const savePost = await post.save()
        res.json(savePost)
    }
    catch(err){
        res.json({message: err})

  }
})


//Delete Post 

router.delete('/:ID', async(req,res)=>{

    try {
        const Post = await Post.remove({_id : req.params.ID})
        res.json(Post)} 
    
    catch (err) {
        res.send({message : err})
    }
    
})

//Update a Post

 router.patch('/:ID', async(req,res)=>{
     try {
         const updatedPost = await Post.updateOne({
         _id : req.params.ID},{$set:{title : req.params.title}})
         await res.json(updatedPost)} 
         
     catch (err) {
             res.send({message : err})
     }
 })

 


module.exports = router