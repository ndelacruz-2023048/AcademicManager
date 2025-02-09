import { model, Schema } from "mongoose";

const personSchema = Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    phone:{
        type:String,
        required:[true, 'Phone is required']
    },
    address:{
        type:String,
        required:[true, 'Address is required']
    },
    gender:{
        type:String,
        required:[true,'Gender is required'],
        enum:['MEN','WOMEN','OTHER']
    },
    role:{
        type:String,
        enum:['STUDENT_ROLE','TEACHER_ROLE','ADMIN_ROLE'],
    }
})

export default model('Person',personSchema)