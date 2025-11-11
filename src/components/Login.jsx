import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendOTP, verifyOTP } from '../services/emailService';

const Login = ({ isOpen, onClose }) => {
  const { login, isLoading, setIsLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Complete Profile
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    phone: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await sendOTP(formData.email);
      setStep(2);
      setSuccess('OTP sent to your email!');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.otp) {
      setError('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOTP(formData.email, formData.otp);
      
      if (isSignUp) {
        setStep(3); // Move to complete profile for signup
        setSuccess('OTP verified! Please complete your profile.');
      } else {
        // Login successful
        login({
          email: formData.email,
          name: response.name || formData.email.split('@')[0],
          isVerified: true
        });
        setSuccess('Login successful!');
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1000);
      }
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to save user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        company: formData.company,
        isVerified: true
      });
      
      setSuccess('Registration successful!');
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1000);
    } catch (error) {
      setError('Failed to complete registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      otp: '',
      name: '',
      phone: '',
      company: ''
    });
    setStep(1);
    setIsSignUp(false);
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center px-6 pt-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-8 h-1 ${
                      step > stepNumber ? 'bg-pink-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending OTP...' : 'Continue with OTP'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-pink-600 hover:text-pink-700 font-semibold text-sm"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600">
                  We sent a 6-digit OTP to:
                  <br />
                  <strong>{formData.email}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                    placeholder="000000"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="text-pink-600 hover:text-pink-700 font-semibold text-sm"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Complete Profile (Sign Up Only) */}
          {step === 3 && (
            <form onSubmit={handleCompleteProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Enter your company name"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;