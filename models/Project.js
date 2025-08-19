const mongoose = require('mongoose');
const slugify=require('slugify')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    // required: true
  },
  type: {
    type: String,
    enum: ['residential', 'commercial', 'mixed'],
    // required: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'upcoming'],
    // required: true
  },
  year: {
    type: String,
    // required: true
  },
  units: {
    type: Number,
    // required: true
  },
  area: {
    type: String,
    // required: true
  },
  price: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  rera: {
    type: String,
    // required: true
  },
  images:[ {
    type: String,
    
  }],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  slug:{
    type: String,
    // required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    default: function() {
      return slugify(this.name, { lower: true, strict: true });
    }
  },
  video:{
    type: String,
    // required: true
  },
  amenities:[ {
    type: String,
    
  }],
  connectivity:[ {
    type: String,
    
  }],
  specifications:[ {
    type: String,
    
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
