const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: String,
    sexo: String,
    dataNascimento: Date,
    idade: Number,
    cidadeAtual: String,
});

module.exports = ClientSchema;