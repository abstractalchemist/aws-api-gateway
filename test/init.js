const { JSDOM } = require('jsdom')
var jsdom = new JSDOM('', {
   url:'http://example.com'
});

function copyProps(src, target) {
   const props = Object.getOwnPropertyNames(src)
      .filter(prop => typeof target[prop] === 'undefined')
      .reduce((result, prop) => ({
         ...result,
         [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }), {});
   Object.defineProperties(target, props);
}

global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = {
   userAgent: 'node.js',
};
copyProps(window, global);

