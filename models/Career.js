// models/Career.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: [{
    type: String,
    required: true,
  }],
  requirements: [{
    type: String,
    required: true,
  }],
  benefits: [{
    type: String,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  slug:{
    type: String,
    // required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    default: function() {
      return slugify(this.title, { lower: true, strict: true });
    }

}}, {
  timestamps: true
});



// This will generate the slug automatically before saving the document
// careerSchema.pre('save', function (next) {
//   if (this.isModified('title') || this.isNew) {
//       this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   next();
// });
module.exports = mongoose.model('Career', careerSchema);
