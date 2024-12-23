const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./Config/dbConfig");
const cloudinary = require('cloudinary').v2;

const priceRoutes = require("./Price/priceRoutes");
const rechargeRoutes = require("./Reacharge/rechargeRoutes");
const userRoutes = require("./User/UserRoute");

const serverCopyRoutes = require("./ServerCopy/ServerCopyRoute");
const fileUploadRoutes = require("./FileUpload/FileUploadRoute");
const IdPdfRoute = require("./IdPDF/IdPDFRoute");
const NidUserPassRoute = require("./NIDUserPass/NIDUserPassRoute")
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Body parser middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
connectDB()
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174',],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  credentials: true, 
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

//  Home route
app.get("/", (req, res) => {
  res.send("hello Developer");
});

//Price Routes
app.use("/api", priceRoutes);

// Recharge routes
app.use("/api", rechargeRoutes);

// User routes
app.use("/api", userRoutes);

// Server copy routes
app.use("/api", serverCopyRoutes);

// File upload routes
app.use("/api", fileUploadRoutes);

// Id Pdf routes
app.use("/api", IdPdfRoute);

// Nid User Password Set routes
app.use("/api", NidUserPassRoute);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
