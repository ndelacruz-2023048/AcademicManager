import { model, Schema } from "mongoose";

export const asignatureSchema = Schema({
    asignatureName:{
        type:String,
        required:[true, 'Asignature name is required']
    },
    description:{
        type:String,
        required:[true, 'Description is required']
    },
    category:{
        type:String,
        required:[true, 'Category is required'],
        enum:['Ciencias Exactas','Ciencias Sociales','Idiomas','Arte','Deportes','Area Tecnica','Educacion Fisica','Lengua y Literatura']
    },
    teacher:{
        type:Schema.Types.ObjectId,
        ref:'Person',
        required:[true, 'Teacher is required']
    },
    students:[{
        type:Schema.Types.ObjectId,
        ref:'Person',
    }],

})

export default model('Asignature',asignatureSchema)