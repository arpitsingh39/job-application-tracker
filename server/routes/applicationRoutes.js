const express = require("express");

const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createApplication);
router.get("/", protect, getApplications);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);

module.exports = router;