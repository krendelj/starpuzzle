class PerimeterPlotter {
    init(radius, xp, yp) {
	this.radius = radius;
	this.xp = xp;
	this.yp = yp;
    }

    radiusDelta() {
	return 0;
    }

    render(i, xn, yn) {
	let xp = this.xp;
	let yp = this.yp;
	this.xp = xn;
	this.yp = yn;
	return <line x1={xp} y1={yp} x2={xn} y2={yn} stroke="black" key={i} />
    }
}

export default PerimeterPlotter;
