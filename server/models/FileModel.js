const mongoose = require('mongoose');

const filedataSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: "users", },
    name:{ type:String, required: true,},
    encpath:{ type:String, required: true,},
    extname:{ type:String, required: true,},
    ipaddress:{ type:String, required: true,},
    type:{ type:String, required: true,},
    size:{ type:String, required: true },
    path:{ type:String, required: true },
    secretkey:{ type:String, required: true },
    keyword:{ type:String, required: true,unique: true },
    isAttacked:{ 
        type: String,
        enum: ['attacked', 'safe', 'corrupted'], // Specify the allowed values
        required: true
    },

    createdAt: { type: Date, default: Date.now }
});

const Filedata =  mongoose.model('original_files', filedataSchema);
module.exports = Filedata;