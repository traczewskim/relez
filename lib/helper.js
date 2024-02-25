const formatTag = (tag) => {
    if (tag !== undefined && tag.charAt(0) !== 'v') {
        tag = 'v' + tag;
    }
    return tag;
};

module.exports = {
    formatTag
}