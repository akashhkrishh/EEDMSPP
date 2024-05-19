const mongoose = require('mongoose');

const filedataSchema = new mongoose.Schema({
    file: {type: mongoose.Types.ObjectId, ref: "original_files", },
    hackername:{ type:String, required: true,},
    ipaddress:{ type:String, required: true,},
    message:{ type:String, required: true,},
    createdAt: { type: Date, default: Date.now }
});

const Filedata =  mongoose.model('attack_files', filedataSchema);
module.exports = Filedata;