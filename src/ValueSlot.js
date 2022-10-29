import React from 'react';

class ValueSlot extends React.Component {
    static VALUE = 1;
    static VALUE_SELECTED = 2;
    static EMPTY = 3;
    static EMPTY_SELECTED = 4;
    
    constructor(props) {
	super(props);
	this.state = {
	    selectionState: ValueSlot.EMPTY
	};
	this.onClick = this.onClick.bind(this);
    }

    onClick() {
	this.setState((state) => ({
	    selectionState: state.selectionState % 4 + 1
	}));
    }
    
    render() {
	let fragment = [];
	switch (this.state.selectionState)
	{
	    case ValueSlot.VALUE:
	    case ValueSlot.VALUE_SELECTED:
	    fragment.push(
		    <text x={this.props.x} y={this.props.y} textAnchor="middle" dominantBaseline="middle" fill="black" key="text">{this.props.value}</text>
	    );
	    if (this.state.selectionState === ValueSlot.VALUE_SELECTED) {
		fragment.push(
		    <circle r={this.props.nStarCanvasProperties.slotCircleRadius} fill={this.props.nStarCanvasProperties.slotCircleColorSelected}
			    cx={this.props.x} cy={this.props.y + this.props.nStarCanvasProperties.slotTapRadius + this.props.nStarCanvasProperties.slotCircleDistance} key="slotCircle" />
		);
	    }
	    break;
	    case ValueSlot.EMPTY:
	    case ValueSlot.EMPTY_SELECTED:
	    fragment.push(
		<circle r={this.props.nStarCanvasProperties.slotCircleRadius} fill={this.state.selectionState === ValueSlot.EMPTY
										    ? this.props.nStarCanvasProperties.slotCircleColor
										    : this.props.nStarCanvasProperties.slotCircleColorSelected}
			cx={this.props.x} cy={this.props.y} key="slotCircle" />
	    );
	    break;
	    default:
	    throw { error: "Invalid selectionState" };
	}
	fragment.push(
	    <circle r={this.props.nStarCanvasProperties.slotTapRadius} fill="blue" fillOpacity={0}
		    cx={this.props.x} cy={this.props.y} onClick={this.onClick} style={{cursor: "pointer"}} key="clickCircle" />
	);
	return fragment;
    }
}

export default ValueSlot;