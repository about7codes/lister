const Note = require('../models/note');

// find note by id
const noteById = async (req, res, next, id) => {
    try {
        const note = await Note.findOne({ _id: id, owner: req.user._id });
        if(!note) return res.status(404).json({ error: 'Note not found.' });

        req.note = note;
        next();
    } catch (error) {
        return res.status(400).json(error);
    }
}

// get all notes
const getNotes = async (req, res) => {
    try {
        await req.user.populate({ path: 'userNotes' });

        res.status(200).json({ notes: req.user.userNotes });
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}

// get note
const getNote = async (req, res) => {
    try {
        const { note } = req;
        res.status(200).json({ note });    
    } catch (error) {
        res.status(400).json(error);
    }
}

// create new note
const createNote = async (req, res) => {
    try{
        const { content } = req.body;
        if(!content){
            res.status(400).json({ error: 'Content is required' });
        }

        const newNote = await Note.create({ content, owner: req.user._id });
        res.status(201).json({ newNote });
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

// update note
const updateNote = async (req, res) => {
    try{
        const { note } = req;
        const { content } = req.body;
        if(!content){
            res.status(400).json({ error: 'Content is required' });
        }
        note.content = content;
        await note.save();

        res.status(201).json({ updatedNote: note });
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

// delete note
const deleteNote = async (req, res) => {
    try{
        const { note } = req;
        if(!note){
            res.status(404).json({ error: 'Note not found...' });
        }

        const deletedNote = await note.remove();
        res.status(201).json({ note: deletedNote });
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = {
    getNote,
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    noteById
}