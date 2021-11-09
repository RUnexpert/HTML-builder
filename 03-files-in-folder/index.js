const path = require("path");
const fs = require("fs");
const dir = path.join(__dirname, "/secret-folder/");

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    fs.stat(dir + file, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        let arr = file.split(".");
        let str =
          arr[0] +
          " - " +
          arr[arr.length - 1] +
          " - " +
          stats.size / 1024 +
          "kb";
        console.log(str);
      }
    });
  }
});
