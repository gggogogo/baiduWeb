

function TreeNode(obj) {
    this.parent = obj.parent;
    this.child = obj.child || [];
    this.data = obj.data || "";
    this.selfElement = obj.selfElement;      //访问对应的DOM结点
   // this.selfElement.TreeNode = this;          //对应的DOM节点访问回来
}

TreeNode.prototype = {
    constructor: TreeNode,

    _render: function (arrow, visible, toHeightLight, deHighLight) {
        if (arrow) {
            if (this.isLeaf()) {
                this.selfElement.getElementsByClassName("arrow")[0].className="arrow empty-arrow";
            }
            else if(this._isFolded()){
                this.selfElement.getElementsByClassName("arrow")[0].className="arrow right-arrow";
            }
            else{
                this.selfElement.getElementsByClassName("arrow").[0].className="arrow down-arrow";
            }
        }
        if(visible){
            if(this.selfElement.className.indexOf)
        }
    },
    _isLeaf: function () {
        return this.child.length == 0;
    },
    _isFolded: function () {
        if (this._isLeaf()) return false;
        if (this.child[0].selfElement.className == "nodebody-visible") return false;
        return true;
    },
    _toggleFold: function () {
        if (this._isLeaf()) return false;
        for (var i = 0; i < this.childs.length; i++)
            this.childs[i].render(false, true);
        // 渲染本节点的箭头
        this.render(true, false);
        return this; // 返回自身，以便链式操作
    },

    addChild: function (text) {
        if (text = null) return this;
        if (text.trim() == "") {
            alert("节点输入不能为空");
            return this;
        }

        if (!this._isLeaf() && this._isFolded()) {
            this.toggleFold();
        }

        var newNode = document.createElement("div");
        newNode.className = "node";
        newNode.innerHTML = `<div class="arrow empty-arrow"></div>
                            <span class="node_title">${text}</span>
                            <div class="addIcon"></div>`
        this.selfElement.appendChild(newNode);
        this.child.push(new TreeNode({
            parent:this,
            child:[],
            data:text,
            selfElement:newNode
        }));
       // this.render(true,false);
        return this;
    },
    deleteNode: function () {

    },
}

var root = new TreeNode({ parent: null, child: [], data: "第一阶段", selfElement: document.getElementById("tree_area") });
root.addChild("第1.1阶段").addChild("第1.2阶段");