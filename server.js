const express = require("express");
const fileUpload = require("express-fileupload");
const pdf = require("pdf-parse");

const app = express();
const port = process.env.PORT || 3000;

app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        res.status(400).send("No PDF file uploaded.");
        return;
    }

    const pdfFile = req.files.pdfFile;
    const buffer = pdfFile.data;

    pdf(buffer)
        .then((data) => {
            const text = data.text;
            res.send(text);
        })
        .catch((error) => {
            console.error("Error parsing PDF:", error);
            res.status(500).send("Error parsing PDF.");
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
