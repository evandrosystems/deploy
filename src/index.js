const {
    addHostInKnownHost,
    saveKeyToFile,
    execCommand
} = require('./modules/ssh');
const { sendFiles } = require('./modules/rsync');
const { getInputs } = require('./modules/input');
const { validateSshInputs } = require('./modules/validation');
const logger = require('./utils/logger');

async function run() {
    const inputs = getInputs();

    if(!validateSshInputs(inputs)) {
        logger.error('Validation failed. Please check the inputs.');
        process.exit(1);
    }

    try {
        await addHostInKnownHost(inputs.host)
        await saveKeyToFile(inputs.key)
        await execCommand(inputs)
        await sendFiles(
            inputs.data,
            inputs.dir,
            inputs.host,
            inputs.port,
            inputs.user,
            inputs.commands,
            inputs.args,
            inputs.exclude
        )
    } catch (error) {
        logger.error(`${error.message}`);
        process.exit(1);
    }
}

run().catch(error => {
    logger.error(`${error.message}`);
    process.exit(1);
});
