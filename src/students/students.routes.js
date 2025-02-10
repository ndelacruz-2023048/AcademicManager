import { Router } from "express";
import { createStudent, updateStudent } from "./students.controller.js";
import { registerStudent } from "../../middlewares/validators.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const apiStudent = Router();

apiStudent.post("/student",registerStudent,createStudent)
apiStudent.put("/updateStudent/:id_student",validateJwt, updateStudent)

export default apiStudent