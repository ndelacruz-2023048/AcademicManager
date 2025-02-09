import express from "express"
import cors from 'cors'
import morgan from "morgan"
import helmet from "helmet"

import routesPerson from '../src/person/person.routes.js'
import routesAuth from '../src/auth/auth.routes.js'
import routesAsignatures from '../src/asignatures/asignatures.routes.js'
import routesStudent from '../src/students/students.routes.js'
import routesTeacher from '../src/teacher/teacher.routes.js'

const config =(app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes= (app)=>{
    app.use(routesPerson)
    app.use(routesAuth)
    app.use(routesAsignatures)
    app.use(routesStudent)
    app.use(routesTeacher)
}

export const initServer=()=>{
    const app = express()
    try {
        config(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (error) {
        console.error('Server init failed',error);
        
    }
}