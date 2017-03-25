'use strict'

// Dependencies
const express = require('express')
const patientCtrl = require('../controllers/patient')
const userCtrl = require('../controllers/user')
const appointmentCtrl = require('../controllers/appointment')

const auth = require('../middlewares/auth')
const api = express.Router()

//Routes Alumns
api.get('/patients', patientCtrl.getPatients)
api.get('/patient/:patientId', auth.isAuth, patientCtrl.getPatient)	
api.post('/patient', auth.isAuth, patientCtrl.savePatient)
api.put('/patient/:patientId', auth.isAuth, patientCtrl.updatePatient)
api.delete('/patient/:patientId', auth.isAuth, patientCtrl.deletePatient)

//Routes Appointment
api.get('/appointments', appointmentCtrl.getAppointments)
api.get('/appointment/:appointmentId', auth.isAuth, appointmentCtrl.getAppointment)
api.get('/appointmentsByPatient/:patientId', appointmentCtrl.getAppointmentsByPatient)		
api.get('/appointmentsByUser/:userId', appointmentCtrl.getAppointmentsByUser)		
api.post('/appointment', auth.isAuth, appointmentCtrl.saveAppointment)
api.put('/appointment/:appointmentId', auth.isAuth, appointmentCtrl.updateAppointment)
api.delete('/appointment/:appointmentId', auth.isAuth, appointmentCtrl.deleteAppointment)

//Routes User/Auth
api.post('/signUp', userCtrl.signUp)
api.post('/signIn', userCtrl.signIn)
api.get('/users', auth.isAuth, userCtrl.getUsers)

module.exports = api
