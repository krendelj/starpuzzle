import ValueSlot from "./ValueSlot";

class SlotsPlotter {
    constructor(nStarCanvasProperties, nStarLogic, nStarConfiguration, selectedNStarIndex, onClick) {
	this.nStarCanvasProperties = nStarCanvasProperties;
	this.nStarLogic = nStarLogic;
	this.nStarConfiguration = nStarConfiguration;
	this.selectedNStarIndex = selectedNStarIndex;
	this.onClick = onClick;
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
	let selectionState;
	if (this.nStarConfiguration[i] === -1) {
	    if (this.selectedNStarIndex === i)
		selectionState = ValueSlot.EMPTY_SELECTED;
	    else
		selectionState = ValueSlot.EMPTY;
	}
	else {
	    if (this.selectedNStarIndex === i)
		selectionState = ValueSlot.VALUE_SELECTED;
	    else
		selectionState = ValueSlot.VALUE;
	}
	return (
		<ValueSlot nStarCanvasProperties={this.nStarCanvasProperties} x={xp} y={yp} key={i} index={i} value={this.nStarConfiguration[i]}
	    selectionState={selectionState} onClick={this.onClick} />
	);
    }
}

export default SlotsPlotter;
