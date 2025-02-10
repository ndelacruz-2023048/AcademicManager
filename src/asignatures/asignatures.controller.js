import Asignature from './asignatures.model.js'
import Person from '../person/person.model.js'
import Student from '../students/students.model.js'
import Teacher from '../teacher/teacher.model.js'
import mongoose, { Types } from 'mongoose'

const updateCountAsignature = async (asignature, { _id }) => {
    let newCountAsignature = await Student.findOne({ _id: asignature.students })
    newCountAsignature.countAsignatures += 1
    newCountAsignature.asignatures.push(_id)
    await Student.findByIdAndUpdate({ _id: asignature.students }, newCountAsignature, { new: true })
}

export const getAsignaturesByStudent = async (request, response) => { 
    try {
        let { id_student } = request.params//Id de la asignatura
        let studentFinded = await Student.findOne({ _id: id_student })
        if(!studentFinded){
            return response.status(404).send({sucess:false, message: 'Student Id not found' })
        }
        let asignaturedFinded;
        let asignaturedFindedArray=[]
        for(let listAsignature of studentFinded.asignatures){
            asignaturedFinded = await Asignature.findOne({ _id: listAsignature })
            if(!asignaturedFinded){
                return response.status(404).send({sucess:false, message: 'Asignature Id not found' })
            }
            asignaturedFindedArray.push(asignaturedFinded)
        }
        // let isStudentContain = await Asignature.findOne({_id:id_asignature, students: id_student });
        response.send({sucess:true, message: 'This is the asignatures that you are asigned', asignaturedFindedArray })
    } catch (error) {
        response.status(500).send({sucess:false, message: 'General server error', error})
    }
}

export const getAsignaturesByTeacher = async (request, response) => {
    try {
        let { id_teacher } = request.params//Id de la asignatura
        let teacherFinded = await Teacher.findOne({ _id: id_teacher })
        if(!teacherFinded){
            return response.status(404).send({sucess:false, message: 'Teacher Id not found' })
        }
        let asignaturedFinded = await Asignature.find({teacher: id_teacher})
        if(asignaturedFinded.length===0){
            return response.status(404).send({sucess:false, message: 'This teacher is not teaching any asignature' })
        }
        response.send({sucess:true, message: 'This is the asignatures that you are teaching', asignaturedFinded })  
    } catch (error) {
        response.status(500).send({sucess:false, message: 'General server error', error})
    }
}

export const createAsignature = async (request, response) => {
    try {
        let asignature = request.body
        let newAsignature = new Asignature(asignature)
        if (asignature.students) {
            let isStudentValid = await Student.findOne({ _id: asignature.students, role: 'STUDENT_ROLE' })
            let isTeacherValid = await Teacher.findOne({ _id: asignature.teacher, role: 'TEACHER_ROLE' })
            if (!isStudentValid || !isTeacherValid) {
                return response.status(404).send({ message: 'Student or teacher Id is not valid' })
            }
            //Verificamos si el estudiante ya tiene 3 asignaturas
            if (await Student.findOne({ _id: asignature.students, countAsignatures: 3 })) {
                return response.status(400).send({ message: 'Student already has 3 asignatures' })
            }

            await updateCountAsignature(asignature, newAsignature)

            newAsignature.save()
            response.status(200).send({ message: 'This is the asignatures', newAsignature })

        } else {
            newAsignature.save()
            response.status(200).send({ message: 'This is the asignatures', newAsignature })
        }
        // await updateCountAsignature(asignature)

        // newAsignature.save()
        // response.send({ message: 'This is the asignatures', newAsignature })
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
        if (!asignature) {
            return response.status(404).send({ message: 'Asignature Id not found' })
        }

        if (!await Student.findOne({ _id: newStudent.students, role: 'STUDENT_ROLE' })) {
            return response.status(404).send({ message: 'Student Id not found' })
        }

        if (await Student.findOne({ _id: newStudent.students, countAsignatures: 3 })) {
            return response.status(400).send({ message: 'Student already has 3 asignatures' })
        }

        //Verificamos si el estudiante ya esta en la misma asignatura
        let data = new mongoose.Types.ObjectId(`${newStudent.students}`)
        for (let lista of asignature.students) {
            if (lista.equals(data)) {
                return response.status(400).send({ message: 'Student already in this asignature' })
            }
        }

        await updateCountAsignature(newStudent, asignature)



        //Agregamos el estudiante a la asignatura
        asignature.students.push(newStudent.students)
        asignature.save()

        response.status(200).send({ message: 'Student is added to the signature ', newStudent, id_asignature })
    } catch (error) {
        console.error('Error getting asignatures', error)
    }
}

export const deleteStudentFromAsignature = async (request, response) => {
    try {
        let { id_asignature } = request.params//Id de la asignatura
        let {id_student} = request.body 
        let asignaturedFinded = await Asignature.findOne({ _id: id_asignature })
        let studentFinded = await Student.findOne({ _id: id_student })
        if(!asignaturedFinded){
            return response.status(404).send({sucess:false, message: 'Asignature Id not found' })
        }
        if(!studentFinded){
            return response.status(404).send({sucess:false, message: 'Student Id not found' })
        }
        let isStudentContain = await Asignature.findOne({_id:id_asignature, students: id_student });
        if(!isStudentContain){
            return response.status(404).send({sucess:false, message: 'Student is not in this asignature' })
        }

        if(asignaturedFinded.students.length===0){
            return response.status(404).send({sucess:false, message: 'There are no students in this asignature' })
        }

        let data = await Asignature.findByIdAndUpdate(id_asignature, {$pull: { students: id_student }},
        { new: true });
        let {countAsignatures} = await Student.findOne({_id: id_student})
        let data3 = await Student.findByIdAndUpdate(id_student, {$pull: { asignatures: id_asignature },countAsignatures:countAsignatures-1},
        { new: true });


        response.send({sucess:true, message: 'Student deleted from the asignatured succesfully!!!' })
    } catch (error) {
        console.error('Error getting asignatures', error)

    }   
}