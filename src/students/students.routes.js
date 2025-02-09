import { Router } from "express";
import { createStudent } from "./students.controller.js";
import { registerStudent } from "../../middlewares/validators.js";

const apiStudent = Router();

apiStudent.post("/student",registerStudent,createStudent)

export default apiStudent