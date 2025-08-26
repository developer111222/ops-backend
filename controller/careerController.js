const Career = require('../models/Career');

// Add new career
exports.addCareer = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      experience,
      salary,
      postedDate,
      applicationDeadline,
      description,
      responsibilities,
      requirements,
      benefits,
      featured,
      urgent,
      remote
    } = req.body;
    console.log(req.body,"req.body")

    // Validate required fields
    if (!title || !department || !location || !type || !experience || !salary || !postedDate || !applicationDeadline || !description || !responsibilities || !requirements) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['title', 'department', 'location', 'type', 'experience', 'salary', 'postedDate', 'applicationDeadline', 'description', 'responsibilities', 'requirements']
      });
    }

    const career = new Career({
      title,
      department,
      location,
      type,
      experience,
      salary,
      postedDate: new Date(postedDate),
      applicationDeadline: new Date(applicationDeadline),
      description,
      responsibilities,
      requirements,
      benefits: benefits || [],
      featured: featured || false,
      urgent: urgent || false,
      remote: remote || false
    });

    await career.save();
    res.status(201).json({ message: 'Career created successfully', career });
  } catch (error) {
    console.error('Error adding career:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Career with this title already exists' });
    } else {
      res.status(500).json({ message: 'Failed to create career', error: error.message });
    }
  }
};

// Get all careers with filtering and pagination
exports.getAllCareers = async (req, res) => {
  try {
  

    const careers = await Career.find();
return    res.status(200).json(careers);
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ message: 'Failed to fetch careers', error: error.message });
  }
};

// Get career by slug
exports.getCareerByID = async (req, res) => {
  try {
    const { id } = req.params;
  
    const career = await Career.findById(id);

    if (!career) return res.status(404).json({ message: 'Career not found' });

    res.status(200).json(career);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch career' });
  }
};

// Delete career by ID
exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Career.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Career not found' });

    res.status(200).json({ message: 'Career deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete career' });
  }
};

// Update career
exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      department,
      location,
      type,
      experience,
      salary,
      postedDate,
      applicationDeadline,
      description,
      responsibilities,
      requirements,
      benefits,
      featured,
      urgent,
      remote
    } = req.body;

    const updateData = {};
    
    // Only update provided fields
    if (title !== undefined) updateData.title = title;
    if (department !== undefined) updateData.department = department;
    if (location !== undefined) updateData.location = location;
    if (type !== undefined) updateData.type = type;
    if (experience !== undefined) updateData.experience = experience;
    if (salary !== undefined) updateData.salary = salary;
    if (postedDate !== undefined) updateData.postedDate = new Date(postedDate);
    if (applicationDeadline !== undefined) updateData.applicationDeadline = new Date(applicationDeadline);
    if (description !== undefined) updateData.description = description;
    if (responsibilities !== undefined) updateData.responsibilities = responsibilities;
    if (requirements !== undefined) updateData.requirements = requirements;
    if (benefits !== undefined) updateData.benefits = benefits;
    if (featured !== undefined) updateData.featured = featured;
    if (urgent !== undefined) updateData.urgent = urgent;
    if (remote !== undefined) updateData.remote = remote;

    const updated = await Career.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });

    if (!updated) return res.status(404).json({ message: 'Career not found' });

    res.status(200).json({ message: 'Career updated successfully', career: updated });
  } catch (error) {
    console.error('Error updating career:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Career with this title already exists' });
    } else {
      res.status(500).json({ message: 'Failed to update career', error: error.message });
    }
  }
};
