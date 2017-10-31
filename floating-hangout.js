#!/usr/bin/env node

const { execSync } = require("child_process");
const { resolve } = require("path");

const cmd = [
  resolve(__dirname, "node_modules", ".bin", "electron"),
  resolve(__dirname, "main.js"),
  process.argv.slice(2).join(" "),
].join(" ");

execSync(cmd, {stdio: "inherit"});
