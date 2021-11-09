const fs = require("fs").promises;
const FS = require("fs");
const path = require("path");
const dir = path.join(__dirname, "files");
const copyDir = path.join(__dirname, "files-copy/");

async function copyFiles() {
  FS.readdir(copyDir, (err, files) => {
    files.forEach((file) => {
      FS.unlink(copyDir + file, function (err) {
        if (err) return console.log(err);
      });
    });
  });

  await fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true });
  const files = await fs.readdir(dir);

  files.forEach(async (file) => {
    const files = path.join(__dirname, "files", file);
    const copy = path.join(__dirname, "files-copy", file);

    await fs.copyFile(files, copy);
  });
}

copyFiles();
