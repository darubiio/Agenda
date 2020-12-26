
const Router = require('express').Router(),
       Usuario = require('../server/modelo/usuario')

Router.get('/obtener_usuario', function(req, response) {
    let usuarioID = req.query._id || '';
    Usuario.findById(usuarioID, (err, usuario) => {
      if (err) {
        return response.status(500).send({message: 'Error al intentar obtener el usuario.'})
      }else{
        if (!usuario) {
          return response.status(404).send({message: 'El usuario no existe en la base de datos.'})
        }else{
          response.json(usuario)
        } 
      } 
    })
  })

Router.post('/login', function(req, response) {
    let inEmail = req.body.user,
        inClave = req.body.pass,
        inSesion = req.session
    Usuario.find({email: inEmail}, function (err, usuario_encontradoPorMail) {
      if (err) {
        return response.status(500).send({message: 'Error al intentar obtener el usuario en el inicio de sesión.'})
      }else{
        if(usuario_encontradoPorMail.length == 1){
          Usuario.find({email: inEmail, clave: inClave}, function (err, usuario_encontradoPorMailYClave) {
            if (err) {
              return response.status(500).send({message: 'Error al intentar obtener el usuario en el inicio de sesión.'})
            }else{
              if(usuario_encontradoPorMailYClave.length == 1){ 
                inSesion.usuario = usuario_encontradoPorMailYClave[0]["email"]
                inSesion.id_usuario = usuario_encontradoPorMailYClave[0]["_id"]
                response.send('OK')
              }else{
                response.send("Clave incorrecta")
              }
            }
          })          
        }else{
          response.send("Usuario no registrado")
        }
      }
    });
  })

Router.post('/logout', function(req, response) {
    req.session.destroy(function(err) {
      if (err) {
        return response.status(500).send({message: 'Error al intentar cerrar la sesión.'})
      }else{
        req.session = null
        response.send('logout')
        response.end()
      }
    })
  })  

  Router.all('/', function(req, response) {
    return response.send({message: 'Error al intentar mostrar el recurso solicitado.'}).end()
  })

module.exports = Router