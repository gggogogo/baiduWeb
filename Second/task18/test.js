
function F(name){
    this.name = name;
}
// __proto__
F.prototype = {
    // constructor: obj,
    sayHello:function(){
        return this.name;
    }
}




function newFactory(name="tiantian"){
    var object = Object.create(F.prototype);
    F.call(object, name);
    // object.__proto__ = F.prototype;
    return object; 
}

let o1 = newFactory();
console.log(o1, o1.sayHello());
let o = new F("tiantian");
console.log(o, o.sayHello());