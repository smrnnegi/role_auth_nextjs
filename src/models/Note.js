import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: mongoose.Schema.Types.ObjectId
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);