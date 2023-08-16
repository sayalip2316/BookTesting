const mongoose=require("mongoose")

const bookSchema=mongoose.Schema({
    Title:{type:String, required:true},
    Author:{type:String, required:true},
    Genre: {type:String, enum:["Fiction", "Science", "Comic"],required:true},
    Description:{type:String, required:true},
    Price:{type:Number, required:true}
})


const BookModel=mongoose.model("book",bookSchema)

module.exports={BookModel}