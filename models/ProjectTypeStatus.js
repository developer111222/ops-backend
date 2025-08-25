import mongoose from "mongoose";

const projectTypeStatusSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
       
        required: true
    }
});

module.exports = mongoose.model('ProjectTypeStatus', projectTypeStatusSchema);
