import visitorLogsModel from '../models/visitorLogs_model.js';

//business logic for routes

export const getVisitorLogs = async (req, res) => {
  try {
    const visitorLogs = await visitorLogsModel.find();

    res.status(200).json(visitorLogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createVisitorLogs = async (req, res) => {
  const post = req.body;

  const visitorLogs = new visitorLogsModel(post);

  try {
    await visitorLogs.save();

    res.status(201).json(visitorLogs);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
