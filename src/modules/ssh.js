const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile, execSync } = require('child_process');

async function addHostInKnownHost(host) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const knownHostsFile = path.join(sshDir, 'known_hosts');

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    try {
        execSync(`ssh-keyscan -H ${host} > ${knownHostsFile}`, { encoding: 'utf8' });
        fs.chmodSync(knownHostsFile, 0o644)
    } catch (error) {
        console.error('Error adding host in known_hosts file', error.message);
    }
}

async function saveKeyToFile(key) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const keyFile = path.join(sshDir, 'id_rsa');

    try {
        if(!fs.existsSync(sshDir)) {
            fs.mkdirSync(sshDir, { recursive: true });
        }

        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, 0o600);

    } catch (error) {
        console.error('Error saving key to file', error.message);
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

        const output = execSync(rsyncCommand, { encoding: 'utf8' });
        console.log(output);
    } catch (error) {
        console.error('Error sending files with rsync', error.message);
        process.exit(1);
    }
}

module.exports = { addHostInKnownHost, saveKeyToFile, sendFilesWithRsync };