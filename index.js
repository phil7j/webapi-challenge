const express = require('express');

const data = require('./people/data');
const port = process.env.PORT || 8000;

// initialize server/app
const app = express();

// Tell app/server that it will recieve json
app.use(express.json())

// GET All People
app.get('/', (req,res)=>{
    res.status(200).json(data);
})

// Get one person
app.get('/:id', (req,res)=>{
    const id = req.params.id;
    let [currentPerson] = data.filter( person => person.id == id);
    if(currentPerson){
        res.status(200).json(currentPerson);
    } else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})

// GET Chores for a person
app.get('/:id/chores', (req,res)=>{
    const id = req.params.id;
    const completed = req.query.completed

    let [currentPerson] = data.filter( person => person.id == id);

    if(currentPerson){
        if(completed == "true"){
            let completedChores = currentPerson.chores.filter(chore => chore.completed === true)

            res.status(200).json(completedChores)
        } else {
            res.status(200).json(currentPerson.chores)
        }
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})

// POST Chores
app.post('/:id/chores', (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    let [currentPerson] = data.filter( person => person.id == id);
    if(!body.assignedTo) {
        res.status(404).json({message: "You need an assignedTo key!"})
    }
    else if(currentPerson){
        currentPerson.chores.push(body);
        res.status(200).json(currentPerson.chores)
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})

// PUT Chores
app.put('/:id/chores', (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    let [currentPerson] = data.filter( person => person.id == id);
    if(!body.assignedTo && !body.id) {
        res.status(404).json({message: "You need an assignedTo key and an ID!!"})
    }
    else if(currentPerson){
       let newChores = currentPerson.chores.filter(chore => chore.id != body.id);
       console.log("NEW CHORES HERE", newChores);
       console.log("BODY HERE", body);
        currentPerson.chores = [...newChores, body]
        res.status(200).json(currentPerson.chores)
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})

// DELETE Chores
app.delete('/:id/chores/:choreId', (req,res)=>{
    const userId = req.params.id;
    const choreId = req.params.choreId
    let [currentPerson] = data.filter( person => person.id == userId);
    let newChores = currentPerson.chores.filter(chore => chore.id != choreId)
    if(currentPerson){
        currentPerson.chores = [...newChores]
        res.status(200).json(currentPerson.chores)
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})



app.listen(port, ()=> console.log("Server is Running!", data))