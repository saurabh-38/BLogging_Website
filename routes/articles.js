const express=require('express')
const article = require('./../models/article')
const  Article=require('./../models/article')

const router=express.Router()

router.get('/new',(req,res)=>{

       
       res.render('articles/new',{article: new Article()})
})

router.get('/edit/:id',async (req,res)=>{

       const article= await Article.findById(req.params.id); 
       
        res.render('articles/edit',{article: article})
 })

router.get('/:slug', async(req,res)=>{

const article= await Article.findOne({slug: req.params.slug })
if(article==null)res.redirect('/')
res.render('articles/show',{article: article})

})
router.post('/', async(req,res,next)=>{
        console.log("Accepting vv")

 req.article=new Article()

       console.log("Accepting 2")
       next()
}, saveArticleAndRedirect('new'))
router.put('/:id', async(req,res,next)=>{
console.log("wating")
        req.article= await Article.findById(req.params.id)
        console.log("wating 2" )
        next()

}, saveArticleAndRedirect('edit'))

router.delete('/:id',async(req,res)=>{

        await Article.findByIdAndDelete(req.params.id)
        res.redirect("/")

})

function saveArticleAndRedirect(path){

        
       console.log("Accepting 3")
        return async (req,res)=>{
                let article=req.article;
                article.title= req.body.title;
                article.description=req.body.description
                article.markdown=req.body.markdown
        
               // console.log( req.body.title+"  "+req.body.description+"  "+ req.body.markdown)
        try{ 
        await article.save()
        
        res.redirect(`/articles/${article.slug}`)
        }catch(e){ 
        
                res.render(`articles/${path}`,{article: article})
        }
        }
          
}


module.exports=router