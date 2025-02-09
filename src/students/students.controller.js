
import { encryptPassword } from '../../utils/encrypt.js'
import Student from './students.model.js'

export const createStudent = async(request,response)=>{
    try {
        let student = request.body
        student.password = await encryptPassword(student.password)
        let newStudent = await Student(student)
        newStudent.save()
        return response.status(200).send({success:true,message:'Student created',newStudent})
    } catch (error) {
        console.error('Error creating student',error);
        return response.status(500).send('Error creating student')
    }
}