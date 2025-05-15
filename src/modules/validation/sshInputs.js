const logger = require("../../utils/logger");

function sshInputs({ host, user, key, data, dir }) {
    let valid = true;

    if (!host) { logger.error('HOST is required.'); valid = false; }
    if (!user) { logger.error('USER is required.'); valid = false; }
    if (!key)  { logger.error('KEY is required.'); valid = false; }
    if (!data) { logger.error('DATA is required.'); valid = false; }
    if (!dir)  { logger.error('DIR is required.'); valid = false; }

    return valid;
}

module.exports = sshInputs;