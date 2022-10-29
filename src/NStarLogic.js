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
}

export default NStarLogic;
