const { addHostInKnownHost, saveKeyToFile, sendFilesWithRsync } = require('./modules/ssh');

async function run() {

    let host = process.env.INPUT_HOST || '';
    let user = process.env.INPUT_USER || '';
    let port = process.env.INPUT_PORT || '';
    let key = process.env.INPUT_KEY || '';
    let data = process.env.INPUT_DATA || '';
    let dir = process.env.INPUT_DIR || '';
    let commands = process.env.INPUT_COMMANDS || '';
    let args = process.env.INPUT_ARGS || '';


    if (!host || !user || !port || !key || !data || !dir) {

        if (!host) console.error('HOST is required');
        if (!user) console.error('USERNAME is required');
        if (!port) console.error('PORT is required');
        if (!key) console.error('KEY is required');
        if (!data) console.error('FILES is required');
        if (!dir) console.error('PATH is required');

        process.exit(1);
    }

    await addHostInKnownHost(host)
    await saveKeyToFile(key)
    await sendFilesWithRsync(data, dir, host, port, user, commands, args)
}

run();
