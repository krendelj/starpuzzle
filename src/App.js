import logo from './logo.svg';
import './App.css';
import React from 'react';
import VertexValue from './VertexValue';
import CircleLine from './CircleLine';
import ValuesPanel from './ValuesPanel';
import NStarLogic from './NStarLogic';
import NStarCanvasProperties from './NStarCanvasProperties';
import NStarPlot from './NStarPlot';
import PerimeterPlotter from './PerimeterPlotter';
import SlotsPlotter from './SlotsPlotter';

class App extends React.Component {

    circleLineLength = 4

    nStarLogic = new NStarLogic(6)

    constructor(props) {
	super(props);
	this.state = {
	    colorsState: this.composeColors(0),
	    nStarCanvasProperties: new NStarCanvasProperties(),
	    values1: this.getValuesRange(),
	    values2: []
	};
	this.onBlackCircleClick = this.onBlackCircleClick.bind(this);
	this.onValueClick = this.onValueClick.bind(this);
    }

    composeColors(redCircle) {
	let colors = [];
	for (let i = 0; i < this.circleLineLength; i++) {
	    if (i === redCircle)
		colors.push("red");
	    else
		colors.push("blue");
	}
	return {
	    colors: colors,
	    redCircle: redCircle
	};
    }
    
    onBlackCircleClick() {
	this.setState(state => ({
	    colorsState: this.composeColors((state.colorsState.redCircle + 1) % this.circleLineLength) 
	}));	
    }

    getValuesRange() {
	let valuesRange = [];
	for (let i = 1; i <= this.nStarLogic.n * 2; i++) {
	    valuesRange.push(i);
	}
	return valuesRange;
    }

    onValueClick(value, panelIndex) {
	function moveValue(valuesFrom, valuesTo) {
	    valuesFrom.splice(valuesFrom.indexOf(value), 1);
	    valuesTo.push(value);
	    valuesTo.sort((a, b) => a - b);
	}	
	
	this.setState(state => {
	    let newValues1 = [...state.values1];
	    let newValues2 = [...state.values2];
	    if (panelIndex === 1)
		moveValue(newValues1, newValues2);
	    else
		moveValue(newValues2, newValues1);
	    return {
		values1: newValues1,
		values2: newValues2
	    }
	});
    }

    render() {
	return (
	    <div className="App">
	    {/*
	       <header className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <p>
               Edit <code>src/App.js</code> and save to reload.
               </p>
               <a
               className="App-link"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer"
               >
               Learn React
               </a>
	       </header>
	     */}
		<svg height={this.state.nStarCanvasProperties.height} width={this.state.nStarCanvasProperties.width}>
		    <circle cx="100" cy="100" r="100" onClick={this.onBlackCircleClick} />
		    <VertexValue />
		    <CircleLine colors={this.state.colorsState.colors} />
		    <ValuesPanel nstarCanvasProperties={this.state.nStarCanvasProperties} values={this.state.values1}
				 onValueClick={(value) => this.onValueClick(value, 1)} yOffset={0} />
		    <ValuesPanel nstarCanvasProperties={this.state.nStarCanvasProperties} values={this.state.values2}
				 onValueClick={(value) => this.onValueClick(value, 2)} yOffset={100} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={200} radius={100}
			       nStarLogic={this.nStarLogic} plotter={new PerimeterPlotter()} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={200} radius={100}
			       nStarLogic={this.nStarLogic} plotter={new SlotsPlotter(this.state.nStarCanvasProperties,
										      this.nStarLogic)} />
		</svg>	    
		<br />
		<img src={logo} className="App-logo" alt="logo" />
	    </div>
	);
    }
}

export default App;
