const Location = require('../models/Location');
const Task = require("../models/Task");
const QRCode = require("qrcode");
const PDFKit = require("pdfkit");

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLocation = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newLocation = new Location({ name, description });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const downloadQrPng = async (req, res) => {
  const loc = await Location.findById(req.params.id);
  if (!loc) return res.status(404).end();

  const payload = `${process.env.CLIENT_URL}${loc.qrPayload}`;
  const buffer  = await QRCode.toBuffer(payload, { width: 300 });
  res.type("png");
  res.send(buffer);
};


const downloadQrPdf = async (req, res) => {
  const loc = await Location.findById(req.params.id);
  if (!loc) return res.status(404).end();

  const payload = `${process.env.CLIENT_URL}${loc.qrPayload}`;
  const pngBuf  = await QRCode.toBuffer(payload, { width: 300 });

  res.type("application/pdf");
  const doc = new PDFKit();
  doc.image(pngBuf, { fit: [250,250], align: "center" });
  doc.moveDown().text(loc.name, { align: "center" });
  doc.pipe(res);
  doc.end();
};

module.exports = {
  getLocations,
  createLocation,
  downloadQrPng,
  downloadQrPdf,
};