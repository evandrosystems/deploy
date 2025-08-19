function getInputs() {
    return {
        host: process.env.INPUT_HOST || '',
        user: process.env.INPUT_USER || '',
        port: process.env.INPUT_PORT || '22',
        key: process.env.INPUT_KEY || '',
        keyPermission: process.env['INPUT_KEY-PERMISSION'] || '0600',
        data: process.env.INPUT_DATA || '',
        dir: process.env.INPUT_DIR || '',
        beforeCommands: process.env['INPUT_BEFORE-COMMANDS'] || '',
        afterCommands: process.env['INPUT_AFTER-COMMANDS'] || '',
        flags: process.env.INPUT_FLAGS || '',
        exclude: process.env.INPUT_EXCLUDE || ''
    };
}

module.exports = { getInputs };