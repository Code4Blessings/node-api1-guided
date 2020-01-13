//import express from 'express' //ES2015 syntax

const express = require('express');

const Hubs = require('./data/hubs-model.js')

const server = express();

server.use(express.json())
//routes or endpoints

//GET to "/"

server.get('/', function(request, response) {
    response.send({ hello: 'web25'})
})

//See a list of hubs

server.get('/api/hubs', (request, response) => {
    Hubs.find()
    .then(hubs => {
        console.log('Hubs', hubs)
        response.status(200).json(hubs)
    })
    .catch(error => {
        response.status(500).json({
            errorMessage: 'Sorry we ran into an error getting the list of hubs'
        })
    })
})

//Create a hub

server.post('/api/hubs', (req, res) => {
    const hubData = req.body;
    // never trust the client, validate the data. for now we trust the data for the demo
    Hubs.add(hubData)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: 'Sorry we ran into an error creating the hub'
    })
})
})



const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`))