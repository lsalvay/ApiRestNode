'use strict'

// Dependencies
const express = require('express')
const patientCtrl = require('../controllers/patient')
const authCtrl = require('../controllers/auth')
const appointmentCtrl = require('../controllers/appointment')

const auth = require('../middlewares/auth')
const api = express.Router()

//Routes Alumns
api.get('/patients', patientCtrl.getPatients)
api.get('/patient/:patientId', patientCtrl.getPatient)	
api.post('/patient', patientCtrl.savePatient)
api.put('/patient/:patientId', patientCtrl.updatePatient)
api.delete('/patient/:patientId', patientCtrl.deletePatient)

//Routes Appointment
api.get('/appointments', appointmentCtrl.getAppointments)
api.get('/appointment/:appointmentId', appointmentCtrl.getAppointment)	
api.post('/appointment', appointmentCtrl.saveAppointment)
api.put('/appointment/:appointmentId', appointmentCtrl.updateAppointment)
api.delete('/appointment/:appointmentId', appointmentCtrl.deleteAppointment)

//Routes Auth
api.post('/signUp', authCtrl.signUp)
api.post('/signIn', authCtrl.signIn)
api.get('/private', auth.isAuth, patientCtrl.getPatients)

module.exports = api
