const { execSync } = require('child_process');
const logger = require('../../utils/logger');

async function sendFiles(data, dir, host, port, user, commands, args, exclude) {
    dir = dir.replace(/[/\\]+$/, '');
    data = data.replace(/[/\\]+$/, '');

    exclude = exclude
        ? exclude.split(/[\n,]/).map(item => item.trim()).filter(Boolean)
        : [];
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
        execSync(rsyncCommand, { encoding: 'utf8', stdio: 'inherit' });
        logger.success(`Files sent to server`);

    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = sendFiles;