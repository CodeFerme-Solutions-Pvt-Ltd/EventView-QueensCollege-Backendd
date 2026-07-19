import mongoose from 'mongoose';
import * as registrationService from '../services/registrationService.js';

// @desc    Register a new student
// @route   POST /api/register
// @access  Public
export const createRegistration = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection is currently offline. Please configure a valid MONGO_URI in your backend .env file.',
    });
  }

  try {
    const { fullName, email, mobile, collegeName, year, course, dept } = req.body;

    // Check if email or mobile already exists using the service layer
    const existingUser = await registrationService.checkUserExistsByEmailOrMobile(email, mobile);
    if (existingUser) {
      const duplicateField = existingUser.email.toLowerCase() === email.toLowerCase() ? 'email address' : 'mobile number';
      return res.status(400).json({
        success: false,
        message: `A student with this ${duplicateField} has already registered.`,
      });
    }

    // Save registration using the service layer
    const savedRegistration = await registrationService.saveRegistration({
      fullName,
      email,
      mobile,
      collegeName,
      year,
      course,
      dept,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: savedRegistration,
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get all registrations
// @route   GET /api/register
// @access  Public (for dev/demo verification)
export const getRegistrations = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection is currently offline. Please configure a valid MONGO_URI in your backend .env file.',
    });
  }

  try {
    // Fetch registrations using the service layer
    const registrations = await registrationService.fetchAllRegistrations();
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not retrieve registrations.',
    });
  }
};
