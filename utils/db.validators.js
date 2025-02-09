import Person from '../src/person/person.model.js'
export const existEmail=async (email,user)=>{
    let isEmailUsed = await Person.findOne({email})
    if(isEmailUsed){
        throw new Error('Email already in use')
    }
}