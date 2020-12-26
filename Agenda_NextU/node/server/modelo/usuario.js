var mongoose = require('mongoose'),
		esquema = mongoose.Schema

var	esquema_usuario = new esquema({
	nombre: {type: String},
	email: {type: String, unique: true, lowercase: true},
	clave: {type: String, required: true, lowercase: true}
})

module.exports = mongoose.model('Usuario', esquema_usuario)