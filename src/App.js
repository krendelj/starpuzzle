import './App.css';
import React from 'react';
import ValuesPanel from './ValuesPanel';
import NStarLogic from './NStarLogic';
import NStarCanvasProperties from './NStarCanvasProperties';
import NStarPlot from './NStarPlot';
import PerimeterPlotter from './PerimeterPlotter';
import SlotsPlotter from './SlotsPlotter';

class App extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    nStarCanvasProperties: new NStarCanvasProperties(),
	    ...this.resetState(6)
	};
	this.selectN = this.selectN.bind(this);
	this.onFreeValueClick = this.onFreeValueClick.bind(this);
	this.onNStarValueClick = this.onNStarValueClick.bind(this);
    }

    resetState(n) {
	let nStarLogic = new NStarLogic(n);
	return {
	    nStarLogic: nStarLogic,
	    freeValues: nStarLogic.getValues(),
	    selectedFreeValue: -1,
	    nStarConfiguration: nStarLogic.getEmptyConfiguration(),
	    selectedNStarValue: -1
	};
    }

    selectN(event) {
	this.setState(
	    this.resetState(event.target.value));
    }
    
    onFreeValueClick(index, value) {
	this.setState((state, props) => {
	    let newFreeValues = [...state.freeValues];
	    let newNStarConfiguration = [...state.nStarConfiguration];
	    let newSelectedFreeValue = -1;
	    let newSelectedNStarValue = -1;
	    if (state.selectedNStarValue === -1) {
		if (value !== state.selectedFreeValue) {
		    newSelectedFreeValue = value;
		}
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
				 selectedFreeValue={this.state.selectedFreeValue} nStarLogic={this.state.nStarLogic} onClick={this.onFreeValueClick}
				 yOffset={0} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={100} radius={100}
			       nStarLogic={this.state.nStarLogic} plotter={new PerimeterPlotter(this.state.nStarCanvasProperties,
												this.state.nStarLogic,
												this.state.nStarConfiguration)} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={100} radius={100}
			       nStarLogic={this.state.nStarLogic} plotter={new SlotsPlotter(this.state.nStarCanvasProperties,
											    this.state.nStarLogic,
											    this.state.nStarConfiguration,
											    this.state.selectedNStarValue,
											    this.onNStarValueClick)} />
		</svg>	    
		<br />		
		<div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left'}}>
		    You are to arrange the numbers in the vertices of the star, so that the totals of the four numbers on
		    each straight line are all equal to each other.
		    <br />
		    Choose the number of vertices:&nbsp;
		    <select value={this.state.nStarLogic.n} onChange={this.selectN}>
			<option value="6">12</option>
			<option value="7">14</option>
			<option value="9">18</option>
		    </select>
		    <br />
		    The sum you are going for is: {this.state.nStarLogic.getDesiredSum()}.
		</div>
		
	    </div>
	);
    }
}

export default App;
