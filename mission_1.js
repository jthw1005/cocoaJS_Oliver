const funcLog = []; 
let area = 0;

function getCircle(radius, x) {
    if (isNaN(x))
        area = radius * radius * Math.PI;
    
    else
        for (let i = 1; i <= x; i++)
            area += i * i * Math.PI;
}

function getRect(width, height) {
    area = width * height;
}

function gettrapezoid(width_top, width_bottom, height) {
    area = (width_top + width_bottom) * height / 2;
}

function getArea() {

    if (arguments[0] === 'rect') {
        getRect(arguments[1], arguments[2]);
    }

    else if (arguments[0] === 'trapezoid') {
        gettrapezoid(arguments[1], arguments[2], arguments[3]);
    }

    else if (arguments[0] === 'circle') {
        getCircle(arguments[1], arguments[2]);
    }

    else console.log("Please follow the form and try again.");

    funcLog.push(arguments[0], area);
    console.log(area);
}

function printExecutionSequence() {
    console.log("계산수행순서: " + funcLog.join(', '));
}


//////////////////////////////// 실행  ////////////////////////////////////
getArea('rect', 5, 2);
getArea('trapezoid', 5, 3, 4);
getArea('circle', 1, 4);
getArea('circle', 2);
printExecutionSequence();