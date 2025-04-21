function success(message) {
    console.log('[SUCCESS]', message);
}

function error(message) {
    console.error('[ERROR]', message);
}

module.exports = {
    success,
    error
};
