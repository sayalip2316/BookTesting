const express=require("express");
const bookRouter=express.Router();
const {BookModel}=require("../model/book.model")

bookRouter.get("/",async(req,res)=>{
    const {sortBy,filterBy,title}=req.query
    const sort=(sortBy==="asc")?1:-1;
    try {
        if(!sortBy && !filterBy && !title){
            const books=await BookModel.find()
           return res.status(200).send({
                isError:false,
                data:books
            })
        }
        if(!sortBy && !title){
            const books=await BookModel.find({Genre:filterBy})
            return res.status(200).send({
                isError:false,
                data:books
            })
        }
        if(!filterBy && !title){
            const books=await BookModel.find().sort({Price:sort})
            return res.status(200).send({
                isError:false,
                data:books
            })

        }
        if(!filterBy && !sortBy){
            const books=await BookModel.find({Title:{ $regex: title, $options: 'i'}});
            return res.status(200).send({
                isError:false,
                data:books
            })
        }
        const books=await BookModel.find({Genre:filterBy,Title:{ $regex: title, $options: 'i'}}).sort({Price:sort})
        res.status(200).send({
            isError:false,
            data:books
        })
    } catch (error) {
        res.status(400).send({
            isError:true,
            msg:error.msg
        })
    }
})

bookRouter.post("/add",async(req,res)=>{
    try {
        const book=new BookModel(req.body)
        await book.save()
        res.status(200).send({
            isError:false,
            msg:"Added successfully!!",
        })
    } catch (error) {
        res.status(400).send({
            isError:true,
            msg:error.msg
        })
    }
})

bookRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const book=await BookModel.find({_id:id})
        res.status(200).send({
            isError:false,
            data:book
        })
    } catch (error) {
        res.status(400).send({
            isError:true,
            msg:error.msg
        })
    }
})
bookRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const book=await BookModel.findByIdAndDelete({_id:id})
        if(book){
            res.status(200).send({
                isError:false,
                res:"Book has been deleted"
            })
        }else{
            res.status(400).send({
                isError:true,
                msg:"Book not Find"
            })
        }
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            msg:error.message
        })
    }
})

// bookRouter.get("/books",async(req,res)=>{
//     const {title}=req.query;
//     try {
//         const book=await BookModel.find({Title:title})
//     } catch (error) {
        
//     }
// })
// bookRouter.delete("/delete/:productId", async (req, res) => {
//     const productId = req.params.productId; // Use req.params.productId
//     try {
//         await BookModel.findByIdAndDelete({ _id: productId });
//         res.status(200).send({ "msg": "Deleted successfully" });
//     } catch (error) {
//         res.status(400).send({ "msg": error.message });
//     }
// });


module.exports={bookRouter}

// https://booktestingapp.onrender.com/book