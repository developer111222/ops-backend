const mongoose = require('mongoose');
const slugify = require('slugify'); // If you want to create slugs automatically from titles

const blogSchema = new mongoose.Schema({
    metatitle: {
        type: String,
        // required: true
    },
    metadescription: {
        type: String,
        // required: true
    },
    metakeywords: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images:[ {
        type: String,
        required: true
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',

    }],
    excerpt: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active",
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
      },
  
}, {
    timestamps: true
});

// This will generate the slug automatically before saving the document
blogSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);