const {execSync} = require('child_process');
const validator = require("./validator");
const cfg = require("./config");
const utils = require('./utils');

const create = (branchName, target) => {

    validator.validateIfBranchExists(branchName);
    validator.validateIfBranchExists(target);

    const repo = cfg.get('repository');
    const owner = cfg.get('owner');
    const title = utils.ucfirst(branchName);

    try {
        execSync(`rm -rf ${repo}`);
        execSync(`git clone git@github.com:${owner}/${repo}`);
        execSync(`cd ${repo} && git checkout ${branchName}`);

        execSync(`cd ${repo} && gh pr create --repo github.com/${owner}/${repo} -t ${title} -B ${target} -b ""`).toString();

        console.log(`### PR ${branchName} created to ${target}`);
    }
    catch (e) {
        console.error(e.toString());

        execSync(`rm -rf ${repo}`);
    }
};

module.exports = {
    create
};