const functionLogArr = [];

function getRect(width, height) {
    let area = width * height;
    return area;
}

function gettrapezoid(width_top, width_bottom, height) {
    let area = (width_top + width_bottom) * height / 2;
    return area;
}

function getCircle(radius) {
    let area = radius * radius * Math.PI;
    return area;
}

function getMultipleCircle(num) {
    let area = 0;
    for (let i = 1; i <= num; i++)
        area =+ getCircle(i);
    return area;
}

function getArea() {
    let area = 0;

    if (arguments[0] === 'rect')
        area = getRect(arguments[1], arguments[2]);

    else if (arguments[0] === 'trapezoid')
        area = gettrapezoid(arguments[1], arguments[2], arguments[3]);

    else if (arguments[0] === 'circle')
        if(arguments[2] === undefined)
            area = getCircle(arguments[1]);
        else
            area = getMultipleCircle(arguments[2]);

    else
        console.log("Please follow the form and try again.");

    functionLogArr.push(arguments[0], area);
    console.log(area);
}

function printExecutionSequence() {
    console.log("계산수행순서: " + functionLogArr.join(', '));
}

// execution
getArea('rect', 5, 2);
getArea('trapezoid', 5, 3, 4);
getArea('circle', 1, 4);
getArea('circle', 2);
printExecutionSequence();