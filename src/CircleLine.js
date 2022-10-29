function CircleLine({colors}) {
    let x = 40;
    let y = 130;
    let circles = [];
    for (let i = 0; i < colors.length; i++) {
	let c = colors[i];
	circles.push(
		<circle cx={x} cy={y} r="10" fill={c} key={i} />
	);
	x += 25;
    }

    return circles;
}

export default CircleLine;
