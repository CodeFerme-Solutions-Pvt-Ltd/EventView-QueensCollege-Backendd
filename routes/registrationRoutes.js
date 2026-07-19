import express from 'express';
import { createRegistration, getRegistrations } from '../controllers/registrationController.js';

const router = express.Router();

// Route: /api/register
router.route('/')
  .post(createRegistration)
  .get(getRegistrations);

export default router;
