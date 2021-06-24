/**
 * official document https://webpack.docschina.org/api/compiler-hooks/
 */

const fs = require("fs");
const path = require("path")

class FileListPlugin{

  // default options
  static defaultOptions = {
    outputFile: 'static.md'
  }

  constructor(options = {}){
    this.options = {...FileListPlugin.defaultOptions,...options}
  }

  apply(compiler){
    const _this = this;
    
    const pluginName = FileListPlugin.name;
    const {webpack} = compiler;
    const {Compilation} = webpack;
    const {RawSource} = webpack.sources;

    compiler.hooks.beforeRun.tap(pluginName,(compiler) => {
      const outputPath = this.options.outputPath || compiler.options.output.path;
      _this.clearOldOutputFile(outputPath)
    })

    compiler.hooks.thisCompilation?.tap(pluginName,(compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name:pluginName,
          stage:Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        (assets) => {
          // the content of output .md file type 
          const content = `# In this build:\n\n${Object.keys(assets).map(filename => `- ${filename}`).join("\n")}`;


          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
          )
        }
      )
    })

  }

  /**
   * clear bale files , avoid junk files
   * @param {string} outputPath output file path 
   * @param {*} compilation compilation hook
   */
  clearOldOutputFile(outputPath){
    // Determine whether the path exists
    if(fs.existsSync(outputPath)){
      // read the files in the directory
      fs.readdirSync(outputPath).forEach((file,index) => {
        // get current file or directory 
        const curPath = path.join(outputPath,file);
        // determine whether the current path is a file or directory
        if(fs.lstatSync(curPath).isDirectory()){
          // Is directory , recursive call
          this.clearOldOutputFile(curPath);
        }else {
          // is a file , use unlinkSync of fs carry out delete
          fs.unlinkSync(curPath)
        }
      })
    }
  }
}


module.exports = {FileListPlugin};