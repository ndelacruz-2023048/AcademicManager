import { Router } from "express";
import { createPerson, getPersonTest } from "./person.controller.js";
import { registerPerson } from "../../middlewares/validators.js";

const apiPerson = Router()

apiPerson.get('/',getPersonTest)
apiPerson.post('/registerPerson',registerPerson,createPerson)
export default apiPerson