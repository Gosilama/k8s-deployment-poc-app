const cache = require('../cache');

module.exports = {
  getCurrentTree: () => {
    const tree = cache.get('tree');

    if (tree == null) return false;
    const currentId = cache.get('currentId');

    return { tree, currentId };
  },
};
