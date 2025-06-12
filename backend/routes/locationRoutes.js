const express = require('express');
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getLocations, createLocation, downloadQrPdf, downloadQrPng } = require('../controllers/locationController');

const router = express.Router();

router.get("/", protect, getLocations);
router.get("/", protect, adminOnly, createLocation);
router.get("/:id/qrcode.png", protect, adminOnly, downloadQrPng);
router.get("/:id/qrcode.pdf", protect, adminOnly, downloadQrPdf);

module.exports = router;