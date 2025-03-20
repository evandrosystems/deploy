/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 677:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);
const os = __nccwpck_require__(857);
const { execFile, execSync } = __nccwpck_require__(317);

async function addHostInKnownHost(host) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const knownHostsFile = path.join(sshDir, 'known_hosts');

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    try {
        execSync(`ssh-keyscan -H ${host} > ${knownHostsFile}`, { encoding: 'utf8' });
        fs.chmodSync(knownHostsFile, 0o644)
    } catch (error) {
        console.error('Error adding host in known_hosts file', error.message);
    }
}

async function saveKeyToFile(key) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const keyFile = path.join(sshDir, 'id_rsa');

    try {
        if(!fs.existsSync(sshDir)) {
            fs.mkdirSync(sshDir, { recursive: true });
        }

        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, 0o600);

    } catch (error) {
        console.error('Error saving key to file', error.message);
    }

}

async function sendFilesWithRsync(source, destination, host, port, username, key, commands, args) {
    try {
        const rsyncCommand = [
            'rsync',
            '--exclude=id_rsa',
            '--exclude=node_modules',
            '--exclude=.gitignore',
            '--delete',
            '-avz',
            '-e',
            `ssh -i ~/.ssh/id_rsa`,
            `${source}/`,
            `${username}@${host}:${destination}`
        ].join(' ');

        const output = execSync(rsyncCommand, { encoding: 'utf8' });
        console.log(output);
    } catch (error) {
        console.error('Error sending files with rsync', error.message);
        process.exit(1);
    }
}

module.exports = { addHostInKnownHost, saveKeyToFile, sendFilesWithRsync };

/***/ }),

/***/ 317:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 857:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const { addHostInKnownHost, saveKeyToFile, sendFilesWithRsync } = __nccwpck_require__(677);

async function run() {

    let host = process.env.INPUT_HOST || '';
    let username = process.env.INPUT_SERVERUSER || '';
    let port = process.env.INPUT_PORT || '';
    let key = process.env.INPUT_KEY || '';
    let source = process.env.INPUT_FILES || '';
    let destination = process.env.INPUT_SERVERPATH || '';
    let commands = process.env.INPUT_COMMANDS || '';
    let args = process.env.INPUT_ARGS || '';


    if (!host || !username || !port || !key || !source || !destination) {

        if (!host) console.error('HOST is required');
        if (!username) console.error('USERNAME is required');
        if (!port) console.error('PORT is required');
        if (!key) console.error('KEY is required');
        if (!source) console.error('FILES is required');
        if (!destination) console.error('PATH is required');

        process.exit(1);
    }

    await addHostInKnownHost(host)
    await saveKeyToFile(key)
    await sendFilesWithRsync(source, destination, host, port, username, key, commands, args)
}

run();

module.exports = __webpack_exports__;
/******/ })()
;