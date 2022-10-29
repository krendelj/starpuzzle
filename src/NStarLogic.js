class NStarLogic {
    constructor(n) {
	this.n = n;
	let alpha = 2 * Math.PI / n;
	this.innerRadius = Math.sin(Math.PI / 2 - alpha) /
	    Math.sin(Math.PI / 2 + alpha / 2);
    }

    angle(i) {
	return Math.PI / this.n * i;
    }

    isOuter(i) {
	return i % 2 === 0;
    }

    getValues() {
	let values = [];
	for (let v = 1; v <= 2 * this.n; v++)
	    values.push(v);
	return values;
    }

    getEmptyConfiguration() {
	let values = [];
	for (let i = 0; i < 2 * this.n; i++)
	    values.push(-1);
	return values;
    }
}

export default NStarLogic;
