import { Router } from "express";
import { addStudentAsignature, createAsignature, updateAsignature } from "./asignatures.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { registerAsignature, validateTeacher } from "../../middlewares/validators.js";

const apiAsignatures = Router()

apiAsignatures.post('/asignatures',validateJwt,validateTeacher,registerAsignature,createAsignature)
apiAsignatures.put('/editAsignature/:id_asignature',updateAsignature)//Id de la asignatura
apiAsignatures.put('/addStudentAsignature/:id_asignature',addStudentAsignature)//Id de la asignatura

export default apiAsignatures