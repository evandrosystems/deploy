const fs = require('fs');
const path = require('path');
const os = require('os');
const logger = require('../../utils/logger');
const validate = require('../validation');

async function saveKeyToFile(key, permission) {
    if(!validate.octalPermission(permission)) {
        throw new Error(
            'Invalid permission! Please provide a valid octal permission for SSH keys, such as 400, 600, or 0600.'
        );
    }

    const sshDir = path.join(os.homedir(), '.ssh');
    const keyFile = path.join(sshDir, 'id_rsa');
    key = key.trim() + '\n';

    try {
        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, parseInt(permission, 8));

        logger.success('Key saved to ~/.ssh/id_rsa');
    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = saveKeyToFile;
