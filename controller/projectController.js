const Project = require("../models/Project");

exports.addProject = async (req, res) => {
  try {
    const {
      name,
      location,
      type,
      status,
      year,
      units,
      area,
      price,
      description,
      rera,
      video,
      amenities,
      connectivity,
      specifications,
      map,
    } = req.body;

    // Cloudinary images (array)
    const images= req.cloudinaryImages;
    console.log(req.body,"images")

    const newProject = new Project({
      name,
      location,
      type,
      status,
      year,
      units,
      area,
      price,
      description,
      video,
      rera,
      images, // save array of cloudinary urls
      amenities,
      connectivity,
      specifications,
      map,
    });

    await newProject.save();

    res.status(201).json({
      message: "Project added successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Failed to add project" });
  }
};


//`get all projects

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


//get single project
exports.getSingleProject = async (req, res) => {
  try {

    console.log(req.params.slug,"req.params.slug")
    const project = await Project.findById(req.params.slug);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // console.log(project,"project")  
    res.status(200).json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};


//-----------------get project by slug

exports.getSingleProjectBySlug = async (req, res) => {
  try {
    console.log(req.params.slug, "req.params.slug");

    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    // console.error("Error fetching project:", error);
    // res.status(500).json({ message: "Failed to fetch project" });
  }
};


//update project
exports.updateProject = async (req, res) => {
  try {
    const {
      name,
      location,
      type,
      status,
      year,
      units,
      area,
      price,
      description,
      rera,
      video,
      amenities,
      connectivity,
      specifications,
      map,
    } = req.body;

    const newImages = req.cloudinaryImages; // uploaded images (if any)

    // Build update object
    const updateData = {
      name,
      location,
      type,
      status,
      year,
      units,
      area,
      price,
      description,
      rera,
      video,
      amenities,
      connectivity,
      specifications,
      map,
    };

    // ✅ Only replace images if new ones were uploaded
    if (newImages && newImages.length > 0) {
      updateData.images = newImages;
    }

    const project = await Project.findByIdAndUpdate(req.params.slug, updateData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};




//delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
