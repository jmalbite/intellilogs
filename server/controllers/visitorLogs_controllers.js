import visitorLogsModel from '../models/visitorLogs_model.js';

//business logic for routes

export const getVisitorLogs = async (req, res) => {
  try {
    const visitsLogs = await visitorLogsModel.find();

    res.status(200).json(visitsLogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createVisitorLogs = async (req, res) => {
  const post = req.body;

  const newLog = new visitorLogsModel(post);

  try {
    await newLog.save();

    res.status(201).json(newLog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
