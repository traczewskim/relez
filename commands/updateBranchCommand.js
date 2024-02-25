const config = require('../lib/config').read();
const tagManager = require('../lib/tagManager');
const branchManager = require('../lib/branchManager');
const validator = require('../lib/validator');
const helper = require('../lib/helper');

const updateBranchCommand = (type, { tag }) => {
    // Validate release type
    validator.validateType(type);

    try {
        tag = tag || tagManager.findLatestTag(tagManager.getAllTags(config.owner, config.repository));
        tag = helper.formatTag(tag);

        console.log("### Tag:", tag);

        let newVersion = helper.formatTag(
            tagManager.findNextTag(tag, type)
        );

        console.log('### Release version: ', newVersion);

        branchManager.create(`release/${newVersion}`, tag);
    } catch (error) {
        console.error('### Error:', error.message);
        process.exit(1);
    }
};

module.exports = updateBranchCommand;
