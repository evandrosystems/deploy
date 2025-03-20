const { addHostInKnownHost, saveKeyToFile, sendFilesWithRsync } = require('./modules/ssh');

async function run() {

    let host = process.env.INPUT_HOST || '';
    let username = process.env.INPUT_SERVERUSER || '';
    let port = process.env.INPUT_PORT || '';
    let key = process.env.INPUT_KEY || '';
    let source = process.env.INPUT_FILES || '';
    let destination = process.env.INPUT_SERVERPATH || '';
    let commands = process.env.INPUT_COMMANDS || '';
    let args = process.env.INPUT_ARGS || '';


    if (!host || !username || !port || !key || !source || !destination) {

        if (!host) console.error('HOST is required');
        if (!username) console.error('USERNAME is required');
        if (!port) console.error('PORT is required');
        if (!key) console.error('KEY is required');
        if (!source) console.error('FILES is required');
        if (!destination) console.error('PATH is required');

        process.exit(1);
    }

    await addHostInKnownHost(host)
    await saveKeyToFile(key)
    await sendFilesWithRsync(source, destination, host, port, username, key, commands, args)
}

run();
