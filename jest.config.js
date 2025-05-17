module.exports = async () => {
    return {
        verbose: true,
        roots: ['<rootDir>/tests'],
        testMatch: ['**/*.test.js'],
        testEnvironment: 'node',
    }
}