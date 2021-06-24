const {FileListPlugin} = require("../lib/DemoPlugin");

const path = require('path');
const resolve = (dir) => path.resolve(__dirname,dir);


module.exports = {
  mode:"development",
  entry:resolve("../src/index.js"),
  output:{
    path: resolve("../dist"),
    filename:"[name].bundle.js"
  },
  plugins:[
    new FileListPlugin()
  ]
}