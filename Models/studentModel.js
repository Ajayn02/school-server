const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    teacherId:{
        type:String,
        required:true
    }
})

const students=new mongoose.model('students',studentSchema)

module.exports=students