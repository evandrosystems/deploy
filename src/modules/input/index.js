function getInputs() {
    return {
        host: process.env.INPUT_HOST || '',
        user: process.env.INPUT_USER || '',
        port: process.env.INPUT_PORT || '22',
        key: process.env.INPUT_KEY || '',
        data: process.env.INPUT_DATA || '',
        dir: process.env.INPUT_DIR || '',
        commands: process.env.INPUT_COMMANDS || '',
        args: process.env.INPUT_ARGS || '',
        exclude: process.env.INPUT_EXCLUDE || ''
    };
}

module.exports = { getInputs };