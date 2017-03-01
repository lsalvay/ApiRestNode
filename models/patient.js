'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = Schema({
	name: String,
	lastName: String,
	email: String,
	phone: String
})


module.exports = mongoose.model('Patient', PatientSchema)