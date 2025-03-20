const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile, execSync } = require('child_process');

async function addHostInKnownHost(host) {
    const sshDir = path.join(os.homedir(), '.ssh');

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    const knownHostsFile = path.join(sshDir, 'known_hosts');

    try {
        execSync(`ssh-keyscan -H ${host} > ${knownHostsFile}`, { encoding: 'utf8' });
        fs.chmodSync(knownHostsFile, 0o644)
    } catch (error) {
        console.error(error.message);
    }
}

async function saveKeyToFile(key) {
    const sshDir = path.join(os.homedir(), '.ssh');

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    const keyFile = path.join(sshDir, 'id_rsa');

    try {
        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, 0o600);

    } catch (error) {
        console.error(error.message);
    }

}

async function sendFilesWithRsync(source, destination, host, port, username, key, commands, args) {
    try {
        const rsyncCommand = [
            'rsync',
            '--exclude=id_rsa',
            '--exclude=node_modules',
            '--exclude=.gitignore',
            '--delete',
            '-avz',
            '-e',
            `ssh -i ~/.ssh/id_rsa`,
            `${source}/`,
            `${username}@${host}:${destination}`
        ].join(' ');

        execSync(rsyncCommand, { encoding: 'utf8' });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = { addHostInKnownHost, saveKeyToFile, sendFilesWithRsync };