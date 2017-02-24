'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlumnSchema = Schema({
	name: String,
	lastName: String,
	email: String,
	phone: String
})
