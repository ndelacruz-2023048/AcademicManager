import { model, Schema } from "mongoose";

const studentSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    specialization:{
        type: String,
        required: [true, 'Career is required'],
    },
    salary:{
        type: Number,
        required: [true, 'Phone is required'],
    },
    address:{
        type: String,
        required: [true, 'Address is required'],
    },
    phone:{
        type: String,
        required: [true, 'Phone is required'],
    },
    role:{
        type: String,
        required: [true, 'Role is required'],
        enum:['TEACHER_ROLE']
    }
});

export default model('Teacher', studentSchema);