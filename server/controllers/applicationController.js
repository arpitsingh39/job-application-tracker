const Application = require("../models/Application");

// CREATE APPLICATION
const createApplication = async (req, res) => {
  try {
    const {
      companyName,
      jobPosition,
      location,
      status,
      applicationDate,
      jobUrl,
      notes,
    } = req.body;

    if (!companyName || !jobPosition || !applicationDate) {
      return res.status(400).json({
        message: "Company, position and application date are required",
      });
    }

    const application = await Application.create({
      userId: req.user,
      companyName,
      jobPosition,
      location,
      status,
      applicationDate,
      jobUrl,
      notes,
    });

    res.status(201).json({
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL APPLICATIONS
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user,
    }).sort({
      applicationDate: -1,
    });

    res.json({
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE APPLICATION
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOneAndUpdate(
      {
        _id: id,
        userId: req.user,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// DELETE APPLICATION
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOneAndDelete({
      _id: id,
      userId: req.user,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
};