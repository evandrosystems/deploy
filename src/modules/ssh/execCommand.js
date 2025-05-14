const { execSync } = require('child_process');
const logger = require('../../utils/logger');

async function execCommand(host, port, user, commands) {
    if (typeof commands === 'string') {
        commands = commands
            .split('\n')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0);
    }

    const command = [
        `ssh`,
        `-i ~/.ssh/id_rsa`,
        `-p ${port}`,
        `${user}@${host}`,
        `"set -e; ${commands.join(' && ')}"`
    ].join(' ');

    try {
        execSync(command, { encoding: 'utf8' });
        logger.success(`Commands executed in server`);
    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = execCommand;