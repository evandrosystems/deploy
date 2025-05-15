const {
    addHostInKnownHost,
    saveKeyToFile,
    execCommand
} = require('./modules/ssh');
const { sendFiles } = require('./modules/rsync');
const { getInputs } = require('./modules/input');
const validate = require('./modules/validation');
const logger = require('./utils/logger');

async function run() {
    const inputs = getInputs();

    if(!validate.sshInputs(inputs)) {
        logger.error('Validation failed. Please check the inputs.');
        process.exit(1);
    }

    try {
        await addHostInKnownHost(inputs.host);
        await saveKeyToFile(inputs.key, inputs.keyPermission);

        if (inputs.beforeCommands.length > 0) {
            await execCommand(
                inputs.host,
                inputs.port,
                inputs.user,
                inputs.beforeCommands
            );
        }

        await sendFiles(
            inputs.data,
            inputs.dir,
            inputs.host,
            inputs.port,
            inputs.user,
            inputs.commands,
            inputs.args,
            inputs.exclude
        );

        if(inputs.afterCommands.length > 0) {
            await execCommand(
                inputs.host,
                inputs.port,
                inputs.user,
                inputs.afterCommands
            );
        }
    } catch (error) {
        logger.error(`${error.message}`);
        process.exit(1);
    }
}

run().catch(error => {
    logger.error(`${error.message}`);
    process.exit(1);
});
