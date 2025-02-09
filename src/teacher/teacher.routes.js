import { Router } from "express";
import { createTeacher } from "./teacher.controller.js";
import { registerTeacher } from "../../middlewares/validators.js";

const apiTeacher = Router();

apiTeacher.post("/teacher",registerTeacher,createTeacher)

export default apiTeacher