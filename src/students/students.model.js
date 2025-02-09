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
    career:{
        type: String,
        required: [true, 'Career is required'],
    },
    phone:{
        type: String,
        required: [true, 'Phone is required'],
    },
    address:{
        type: String,
        required: [true, 'Address is required'],
    },
    asignatures:[{
        type:Schema.Types.ObjectId,
        ref:'Asignature',
    }],
    countAsignatures:{
        type: Number,
        default: 0
    },
    role:{
        type: String,
        required: [true, 'Role is required'],
        enum:['STUDENT_ROLE'],
        default:'STUDENT_ROLE'
    },
});

export default model('Student', studentSchema);