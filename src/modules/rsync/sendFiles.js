const { execFileSync} = require('child_process');
const logger = require('../../utils/logger');

/**
 * Converts a comma or newline separated string into an array.
 * Ex: "foo, bar\nbaz" -> ["foo", "bar", "baz"]
 */
function parseList(str) {
    return str
        ? str.split(/[\n,]/).map(item => item.trim()).filter(Boolean)
        : [];
}

/**
 * Builds an array of rsync exclude flags from a list.
* */
function buildExcludeFlags(list) {
    return list.map(item => `--exclude=${item}`);
}

async function sendFiles(data, dir, host, port, user, flags, exclude) {
    dir = dir.replace(/[/\\]+$/, '');
    data = data.replace(/[/\\]+$/, '');

    exclude = buildExcludeFlags(parseList(exclude));
    flags = parseList(flags);
    flags = [
        '--exclude=id_rsa',
        ...exclude,
        ...flags
    ];

    const rsyncCommand = [
        ...flags,
        '-e',
        `ssh -i ~/.ssh/id_rsa -p ${port}`,
        `${data}/`,
        `${user}@${host}:${dir}`
    ];

    try {
        execFileSync('rsync', rsyncCommand, { stdio: 'inherit' });
        logger.success(`Files sent to server`);

    } catch (error) {
        logger.error(`${error.message}`);
        throw error;
    }
}

module.exports = sendFiles;