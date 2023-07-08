'use strict'
require('dotenv').config();
const port = process.env.PORT;
// const port = 3000;
// let eventspool=require('./events.js');
let faker=require('faker');


// eventspool.on('new flight', (payload)=>{
 
//     console.log(`Manager: new flight with ID ${payload.details.flightID} have been scheduled`,payload);
//     eventspool.emit('order to taking off', payload);

// })

// eventspool.on('arrived', (payload)=>{
//     console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.details.pilot}`)
// });



// setInterval(()=>{

//     let flightDetails = {
//         event: 'new-flight',
//         // id: faker.datatype.uuid(),
//         time: faker.date.future(),
//         details: {
//             airLine: 'Royal momo Airlines',
//             flightID: faker.random.alphaNumeric(6),
//             pilot: faker.name.findName(),
//             destination: faker.address.city()
//         },

//     };

//     eventspool.emit('new flight', flightDetails);

// },10000);

console.log('i am the manager');
const io=require('socket.io-client');
let host= `http://localhost:${port}/`;
const managerConnection=io.connect(host);

// managerConnection.emit('hi', 'hello from manager');

managerConnection.on('newflight', (payload)=>{
     
        console.log(`Manager: new flight with ID ${payload.details.flightID} have been scheduled`,payload);
        // managerConnection.emit('order to taking off', payload);
    
});


managerConnection.on('arrived', (payload)=>{
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.details.pilot}`)
})

setInterval(()=>{

    let flightDetails = {
        event: 'new-flight',
        // id: faker.datatype.uuid(),
        time: faker.date.future(),
        details: {
            airLine: 'Royal momo Airlines',
            flightID: faker.random.alphaNumeric(6),
            pilot: faker.name.findName(),
            destination: faker.address.city()
        },

    };

    // console.log('new flight', flightDetails);

    managerConnection.emit('new-flight', flightDetails);

},20000);
