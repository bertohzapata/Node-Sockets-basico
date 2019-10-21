const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


// inicializando
const app = express();
let server = http.createServer(app);


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// iniciando socket io - comunicación del backend
let io = socketIO(server);


io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('disconnect', ()=> {
        console.log('Usuario desconectado');
    });

    //Paso 4 - Escuchar emisiones del cliente
    /* client.on('enviarMensaje', (mensaje)=>{
        console.log(mensaje);
    }); */

    //Paso 6 - Retroalimentación
    /* client.on('enviarMensaje', (mensaje, callback)=>{
        if(mensaje.usuario) {
            callback({
                resp: 'Todo salió bien'
            });
        } else {
            callback({
                resp: 'Todo salió mal!!!'
            });
        }
    }); */

    //Paso 7 - Broadcast (envio a todos los usuarios)
    client.on('enviarMensaje', (data, callback)=>{
        console.log(data);

        client.broadcast.emit('enviarMensaje', data);
    });

    //Paso 5 - Emitir desde el servidor
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



});





server.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

    
});

/* Pasos
    1- Instalación
    2- Configuración
    3- Detectar desconexiones
    4- Emitir desde el cliente (escuchar en el servidor)
    5- Emitir desde el servidor (escuchar en el clinete)
    6- Retroalimentaciòn de emisiones del cliente hacia el servidor
    7- Ordenar código cliente y servidor en archvios independientes
    8- Boadcast (Emitir a todos los usuarios)
*/