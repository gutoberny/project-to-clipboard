#!/usr/bin/env node

const { myFunction } = require("../src/index");

const args = process.argv.slice(2);
myFunction(args);
