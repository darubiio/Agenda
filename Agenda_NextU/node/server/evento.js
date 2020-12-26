
const Router = require('express').Router(),
      Evento = require('../server/modelo/evento')

  Router.get('/obtener_eventos', function(req, response) {
    req.session.reload(function(err) {
      if(err){
        response.send('logout')
        response.end()
      }else{
        sesionDeUsuario = req.session.id_usuario
        Evento.find({id_usuario: sesionDeUsuario}, (err, eventos) => {
          if (err) {
            return response.send("Error al intentar obtener los eventos.")
          }else{
            if (!eventos) {
              return response.send({message: 'No exiten eventos en la base de datos.'})
            }else{
              response.json(eventos)
            } 
          } 
        })
      }
    })
  })

Router.post('/insertar_evento', function(req, response) {
    req.session.reload(function(err) {
      if(err){
        response.send('logout')
        response.end()
      }else{
        let nuevoEvento = new Evento()
        nuevoEvento.id_usuario = req.session.id_usuario
        nuevoEvento.title = req.body.title
        nuevoEvento.start = req.body.start
        nuevoEvento.end = req.body.end
        nuevoEvento.save((err) => {
          if (err && err.code != 11000) {
            return response.send("Error al intentar insertar el evento.")
          }else if (err && err.code == 11000) {
            return response.send("Error al intentar insertar el evento.")
          }else{
            return response.send("Evento Insertado")
          }    
        })
      }
    })
  })

Router.post('/actualizar_evento', function(req, response) {
    req.session.reload(function(err) {
      if(err){
        response.send('logout')
        response.end()
      }else{
        let eventoID = req.query._id;
        Evento.findById(eventoID, (err, evento) => {
          if (err) {
            return response.send("Error al intentar hallar el evento.")
          }else{
            let start = req.body.start,
                end = req.body.end
            Evento.update({_id: eventoID}, {
              start: start,
              end: end
            }, (err) => {
              if (err) {
                return response.send("Error al intentar actualizar el evento.")
              }else{
                //response.send('El evento ha sido actualizado correctamente')      
              }
            })
          } 
        })
      }
    })
  })
 
 Router.post('/eliminar_evento', function(req, res) {
    req.session.reload(function(err) {
      if(err){
        res.send('logout')
        res.end()
      }else{
        let eventoID = req.query._id;
        Evento.findById(eventoID, (err, evento) => {
          if (err) {
            return res.status(500).send({message: 'Error al intentar hallar el evento.'})
          }else{
            evento.remove(err => {
              if (err) {
                return res.status(500).send({message: 'Error al intentar borrar el evento.'})
              }else{
                //res.send('El evento ha sido borrado correctamente')      
              }
            })
          } 
        })
      }
    })
  })

  Router.all('/', function(req, res) {
    return res.send({message: 'Error al intentar mostrar el recurso solicitado.'}).end()
  })


module.exports = Router