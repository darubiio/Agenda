
const Router = require('express').Router(),
      Usuario = require('../server/modelo/usuario')

  Router.get('/buscar_y_verificar_usuarios', function(req, response) {
    Usuario.find({}, (err, usuarios) => {
      if (err) {
        return response.status(500).send({message: 'Error al intentar obtener los usuarios.'})
      }else{if (usuarios.length <= 0) {
			let newUser1 = new Usuario()
      newUser1.nombre = 'Alejandro Rubio'
      newUser1.email = 'darubio@gmail.com'
      newUser1.clave = '123123'
			newUser1.save((err, usuario1) => {if (err) return response.status(500).send({message: 'Error al intentar insertar el usuario1.'})
			})		
      let newUser2 = new Usuario()
      newUser2.nombre = 'Sandra Elena'
      newUser2.email = 'sandra@gamil.com'
      newUser2.clave = '123123'
      newUser2.save((err, usuario2) => {if (err) return response.status(500).send({message: 'Error al intentar insertar el usuario2.'})
      })	
        }else{
          return res.json(usuarios)
        } 
      } 
    })
  })

module.exports = Router

