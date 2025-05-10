const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const logger = require('../../utils/logger');

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
