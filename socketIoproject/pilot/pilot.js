'use strict'
require('dotenv').config();
const port = process.env.PORT;
// let eventspool=require('./events.js');
// require('./manager.js');

// eventspool.on('took off', (payload)=>{

//     console.log(`pilot: the flight took off with ID ${payload.details.flightID} to ${payload.details.destination} has took off`, payload)
// })


// eventspool.on('order to taking off', (payload)=>{
//     setTimeout(()=>{
//         eventspool.emit('took off', payload);
//     },4000);

//     setTimeout(()=>{
//         console.log(`pilot: the flight arrived with ID ${payload.details.flightID} to ${payload.details.destination} has arrived`, payload)
//         eventspool.emit('arrived', payload);
//     },7000);
// })

console.log('i am the pilot');
const io=require('socket.io-client');
let host= `http://localhost:${port}/pilot`;
const pilotConnection=io.connect(host);

let serverHost= `http://localhost:${port}/`;
let serverConnection=io.connect(serverHost);



serverConnection.on('newflight', (payload)=>{
    console.log('pilot took the flight');
    setTimeout(()=>{
        console.log(`pilot: the flight took off with ID ${payload.details.flightID} to ${payload.details.destination} has took off`, payload)
        pilotConnection.emit('took off', payload);
    },4000);

    setTimeout(()=>{
        console.log(`pilot: the flight arrived with ID ${payload.details.flightID} to ${payload.details.destination} has arrived`, payload)
        serverConnection.emit('arrived', payload);
    },8000);
})
