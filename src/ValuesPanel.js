import React from "react"

class ValuesPanel extends React.Component {
    static itemRadius = 15;
    static itemInterval = 5;
    static itemDistance = () => this.itemRadius * 2 + this.itemInterval;
    static itemCY = 20;

    constructor(props) {
	super(props);
	this.onValueClick = this.onValueClick.bind(this);
    }

    onValueClick(e, value) {
	e.preventDefault();
	this.props.onValueClick(value);
    }

    render() {
	let items = [];
	let x = ValuesPanel.itemInterval + ValuesPanel.itemRadius;
	let y = ValuesPanel.itemCY + this.props.yOffset;
	for (const v of this.props.values) {
	    items.push(
		<React.Fragment key={v}>
		    <circle cx={x} cy={y} r={ValuesPanel.itemRadius} fill="blue" style={{cursor: "pointer"}} onClick={e => this.onValueClick(e, v)} />
		    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" style={{cursor: "pointer"}} onClick={e => this.onValueClick(e, v)}>{v}</text>
		</React.Fragment>);
	    x += ValuesPanel.itemDistance();
	    if (x + ValuesPanel.itemRadius + ValuesPanel.itemInterval > this.props.nstarCanvasProperties.width) {
		x = ValuesPanel.itemInterval + ValuesPanel.itemRadius;
		y += ValuesPanel.itemDistance();
	    }
	}
	return items;
    }
}

export default ValuesPanel;
