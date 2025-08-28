const CareerFormData = require('../models/CareerFormData');


//add career form data
exports.addCareerFormData = async (req, res) => {
    try {
        const {name,email,phone,experience,currentSalary,expectedSalary,noticePeriod,coverLetter,careerid}=req.body;
        const resume=  req.file ? req.file.filename : null;

        console.log(req.body,"req.body",resume)
        const careerFormData = new CareerFormData({name,email,phone,experience,currentSalary,careerid,expectedSalary,noticePeriod,coverLetter,resume});
        await careerFormData.save();
       return res.status(201).json({message:"Career form data added successfully"});
    } catch (error) {
        console.log(error,"error")
        return res.status(500).json({ message: error.message });
    }
};


//get career form data
exports.getCareerFormData = async (req, res) => {
    try {
      const careerFormData = await CareerFormData.find().populate('careerid','title');
      return res.status(200).json({
        success: true,
      careerFormData
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
//get career form data by id
exports.getCareerFormDataById = async (req, res) => {
    try {

console.log(req.params.id,"req.params.id")

        const careerFormData = await CareerFormData.findById(req.params.id);
       return res.status(200).json(careerFormData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//delete career form data
exports.deleteCareerFormData = async (req, res) => {
    try {
        const careerFormData = await CareerFormData.findByIdAndDelete(req.params.id);
       return res.status(200).json(careerFormData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
