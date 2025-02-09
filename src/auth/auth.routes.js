import { Router } from "express";
import { login } from "./auth.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const apiAuth = Router()

apiAuth.post('/login',login)
apiAuth.post('/check',validateJwt)

export default apiAuth