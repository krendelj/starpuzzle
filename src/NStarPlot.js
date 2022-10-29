import React from 'react';

class NStarPlot extends React.Component {
    constructor(props) {
	super(props);

	this.centerX = props.width / 2;
	this.centerY = props.top + props.radius;
    }

    render() {
	let components = [];
	this.props.plotter.init(this.props.radius,
				this.centerX,
				this.centerY - this.props.radius - this.props.plotter.radiusDelta(0));
	for (let i = 0; i < this.props.nStarLogic.n * 2; i++) {
	    let r = this.props.nStarLogic.isOuter(i + 1)
		? 1 : this.props.nStarLogic.innerRadius;
	    let angle = this.props.nStarLogic.angle(i + 1);
	    r = r * this.props.radius + this.props.plotter.radiusDelta(i + 1);
	    let xn = this.centerX - r * Math.sin(angle);
	    let yn = this.centerY - r * Math.cos(angle);
	    components.push(this.props.plotter.render(i, xn, yn));
	}
	return components;
    }
}

export default NStarPlot;
