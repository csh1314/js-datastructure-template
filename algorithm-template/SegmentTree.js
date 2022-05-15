// 线段树
class SegmentTree {
  constructor(start, end) {
    this.root = new Node(start, end)
  }
  update(start, end) {
    this.updateNode(this.root, start, end)
  }
  updateNode(node, start, end) {
    if (!node) {
      return
    }
    if (start > node.end || end < node.start) {
      return
    } else if (start <= node.start && end >= node.end) {
      node.val = node.end - node.start + 1
      return
    } else {
      this._pushdown(node);
      this.updateNode(node.left, start, end);
      this.updateNode(node.right, start, end);
      this._pushup(node);
    }
  }
  query(start, end) {
    return this.queryNode(this.root, start, end)
  }
  queryNode(node, start, end) {
    if (!node) {
      return 0;
    }
    if (start > node.end || end < node.start) {
      return 0;
    } else if (start <= node.start && end >= node.end) {
      return node.val;
    } else {
      this._pushdown(node);
      return this.queryNode(node.left, start, end) + this.queryNode(node.right, start, end);
    }
  }
  _pushdown(node) {
    if (!node) {
      return
    }
    const mid = Math.floor((node.start + node.end) / 2)
    if (!node.left) {
      node.left = new Node(node.start, mid)
    }
    if (!node.right) {
      node.right = new Node(mid + 1, node.end)
    }
    if (node.val === (node.end - node.start + 1)) {
      node.left.val = mid - node.start + 1
      node.right.val = node.end - mid
    }
  }
  _pushup(node) {
    node.val = node.left.val + node.right.val
  }
}

class Node {
  constructor(start, end) {
    this.val = 0
    this.start = start
    this.end = end
    this.left = null
    this.right = null
  }
}

export default SegmentTree