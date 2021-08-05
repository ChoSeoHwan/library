"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@babel/core"),n=require("@rollup/plugin-babel"),r=require("@rollup/plugin-commonjs"),e=require("@rollup/plugin-node-resolve"),u=require("rollup-plugin-cleaner"),o=require("rollup-plugin-terser"),i=require("rollup-plugin-typescript2"),c=require("ttypescript");function p(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var l=p(n),a=p(r),s=p(e),f=p(u),h=p(i),d=p(c),y=function(t,n){return(y=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)};function g(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t}y(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}var b=function(){return(b=Object.assign||function(t){for(var n,r=1,e=arguments.length;r<e;r++)for(var u in n=arguments[r])Object.prototype.hasOwnProperty.call(n,u)&&(t[u]=n[u]);return t}).apply(this,arguments)};function m(t,n){for(var r=0,e=n.length,u=t.length;r<e;r++,u++)t[u]=n[r];return t}var v=function(t){function n(n){var r=this.constructor,e=t.call(this,"Rollup Builder Error: "+n)||this;return e.name="RollupBuilderError",Error.captureStackTrace&&Error.captureStackTrace(e,r),Object.setPrototypeOf(e,r.prototype),e}return g(n,t),n}(Error),j=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return g(n,t),n.undefinedOutputPath=function(){return new this("'dir' and 'file' are not declared. Either one requires a declaration.")},n.redundantOutputPath=function(){return new this("'dir' and 'file' are declared redundant. Only one of the two must be declared.")},n.undefinedName=function(){return new this("Undefined name when using iife or umd formats.")},n}(v),O=function(){function t(t){if(this.option={},!t.dir&&!t.file)throw j.undefinedOutputPath();if(t.dir&&t.file)throw j.redundantOutputPath();if(t.format&&["umd","iife"].includes(t.format)&&!t.name)throw j.undefinedName();this.option=t}return t.prototype.getOption=function(){return this.option},t.prototype.getOutputDir=function(){if(this.option.dir)return this.option.dir;if(!this.option.file)throw j.undefinedOutputPath();var t=this.option.file.split("/");return t.pop(),t.join("/")},t.prototype.getFormat=function(){switch(this.option.format){case"commonjs":return"cjs";case"esm":case"module":return"es";case"systemjs":return"system";default:return this.option.format}},t.prototype.toJson=function(){return{output:this.option}},t}(),w=function(){function t(t){t||(t={}),this.option=t}return t.prototype.getOption=function(){return this.option},t.prototype.buildAMD=function(t){return void 0===t&&(t={}),this.build(b(b({},t),{format:"amd"}))},t.prototype.buildCJS=function(t){return void 0===t&&(t={}),this.build(b(b({},t),{format:"cjs"}))},t.prototype.buildES=function(t){return void 0===t&&(t={}),this.build(b(b({},t),{format:"es"}))},t.prototype.buildIIFE=function(t,n){return void 0===n&&(n={}),this.build(b(b({},n),{name:t,format:"iife"}))},t.prototype.buildUMD=function(t,n){return void 0===n&&(n={}),this.build(b(b({},n),{name:t,format:"umd"}))},t.prototype.buildSystem=function(t){return void 0===t&&(t={}),this.build(b(b({},t),{format:"system"}))},t.prototype.build=function(t){return new O(b(b({},this.option),t))},t}();function P(t){return null!=t&&"object"==typeof t&&!0===t["@@functional/placeholder"]}function x(t){return function n(r){return 0===arguments.length||P(r)?n:t.apply(this,arguments)}}function S(t){return function n(r,e){switch(arguments.length){case 0:return n;case 1:return P(r)?n:x((function(n){return t(r,n)}));default:return P(r)&&P(e)?n:P(r)?x((function(n){return t(n,e)})):P(e)?x((function(n){return t(r,n)})):t(r,e)}}}function E(t,n){switch(t){case 0:return function(){return n.apply(this,arguments)};case 1:return function(t){return n.apply(this,arguments)};case 2:return function(t,r){return n.apply(this,arguments)};case 3:return function(t,r,e){return n.apply(this,arguments)};case 4:return function(t,r,e,u){return n.apply(this,arguments)};case 5:return function(t,r,e,u,o){return n.apply(this,arguments)};case 6:return function(t,r,e,u,o,i){return n.apply(this,arguments)};case 7:return function(t,r,e,u,o,i,c){return n.apply(this,arguments)};case 8:return function(t,r,e,u,o,i,c,p){return n.apply(this,arguments)};case 9:return function(t,r,e,u,o,i,c,p,l){return n.apply(this,arguments)};case 10:return function(t,r,e,u,o,i,c,p,l,a){return n.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function A(t,n,r){return function(){for(var e=[],u=0,o=t,i=0;i<n.length||u<arguments.length;){var c;i<n.length&&(!P(n[i])||u>=arguments.length)?c=n[i]:(c=arguments[u],u+=1),e[i]=c,P(c)||(o-=1),i+=1}return o<=0?r.apply(this,e):E(o,A(t,e,r))}}var D=S((function(t,n){return 1===t?x(n):E(t,A(t,[],n))})),N=Array.isArray||function(t){return null!=t&&t.length>=0&&"[object Array]"===Object.prototype.toString.call(t)};function k(t){return null!=t&&"function"==typeof t["@@transducer/step"]}function _(t,n,r){return function(){if(0===arguments.length)return r();var e=Array.prototype.slice.call(arguments,0),u=e.pop();if(!N(u)){for(var o=0;o<t.length;){if("function"==typeof u[t[o]])return u[t[o]].apply(u,e);o+=1}if(k(u)){var i=n.apply(null,e);return i(u)}}return r.apply(this,arguments)}}var q=function(){return this.xf["@@transducer/init"]()},F=function(t){return this.xf["@@transducer/result"](t)};var I=x((function(t){return!!N(t)||!!t&&("object"==typeof t&&(!function(t){return"[object String]"===Object.prototype.toString.call(t)}(t)&&(1===t.nodeType?!!t.length:0===t.length||t.length>0&&(t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1)))))})),T=function(){function t(t){this.f=t}return t.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},t.prototype["@@transducer/result"]=function(t){return t},t.prototype["@@transducer/step"]=function(t,n){return this.f(t,n)},t}();var J=S((function(t,n){return E(t.length,(function(){return t.apply(n,arguments)}))}));function R(t,n,r){for(var e=r.next();!e.done;){if((n=t["@@transducer/step"](n,e.value))&&n["@@transducer/reduced"]){n=n["@@transducer/value"];break}e=r.next()}return t["@@transducer/result"](n)}function B(t,n,r,e){return t["@@transducer/result"](r[e](J(t["@@transducer/step"],t),n))}var U="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";function M(t,n,r){if("function"==typeof t&&(t=function(t){return new T(t)}(t)),I(r))return function(t,n,r){for(var e=0,u=r.length;e<u;){if((n=t["@@transducer/step"](n,r[e]))&&n["@@transducer/reduced"]){n=n["@@transducer/value"];break}e+=1}return t["@@transducer/result"](n)}(t,n,r);if("function"==typeof r["fantasy-land/reduce"])return B(t,n,r,"fantasy-land/reduce");if(null!=r[U])return R(t,n,r[U]());if("function"==typeof r.next)return R(t,n,r);if("function"==typeof r.reduce)return B(t,n,r,"reduce");throw new TypeError("reduce: list must be array or iterable")}var C=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=q,t.prototype["@@transducer/result"]=F,t.prototype["@@transducer/step"]=function(t,n){return this.xf["@@transducer/step"](t,this.f(n))},t}(),L=S((function(t,n){return new C(t,n)}));function X(t,n){return Object.prototype.hasOwnProperty.call(n,t)}var G=Object.prototype.toString,H=function(){return"[object Arguments]"===G.call(arguments)?function(t){return"[object Arguments]"===G.call(t)}:function(t){return X("callee",t)}}(),W=!{toString:null}.propertyIsEnumerable("toString"),$=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],z=function(){return arguments.propertyIsEnumerable("length")}(),K=function(t,n){for(var r=0;r<t.length;){if(t[r]===n)return!0;r+=1}return!1},Q="function"!=typeof Object.keys||z?x((function(t){if(Object(t)!==t)return[];var n,r,e=[],u=z&&H(t);for(n in t)!X(n,t)||u&&"length"===n||(e[e.length]=n);if(W)for(r=$.length-1;r>=0;)X(n=$[r],t)&&!K(e,n)&&(e[e.length]=n),r-=1;return e})):x((function(t){return Object(t)!==t?[]:Object.keys(t)})),V=S(_(["fantasy-land/map","map"],L,(function(t,n){switch(Object.prototype.toString.call(n)){case"[object Function]":return D(n.length,(function(){return t.call(this,n.apply(this,arguments))}));case"[object Object]":return M((function(r,e){return r[e]=t(n[e]),r}),{},Q(n));default:return function(t,n){for(var r=0,e=n.length,u=Array(e);r<e;)u[r]=t(n[r]),r+=1;return u}(t,n)}}))),Y=S((function(t,n){return"function"==typeof n["fantasy-land/ap"]?n["fantasy-land/ap"](t):"function"==typeof t.ap?t.ap(n):"function"==typeof t?function(r){return t(r)(n(r))}:M((function(t,r){return function(t,n){var r;n=n||[];var e=(t=t||[]).length,u=n.length,o=[];for(r=0;r<e;)o[o.length]=t[r],r+=1;for(r=0;r<u;)o[o.length]=n[r],r+=1;return o}(t,V(r,n))}),[],t)}));var Z=S((function(t,n){var r=D(t,n);return D(t,(function(){return M(Y,V(r,arguments[0]),Array.prototype.slice.call(arguments,1))}))})),tt=x((function(t){return Z(t.length,t)})),nt=S((function(t,n){return t||n})),rt=S((function(t,n){return r=t,"[object Function]"===Object.prototype.toString.call(r)?function(){return t.apply(this,arguments)||n.apply(this,arguments)}:tt(nt)(t,n);var r})),et="object"==typeof global&&global&&global.Object===Object&&global,ut="object"==typeof self&&self&&self.Object===Object&&self,ot=(et||ut||Function("return this")()).Symbol,it=Object.prototype,ct=it.hasOwnProperty,pt=it.toString,lt=ot?ot.toStringTag:void 0;var at=Object.prototype.toString;var st=ot?ot.toStringTag:void 0;function ft(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":st&&st in Object(t)?function(t){var n=ct.call(t,lt),r=t[lt];try{t[lt]=void 0;var e=!0}catch(t){}var u=pt.call(t);return e&&(n?t[lt]=r:delete t[lt]),u}(t):function(t){return at.call(t)}(t)}function ht(t){if(function(t){if(!function(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}(t))return!1;var n=ft(t);return"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n}(t))return t;if("string"==typeof t)return function(n){return t===n};if(t instanceof RegExp)return function(n){return t.test(n)};if(Array.isArray(t))return function(n){return t.some((function(t){return t instanceof RegExp?t.test(n):t===n}))};if(void 0===t)return function(){return!1};throw new Error("rollup-plugin-peer-deps-external: 'external' option must be a function or an array.")}function dt(t){var n=t.map(yt);return function(t){return n.some((function(n){return n.test(t)}))}}var yt=function(t){return new RegExp("^".concat(t,"(\\/.+)*$"))},gt=require("path").resolve;function bt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gt(process.cwd(),"package.json"),n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"peerDependencies";try{var r=require(t);return Object.keys(r[n])}catch(t){return[]}}function mt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.packageJsonPath,r=t.includeDependencies;return{name:"peer-deps-external",options:function(t){return t.external=rt(ht(t.external),dt(bt(n,"peerDependencies").concat(r?bt(n,"dependencies"):[]))),t}}}var vt=function(){function t(t,n){this.inputs={},this.main=t,n&&(this.inputs=n)}return t.prototype.toJson=function(t){return{input:this.inputs[t.getFormat()]||this.main}},t}(),jt=function(){function t(t,n,r){this.name=t,this.creator=n,this.options=r}return t.prototype.getName=function(){return this.name},t.prototype.getOptions=function(){return this.options},t.prototype.setOptions=function(t){this.options=t},t.prototype.toRollupPlugin=function(t){var n="function"==typeof this.options?this.options(t):this.options;return this.creator.apply(this,n)},t}(),Ot=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return g(n,t),n.duplicatedPluginName=function(t){return new this("duplicated plugin name ["+t.sort().join(", ")+"]")},n.undefinedPlugin=function(t){return new this("undefined plugin ["+t+"]")},n}(v),wt=function(){function t(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this.plugins=[],this.pushPlugin.apply(this,t)}return t.prototype.pushPlugin=function(){for(var t,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];this.checkDuplicatedPluginName(m(m([],this.plugins),n)),(t=this.plugins).push.apply(t,n)},t.prototype.unshiftPlugin=function(){for(var t,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];this.checkDuplicatedPluginName(m(m([],n),this.plugins)),(t=this.plugins).unshift.apply(t,n)},t.prototype.appendPlugin=function(t){for(var n,r=[],e=1;e<arguments.length;e++)r[e-1]=arguments[e];var u=this.getPluginIndex(t);this.checkDuplicatedPluginName(m(m([],this.plugins),r)),(n=this.plugins).splice.apply(n,m([u+1,0],r))},t.prototype.removePlugin=function(t){this.plugins.splice(this.getPluginIndex(t),1)},t.prototype.findPlugin=function(t){var n=this.plugins.find((function(n){return n.getName()===t}));if(!n)throw Ot.undefinedPlugin(t);return n},t.prototype.getPlugins=function(){return this.plugins},t.prototype.toJson=function(t){return{plugins:this.plugins.map((function(n){return n.toRollupPlugin(t)}))}},t.prototype.checkDuplicatedPluginName=function(t){var n=t.map((function(t){return t.getName()})),r=n.filter((function(t,r){return n.indexOf(t)!==r}));if(r.length>0)throw Ot.duplicatedPluginName(r)},t.prototype.getPluginIndex=function(t){var n=this.plugins.findIndex((function(n){return n.getName()===t}));if(n<0)throw Ot.undefinedPlugin(t);return n},t}(),Pt=function(){function n(){}return n.buildBasePlugins=function(){var n=new jt("rollup-builder-cleaner",f.default,(function(t){return[{targets:[t.getOutputDir()]}]})),r=new jt("rollup-plugin-peer-deps-external",mt,[]),e=new jt("@rollup/plugin-node-resolve",s.default,[{browser:!0}]),u=new jt("@rollup/plugin-commonjs",a.default,[{extensions:[".js",".ts"],include:["node_modules/**"]}]),i=new jt("rollup-plugin-typescript2",h.default,(function(t){return[{typescript:d.default,tsconfigDefaults:{compilerOptions:{outDir:t.getOutputDir(),plugins:[{transform:"typescript-transform-paths",afterDeclarations:!0}]}}}]})),c=new jt("@rollup/plugin-babel",l.default,[{extensions:m(m([],t.DEFAULT_EXTENSIONS),[".ts",".tsx"]),babelHelpers:"runtime",plugins:["@babel/plugin-transform-runtime","@babel/plugin-transform-arrow-functions"]}]),p=new jt("rollup-plugin-terser",o.terser,[]);return new wt(n,r,i,c,e,u,p)},n}();exports.Input=vt,exports.Output=O,exports.OutputBuilder=w,exports.Plugin=jt,exports.Plugins=wt,exports.PluginsBuilder=Pt,exports.default=function(t,n,r){Array.isArray(n)||(n=[n]);var e=[];return n.forEach((function(n){var u=t.toJson(n),o=r?r.toJson(n):[];e.push(b(b(b({},u),n.toJson()),o))})),1===e.length?e[0]:e};
