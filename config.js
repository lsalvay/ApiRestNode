module.exports = {
	port: process.env.PORT || 3001,
	db: process.env.MONGODB || 'mongodb://localhost:27017/turnero',
	SECRET_TOKEN: process.env.SECRET_TOKEN || 'miclavetokens'	
}