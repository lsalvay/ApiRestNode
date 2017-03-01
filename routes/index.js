'use strict'

// Dependencies
const express = require('express')
const patientCtrl = require('../controllers/patient')
const authCtrl = require('../controllers/auth')
const appointmentCtrl = require('../controllers/appointment')

const auth = require('../middlewares/auth')
const api = express.Router()

//Routes Alumns
api.get('/patients', auth.isAuth, patientCtrl.getPatients)
api.get('/patient/:patientId', auth.isAuth, patientCtrl.getPatient)	
api.post('/patient', auth.isAuth, patientCtrl.savePatient)
api.put('/patient/:patientId', auth.isAuth, patientCtrl.updatePatient)
api.delete('/patient/:patientId', auth.isAuth, patientCtrl.deletePatient)

//Routes Appointment
api.get('/appointments', auth.isAuth, appointmentCtrl.getAppointments)
api.get('/appointment/:appointmentId', auth.isAuth, appointmentCtrl.getAppointment)	
api.post('/appointment', auth.isAuth, appointmentCtrl.saveAppointment)
api.put('/appointment/:appointmentId', auth.isAuth, appointmentCtrl.updateAppointment)
api.delete('/appointment/:appointmentId', auth.isAuth, appointmentCtrl.deleteAppointment)

//Routes Auth
api.post('/signUp', authCtrl.signUp)
api.post('/signIn', authCtrl.signIn)

module.exports = api
