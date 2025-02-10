import { Router } from "express";
import { createStudent, updateStudent } from "./students.controller.js";
import { registerStudent } from "../../middlewares/validators.js";

const apiStudent = Router();

apiStudent.post("/student",registerStudent,createStudent)
apiStudent.put("/updateStudent/:id_student",updateStudent)

export default apiStudent