
import { encryptPassword } from '../../utils/encrypt.js'
import Teacher from './teacher.model.js'

export const createTeacher = async(request,response)=>{
    try {
        let teacher = request.body
        teacher.password = await encryptPassword(teacher.password)
        let newTeacher = await Teacher(teacher)
        newTeacher.save()
        return response.status(200).send({success:true,message:'Teacher created',newTeacher})
    } catch (error) {
        console.error('Error creating teacher',error);
        return response.status(500).send('Error creating teacher')
    }
}