const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');

async function addHostInKnownHost(host) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const knownHostsFile = path.join(sshDir, 'known_hosts');

    if(!fs.existsSync(sshDir)) {
        fs.mkdirSync(sshDir, { recursive: true });
    }

    execFile(`ssh-keyscan`,['-H', host], (err, stdout, stderr) => {
        if (err) {
            console.error('Error adding host to known_hosts file', err.message);
            return;
        }

        if(stdout.trim()) {
            fs.writeFileSync(knownHostsFile, stdout);
            console.log('Host added to known_hosts file');
        } else {
            console.error('Error adding host to known_hosts file', 'No output from ssh-keyscan');
        }
    });
}

async function saveKeyToFile(key) {
    const sshDir = path.join(os.homedir(), '.ssh');
    const keyFile = path.join(sshDir, 'id_rsa');

    try {
        if(!fs.existsSync(sshDir)) {
            fs.mkdirSync(sshDir, { recursive: true });
        }

        fs.writeFileSync(keyFile, key);
        fs.chmodSync(keyFile, '600');

    } catch (error) {
        console.error('Error saving key to file', error.message);
    }

}

module.exports = { addHostInKnownHost, saveKeyToFile };