// const Pdf = require('./FileUploadSchema');

// app.post('/upload', upload.single('pdf'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//     try {
//         // ফাইলের তথ্য MongoDB-তে সংরক্ষণ
//         const pdf = new Pdf({
//             fileName: req.file.filename,
//             fileUrl: fileUrl,
//         });
//         await pdf.save();

//         res.status(200).json({ message: 'File uploaded successfully', fileUrl });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to save file details' });
//     }
// });
