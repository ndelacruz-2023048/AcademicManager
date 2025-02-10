
import { encryptPassword } from '../../utils/encrypt.js'
import Student from './students.model.js'
import Asignature from '../asignatures/asignatures.model.js'


export const createStudent = async (request, response) => {
    try {
        let student = request.body
        student.password = await encryptPassword(student.password)
        let newStudent = await Student(student)

        if (student.asignatureId) {
            let isAsignatureValid = await Asignature.findOne({ _id: student.asignatureId})
            if (!isAsignatureValid) {
                return response.status(404).send({ message: 'Asignature Id is not valid' })
            }
            newStudent.asignatures = student.asignatureId
            newStudent.countAsignatures += 1
            
            newStudent.save()
            response.status(200).send({ success: true, message: 'Student created', newStudent })

        } else {
            newStudent.save()
            response.status(200).send({ success: true, message: 'Student created', newStudent })
        }

    } catch (error) {
        console.error('Error creating student', error);
        return response.status(500).send('Error creating student')
    }
}

export const updateStudent = async (request, response) => {
    try {
        let newStudent = request.body
        let { id_student } = request.params
        let isStudentValid = await Student.findOne({ _id: id_student })
        if(!isStudentValid){
            return response.status(404).send({sucess:false, message: 'Student Id is not valid' })
        }
        if(id_student!==request.user.uid){
            return response.status(400).send({ message: 'You can only update your account' })
        }
        let student = await Student.findByIdAndUpdate({ _id: id_student }, newStudent, { new: true })
        response.status(200).send({ success: true, message: 'Student updated', student })
    } catch (error) {
        console.error('Error updating student', error);
        return response.status(500).send('Error updating student',error)
    }
}