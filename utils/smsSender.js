const fast2sms = require("fast-two-sms");
const dotenv = require("dotenv");
dotenv.config();

const sendSMS = async (phoneNumber) => {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
  
      const options = {
        authorization: process.env.FAST2SMS_API_KEY,
        message: `Hi User, your OTP is ${otp}. It’s valid for 2 minutes.`,
        numbers: [phoneNumber],
        // Optional but useful during debugging:
        showLogs: true,
      };
  
      console.log("Sending SMS with options:", options);
  
      const response = await fast2sms.sendMessage(options);
      console.log("Raw API response:", response);
  
      return { otp, response };
    } catch (error) {
      console.error("Error while sending SMS:", error);
      throw error;
    }
  };
  

  module.exports={sendSMS}