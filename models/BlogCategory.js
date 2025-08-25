const mongoose=require('mongoose');
const slugify=require('slugify')


const blogcategoryschema=new mongoose.Schema({
 
    categoryname: {
        type: String,
        required: true,
      },
      categorydescription: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
      },
    slug: {
        type: String,
        unique: true, // Ensures the slug is unique
        // Remove 'required' because we generate it automatically in the pre-save hook
        required: false
    },
},{timestamps:true});



blogcategoryschema.pre('save', function (next) {
    if (this.isModified('categoryname') || this.isNew) {
        this.slug = slugify(this.categoryname, { lower: true, strict: true });
    }
    next();
});

module.exports=mongoose.model('BlogCategory',blogcategoryschema);