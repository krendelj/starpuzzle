import logo from './logo.svg';
import './App.css';
import React from 'react';
import ValuesPanel from './ValuesPanel';
import NStarLogic from './NStarLogic';
import NStarCanvasProperties from './NStarCanvasProperties';
import NStarPlot from './NStarPlot';
import PerimeterPlotter from './PerimeterPlotter';
import SlotsPlotter from './SlotsPlotter';

class App extends React.Component {

    nStarLogic = new NStarLogic(6)

    constructor(props) {
	super(props);
	this.state = {
	    nStarCanvasProperties: new NStarCanvasProperties(),
	    freeValues: this.nStarLogic.getValues(),
	    selectedFreeValue: -1,
	    nStarConfiguration: this.nStarLogic.getEmptyConfiguration(),
	    selectedNStarValue: -1
	};	
	this.onFreeValueClick = this.onFreeValueClick.bind(this);
	this.onNStarValueClick = this.onNStarValueClick.bind(this);
    }

    onFreeValueClick(index, value) {
	this.setState((state, props) => { return {
	    selectedFreeValue: value
	}});
    }

    onNStarValueClick(index, value) {
	this.setState((state, props) => {
	    if (value === -1 && state.selectedFreeValue !== -1) {
		let newFreeValues = [...state.freeValues];
		newFreeValues.splice(newFreeValues.indexOf(state.selectedFreeValue), 1);
		let newNStarConfiguration = [...state.nStarConfiguration];
		newNStarConfiguration[index] = state.selectedFreeValue;
		return {
		    freeValues: newFreeValues,
		    selectedFreeValue: -1,
		    nStarConfiguration: newNStarConfiguration,
		    selectedNStarValue: -1
		};
	    }
	    else return {
		selectedFreeValue: -1,
		selectedNStarValue: value
	    };
	});
    }

    render() {
	return (
	    <div className="App">
		<svg height={this.state.nStarCanvasProperties.height} width={this.state.nStarCanvasProperties.width}>
		    <ValuesPanel nStarCanvasProperties={this.state.nStarCanvasProperties} freeValues={this.state.freeValues}
				 selectedFreeValue={this.state.selectedFreeValue} nStarLogic={this.nStarLogic} onClick={this.onFreeValueClick}
				 yOffset={0} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={100} radius={100}
			       nStarLogic={this.nStarLogic} plotter={new PerimeterPlotter()} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={100} radius={100}
			       nStarLogic={this.nStarLogic} plotter={new SlotsPlotter(this.state.nStarCanvasProperties,
										      this.nStarLogic,
										      this.state.nStarConfiguration,
										      this.state.selectedNStarValue,
										      this.onNStarValueClick)} />
		</svg>	    
		<br />
		<img src={logo} className="App-logo" alt="logo" />
	    </div>
	);
    }
}

export default App;
