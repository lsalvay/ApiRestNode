'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppointmentSchema = Schema({
	day: Date,
	hour: String,
	specialty: String,
	obraSocial: String
})


module.exports = mongoose.model('Appointment', AppointmentSchema)