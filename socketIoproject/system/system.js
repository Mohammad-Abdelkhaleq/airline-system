'use strict'
// require('./manager.js');
// require('./pilot.js');
// let eventspool=require('./events.js');

require('dotenv').config();
const port = process.env.PORT;
// const port = 3000;
console.log('i am in system');
const ioServer = require('socket.io')(port);

const { v4: uuidv4 } = require('uuid');
uuidv4();

let queue = {
    flights: {

    }
}


ioServer.on('connection', (socket) => {
    
    console.log('client connected to socket server', socket.id);
    // socket.on('hi', (payload) => {
    //     console.log('heard', payload);
    // });

    socket.on('new-flight', (payload) => {
        console.log('heard', payload);
        let pilotAwak = false;  
        ioServer.emit('are you ready', payload);
        socket.on('yes i am', (payload) => {
            pilotAwak = true;
        });
        if (pilotAwak === false) {
            console.log('pilot is not ready');
            let id = uuidv4();
            queue.flights[id] = payload;
            console.log('the new queue baby queue', queue);
        }
        


        
        // socket.broadcast.emit('newflight', payload);
        ioServer.emit('newflight', payload);
    });

    socket.on('getall', () => {
        Object.keys(queue.flights).forEach(id => {
            socket.emit('missedFlights', {
                id: id,
                details: queue.flights[id]
            });
        });
    }); 

    socket.on ('arrived', (payload) => {
        socket.broadcast.emit('arrived', payload);
    });

    socket.on('doneWithit', (payload) => {
        delete queue.flights[payload.id];
        console.log('baby queue after delete', queue);
    });


});

const airline=ioServer.of('/pilot');

airline.on('connection', (socket) => {
    console.log('client connected to pilot namespace', socket.id);
    socket.on('took off', (payload) => {
        console.log(`the flight took off with ID ${payload.details.flightID} to ${payload.details.destination} has took off`, payload)
    });
} );