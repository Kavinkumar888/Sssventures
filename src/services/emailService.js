import emailjs from 'emailjs-com';

// Initialize EmailJS with your credentials
emailjs.init("YOUR_PUBLIC_KEY"); // Get from EmailJS dashboard

const OTP_STORAGE_KEY = 'otp_verification';

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP in localStorage with expiration
const storeOTP = (email, otp) => {
  const otpData = {
    email,
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  };
  localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(otpData));
};

// Verify stored OTP
const verifyStoredOTP = (email, otp) => {
  const stored = localStorage.getItem(OTP_STORAGE_KEY);
  if (!stored) return false;

  const otpData = JSON.parse(stored);
  
  // Check if OTP is expired
  if (Date.now() > otpData.expiresAt) {
    localStorage.removeItem(OTP_STORAGE_KEY);
    return false;
  }

  // Check if email and OTP match
  return otpData.email === email && otpData.otp === otp;
};

// Send OTP via EmailJS
export const sendOTP = async (email) => {
  const otp = generateOTP();
  
  // Store OTP for verification
  storeOTP(email, otp);

  // EmailJS template parameters
  const templateParams = {
    to_email: email,
    otp: otp,
    company_name: "SSS Ventures",
    expiration_time: "10 minutes"
  };

  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',    // EmailJS Service ID
      'YOUR_TEMPLATE_ID',   // EmailJS Template ID
      templateParams
    );

    if (response.status === 200) {
      return { success: true, message: 'OTP sent successfully' };
    } else {
      throw new Error('Failed to send OTP');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to send OTP. Please try again.');
  }
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const isValid = verifyStoredOTP(email, otp);
  
  if (isValid) {
    // Clear OTP after successful verification
    localStorage.removeItem(OTP_STORAGE_KEY);
    return { success: true, message: 'OTP verified successfully' };
  } else {
    throw new Error('Invalid or expired OTP');
  }
};