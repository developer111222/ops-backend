const mongoose=require('mongoose');


const careerformdataschema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    careerid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    currentSalary: {
        type: String,
        required: true
    },
    expectedSalary: {
        type: String,
        required: true
    },
    noticePeriod: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
},
{timestamps:true}
)

module.exports=mongoose.model('CareerFormData',careerformdataschema);
