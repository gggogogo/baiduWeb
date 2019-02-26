(function () {
    const canvasBg = document.getElementById("canvasBg");
    const canvasFg = document.getElementById("canvasFg");
    // const context = canvasBg.getContext("2d");
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 800;
    const INNER_RADIUS = 100;
    const DIS = 50;
    const TRACE_NUMBER = 4;

    var imageShipArr = [];
    
    const configShipArr = [{
        width: 30,
        height: 30,
        imageShipAddress: "img/min-iconfont-rocket-active.png"
    }]

    const requestAnimationFrame = (function(){
        if(window.requestAnimationFrame){
            return window.requestAnimationFrame;
        }else{
            return window.mozRequestAnimationFrame || window.webitRequestAnimationFrame;
        }
    })();

    function drawOrbit(context = canvasBg.getContext("2d"), number = TRACE_NUMBER, dis = DIS, innerRadius = INNER_RADIUS) {
        for (let i = 0; i < number; i++) {
            context.save();
            context.beginPath();
            context.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            context.arc(0, 0, innerRadius + dis * (i), 0, Math.PI * 2, true);
            context.closePath();
            context.strokeStyle = "red";
            context.stroke();
            context.restore();
        }

    }

    function drawBg(context = canvasBg.getContext("2d")) {
        let imagePlanet = new Image();
        imagePlanet.src = "img/min-iconfont-planet.png";
        imagePlanet.onload = function () {
            context.drawImage(imagePlanet, CANVAS_WIDTH / 2 - 25, CANVAS_HEIGHT / 2 - 25, 50, 50);
            drawOrbit();
        }

    }

    function clearFgCanvas(context = canvasFg.getContext("2d")){
        context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }

    function drawShip(index, context = canvasFg.getContext("2d"), angle) {
        clearFgCanvas();
        let config = configShipArr[index];
        if (!imageShipArr[index]) {
            let imageShip = new Image();
            imageShip.src = config.imageShipAddress;
            imageShipArr[index] = imageShip;
            imageShip.onload = function () {
                context.save();
                context.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
                context.rotate(-angle);
                context.drawImage(imageShip, 50 * (2 + index) - config.width / 2, - config.height / 2, config.width, config.height);
                context.restore();
            }
        } else {
            context.save();
            context.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            context.rotate(-angle);
            context.drawImage(imageShipArr[index], 50 * (2 + index) - config.width / 2, - config.height / 2, config.width, config.height);
            context.restore();
        }


    }

    drawBg();
       
    let startAngle = 0;
    requestAnimationFrame(function dynDrawShip(){
        startAngle += 0.05;
        drawShip(0,canvasFg.getContext("2d"),startAngle);
        requestAnimationFrame(dynDrawShip);
    })
    
})()