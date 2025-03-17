require('dotenv').config();
const { addHostInKnownHost, saveKeyToFile, sendFilesWithRsync } = require('./modules/ssh');

async function run() {

    let host = process.env.HOST || '';
    let username = process.env.SERVERUSER || '';
    let port = process.env.PORT || '';
    let key = process.env.KEY || '';
    let source = process.env.FILES || '';
    let destination = process.env.SERVERPATH || '';
    let commands = process.env.COMMANDS || '';
    let args = process.env.ARGS || '';


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
