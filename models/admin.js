const mongoose = require('mongoose');

const AdminShema = new mongoose.Schema({
    cuenta:String,
    email:String,
    area:String,
    password:String,
    estado:Boolean
});

mongoose.model('Admin', AdminShema);