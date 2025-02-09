import { encryptPassword } from '../../utils/encrypt.js'
import Person from './person.model.js'

export const getPersonTest = (request,response)=>{
    try {
        response.send({message:'Person controller working'})
    } catch (error) {
        response.status(5000).send({sucess:false,message:'General server error',error})
    }
}


export const createPerson = async (request,response)=>{
    try {
        let person = request.body 
        //Verifica si el rol no viene en el body
        if(!person.role){
            person.role='STUDENT_ROLE'
        }
        //Encriptamos la constraseña
        person.password = await encryptPassword(person.password)
        console.log(person)
        let newPerson = new Person(person)
        newPerson.save()
        response.status(200).send({sucess:true,message:'Person created',newPerson})
    } catch (error) {
        response.status(5000).send({sucess:false,message:'General server error',error})
    }
}