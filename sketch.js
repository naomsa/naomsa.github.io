let FACTOR = 1;
let WIDTH = 1920;
let HEIGHT = 1080;
let SIDES = 7;
let PALETTES = [
	["#22577a", "#38a3a5", "#57cc99", "#80ed99", "#c7f9cc"],
	["#0b132b", "#1c2541", "#3a506b", "#5bc0be", "#5fa8d3"],
	["#231942", "#5e548e", "#9f86c0", "#be95c4", "#e0b1cb"],
];

let palette, tile, side, gap;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	noLoop();
	angleMode(DEGREES);
	rectMode(CENTER);

	palette = [...random(PALETTES)];
	// 1/8 of tile for gap on each side and other 3/4 of tile to shape side
	tile = min(width, height) / (FACTOR * 4);
	side = (3 * tile) / 4;
	gap = tile / 8;
}

function keyTyped() {
	if (key === "s") saveCanvas(`crystal${Date.now()}`, "png");
}

function draw() {
	noFill();
	background(palette.splice(floor(random(2)), 1));

	for (let x = 0; x < width; x += tile) {
		for (let y = 0; y < height; y += tile) {
			push();
			translate(x + tile / 2, y + tile / 2);
			strokeWeight(1);
			drawShape();
			drawInlineShape();
			drawLines();
			pop();
		}
	}
}

function drawShape() {
	push();
	strokeWeight(floor(random(1, 6)));
	stroke(random(palette));
	rotate((floor(random(SIDES)) * 360) / SIDES);
	if (random(2) < 1) circle(0, 0, side);
	else polygon(0, 0, side / 2, SIDES);
	pop();
}

function drawLines() {
	push();
	strokeWeight(floor(random(1, 4)));
	stroke(random(palette));

	const n = random(2) < 1 ? SIDES : SIDES * 2;
	const offset = (floor(random(1, 6)) * side) / 2 / 5;

	for (let i = 0; i < n; i++) {
		line(side / 2, 0, side / 2 - offset, 0);
		rotate(360 / n);
	}
	pop();
}

function drawInlineShape() {
	if (random(3) < 1) return;

	push();
	noStroke();
	fill(random(palette));

	const d = (floor(random(1, 4)) * side) / 6;
	if (random(3) < 1) polygon(0, 0, d / 2, SIDES);
	else circle(0, 0, d);
	pop();
}

function polygon(posX, posY, r, n) {
	beginShape();
	const a = 360 / n;
	for (let i = 0; i < 360; i += a) {
		const x = posX + r * cos(i);
		const y = posY + r * sin(i);
		vertex(x, y);
	}
	endShape(CLOSE);
}