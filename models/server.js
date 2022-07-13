const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');
const { oracleListener } = require('../events');

class Server {

    constructor() {
        
        this.port   = process.env.PORT || 8080;

        this.app    = express();
        this.events = oracleListener;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();

        // Sockets
        this.sockets();

        // Events Oracle
        this.events();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    sockets() {
        this.io.on('connection', socketController );
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
