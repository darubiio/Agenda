function verificarExistenciaDeUsuarios() {
    $.ajax({
        url: '/usuarios/buscar_y_verificar_usuarios',
        method: 'GET',
        data: {},
        success: function(response) {
            mensaje = "";
            for (var i=0; i<response.length; i++) {
                mensaje += '<small>Usuario: '+response[i].email+' - Clave: '+response[i].clave+'</small><br>'; 
            }
            $('#mensajeUsuarios').html(mensaje);
        }
    })
}

$('.loginButton').on('click', function(event) {
                var nombreUsuario = $('#user');
                var pass = $('#pass');
    if (nombreUsuario.val() != "" && pass.val() != "") {
        $.ajax({
            url: '/usuarios/login',
            method: 'POST',
            data: {
                user: nombreUsuario.val(),
                pass: pass.val()
            },
            success: function(response) {
                mostrarMensaje(response);
                if (response == "OK") {
                    window.location.href = "http://localhost:3000/main.html";
                }
            }
        }) 
        }else {
            alert("Complete todos los campos");
    }
})

$('#logout').on('click', function(event) {
    var url = "/usuarios/logout";
    $.post(url, (response) => {
        window.location.href = "http://localhost:3000/index.html";
    })
})

function mostrarMensaje(msj){
   $('#mensajeSesion').html(msj);
}