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

    getDesiredSum() {
	return 4 * this.n + 2;
    }

    getSumForIndexForward(i, configuration) {

	let normalizeIndex = (index) =>
	    index < 0 ? index + this.n * 2 :
	    index >= this.n * 2 ? index - this.n * 2 :
	    index;

	let getConfiguration = (index) => configuration[normalizeIndex(index)];

	let startIndex = i % 2 === 0 ? i : normalizeIndex(i - 3);

	if (getConfiguration(startIndex) === -1
	    || getConfiguration(startIndex + 1) === -1
	    || getConfiguration(startIndex + 3) === -1
	    || getConfiguration(startIndex + 4) === -1) {
	    return -1;
	}
	else {
	    return getConfiguration(startIndex)
		+ getConfiguration(startIndex + 1)
		+ getConfiguration(startIndex + 3)
		+ getConfiguration(startIndex + 4);
	}
	
    }
}

export default NStarLogic;
