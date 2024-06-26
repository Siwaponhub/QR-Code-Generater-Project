import QRCode from "qrcode";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import { join } from "path";

const url = process.argv[2];
const fileName = process.argv[3] || "qrcode.png";
if (!url) {
  console.error("Please provide a URL as a command line argument.");
  process.exit(1);
}

const folderPath = "./image";
if (!existsSync(folderPath)) {
  mkdirSync(folderPath);
}
const filePath = join(folderPath, fileName);

QRCode.toFileStream(createWriteStream(filePath), url, (err) => {
  if (err) {
    console.error("Error generating QR code:", err);
    process.exit(1);
  }
  console.log(`QR code generated and saved as ${filePath}`);
});

//node generate_qr.js "https://www.google.com" "google_qr.png"
