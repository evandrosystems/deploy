/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 261:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const sendFiles = __nccwpck_require__(424);

module.exports = {
    sendFiles,
};

/***/ }),

/***/ 424:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { execSync } = __nccwpck_require__(317);
const logger = __nccwpck_require__(467);

async function sendFiles(data, dir, host, port, user, commands, args, exclude) {
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

    try {
        execSync(rsyncCommand, { encoding: 'utf8' });
        logger.success(`Files sent to ${user}@${host}:${dir}`);

    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = sendFiles;

/***/ }),

/***/ 691:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);
const os = __nccwpck_require__(857);
const { execSync } = __nccwpck_require__(317);
const logger = __nccwpck_require__(467);

async function addHostInKnownHost(host) {
    const sshDir = path.join(os.homedir(), '.ssh');

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    const knownHostsFile = path.join(sshDir, 'known_hosts');

    try {
        execSync(`ssh-keyscan -H ${host} > ${knownHostsFile}`, { encoding: 'utf8' });
        fs.chmodSync(knownHostsFile, 0o644);
        logger.success(`Host ${host} added to archive know hosts.`);
    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = addHostInKnownHost;


/***/ }),

/***/ 838:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const addHostInKnownHost = __nccwpck_require__(691);
const saveKeyToFile = __nccwpck_require__(937);

module.exports = {
    addHostInKnownHost,
    saveKeyToFile,
};


/***/ }),

/***/ 937:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);
const os = __nccwpck_require__(857);
const logger = __nccwpck_require__(467);

async function saveKeyToFile(key) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const keyFile = path.join(sshDir, 'id_rsa');
    key = key.trim() + '\n';

    try {
        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, 0o600);

        logger.success('Key saved to ~/.ssh/id_rsa');
    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = saveKeyToFile;


/***/ }),

/***/ 467:
/***/ ((module) => {

function success(message) {
    console.log('[SUCCESS]', message);
}

function error(message) {
    console.error('[ERROR]', message);
}

module.exports = {
    success,
    error
};


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
const { addHostInKnownHost, saveKeyToFile } = __nccwpck_require__(838);
const { sendFiles } = __nccwpck_require__(261);
const logger = __nccwpck_require__(467);

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

        if (!host) logger.error('HOST is required');
        if (!user) logger.error('USERNAME is required');
        if (!key) logger.error('KEY is required');
        if (!data) logger.error('FILES is required');
        if (!dir) logger.error('PATH is required');

        process.exit(1);
    }

    await addHostInKnownHost(host)
    await saveKeyToFile(key)
    await sendFiles(data, dir, host, port, user, commands, args, exclude)
}

run();

module.exports = __webpack_exports__;
/******/ })()
;