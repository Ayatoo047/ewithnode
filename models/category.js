const mongoose = require('mongoose');

// Define the schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

// Define the model
const Category = mongoose.model('Category', categorySchema);

// Export the model
module.exports = Category;