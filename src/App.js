import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import ValuesPanel from './ValuesPanel';
import NStarLogic from './NStarLogic';
import NStarCanvasProperties from './NStarCanvasProperties';
import NStarPlot from './NStarPlot';
import PerimeterPlotter from './PerimeterPlotter';
import SlotsPlotter from './SlotsPlotter';
import confettiSticker from './confetti-sticker.gif';

class App extends React.Component {

    constructor(props) {
	super(props);
	this.lang = this.selectLang(props.lang);
	this.resources = this.texts();
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
	    selectedFreeIndex: -1,
	    nStarConfiguration: nStarLogic.getEmptyConfiguration(),
	    selectedNStarIndex: -1,
	    allSolved: false,
	    showConfetti: false,
	};
    }

    selectN(event) {
	this.setState(
	    this.resetState(event.target.value));
    }
    
    onFreeValueClick(index, value) {
	this.setState((state) => {
	    let newFreeValues = [...state.freeValues];
	    let newNStarConfiguration = [...state.nStarConfiguration];
	    let newSelectedFreeIndex = -1;
	    let newSelectedNStarIndex = -1;
	    if (state.selectedFreeIndex === -1) {
		if (state.selectedNStarIndex === -1
		    || (value === -1 && newNStarConfiguration[state.selectedNStarIndex] === -1))
		{
		    newSelectedFreeIndex = index;
		}
		else {
		    if (value !== -1) {
			newFreeValues.splice(index, 1);
		    }
		    if (newNStarConfiguration[state.selectedNStarIndex] !== -1) {
			newFreeValues.push(newNStarConfiguration[state.selectedNStarIndex]);
		    }
		    newNStarConfiguration[state.selectedNStarIndex] = value;
		}
	    }
	    else {
		if (state.selectedFreeIndex !== index) {
		    newSelectedFreeIndex = index;
		}
	    }
	    
	    newFreeValues.sort((a, b) => a - b);
	    return {
		freeValues: newFreeValues,
		selectedFreeIndex: newSelectedFreeIndex,
		nStarConfiguration: newNStarConfiguration,
		selectedNStarIndex: newSelectedNStarIndex,
		...this.setConfetti(newNStarConfiguration, state),
	    };
	});
    }

    onNStarValueClick(index, value) {
	this.setState((state) => {
	    let newFreeValues = [...state.freeValues];
	    let newNStarConfiguration = [...state.nStarConfiguration];
	    let newSelectedFreeIndex = -1;
	    let newSelectedNStarIndex = -1;
	    if (state.selectedNStarIndex === -1) {
		if (state.selectedFreeIndex === -1) {
		    newSelectedNStarIndex = index;
		}
		else {
		    if (state.selectedFreeIndex < newFreeValues.length) {
			newFreeValues.splice(state.selectedFreeIndex, 1);
			newNStarConfiguration[index] = state.freeValues[state.selectedFreeIndex];
			if (value !== -1) {
			    newFreeValues.push(value);
			}			
		    }
		    else {
			if (value === -1)
			{
			    newSelectedNStarIndex = index;
			}
			else {
			    newNStarConfiguration[index] = -1;
			    newFreeValues.push(value);
			}
		    }
		}
	    }
	    else {
		if (state.selectedNStarIndex !== index) {
		    let selectedValue = newNStarConfiguration[state.selectedNStarIndex];
		    if (value !== -1 || selectedValue !== -1)
		    {
			newNStarConfiguration[index] = selectedValue;
			newNStarConfiguration[state.selectedNStarIndex] = value;
		    }
		    else {
			newSelectedNStarIndex = index;
		    }
		}
	    }
	    newFreeValues.sort((a, b) => a - b);
	    return {
		freeValues: newFreeValues,
		selectedFreeIndex: newSelectedFreeIndex,
		nStarConfiguration: newNStarConfiguration,
		selectedNStarIndex: newSelectedNStarIndex,
		...this.setConfetti(newNStarConfiguration, state),
	    };
	});
    }

    setConfetti(nStarConfiguration, state) {
	function checkAllSolved(nStarConfiguration, nStarLogic) {
	    for (let i = 0; i < nStarLogic.n * 2; i++) {
		let sum = nStarLogic.getSumForIndexForward(i, nStarConfiguration);
		if (sum === -1 || sum !== nStarLogic.getDesiredSum())
		    return false;
	    }
	    return true;
	}
	
	let allSolved = checkAllSolved(nStarConfiguration, state.nStarLogic);
	return {
	    allSolved: allSolved,
	    showConfetti: allSolved && !state.allSolved
	};
    }

    selectLang(lang) {
	switch (lang.toLowerCase()) {
	case "lv":
	case "ru":
	    return lang.toLowerCase();
	default:
	    return "en";
	}
    }

    texts() {
	switch (this.lang) {
	case "en":
	    return {
		conditions: <>
				You are to arrange the numbers in the vertices of the star, so that the totals of the four numbers on
				each straight line are all equal to each other.
			    </>,
		chooseTheNumberOfVertices: <>
					       Choose the number of vertices:
					   </>,
		theTotalIs: <>
				The total you are going for is:
			    </>
	    };
	case "lv":
	    return {
		conditions: <>
				J??izvieto skait??i zvaigzdnes virsotn??s t??, lai visas ??etru skait??u, kas atrodas uz taisnas l??nijas,
				summas ir vien??das sav?? starp??.
			    </>,
		chooseTheNumberOfVertices: <>
					       Izv??l??ties virsot??u skaitu:
					   </>,
		theTotalIs: <>
				Summa, kas j??sasniedz, ir:
			    </>
	    };
	case "ru" :
	    return {
		conditions: <>
				?????????????????????? ?????????? ?? ???????????????? ???????????? ??????, ?????????? ?????????? ???????????? ?????????????? ??????????, ?????????????????????? ???? ?????????? ????????????,
				???????? ?????????? ?????????? ??????????.
			    </>,
		chooseTheNumberOfVertices: <>
					       ?????????????? ???????????????????? ????????????:
					   </>,
		theTotalIs: <>
				??????????, ?????????????? ???????? ??????????????:
			    </>
	    };
	}
    }

    render() {
	let confetti = null, clearConfetti = null;
	if (this.state.showConfetti) {
	    confetti = (
		<img src={confettiSticker} width={this.state.nStarCanvasProperties.width} //height='467.6px'
		     alt='confetti'
		     style={{
			 position: 'absolute',
			 marginLeft: 'auto',
			 marginRight: 'auto',
			 left: 0,
			 right: 0,
			 textAlign: 'center',
			 zIndex: -1,
		     }} />
	    );
	    
	    clearConfetti = () => {
		this.setState({
		    showConfetti: false
		});
	    }
	}
	
	return (
	    <div className="App" style={{position: 'relative'}} onClick={clearConfetti}>
		{confetti}
		<Link to="/">en</Link>&ensp;
		<Link to="/lv">lv</Link>&ensp;
		<Link to="/ru">ru</Link>
		<br />
		<br />
		<svg height={this.state.nStarCanvasProperties.height} width={this.state.nStarCanvasProperties.width}>
		    <ValuesPanel nStarCanvasProperties={this.state.nStarCanvasProperties} freeValues={this.state.freeValues}
				 selectedFreeIndex={this.state.selectedFreeIndex} nStarLogic={this.state.nStarLogic} onClick={this.onFreeValueClick}
				 yOffset={0} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={100} radius={100}
			       nStarLogic={this.state.nStarLogic} plotter={new PerimeterPlotter(this.state.nStarCanvasProperties,
												this.state.nStarLogic,
												this.state.nStarConfiguration)} />
		    <NStarPlot width={this.state.nStarCanvasProperties.width} top={100} radius={100}
			       nStarLogic={this.state.nStarLogic} plotter={new SlotsPlotter(this.state.nStarCanvasProperties,
											    this.state.nStarLogic,
											    this.state.nStarConfiguration,
											    this.state.selectedNStarIndex,
											    this.onNStarValueClick)} />
		</svg>	    
		<br />		
		<div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left'}}>
		    {this.resources.conditions}
		    <br />
		    {this.resources.chooseTheNumberOfVertices}&ensp;
		    <select value={this.state.nStarLogic.n} onChange={this.selectN}>
			<option value="6">12</option>
			<option value="7">14</option>
			<option value="9">18</option>
		    </select>
		    <br />
		    {this.resources.theTotalIs} {this.state.nStarLogic.getDesiredSum()}.
		</div>
	    </div>
	);
    }
}

export default App;
