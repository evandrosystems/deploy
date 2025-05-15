const logger = require('../../utils/logger');

function validateSshInputs({ host, user, key, data, dir }) {
    let valid = true;

    if (!host) { logger.error('HOST is required.'); valid = false; }
    if (!user) { logger.error('USER is required.'); valid = false; }
    if (!key)  { logger.error('KEY is required.'); valid = false; }
    if (!data) { logger.error('DATA is required.'); valid = false; }
    if (!dir)  { logger.error('DIR is required.'); valid = false; }

    return valid;
}

/**
 * Validate SSH key permission.
 * @param {string} permission - The permission string.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateOctalPermission(permission) {
    const octalRegex = /^[0-7]{3,4}$/;
    return octalRegex.test(permission);
}


module.exports = { validateSshInputs, validateOctalPermission };
