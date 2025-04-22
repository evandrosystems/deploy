const { addHostInKnownHost, saveKeyToFile } = require('./modules/ssh');
const { sendFiles } = require('./modules/rsync');
const logger = require('./utils/logger');

async function run() {

    let host = process.env.INPUT_HOST || '';
    let user = process.env.INPUT_USER || '';
    let port = process.env.INPUT_PORT || '22';
    let key = process.env.INPUT_KEY || '';
    let data = process.env.INPUT_DATA || '';
    let dir = process.env.INPUT_DIR || '';
    let commands = process.env.INPUT_COMMANDS || '';
    let args = process.env.INPUT_ARGS || '';
    let exclude = process.env.INPUT_EXCLUDE || '';


    if (!host || !user || !key || !data || !dir) {

        if (!host) logger.error('HOST is required');
        if (!user) logger.error('USERNAME is required');
        if (!key) logger.error('KEY is required');
        if (!data) logger.error('FILES is required');
        if (!dir) logger.error('PATH is required');

        process.exit(1);
    }

    await addHostInKnownHost(host)
    await saveKeyToFile(key)
    await sendFiles(data, dir, host, port, user, commands, args, exclude)
}

run();
