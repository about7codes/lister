const express = require('express');
const router = express.Router();

const { getNote, getNotes, createNote, updateNote, deleteNote, noteById } = require('../controllers/note');

router.get('/', getNotes);
router.get('/:noteId', getNote);
router.post('/new', createNote);
router.put('/update/:noteId', updateNote);
router.delete('/delete/:noteId', deleteNote);

router.param('noteId', noteById);

module.exports = router;