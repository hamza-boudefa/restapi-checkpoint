const mongoose=require('mongoose')
 const {Schema}=mongoose;

 const userSchema=new Schema({
     name:{type :String},
     age:Number,
     country:{type:String} ,

 })
 module.exports=mongoose.model("users",userSchema)