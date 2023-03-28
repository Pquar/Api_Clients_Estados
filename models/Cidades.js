const mongoose = require('mongoose');

const CidadesSchema = new mongoose.Schema({
    name: String,
    estado: String,
});

module.exports = CidadesSchema;