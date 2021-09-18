/* eslint global-require: "off" */
const http = require('http');
const { execSync } = require("child_process");
require('dotenv').config();

const GLitch = (process.env.PROJECT_DOMAIN !== undefined
  && process.env.PROJECT_INVITE_TOKEN !== undefined
  && process.env.API_SERVER_EXTERNAL !== undefined
  && process.env.PROJECT_REMIX_CHAIN !== undefined);
const Replit = (process.env.REPLIT_DB_URL !== undefined);
function initialize(glitch = false, replit = false) {
  if (glitch) {
    console.info('[GLITCH ENVIRONMENT DETECTED] [STARTING WEBSERVER]');
    http.createServer((req, res) => {
      const now = new Date().toLocaleString('en-US');
      res.end(`OK (200) - ${now}`);
    }).listen(3000);
      execSync("npm run build");
      console.info("[INFO] Compiled, starting the bot...");
    return require('./dist');
  } if (replit) {
      console.info('[REPLIT ENVIRONMENT DETECTED] [STARTING WEBSERVER]');
      
    http.createServer((req, res) => {
      const now = new Date().toLocaleString('en-US');
      res.end(`OK (200) - ${now}`);
    }).listen(3000);
      execSync("npm run build");
      console.info("[INFO] Compiled, starting the bot...");
      return require('./dist');
    } else {
      execSync("npm run build");
      console.info("[INFO] Compiled, starting the bot...");
      return require('./dist')
    };
}

initialize(GLitch, Replit);