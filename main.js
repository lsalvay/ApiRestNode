'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Alumn = require('./models/alumn')

const app = express()
const port = process.env.Port || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/alumns', (req, res) =>{
	Alumn.find({}, (err, alumns) => {
		if(err) return res.status(500).send({message: `Error al realizar conexión: ${err}` })
		if(!alumns) return res.status(404).send({message: 'Ruta no encontrada'})	
		
		res.status(200).send({alumns})
	})	
	
})

app.get('/api/alumn/:alumnId', (req, res) =>{
	 let alumnId = req.params.alumnId

	 Alumn.findById(alumnId, (err, alumn) =>{
	 	if(err) return res.status(500).send({message: `Error al realizar petición: ${err}` })
	 	if(!alumn) return res.status(404).send({message:'El alumno no existe'})
	 	
	 	res.status(200).send( {alumn})	
	 })
})	

app.post('/api/alumn', (req, res) =>{
	console.log('POST /api/alumn')
	console.log(req.body)
	let alumn = new Alumn()
	alumn.name = req.body.name
	alumn.lastName = req.body.lastName
	alumn.email = req.body.email
	alumn.phone = req.body.phone

	alumn.save((err, alumnStored) =>{
		if(err) res.status(500).send({message: 'Error al salvar en la base de datos' })

		res.status(200).send({alumn: alumnStored})	
	})
})

app.put('/api/alumn/:alumnId', (req, res) =>{
	let alumnId = req.params.alumnId
	let newdata = req.body

	Alumn.findByIdAndUpdate(alumnId, newdata, (err, alumnUpdated) => {
		if(err) res.status(500).send({message: `Error al actualizar el alumno: ${err}`})
		
		res.status(200).send({alumn: alumnUpdated})			
	})

})

app.delete('/api/alumn/:alumnId', (req, res) =>{
	let alumnId = req.params.alumnId

	 Alumn.findById(alumnId, (err, alumn) =>{
	 	if(err) res.status(500).send({message: `Error al borrar el alumno: ${err}` })
	 	
	 	alumn.remove((err) =>{
	 		if(err) res.status(500).send({message: `Error al borrar el alumno: ${err}` })
	 	
	 		res.status(200).send( {message: 'Alumno eliminado correctamente'})	
	 	})
	 })
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if(err){
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
		console.log('Conexion establecida')
		app.listen(port, () => {
		console.log(`API REST Corriendo en http://localhost:${port}`)
		})
})


