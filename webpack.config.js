const path = require("path");

module.exports = {
    // ... other webpack configuration ...

    module: {
        rules: [
            {
                test: /\.pdf$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]", // Keep the original file name and extension
                            outputPath: "pdfs/", // Output directory for PDF files
                        },
                    },
                ],
            },
        ],
    },

    // ... other webpack configuration ...
};
