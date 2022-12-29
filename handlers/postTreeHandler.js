const cache = require('../cache');
const { getCurrentTree } = require('../helper');

const insertTreeNode = ({
  parent, label, tree, currentId,
}) => {
  for (let i = 0; i < tree.length; i += 1) {
    if (tree[i][parent] != null) {
      const id = parseInt(currentId, 10) + 1;
      const node = { [id]: { label, children: [] } };
      tree[i][parent].children.push(node);
      cache.set('currentId', id, 0);
      return;
    }

    const key = Object.keys(tree[i])[0];

    const { children } = tree[i][key];

    insertTreeNode({
      parent, label, tree: children, currentId,
    });
  }
};

const postTreeHandler = async (req, res) => {
  const { parent, label } = req.body;

  const currentTree = getCurrentTree();

  // save new tree and return if no existing tree
  if (!currentTree) {
    const tree = { 1: { label, children: [] } };
    cache.mset([{ key: 'tree', val: [tree] }, { key: 'currentId', val: 1 }]);
    res.sendStatus(200);
    return;
  }

  const { tree, currentId } = currentTree;

  insertTreeNode({
    parent, label, tree, currentId,
  });

  if (currentId === cache.get('currentId')) {
    res.status(400).send({ message: `parent ${parent} not found` });
    return;
  }

  cache.set('tree', tree, 0);
  res.sendStatus(200);
};

module.exports = postTreeHandler;
