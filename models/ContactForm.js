const mongoose = require('mongoose');



const contactformdataschema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    verify:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

module.exports=mongoose.model('ContactForm',contactformdataschema);
