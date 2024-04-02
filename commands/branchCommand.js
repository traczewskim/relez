// Import required modules
const { read: readConfig } = require('../lib/config');
const tagManager = require('../lib/tagManager');
const branchManager = require('../lib/branchManager');
const validator = require('../lib/validator');
const helper = require('../lib/helper');
const prManager = require('../lib/prManager');

// Define functions for commands
const createBranchCommand = async (type, { tag }) => {
    try {
        // Validate release type
        validator.validateType(type);

        const config = readConfig();

        // Find latest tag
        tag = tag || tagManager.findLatestTag(tagManager.getAllTags(config.owner, config.repository));
        tag = helper.formatTag(tag);
        console.log("### Tag:", tag);

        // Calculate new version
        let newVersion = helper.formatTag(tagManager.findNextTag(tag, type));
        console.log('### Release version: ', newVersion);

        // Create release branch
        await branchManager.create(`release/${newVersion}`, tag);
    } catch (error) {
        console.error('### Error:', error.message);
        process.exit(1);
    }
};

const createPrCommand = (branch, target = 'master') => {
    console.log(branch, target);
    prManager.create(branch, target);
};

const updateBranchCommand = (branch, sourceBranch) => {
    branchManager.update(branch, sourceBranch);
};

// Export command functions
module.exports = {
    createBranchCommand,
    createPrCommand,
    updateBranchCommand,
};
