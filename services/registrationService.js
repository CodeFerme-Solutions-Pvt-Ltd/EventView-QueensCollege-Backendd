import User from '../models/User.js';

/**
 * Check if a user with the given email or mobile number already exists.
 * @param {string} email - The email to check
 * @param {string} mobile - The mobile number to check
 * @returns {Promise<object|null>} The existing user if found, otherwise null.
 */
export const checkUserExistsByEmailOrMobile = async (email, mobile) => {
  return await User.findOne({
    $or: [{ email }, { mobile }]
  });
};

/**
 * Create and save a new user/registration document.
 * @param {object} registrationData - The student data to save
 * @returns {Promise<object>} The saved Mongoose document.
 */
export const saveRegistration = async (registrationData) => {
  const user = new User(registrationData);
  return await user.save();
};

/**
 * Fetch all registrations sorted by creation date descending.
 * @returns {Promise<Array>} List of registration records.
 */
export const fetchAllRegistrations = async () => {
  return await User.find().sort({ createdAt: -1 });
};
