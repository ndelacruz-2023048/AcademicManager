import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import {config} from 'dotenv'

config()
connect()
initServer()