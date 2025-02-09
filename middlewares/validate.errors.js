import { validationResult } from "express-validator"

export const validateErrorsPerson = (request,response,next)=>{
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).send({
            sucess:false,
            message:'Error with validations',
            errors:errors.errors
    })
}
    next()
}