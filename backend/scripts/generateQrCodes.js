// scripts/generateQrCodes.js
const mongoose = require("mongoose");
const dotenv  = require("dotenv");
const QRCode  = require("qrcode");
const PDFKit  = require("pdfkit");
const fs      = require("fs");
const path    = require("path");
const Location = require("../models/Location");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function generate() {
  const locs = await Location.find();
  for (let loc of locs) {
    const folder = path.join("uploads","qr");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const pngPath = `${folder}/${loc._id}.png`;
    const pdfPath = `${folder}/${loc._id}.pdf`;
    const url     = `${process.env.CLIENT_URL}/scan/${loc._id}`;

    // Gera PNG
    await QRCode.toFile(pngPath, url, { width: 300 });
    // Gera PDF
    const doc = new PDFKit();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.image(pngPath, { fit: [250,250], align: "center" });
    doc.text(loc.name, { align: "center", margin: 10 });
    doc.end();

    // Atualiza no banco
    loc.qrCodeUrl = `/uploads/qr/${loc._id}.png`;
    loc.qrCodePdf = `/uploads/qr/${loc._id}.pdf`;
    await loc.save();
    console.log(`QR para ${loc.name} gerado.`);
  }
  mongoose.disconnect();
}

generate().catch(err => { console.error(err); mongoose.disconnect(); });