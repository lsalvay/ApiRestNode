'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.Port || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/products', (req, res) =>{
	res.send(200, {products: []})
	
})

app.get('/api/product/:productId', (req, res) =>{
//comentario modificado remoto

})	

app.post('/api/product', (req, res) =>{
	console.log(req.body)
	res.status(200).send({message: 'El producto se ha recibido'})
})

app.put('/api/product/:productId', (req, res) =>{

})

app.delete('/api/product/:productId', (req, res) =>{
	//comentario desde local
})

mongoose.connection('mongodb')

app.listen(port, () => {
	console.log(`API REST Corriendo en http://localhost:${port}`)
})
