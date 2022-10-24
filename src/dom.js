window.dom = {
  //创建HTML结构
  create(string) {
    // tamplate 任意标签容器 不会显示在HTML
    const container = document.createElement('template')
    // trim 去掉字符串两边空格
    container.innerHTML = string.trim()
    //content.firstChild 配合template
    return container.content.firstChild
  },
  //在后面新增一个节点
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  //在前面新增一个节点
  before(parent, node) {
    parent.appenChild(node)
  },
  //新增子节点
  append(parent, node) {
    parent.appenChild(node)
  },
  //新增父元素
  warp(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },
  //删除节点
  remove(node) {
    //新增兼容性一般
    // node.remove()
    node.parentNode.removeChild(node)
    return node
  },
  //删除所有子节点
  empty(node) {
    // node.innerHTML = ''
    const childNodes = new Array(node)
    const array = []
    for (let i = childNodes.length - 1; i >= 0; i--) {
      console.log(node)
      array.push(dom.remove(childNodes[i]))
    }
    return array
  },
  //读写属性
  attr(node, name, value) { //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  //读写内容（文本）
  text(node, string) { // 适配
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string
      } else {
        node.Content = string
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  //修改HTML
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  //
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div,'color)
        return node.style[name]
      } else if (name instanceof Object) {
        // dom.style(div,{color:'red'})
        for (let key in name) {
          node.style[key] = name[key]
        }
      }
    }
  },
  // 添加类
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },
  // 添加事件
  on(node, eventName, action) {
    node.addEventListener(eventName, acttion)
  },
  // 移除事件
  off(node, eventName, action) {
    node.removeEventListener(eventName, acttion)
  },


  //查
  find(selector, scope) {
    //返回数组 +下标// dom.siblings(dom.find('#test')[0])
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(it => it !== node)
  },
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  //
  each(nodeList, action) {
    for (let i = 0; i < nodeList.length; i++) {
      action.call(null, nodeList[i])
    }
  },
  //排名第几
  index(node) {
    const list = dom.children(node.parentNode)
    for (var i = 0; i < list.length; i++) {
      if (list[i] === node) break
    }
    return i
  }
}
