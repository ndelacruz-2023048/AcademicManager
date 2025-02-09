import Person from '../src/person/person.model.js'
import Teacher from '../src/teacher/teacher.model.js'


import { body } from "express-validator";
import { existEmail, existEmailStudent, existEmailTeacher, isStudentEmpty } from "../utils/db.validators.js";
import { validateErrors } from "./validate.errors.js";

export const registerPerson = [
    //Name---
    body('name','Name cannot be empty')
        .notEmpty(),

    //Last name---
    body('lastName','Last name cannot be empty')
        .notEmpty(),

    //Email---
    body('email','Email cannot be empty')
        .notEmpty()
        .isEmail()
        .withMessage('Email is not valid')
        .custom((email,user)=>existEmail(email,user)),
    
    //Password---
    body('password','Password cannot be empty')
        .notEmpty()
        .isLength({min:8})
        .isStrongPassword()
        .withMessage('Password is not strong enough'),

    //Phone---
    body('phone','Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    
    //Address---
    body('address','Address cannot be empty')
        .notEmpty(),

    validateErrors
]

export const registerAsignature = [
    //Name---
    body('asignatureName','Name cannot be empty')
        .notEmpty(),

    //Description---
    body('description','Description cannot be empty')
        .notEmpty(),

    //Category---
    body('category','Category cannot be empty')
        .notEmpty(),

    //Teacher---
    body('teacher','Teacher cannot be empty')
        .notEmpty(),


    //Student---
    body('students','Student cannot be empty')
        .custom((student)=>isStudentEmpty(student)),

    validateErrors
]

export const registerTeacher = [
    //Name---
    body('firstName','Name cannot be empty')
        .notEmpty(),

    //Last name---
    body('lastName','Last name cannot be empty')
        .notEmpty(),

    //Email---
    body('email','Email cannot be empty')
        .notEmpty()
        .isEmail()
        .withMessage('Email is not valid')
        .custom((email,user)=>existEmailTeacher(email,user)),
    //Password---
    body('password','Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password is not strong enough'),

    //specialization---
    body('specialization','Specialization cannot be empty')
        .notEmpty(),

    //Salary---
    body('salary','Salary cannot be empty')
        .notEmpty()
        .isNumeric(),
    
    //Phone---
    body('phone','Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    
    //Address---
    body('address','Address cannot be empty')
        .notEmpty(),

    validateErrors
]

export const registerStudent = [
    //Name---
    body('firstName','Name cannot be empty')
        .notEmpty(),

    //Last name---
    body('lastName','Last name cannot be empty')
        .notEmpty(),

    //Email---
    body('email','Email cannot be empty')
        .notEmpty()
        .isEmail()
        .withMessage('Email is not valid')
        .custom((email,user)=>existEmailStudent(email,user)),
    
    //Password---
    body('password','Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password is not strong enough'),

    //Career---
    body('career','Career cannot be empty')
        .notEmpty(),

    //Phone---
    body('phone','Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    
    //Address---
    body('address','Address cannot be empty')
        .notEmpty(),
    validateErrors
]

export const validateTeacher =async(request,response,next)=> {
    let user = request.user
    let isValidTeacher =await Teacher.findOne({_id:user.uid,role:'TEACHER_ROLE'})
    if(!isValidTeacher){
        return response.status(401).send({message:'Only teachers are authorized please login with a different account'})
    }
    next()
}