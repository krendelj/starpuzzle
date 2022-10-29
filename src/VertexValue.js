import { useState } from "react";

function VertexValue() {
    const [textState, setTextState] = useState(20);

    function onValueClick() {
	setTextState(textState + 1);
    }

    return (
	    <>
	    <circle cx="100" cy="100" r="15" fill="blue" style={{cursor: "pointer"}} onClick={onValueClick} />
	    <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="red" style={{cursor: "pointer"}} onClick={onValueClick}>{textState}</text>
	    </>
    );
}

export default VertexValue;
