const { execSync } = require('child_process');

const createBranch = (repo, branch) => {
    execSync(`cd ${repo} && git checkout -b ${branch}`);
};

const cloneRepository = (repo, owner) => {
    execSync(`rm -rf ${repo}`);
    execSync(`git clone git@github.com:${owner}/${repo}`);
};

const switchTo = (repo, target) => {
    execSync(`cd ${repo} && git checkout ${target}`);
};

const pushBranch = (repo, branch) => {
    execSync(`cd ${repo} && git push origin ${branch}`);
};

const mergeBranch = (repo, sourceBranch) => {
    execSync(`cd ${repo} && git merge ${sourceBranch}`);
};

const cleanupRepository = (repo) => {
    execSync(`rm -rf ${repo}`);
};

module.exports = {
    createBranch,
    cloneRepository,
    switchTo,
    pushBranch,
    mergeBranch,
    cleanupRepository
};
