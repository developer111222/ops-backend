const ContactForm=require('../models/ContactForm');
const {sendSMS}=require('../utils/smsSender');


exports.createContactForm=async(req,res)=>{
    try {
        const {name,email,phone,location,message}=req.body; 


        if(!name||!email||!phone||!location||!message){
            return res.status(400).json({success:false,message:"Please provide all fields"});
        }
     const {otp,response}=  await sendSMS(phone);

     console.log(otp,response,"otp and response")

        // const contactformdata=new ContactForm({name,email,phone,location,message});


        // await contactformdata.save();
       return res.status(200).json({message:`OTP sent successfully on your phone number ${phone}`});
    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}


//---------------------get contact form data------------------------
exports.getContactFormData=async(req,res)=>{
    try {
        const contactformdata=await ContactForm.find();
        return res.status(200).json({success:true,data:contactformdata});
    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}

//----------delete contact form data----------
exports.deleteContactFormData=async(req,res)=>{
    try {
        const contactformdata=await ContactForm.findByIdAndDelete(req.params.id);
        return res.status(200).json({success:true,data:contactformdata});
    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}


