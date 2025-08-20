const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Notes = require('../models/note');

// Route 1: Get all notes of a user using GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }).lean(); // ✅ await + lean
        res.json(notes); // ✅ plain JSON-safe object
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new note using POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
      const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, tag } = req.body;
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3:    using Put "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser,[], async (req, res) => {
    const {title, description, tag} = req.body
    const newNote = new Notes()
    if (title){newNote.title = title}
    if (description){newNote.description = description}
    if (tag){newNote.tag = tag}
    let note = await Notes.findById(req.params.id);
    if (!note) {return res.status(404).send("Not Found");}
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: {title, description, tag}}, {new: true})
    res.json({note});
});

// Route 3: using DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if (!note) {return res.status(404).send("Not Found");}
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted"});
});
module.exports = router;