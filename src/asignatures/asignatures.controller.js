import Asignature from './asignatures.model.js'
import Person from '../person/person.model.js'
import Student from '../students/students.model.js'
import Teacher from '../teacher/teacher.model.js'
import mongoose, { Types } from 'mongoose'

const updateCountAsignature = async (asignature) => {
    let newCountAsignature = await Student.findOne({ _id: asignature.students })
    newCountAsignature.countAsignatures +=1
    await Student.findByIdAndUpdate({ _id: asignature.students }, newCountAsignature, { new: true })
    console.log(newCountAsignature)
}

export const createAsignature = async (request, response) => {
    try {
        let asignature = request.body
        let newAsignature = new Asignature(asignature)
        let isStudentValid = await Student.findOne({ _id: asignature.students, role: 'STUDENT_ROLE' })
        let isTeacherValid = await Teacher.findOne({ _id: asignature.teacher, role: 'TEACHER_ROLE' })

        if (!isStudentValid || !isTeacherValid) {
            return response.status(404).send({ message: 'Student or teacher Id is not valid' })
        }

        await updateCountAsignature(asignature)

        newAsignature.save()
        response.send({ message: 'This is the asignatures', newAsignature })
    } catch (error) {
        console.error('Error getting asignatures', error)
    }
}

export const updateAsignature = async (request, response) => {
    try {
        let newAsignature = request.body
        let { id_asignature } = request.params//Id de la asignatura
        let asignature = await Asignature.findByIdAndUpdate({ _id: id_asignature }, newAsignature, { new: true })

        // let data = new mongoose.Types.ObjectId('67a83d34a538c131d61767b0')

        // console.log(asignature.students[0].equals(data))
        response.send({ message: 'This is the asignatures', asignature })
    } catch (error) {
        console.error('Error getting asignatures', error)
        response.status(500).send({ sucess: false, message: 'General server error', error })
    }
}


export const addStudentAsignature = async (request, response) => {
    try {
        let newStudent = request.body
        let { id_asignature } = request.params//Id de la asignatura
        
        let asignature = await Asignature.findOne({ _id: id_asignature })
        console.log(asignature)
        

        if(!await Student.findOne({ _id: newStudent.students , role: 'STUDENT_ROLE' })){
            return response.status(404).send({ message: 'Asignature Id not found' })
        }
        
        if(await Student.findOne({ _id: newStudent.students , countAsignatures: 3 })){
            return response.status(400).send({ message: 'Student already has 3 asignatures' })
        }

        //Verificamos si el estudiante ya esta en la misma asignatura
        let data = new mongoose.Types.ObjectId(`${newStudent.students}`)
        for (let lista of asignature.students) {
            if (lista.equals(data)) {
                return response.status(400).send({ message: 'Student already in the asignature' })
            }
        }

        await updateCountAsignature(newStudent)


        //Agregamos al estudiante a la asignatura
        asignature.students.push(newStudent.students)
        asignature.save()
        console.log(asignature)

        response.status(200).send({ message: 'This is the asignatures', newStudent, id_asignature })
    } catch (error) {
        console.error('Error getting asignatures', error)
    }
}