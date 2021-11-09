const fs = require("fs").promises;
const path = require("path");
const dir = path.join(__dirname, "files");

async function copyFiles() {
  const directory = "./files-copy";
  fs.rmdir(directory, { recursive: true, force: true }).then(() =>
    console.log("Directory updated")
  );

  await fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true });
  const files = await fs.readdir(dir);

  files.forEach(async (file) => {
    const files = path.join(__dirname, "files", file);
    const copy = path.join(__dirname, "files-copy", file);

    await fs.copyFile(files, copy);
  });
}

copyFiles();
