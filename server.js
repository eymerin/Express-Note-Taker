const PORT = process.env.PORT || 3001;
const fs = require('fs');
const express = require('express');
const path = require('path');
const db = require('./db/db.json');

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
    res.json(db);
});

function addNote(body, notesAll) {
    const newNote = body;
    if (!Array.isArray(notesAll))
    notesAll = [];
    
    if (notesAll.length === 0)
    notesAll.push(0);

    body.id = notesAll[0];
    notesAll[0]++;

    notesAll.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesAll, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = addNote(req.body, allNotes);
    res.json(newNote);
});

function deleteNote(id, notesAll) {
    for (let i = 0; i < notesAll.length; i++) {
        let note = notesAll[i];

        if (note.id == id) {
            notesAll.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesAll, null, 2)
            );

            break;
        }
    }
}

function deleteNote(id, notesAll) {
    for (let i = 0; i < notesAll.length; i++) {
        let note = notesAnotesAllrray[i];

        if (note.id == id) {
            notesAll.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesAll, null, 2)
            );

            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notesAll);
    res.json(true);
});

//App PORT
app.listen(PORT, () =>{
    console.log('App running on port:',PORT);
});