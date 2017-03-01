'use strict'

// Dependencies
const app = require('./app')
const mongoose = require('mongoose')

const config = require('./config')

mongoose.connect(config.db, (err, res) => {
	if(err){
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
		console.log('Conexion establecida')
		app.listen(config.port, () => {
		console.log(`API REST Corriendo en http://localhost:${config.port}`)
		})
})


