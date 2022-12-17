const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
let fetchuser = require("../Middleware/fetchuser");
const { body, validationResult } = require("express-validator");


//getUser

router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("error occured");
  }
});

//Adding Notes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter Valid title ").isLength({ min: 1 }),
    body("description", "minimum length of 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
    }
  }
);

//Deleting Note
router.delete(
  "/deletenotes/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      //Find note to delete before deleting

      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send({"error":"milega nahi"});
      }

      //Authenticating user to delete note

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ Success: "Deleted the Note", note: note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
    }
  }
);

module.exports = router;
