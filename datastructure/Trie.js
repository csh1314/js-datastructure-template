// 前缀树
class Trie{
  constructor(){
    this.root = {}
  }
  // 插入单词
  insert(word){
    let node = this.root
    for(let ch of word){
      node[ch] = node[ch] || {}
      node = node[ch]
    }
    node.isEnd = true
  }
  // 搜索前缀
  searchPrefix(prefix){
    let node = this.root
    for(let ch of prefix){
      if(!node[ch]){
        return null
      }
      node = node[ch]
    }
    return node
  }
  // 搜索单词
  hasWord(word){
    let node = this.searchPrefix(word)
    return node !== undefined && node.isEnd !== undefined
  }
  // 是否有前缀
  startsWith(prefix){
    return this.searchPrefix(prefix)
  }
}

export default Trie