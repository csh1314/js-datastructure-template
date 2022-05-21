// 线段树
class SegmentTree {
  constructor(start, end) {
    this.root = new Node(start, end)
  }
  update(start, end, delta) {
    this.updateNode(this.root, start, end, delta)
  }
  updateNode(node, start, end, delta) {
    if (!node) {
      return
    }
    if (start > node.end || end < node.start) {
      return
    } else if (start <= node.start && end >= node.end) {
      node.val += delta
      node.isLazy = true
      node.lazyValue += delta
      return
    } else {
      this._pushdown(node)
      this.updateNode(node.left, start, end, delta)
      this.updateNode(node.right, start, end, delta)
      this._pushup(node)
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
    if (node.isLazy) {
      node.left.isLazy = true
      node.right.isLazy = true
      node.left.lazyValue += node.lazyValue
      node.right.lazyValue += node.lazyValue
      node.left.val += node.lazyValue
      node.right.val += node.lazyValue
      node.isLazy = false
      node.lazyValue = 0
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
    this.isLazy = false
    this.lazyValue = 0
  }
}

export default SegmentTree