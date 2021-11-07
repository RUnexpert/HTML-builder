const fsP = require("fs").promises;
const fs = require("fs");
const path = require("path");
const styles = path.join(__dirname, "styles");
const bandle = path.join(__dirname, "project-dist", "bundle.css");

fs.writeFile(bandle, "", (err) => {
  if (err) throw err;
});

async function combineStyle() {
  const files = await fsP.readdir(styles);

  for (let file of files) {
    const filePath = path.join(__dirname, "styles", file);
    const stat = await fsP.stat(filePath);

    if (!stat.isDirectory()) {
      const ext = path.extname(file);
      if (ext === ".css") {
        fs.readFile(filePath, "utf-8", (err, content) => {
          if (err) throw err;
          fs.appendFile(bandle, content, (err) => {
            if (err) {
              throw err;
            }
          });
        });
      }
    }
  }
}

combineStyle();
