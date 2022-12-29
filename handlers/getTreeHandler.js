// eslint-disable-next-line no-unused-vars
const { getCurrentTree } = require('../helper');

const getTreeHandler = async (req, res) => {
  const currentTree = getCurrentTree();

  if (!currentTree) {
    res.send([]);
  }

  res.send(currentTree.tree);
};

module.exports = getTreeHandler;
