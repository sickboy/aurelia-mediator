System.config({
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@1.0.0-beta.1",
    "aurelia-framework": "github:aurelia/framework@1.0.0-beta.1",
    "traceur": "github:jmcriffey/bower-traceur@0.0.92",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.92",
    "github:aurelia/binding@1.0.0-beta.1": {
      "aurelia-metadata": "github:aurelia/metadata@1.0.0-beta.1",
      "aurelia-pal": "github:aurelia/pal@1.0.0-beta.1",
      "aurelia-task-queue": "github:aurelia/task-queue@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "github:aurelia/dependency-injection@1.0.0-beta.1": {
      "aurelia-logging": "github:aurelia/logging@1.0.0-beta.1",
      "aurelia-metadata": "github:aurelia/metadata@1.0.0-beta.1",
      "aurelia-pal": "github:aurelia/pal@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "github:aurelia/framework@1.0.0-beta.1": {
      "aurelia-binding": "github:aurelia/binding@1.0.0-beta.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@1.0.0-beta.1",
      "aurelia-loader": "github:aurelia/loader@1.0.0-beta.1",
      "aurelia-logging": "github:aurelia/logging@1.0.0-beta.1",
      "aurelia-metadata": "github:aurelia/metadata@1.0.0-beta.1",
      "aurelia-pal": "github:aurelia/pal@1.0.0-beta.1",
      "aurelia-path": "github:aurelia/path@1.0.0-beta.1",
      "aurelia-task-queue": "github:aurelia/task-queue@1.0.0-beta.1",
      "aurelia-templating": "github:aurelia/templating@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "github:aurelia/loader@1.0.0-beta.1": {
      "aurelia-metadata": "github:aurelia/metadata@1.0.0-beta.1",
      "aurelia-path": "github:aurelia/path@1.0.0-beta.1"
    },
    "github:aurelia/metadata@1.0.0-beta.1": {
      "aurelia-pal": "github:aurelia/pal@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "github:aurelia/task-queue@1.0.0-beta.1": {
      "aurelia-pal": "github:aurelia/pal@1.0.0-beta.1"
    },
    "github:aurelia/templating@1.0.0-beta.1": {
      "aurelia-binding": "github:aurelia/binding@1.0.0-beta.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@1.0.0-beta.1",
      "aurelia-loader": "github:aurelia/loader@1.0.0-beta.1",
      "aurelia-logging": "github:aurelia/logging@1.0.0-beta.1",
      "aurelia-metadata": "github:aurelia/metadata@1.0.0-beta.1",
      "aurelia-pal": "github:aurelia/pal@1.0.0-beta.1",
      "aurelia-path": "github:aurelia/path@1.0.0-beta.1",
      "aurelia-task-queue": "github:aurelia/task-queue@1.0.0-beta.1",
      "core-js": "npm:core-js@1.2.6"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
