const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URI)

.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// Schema
const UserSchema = new mongoose.Schema({
name:String,
email:String,
age:Number
})

const User = mongoose.model("User",UserSchema)


// Save user
app.post("/saveUser", async(req,res)=>{

try{

const user = new User(req.body)

await user.save()

res.json({message:"User saved successfully"})

}catch(error){

res.status(500).json({message:"Error saving user"})

}

})


// Get users
app.get("/users", async(req,res)=>{

const users = await User.find()

res.json(users)

})


// Delete user
app.delete("/deleteUser/:id", async(req,res)=>{

await User.findByIdAndDelete(req.params.id)

res.json({message:"User deleted"})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running")

})