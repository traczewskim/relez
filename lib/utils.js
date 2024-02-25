const {execSync} = require('child_process');
const findCurrentTag = (tags, tag) => {
    // Filter versions matching the pattern
    const filteredVersions = tags.filter(version => version.startsWith(tag));

    if (filteredVersions.length === 0) {
        return null; // Return null if no versions match the pattern
    }

    // Sort versions in descending order
    filteredVersions.sort((a, b) => {
        // Remove the 'v' prefix and split into parts
        const partsA = a.slice(1).split('.').map(num => parseInt(num, 10));
        const partsB = b.slice(1).split('.').map(num => parseInt(num, 10));

        // Compare each part
        for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
            const partA = partsA[i] || 0; // Default to 0 if undefined
            const partB = partsB[i] || 0; // Default to 0 if undefined

            if (partA > partB) return -1; // A is greater
            if (partA < partB) return 1;  // B is greater
        }

        return 0; // Versions are equal
    });

    // Return the highest version
    return filteredVersions[0];
};

const findLatestTag = (tags) => {
    tags.sort();
    tags.reverse();
    return tags[0];
};

const getAllTags = (owner, repo) => {
    const tags = [];
    let res = execSync(`gh release list --repo github.com/${owner}/${repo} --json tagName`)
        .toString()
        .trim();

    let resParsed = JSON.parse(res);
    resParsed.forEach(tag => {
        tags.push(tag.tagName);
    });

    return tags;
};

const findNextTag = (currentTag, type = 'patch') => {
    const validTypes = ['major', 'minor', 'patch'];
    if (!validTypes.includes(type)) {
        console.error('### Error: Invalid release type. Use major, minor, or patch.');
        process.exit(1);
    }

    console.log(currentTag);
    currentTag = currentTag.replace('v', '');
    const [major, minor, patch] = currentTag.split('.').map(Number);

    console.log('### Current Version: ', currentTag);

    // Increment the version number based on the release type
    let newVersion;
    switch (type) {
        case 'major':
            newVersion = `${major + 1}.0.0`;
            break;
        case 'minor':
            newVersion = `${major}.${minor + 1}.0`;
            break;
        case 'patch':
            newVersion = `${major}.${minor}.${patch + 1}`;
            break;
    }

    return `v${newVersion}`;
};

const ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
    findLatestTag,
    findCurrentTag,
    getAllTags,
    findNextTag,
    ucfirst
};