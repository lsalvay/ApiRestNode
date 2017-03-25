'use strict'

const Patient = require('../models/patient')

function getPatient (req, res) {
	let patientId = req.params.patientId

	 Patient.findById(patientId, (err, patient) =>{
	 	if(err) return res.status(500).send({message: `Error al realizar petición: ${err}` })
	 	if(!patient) return res.status(404).send({message:'El paciente no existe'})
	 	
	 	res.status(200).send( {patient})	
	 })

}
function getPatients (req, res) {
	Patient.find({}, (err, patients) => {
		if(err) return res.status(500).send({message: `Error al realizar conexión: ${err}` })
		if(!patients) return res.status(404).send({message: 'Ruta no encontrada'})	
		
		res.status(200).send({patients})
	})	
}

function savePatient (req, res) {
	let patient = new Patient()
	patient.dni = req.body.dni
	patient.name = req.body.name
	patient.lastName = req.body.lastName
	patient.email = req.body.email
	patient.phone = req.body.phone

	Patient.findOne({email : patient.email}, 'email', function(err, results) {
        if(err) {
           res.status(500).send({message: 'Paciente ya existente'})
        
        }else{
        		if(results){
        			res.status(500).send({message: 'Paciente ya existente'})
        		}else{
        				patient.save((err, patientStored) =>{
						if(err) res.status(500).send({message: 'Error al salvar en la base de datos' })

						res.status(200).send({patient: patientStored})	
					})
        		}
        }
    })

	
	
}

function updatePatient (req, res) {
	let patientId = req.params.patientId
	let newdata = req.body

	Patient.findByIdAndUpdate(patientId, newdata, (err, patientUpdated) => {
		if(err) res.status(500).send({message: `Error al actualizar el paciente: ${err}`})
		
		res.status(200).send({patient: patientUpdated})			
	})

}

function deletePatient (req, res) {
	let patientId = req.params.patientId

	 Patient.findById(patientId, (err, patient) =>{
	 	if(err) res.status(500).send({message: `Error al borrar el paciente: ${err}` })
	 	
	 	patient.remove((err) =>{
	 		if(err) res.status(500).send({message: `Error al borrar el paciente: ${err}` })
	 	
	 		res.status(200).send( {message: 'Paciente eliminado correctamente'})	
	 	})
	 })
}

module.exports = {
	getPatient,
	getPatients,
	savePatient,
	updatePatient,
	deletePatient

}