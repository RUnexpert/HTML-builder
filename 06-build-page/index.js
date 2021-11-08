const fs = require("fs");
const path = require("path");
const templatePath = path.join(__dirname, "template.html");
const componentsPath = path.join(__dirname, "components");
const build = path.join(__dirname, "project-dist");
const template = fs.createReadStream(templatePath, "utf8");
const stylesPath = path.join(__dirname, "styles");
const projectPath = path.join(__dirname, "project-dist", "style.css");

fs.readFile(templatePath, (err) => {
  fs.mkdir(build, { recursive: true }, (err) => {
    if (err) throw err;
  });

  let str;
  let read = [];
  let samples = [];

  let writeTemplate = fs.createWriteStream(path.join(build, "index.html"), {
    withFileTypes: true,
  });

  template.on("data", (chunk) => {
    str = chunk;

    fs.readdir(componentsPath, { withFileTypes: true }, (err, elements) => {
      if (err) throw err;

      for (let element of elements) {
        const readableElement = fs.createReadStream(
          path.join(componentsPath, element.name)
        );
        let sample = path.basename(element.name, path.extname(element.name));
        read.push(readableElement);
        samples.push(sample);
        for (let i = 0; i < read.length; i++) {
          read[i].on("data", (data) => {
            str = str.replace(`{{${samples[i]}}}`, data);
            if (i === read.length - 1) writeTemplate.write(str);
          });
        }
      }
    });
  });
});

fs.mkdir(
  path.join(__dirname, "project-dist", "assets"),
  { recursive: true },
  function (err) {
    if (err) throw err;
  }
);

fs.readdir(stylesPath, { withFileTypes: true }, (err, items) => {
  if (err) throw err;
  const output = fs.createWriteStream(projectPath);

  for (let item of items) {
    let extension = path.parse(item.name).ext;
    if (item.isFile() === true && extension == ".css") {
      const input = fs.createReadStream(
        path.join(stylesPath, item.name),
        "utf-8"
      );
      input.on("data", (chunk) => output.write(chunk));
      input.on("error", (error) => console.log("Error", error.message));
    }
  }
});

function copy(src, dist) {
  fs.readdir(src, { withFileTypes: true }, (err, items) => {
    if (err) throw err;
    for (let item of items) {
      if (item.isDirectory()) {
        const src2 = path.join(src, item.name),
          dist2 = path.join(dist, item.name);
        copy(src2, dist2);
      } else {
        fs.mkdir(dist, { recursive: true }, (err) => {
          if (err) throw err;
        });
        fs.copyFile(
          path.join(src, item.name),
          path.join(dist, item.name),
          function (err) {
            if (err) throw err;
          }
        );
      }
    }
  });
}

copy(path.join(__dirname, "assets"), path.join(build, "assets"), (err) => {
  if (err) throw err;
});
