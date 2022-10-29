import ValueSlot from "./ValueSlot";

class SlotsPlotter {
    constructor(nStarCanvasProperties, nStarLogic) {
	this.nStarCanvasProperties = nStarCanvasProperties;
	this.nStarLogic = nStarLogic;
    }
    
    init(radius, xp, yp) {
	this.radius = radius;
	this.xp = xp;
	this.yp = yp;
    }

    radiusDelta(i) {
	if (this.nStarLogic.isOuter(i))
	    return this.nStarCanvasProperties.slotDistanceToVertex
	    + this.nStarCanvasProperties.slotTapRadius;
	else
	    return - this.nStarCanvasProperties.slotDistanceToVertex
	    - this.nStarCanvasProperties.slotTapRadius;
    }

    render(i, xn, yn) {
	let xp = this.xp;
	let yp = this.yp;
	this.xp = xn;
	this.yp = yn;
	return (
		<ValueSlot nStarCanvasProperties={this.nStarCanvasProperties} x={xp} y={yp} key={i} value={i + 1} />
	);
    }
}

export default SlotsPlotter;
