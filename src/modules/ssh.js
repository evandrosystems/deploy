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
        if (err || stderr) {
            console.error('Error adding host to known_hosts file', err || stderr);
            process.exit(1);
        }

        fs.appendFileSync(knownHostsFile, stdout);
        console.log('Host added to known_hosts file');
    });

}