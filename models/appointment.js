'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Patient = require('../models/patient')

const ObjectId = mongoose.Schema.Types.ObjectId;
const AppointmentSchema = Schema({
	day: Date,
	hour: String,
	specialty: String,
	patient  : { type: ObjectId, ref: 'Patient' },
	user  : { type: ObjectId, ref: 'User' } 
})


module.exports = mongoose.model('Appointment', AppointmentSchema)