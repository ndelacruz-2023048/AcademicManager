import { body } from "express-validator";
import { existEmail } from "../utils/db.validators.js";
import { validateErrorsPerson } from "./validate.errors.js";

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

    //Role---
    body('role','Role cannot be empty')
        .notEmpty()
        .isIn(['STUDENT_ROLE','TEACHER_ROLE','ADMIN    _ROLE']).withMessage('Role eliged is not valid'),

    validateErrorsPerson
]