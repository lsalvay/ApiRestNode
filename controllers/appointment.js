'use strict'

const Appointment = require('../models/appointment')

function getAppointments (req, res) {
	Appointment.find({}, (err, appointments) => {
		if(err) return res.status(500).send({message: `Error al realizar conexión: ${err}` })
		if(!appointments) return res.status(404).send({message: 'Ruta no encontrada'})	
		
		res.status(200).send({appointments})
	})
}

function getAppointment (req, res) {
	let appointmentId = req.params.appointmentId

	 Appointment.findById(appointmentId, (err, appointment) =>{
	 	if(err) return res.status(500).send({message: `Error al realizar petición: ${err}` })
	 	if(!appointment) return res.status(404).send({message:'El turno no existe'})
	 	
	 	res.status(200).send( {appointment})	
	 })

}

function saveAppointment (req, res) {
	let appointment = new Appointment()
	appointment.day = req.body.day
	appointment.hour = req.body.hour
	appointment.specialty = req.body.specialty
	appointment.obraSocial = req.body.obraSocial

	appointment.save((err) => {
		if (err) res.status(500).send({ message: `Error al crear el turno: ${err}` })
		
		return res.status(200).send({ appointment: appointment })			
	})

}

function updateAppointment (req, res) {
}

function deleteAppointment (req, res) {
}

module.exports = {
	getAppointment,
	getAppointments,
	saveAppointment,
	updateAppointment,
	deleteAppointment

}