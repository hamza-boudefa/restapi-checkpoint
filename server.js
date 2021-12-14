const express=require('express')
const app=express()
require ('dotenv').config()
app.use(express.json())
const connectDB=require('./config/connect')
const users = require('./modules/users')
var cors = require('cors')
app.use(cors())
connectDB() 


app.post('/users/adduser',async(req,res)=>{
const newUser=new users(req.body)  
const newData=await  newUser.save()
res.json({message:"data adeed", newData:newData})
})

app.get('/users',async(req,res)=>{
    const userlist= await users.find()
    res.json({message:'users list', data:userlist})
})
   

app.get('/users/:id',async(req,res)=>{
    const user= await users.findById(req.params.id)
    res.json({message:'users list', data:user})
})

app.put('/users/:id',async(req,res)=>{
    try {
    const update = await users.findByIdAndUpdate(req.params.id,{$set:{...req.body}})
     return res.json({message:'user updated', data:update})
    } 
 catch (err){
    return res.json({message:err})

}
})

app.delete('/users/:id',async(req,res)=>{
    try {
        const deleteuser= await users.findByIdAndDelete(req.params.id)
        return res.json({message:'user deleted', data:deleteuser})
    }
    catch (err){
        return res.json({message:err})
    }
}) 
    
port=process.env.port || 4000 
app.listen(port,(err)=>err? console.log(err):console.log(`listining on port ${port}`))