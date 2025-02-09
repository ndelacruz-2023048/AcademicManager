import Person from '../src/person/person.model.js'
import Teacher from '../src/teacher/teacher.model.js'
import Student from '../src/students/students.model.js'

export const existEmailTeacher=async (email,user)=>{
    let isEmailUsed = await Teacher.findOne({email})
    if(isEmailUsed){
        throw new Error('Email already in use')
    }
}
export const existEmailStudent=async (email,user)=>{
    let isEmailUsed = await Student.findOne({email})
    if(isEmailUsed){
        throw new Error('Email already in use')
    }
}

export const existEmail=async (email,user)=>{
    let isEmailUsed = await Person.findOne({email})
    if(isEmailUsed){
        throw new Error('Email already in use')
    }
}

export const isStudentEmpty=async (student)=>{
    if(!student){
        throw new Error('Student is required')
    }
}