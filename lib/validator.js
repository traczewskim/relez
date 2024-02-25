const branchManager = require('./branchManager');

const validateType = (type) => {
    const validTypes = ['major', 'minor', 'patch'];
    if (!validTypes.includes(type)) {
        console.error('### Error: Invalid release type. Use major, minor, or patch.');
        process.exit(1);
    }
};

const validateIfBranchExists = (branchName) => {
    console.log(`### Validating if branch: ${branchName} exists`);

    if(!branchManager.doesBranchExists(branchName)) {
        console.error('### Branch does not exist:', branchName);
        process.exit(1)
    }

    console.log('### Exists');
};

module.exports = {
    validateType,
    validateIfBranchExists
}