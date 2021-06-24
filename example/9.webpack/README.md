## Webpack

#### plugin development

> The demo code is in plugins directory 
1. create a class

> [plugin hook document address](https://webpack.docschina.org/api/compiler-hooks/)
```js
class DemoPlugin{

  // The key method must exist
  // compiler 
  // specific hook read official document
  apply(compiler){
    // TODO
  }
}
```

1. export class
```js
export.modules = DemoPlugin;
```

3. use plugin in webpack config 
```js
const DemoPlugin = require('path/DemoPlugin')

module.exports = {
  ...
  plugins:[
    new DemoPlugin()
  ]
}
```

4. add package.json scripts 
> test new development plugin must add webpack and webpack-cli
```json
{
  ...
  "scripts":{
    "build": "webpack --config path/webpack.config.js"
  }
}
```