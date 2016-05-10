'use strict';

const assert = require('assert');
const hookTypes = require('./hookTypes');

module.exports = function addHookMethods(proto) {
  hookTypes.forEach(function(type) {
    // methodName, methodName1, methodName2, fn
    proto[type] = function addHook() {
      let args = Array.from(arguments);
      let fn = args.splice(args.length - 1, 1)[0];
      assert('function' == typeof fn, `${fn} must be a function`);

      let i = args.length;

      let key = `${type}Actions`;

      if (!this[key]) this[key] = {};

      while (i--) {
        let hookName = args[i];
        if (!this[key][hookName]) {
          this[key][hookName] = [fn];
        } else {
          this[key][hookName].push(fn);
        }
      }
    };
  });
};