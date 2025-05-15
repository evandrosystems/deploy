const fs = require('fs');
const path = require('path');
const os = require('os');
const logger = require('../../utils/logger');

async function saveKeyToFile(key, permission) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const keyFile = path.join(sshDir, 'id_rsa');
    key = key.trim() + '\n';

    try {
        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, permission);

        logger.success('Key saved to ~/.ssh/id_rsa');
    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = saveKeyToFile;
