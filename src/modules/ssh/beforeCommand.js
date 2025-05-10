const { execSync } = require('child_process');
const logger = require('../../utils/logger');

async function beforeCommand({host, port, user, beforeCommands}) {
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