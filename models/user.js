'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const ROLE_USER = 1, ROLE_EXTRAC = 2, ROLE_LAB = 3, ROLE_ADMIN = 4

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	displayName: String,
	avatar: String,
	password: { type: String },
	role: { type: Number, default: ROLE_USER },
	signupDate: { type: Date, default: Date.now() },
	lastLogin: Date,
	labName: { type: String, default: "" }
})

UserSchema.pre('save', function(next) {
	let user = this
	if(!user.isModified('password')) return next()
		console.log("entra en encriptacion")
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next()

				bcrypt.hash(user.password, salt, null, (err, hash) => {
					if (err) return next(err)

						user.password = hash
					next()
				})
		})
})

UserSchema.methods.gravatar = function () {
	if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

UserSchema.methods.comparePassword = function(candidatePassword, callback) {

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
			return callback(err)
		}else{
			callback(null, isMatch);	
		}
        
    });
};

UserSchema.methods.getRole = function() {
  if(this.role==1) return 'User';
  else if(this.role==2) return 'Moderator';
  else if(this.role>2) return 'Admin';
};


module.exports = mongoose.model('User', UserSchema)