const Bmw = function(color) {
    this.color = color;
}

Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function() {
    console.log("drive..");
    this.stop()
};
Bmw.prototype.navigation = 1;
Bmw.prototype.stop = function() {
    console.log("Stop!");
};

const x5 = new Bmw("red");
const z4 = new Bmw("blue");

z4.drive();