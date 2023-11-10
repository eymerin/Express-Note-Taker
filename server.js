const PORT = process.env.PORT || 3001;
const fs = require('fs');
const express = require('express');
const path = require('path');
var {notesAll} = require('./db/db.json');
const uniqid = require('uniqid');

//create app object
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './develp/public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req,res) =>{
    res.json(notesAll);
});

//Post note
app.post('/api/notes', (req,res) =>{
    const newNote = req.body;
    newNote.id = uniqid();

    notesAll.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notesAll}, null, 2)
    );

    res.json(newNote);
});

//Delete note
app.delete('/api/notes/:id', (req,res) => {
    let id = req.params.id;
    notesAll = notesAll.filter(function(note) { return note.id != id})

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notesAll}, null, 2)
    );

    if(notesAll){
        res.json("Database Found");
    }
    else{
        res.json(404);
    }
});

//App PORT
app.listen(PORT, () =>{
    console.log('App running on port:',PORT);
});