const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

// Directory containing EJS files
const inputDir = path.join(__dirname, "../views");
// Directory for output HTML files
const outputDir = path.join(__dirname, "../output");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading input directory:", err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === ".ejs") {
      const inputFilePath = path.join(inputDir, file);
      const outputFilePath = path.join(outputDir, file.replace(".ejs", ".html"));

      // Render EJS file to HTML
      ejs.renderFile(inputFilePath, {}, (err, str) => {
        if (err) {
          console.error(`Error rendering file ${file}:`, err);
          return;
        }

        // Write the rendered HTML to the output file
        fs.writeFileSync(outputFilePath, str, "utf8");
        console.log(`Converted: ${file} -> ${path.basename(outputFilePath)}`);
      });
    }
  });
});
