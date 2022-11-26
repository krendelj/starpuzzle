import React from "react"
import ValueSlot from "./ValueSlot"

class ValuesPanel extends React.Component {
    static itemCY = 20;

    constructor(props) {
	super(props);
	this.itemDistance = this.props.nStarCanvasProperties.slotTapRadius * 2 +
	    this.props.nStarCanvasProperties.slotDistanceToVertex;
    }

    render() {
	let items = [];
	let x = this.props.nStarCanvasProperties.slotDistanceToVertex +
	    this.props.nStarCanvasProperties.slotTapRadius;
	let y = ValuesPanel.itemCY + this.props.yOffset;
	for (let k = 0; k < this.props.nStarLogic.n * 2; k++) {
	    let selectionState;
	    let v;
	    if (k < this.props.freeValues.length) {
		v = this.props.freeValues[k];
		if (this.props.selectedFreeIndex === k)
		    selectionState = ValueSlot.VALUE_SELECTED;
		else
		    selectionState = ValueSlot.VALUE;
	    }
	    else {
		v = -1;
		if (this.props.selectedFreeIndex === k)
		    selectionState = ValueSlot.EMPTY_SELECTED;
		else
		    selectionState = ValueSlot.EMPTY;
	    }

	    items.push(
		<ValueSlot nStarCanvasProperties={this.props.nStarCanvasProperties} x={x} y={y}
			   key={k} index={k} value={v} selectionState={selectionState} onClick={this.props.onClick} />
	    );
	    
	    x += this.itemDistance;
	    if (x + this.props.nStarCanvasProperties.slotTapRadius +
		this.props.nStarCanvasProperties.slotDistanceToVertex > this.props.nStarCanvasProperties.width) {
		x = this.props.nStarCanvasProperties.slotDistanceToVertex +
		    this.props.nStarCanvasProperties.slotTapRadius;
		y += this.itemDistance;
	    }
	}
	return items;
    }
}

export default ValuesPanel;
