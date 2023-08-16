const express=require("express");
const {connection}=require("./Config/db");
const {bookRouter}=require("./Routes/book.route");
const cors=require("cors")
const dotenv=require("dotenv");
dotenv.config()

const app=express();
app.use(express.json());
app.use(cors())
app.use("/book",bookRouter)

app.listen(process.env.PORT,async()=>{
try {
    await connection
    console.log("Connected to db")
    console.log(`Server is listening on port ${process.env.PORT}`)
} catch (error) {
    console.log(error)
}
})