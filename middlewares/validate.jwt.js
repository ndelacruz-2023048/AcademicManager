import jwt from 'jsonwebtoken'

export const validateJwt = (request,response,next)=>{
    try {
        let secretKey = process.env.SECRET_KEY
        let {authorization} = request.headers
        if(!authorization){
            return response.status(401).send({message:'Provide a token to access to this resource'})
        }
        let userCredentials = jwt.verify(authorization,secretKey)
        request.user = userCredentials
        next()
    } catch (error) {
        console.log(error)
        return 
    }
}