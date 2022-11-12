class PerimeterPlotter {
    constructor(nStarCanvasProperties, nStarLogic, nStarConfiguration) {
	this.nStarCanvasProperties = nStarCanvasProperties;
	this.nStarLogic = nStarLogic;
	this.nStarConfiguration = nStarConfiguration;
    }
    
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
	let sum = this.nStarLogic.getSumForIndexForward(i, this.nStarConfiguration);
	let isDesiredSum = sum === -1 || sum !== this.nStarLogic.getDesiredSum(); 
	let strokeColor = isDesiredSum
	    ? this.nStarCanvasProperties.normalEdgeColor
	    : this.nStarCanvasProperties.matchingEdgeColor;
	let strokeWidth = isDesiredSum
	    ? this.nStarCanvasProperties.normalEdgeStrokeWidth
	    : this.nStarCanvasProperties.matchingEdgeStrokeWidth;
	return <line x1={xp} y1={yp} x2={xn} y2={yn} stroke={strokeColor} strokeWidth={strokeWidth} key={i} />	    
    }
}

export default PerimeterPlotter;
