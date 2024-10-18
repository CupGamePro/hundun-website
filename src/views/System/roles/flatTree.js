// flattenTree.js  
export function flattenTree(tree) {  
  let result = [];  
  
  function traverse(node) {  
    result.push(node);  
    if (node.children && node.children.length > 0) {  
      node.children.forEach(child => traverse(child));  
    }  
  }  
  
  tree.forEach(node => traverse(node));  
  
  return result;  
}