'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = Schema({
	dni: String,
	name: String,
	lastName: String,
	email: String,
	phone: String,
	obraSocial: String,
	birthDate: Date,
})


module.exports = mongoose.model('Patient', PatientSchema)