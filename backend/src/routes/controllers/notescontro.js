import Note from "../../models/Note.js";

// GET all notes
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in finding notes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// GET a single note by ID
export async function getNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in finding note:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// CREATE a new note
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in creating note:", error);
        res.status(500).json({ message: "Failed to create note" });
    }
};

// UPDATE a note by ID
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updating note:", error);
        res.status(500).json({ message: "Failed to update note" });
    }
};

// DELETE a note by ID
export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully", deletedNote });
    } catch (error) {
        console.error("Error in deleting note:", error);
        res.status(500).json({ message: "Failed to delete note" });
    }
};
