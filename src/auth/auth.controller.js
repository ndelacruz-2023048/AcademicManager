import { checkPassword } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import Person from '../person/person.model.js'
import Student from '../students/students.model.js'
import Teacher from '../teacher/teacher.model.js'

export const login = async (request, response) => {
    try {

        let {email,password} = request.body
        //Verificamos si el email existe
        let person = await Student.findOne({email})
        if(!person){
            person = await Teacher.findOne({email})
        }

        if(email && await checkPassword(person.password,password)){
            console.log('Logged in')
            let loggedUser = {
                uid:person._id,
                name:person.firstName,
                lastName:person.lastName,
                role:person.role,
            }
            let token = await generateJwt(loggedUser)
            return response.status(200).send({sucess:true,message:`Welcome ${person.firstName}`,token})
        }
        console.log(person)

        return response.status(500).send({ message: 'Invalid credentials' })
    } catch (error) {
        response.status(5000).send({ sucess: false, message: 'General server error', error })
    }
}