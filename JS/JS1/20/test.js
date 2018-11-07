// var value="1a,1b";
// value = value.match(/(^[^,\, ]*)/g);
// alert(value);


// var value="b,baa";
// value=value.match(/(ba*)/g);
// alert(value);

var createObj = (function(){
    function CreateTag(name,age){
        // this.name = name;
        // this.age = age;
        // this.getName = function(){
        //     return this.name;
        // };
        name:
    }
    return CreateTag;
})();

var name = "LQY";
var obj1 = new createObj("SHERRY",23);
var na = obj1.getName();
alert(typeof na);