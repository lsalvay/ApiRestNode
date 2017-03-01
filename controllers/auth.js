'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password,
		avatar: "",
		lastLogin: null
	})
	let gravatar = user.gravatar()
	console.log(gravatar)
	user.avatar= gravatar

	user.save((err) => {
		if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })
		
		return res.status(200).send({ token: service.createToken(user) })			
	})
}

function signIn (req, res) {
	 //find the user
	 User.findOne({
	 email: req.body.email
	 }, function(err, user) {

	if (err) throw err;

	if (!user) {
	 res.json({ success: false, message: 'Usuario o contraseña incorrecto' })
	 } else if (user) {

		// check if password matches
	 	user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) res.status(500).send({ message: `Error en signIn: ${err}` })
           
            if (!isMatch){ 
            	res.status(500).send({ message: 'Usuario o contraseña incorrecto' })
			}else{
        		return res.status(200).send({ token: service.createToken(user) })			
        		}
       });
	  
	 }
	 });

}

function getUsers (req, res) {
	User.find({}, (err, users) => {
		if(err) return res.status(500).send({message: `Error al realizar conexión: ${err}` })
		if(!users) return res.status(404).send({message: 'Ruta no encontrada'})	
		
		res.status(200).send({users})
	})	
}


module.exports = {
	signUp,
	signIn,
	getUsers
}