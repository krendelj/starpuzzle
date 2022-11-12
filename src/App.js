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
	this.setState((state, props) => {
	    let newFreeValues = [...state.freeValues];
	    let newNStarConfiguration = [...state.nStarConfiguration];
	    let newSelectedFreeValue = -1;
	    let newSelectedNStarValue = -1;
	    if (state.selectedNStarValue === -1) {
		newSelectedFreeValue = value;
	    }
	    else {
		if (value !== -1) {
		    newFreeValues.splice(index, 1);
		}
		newNStarConfiguration[newNStarConfiguration.indexOf(
		    state.selectedNStarValue)] = value;
		newFreeValues.push(state.selectedNStarValue);
	    }
	    newFreeValues.sort((a, b) => a - b);
	    return {
		freeValues: newFreeValues,
		selectedFreeValue: newSelectedFreeValue,
		nStarConfiguration: newNStarConfiguration,
		selectedNStarValue: newSelectedNStarValue
	    };
	});
    }

    onNStarValueClick(index, value) {
	this.setState((state, props) => {
	    let newFreeValues = [...state.freeValues];
	    let newNStarConfiguration = [...state.nStarConfiguration];
	    let newSelectedFreeValue = -1;
	    let newSelectedNStarValue = -1;
	    if (state.selectedNStarValue === -1) {
		if (state.selectedFreeValue === -1) {
		    newSelectedNStarValue = value;
		}
		else {
		    newFreeValues.splice(newFreeValues.indexOf(state.selectedFreeValue), 1);
		    newNStarConfiguration[index] = state.selectedFreeValue;
		    if (value !== -1) {
			newFreeValues.push(value);
		    }
		}
	    }
	    else {
		if (value !== state.selectedNStarValue) {
		    newNStarConfiguration[newNStarConfiguration.indexOf(
			state.selectedNStarValue)] = value;
		    newNStarConfiguration[index] = state.selectedNStarValue;
		}
	    }
	    newFreeValues.sort((a, b) => a - b);
	    return {
		freeValues: newFreeValues,
		selectedFreeValue: newSelectedFreeValue,
		nStarConfiguration: newNStarConfiguration,
		selectedNStarValue: newSelectedNStarValue
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
	    </div>
	);
    }
}

export default App;
