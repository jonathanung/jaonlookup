const mongoose = require('mongoose');

//Query Model
const QuerySchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "URL is required!"]
    },
    key: {
        type: String,
    },
    dataset: {
        type: Object,
        required: [true, "dataset is required!"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Query', QuerySchema);