'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Alumn = require('./models/alumn')

const app = express()
const port = process.env.Port || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/products', (req, res) =>{
	res.send(200, {products: []})
	
})

app.get('/api/product/:productId', (req, res) =>{

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

app.put('/api/product/:productId', (req, res) =>{

})

app.delete('/api/product/:productId', (req, res) =>{

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


