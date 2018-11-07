//将变量、方法封装
var createTag = (function(){
    function CreateTag(input,output,buttonType,maxNum){
        this.input = document.getElementById(input);
        this.output = document.getElementById(output);
        this.button = document.getElementById(buttonType);
        this.maxNum = maxNum;
        this.allInData = [];
     
        //获取输入框数据
        this.getData = function(){
            switch (input){
                case "tag":{
                    var input_text = this.input.value;
                    input_text = input_text.match(/^[^,\, ]*/)[0];
                    break;
                }
                case "hobby":
                default:
                    var input_text = this.input.value.trim();
                    input_text = input_text.split(/,|，|、|\s|\n|\r|\t/);   
            }
            return input_text;
        };
       
     
        //渲染
        this.renderData = function(input_text){
           var wrapper = document.createElement("div");
           var text = document.createTextNode(input_text);
           wrapper.appendChild(text);
           this.output.appendChild(wrapper);
        }
     
        switch(buttonType){
            case "":{
             this.init("tagEvent");
             break;
            }
            case "hobby":{
                this.init("hobbyEvent")
            }
            
     
        }
     
      
     }

     //构造原型方法
CreateTag.prototype={
    checkDup : function(data){
         for(var i = 0;i<this.output.children;i++){
             if(this.output.children[i].textContent.localeCompare(data) === 0){
                 this.input.value = "";
                 return true;
             }
             else{
                 return false;
             }
         }
    },

    delElem : function(elem){
        this.output.removeChild(elem);
    },

    init : function(type){
        var self = this; 
        this.output.addEventListener("mouseover",function(event){
           var e = event|| window.event;
           if(e.target){
                e.target.textContent = "删除";
                e.target.style.background = "yellow";
           }
        });
        this.output.addEventListener("click",function(event){
            var e = event|| window.event;
            if(e.target){
                self.delElem(e.target);
            }
         });

        switch(type){
            case "tagEvent":{
                document.addEventListener("keyup",function(event){
                    if (/(,| |\，)$/.test(self.input.value) || event.keyCode===13){
                        self.getData();
                       if(!self.checkDup()){
                           if(self.output.children.length<self.maxNum){
                            self.renderData(self.getData());
                           }
                           else{
                            self.delElem(self.output.firstChild);
                           }
                           
                       }
                       else{
                        self.input.value = "";
                       }
                    }
                });
                break;
            }
            case "hobbyEvent":{
                this.button.addEventListener("click",function(){
                    self.getData();
                     for(var j=0;j<self.getData().length;j++){
                         if(!self.checkDup(self.getData)){
                            if(self.output.children.length<self.maxNum){
                                self.renderData(self.getData());
                               }
                               else{
                                self.delElem(self.output.firstChild);
                               }
                         }
                         else{
                            self.input.value = "";
                         }
                         
                     }
                });
                break;
            }
        }

        
    }
};
 return CreateTag;
})();


var tagInput = new createTag("tag","tagContainer","",10);
var hobbyInput = new createTag("hobbyInput","hobbyContainer","hobby",10);