import express from 'express';

import {
  getVisitorLogs,
  createVisitorLogs,
} from '../controllers/visitorLogs_controllers.js'; //this is from controllers

const router = express.Router();

router.get('/', getVisitorLogs);
router.post('/', createVisitorLogs);

export default router;
