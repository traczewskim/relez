const { execSync } = require('child_process');
const cfg = require('../lib/config');
const repo = require('../lib/repo');

const create = (branchName, tag) => {
    if (doesBranchExists(branchName)) {
        console.log('### Branch already exists');
        return;
    }

    const repository = cfg.get('repository');
    const owner = cfg.get('owner');

    try {
        repo.cloneRepository(repository, owner);
        repo.switchTo(repository, tag);
        repo.createBranch(repository, branchName);
        repo.pushBranch(repository, branchName);
        repo.cleanupRepository(repository);
    } catch (e) {
        console.error(e.toString());
    }

    console.log(`### Branch ${branchName} created from tag ${tag}`);
};

const update = (branch, sourceBranch) => {
    if (!doesBranchExists(branch) || !doesBranchExists(sourceBranch)) {
        console.error(`### Branch ${branch} or ${sourceBranch} doesn't exist`);
        process.exit(1);
    }

    const repository = cfg.get('repository');
    const owner = cfg.get('owner');

    try {
        repo.cloneRepository(repository, owner);
        repo.switchTo(repository, branch);
        repo.mergeBranch(repository, sourceBranch);
        repo.pushBranch(repository, branch);
        repo.cleanupRepository(repository);
    } catch (e) {
        console.error(e.toString());
    }

    console.log(`### Branch ${branch} updated with ${sourceBranch}`);
};

const doesBranchExists = (branchName) => {
    const repo = cfg.get('repository');
    const owner = cfg.get('owner');

    try {
        execSync(`gh api repos/${owner}/${repo}/branches/${branchName} --silent`);
        return true;
    } catch (e) {
        return false;
    }
};

const listReleasePrs = () => {
    // list release PRs - not merged
};

module.exports = {
    create,
    update,
    doesBranchExists,
    listReleasePrs
};
