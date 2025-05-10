/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 988:
/***/ ((module) => {

function getInputs() {
    return {
        host: process.env.INPUT_HOST || '',
        user: process.env.INPUT_USER || '',
        port: process.env.INPUT_PORT || '22',
        key: process.env.INPUT_KEY || '',
        data: process.env.INPUT_DATA || '',
        dir: process.env.INPUT_DIR || '',
        beforeCommands: process.env['INPUT_BEFORE-COMMANDS'] || '',
        args: process.env.INPUT_ARGS || '',
        exclude: process.env.INPUT_EXCLUDE || ''
    };
}

module.exports = { getInputs };

/***/ }),

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
        logger.success(`Files sent to server`);

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
        execSync(`ssh-keyscan -H ${host} > ${knownHostsFile} 2>/dev/null`, { encoding: 'utf8', stdio: 'ignore' });
        fs.chmodSync(knownHostsFile, 0o644);
        logger.success(`Host added to archive know hosts.`);
    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = addHostInKnownHost;


/***/ }),

/***/ 642:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { execSync } = __nccwpck_require__(317);
const logger = __nccwpck_require__(467);

async function beforeCommand({host, port, user, beforeCommands}) {
    if (typeof beforeCommands === 'string') {
        beforeCommands = beforeCommands
            .split('\n')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0);
    }

    const command = [
        `ssh`,
        `-i ~/.ssh/id_rsa`,
        `-p ${port}`,
        `${user}@${host}`,
        `"set -e; ${beforeCommands.join(' && ')}"`
    ].join(' ');

    try {
        execSync(command, { encoding: 'utf8' });
        logger.success(`Commands executed in server`);
    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = beforeCommand;

/***/ }),

/***/ 838:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const addHostInKnownHost = __nccwpck_require__(691);
const saveKeyToFile = __nccwpck_require__(937);
const beforeCommand = __nccwpck_require__(642);

module.exports = {
    addHostInKnownHost,
    saveKeyToFile,
    beforeCommand
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

/***/ 255:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(467);

function validateSshInputs({ host, user, key, data, dir }) {
    let valid = true;

    if (!host) { logger.error('HOST is required.'); valid = false; }
    if (!user) { logger.error('USER is required.'); valid = false; }
    if (!key)  { logger.error('KEY is required.'); valid = false; }
    if (!data) { logger.error('DATA is required.'); valid = false; }
    if (!dir)  { logger.error('DIR is required.'); valid = false; }

    return valid;
}

module.exports = { validateSshInputs };


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
const { addHostInKnownHost, saveKeyToFile, beforeCommand } = __nccwpck_require__(838);
const { sendFiles } = __nccwpck_require__(261);
const { getInputs } = __nccwpck_require__(988);
const { validateSshInputs } = __nccwpck_require__(255);
const logger = __nccwpck_require__(467);

async function run() {
    const inputs = getInputs();

    if(!validateSshInputs(inputs)) {
        logger.error('Validation failed. Please check the inputs.');
        process.exit(1);
    }

    try {
        await addHostInKnownHost(inputs.host)
        await saveKeyToFile(inputs.key)
        await beforeCommand(inputs)
        await sendFiles(
            inputs.data,
            inputs.dir,
            inputs.host,
            inputs.port,
            inputs.user,
            inputs.commands,
            inputs.args,
            inputs.exclude
        )
    } catch (error) {
        logger.error(`${error.message}`);
        process.exit(1);
    }
}

run().catch(error => {
    logger.error(`${error.message}`);
    process.exit(1);
});

module.exports = __webpack_exports__;
/******/ })()
;