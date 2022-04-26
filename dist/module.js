'use strict';

const path = require('path');
const fs = require('fs');
const defu = require('defu');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const defu__default = /*#__PURE__*/_interopDefaultLegacy(defu);

var name = "@nuxtjs/laravel-echo";
var version = "2.0.0-alpha.5";

const DEFAULTS = {
  broadcaster: "null",
  encrypted: false,
  authModule: false,
  connectOnLogin: true,
  disconnectOnLogout: true
};
const nuxtModule = function(moduleOptions) {
  this.nuxt.hook("builder:extendPlugins", (plugins) => {
    const options = defu__default["default"](this.options.echo || {}, moduleOptions, DEFAULTS);
    const runtimeDir = path.resolve(__dirname, "runtime");
    this.options.alias["~echo"] = runtimeDir;
    this.options.build.transpile.push(runtimeDir, "laravel-echo", "defu");
    const optionsPath = this.nuxt.resolver.resolveAlias(options.optionsPath || path.join(this.options.dir.app || "app", "laravel-echo", "options.js"));
    delete options.optionsPath;
    this.addTemplate({
      fileName: `laravel-echo/options.${optionsPath && optionsPath.endsWith("ts") ? "ts" : "js"}`,
      src: fs.existsSync(optionsPath) ? optionsPath : path.resolve(__dirname, "./runtime/options.js"),
      options
    });
    const { dst } = this.addTemplate({
      src: path.resolve(__dirname, "./runtime/plugin.js"),
      fileName: "laravel-echo/plugin.js",
      options
    });
    plugins.push({
      src: path.resolve(this.options.buildDir, dst),
      ssr: false
    });
    if (options.plugins) {
      options.plugins.forEach((p) => plugins.push({ src: p, ssr: false }));
      delete options.plugins;
    }
  });
};
nuxtModule.meta = { name, version };

module.exports = nuxtModule;
