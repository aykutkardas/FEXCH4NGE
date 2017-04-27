function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


Array.prototype.count = function () {
    var temp = {};
    for (var i = 0; i < this.length; i++) {

        if (!(temp[this[i]])) {
            temp[this[i]] = 1;
        } else {
            temp[this[i]]++;
        }
    }

    return temp;
}

Array.prototype.getRand = function () {

    var rand = Math.floor(Math.random() * (this.length - 0)) + 0;

    return this[rand];

}
