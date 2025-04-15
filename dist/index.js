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

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    const knownHostsFile = path.join(sshDir, 'known_hosts');

    try {
        execSync(`ssh-keyscan -H ${host} > ${knownHostsFile}`, { encoding: 'utf8' });
        fs.chmodSync(knownHostsFile, 0o644)
    } catch (error) {
        console.error(error.message);
    }
}

async function saveKeyToFile(key) {
    const sshDir = path.join(os.homedir(), '.ssh');

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    const keyFile = path.join(sshDir, 'id_rsa');
    key = key.trim() + '\n';

    try {
        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, 0o600);

    } catch (error) {
        console.error(error.message);
    }

}

async function sendFilesWithRsync(data, dir, host, port, user, commands, args, exclude) {
    try {
        dir = dir.replace(/[/\\]+$/, '');
        data = data.replace(/[/\\]+$/, '');

        exclude = exclude ? exclude.split(',').map(item => item.trim()) : [];
        exclude = exclude.map(item => `--exclude=${item}`);

        const rsyncCommand = [
            'rsync',
            '-avz',
            '-e',
            `"ssh -i ~/.ssh/id_rsa -p ${port}"`,
            '--exclude=id_rsa',
            ...exclude,
            '--delete',
            `${data}/`,
            `${user}@${host}:${dir}`
        ].join(' ');

        execSync(rsyncCommand, { encoding: 'utf8' });
    } catch (error) {
        console.error(error.message);
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
    let user = process.env.INPUT_USER || '';
    let port = process.env.INPUT_PORT || '22';
    let key = process.env.INPUT_KEY || '';
    let data = process.env.INPUT_DATA || '';
    let dir = process.env.INPUT_DIR || '';
    let commands = process.env.INPUT_COMMANDS || '';
    let args = process.env.INPUT_ARGS || '';
    let exclude = process.env.INPUT_EXCLUDE || '';


    if (!host || !user || !key || !data || !dir) {

        if (!host) console.error('HOST is required');
        if (!user) console.error('USERNAME is required');
        if (!key) console.error('KEY is required');
        if (!data) console.error('FILES is required');
        if (!dir) console.error('PATH is required');

        process.exit(1);
    }

    await addHostInKnownHost(host)
    await saveKeyToFile(key)
    await sendFilesWithRsync(data, dir, host, port, user, commands, args, exclude)
}

run();

module.exports = __webpack_exports__;
/******/ })()
;