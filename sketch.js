let FACTOR = 1;
let WIDTH = 512;
let HEIGHT = 512;
let SIDES = 7;
let PALETTES = [
	["#0b132b", "#1c2541", "#3a506b", "#5bc0be", "#5fa8d3"],
	["#9384D1", "#766aa7", "#ECC9EE", "#FFDCB6", "#ffe0bd"],
	["#0A4D68", "#088395", "#00e6b6", "#00FFCA", "#05BFDB"],
	["#233d4d", "#619b8a", "#fe7f2d", "#fcca46", "#a1c181"],
	["#242423", "#333533", "#cfdbd5", "#e8eddf", "#f5cb5c"],
	["#3c1642", "#086375", "#1dd3b0", "#affc41", "#b2ff9e"],
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
			const size_factor = floor(random(1, 4));
			push();
			translate(x + tile / 2, y + tile / 2);
			strokeWeight(1);
			const s = (size_factor * side) / 3;
			drawShape(s);
			drawInlineShape(s);
			drawLines(s);
			pop();
		}
	}

	stroke(palette[1]);
	for (let x = 0; x < width; x += tile / 10) {
		for (let y = 0; y < width; y += tile / 10) {
			point(x + offset(tile / 10), y + offset(tile / 10));
		}
	}
}

function drawShape(s) {
	push();
	strokeWeight(floor(random(1, 6)));
	stroke(random(palette));
	rotate((floor(random(SIDES)) * 360) / SIDES);
	if (random(2) < 1) circle(0, 0, s);
	else polygon(0, 0, s / 2, SIDES);
	pop();
}

function drawLines(s) {
	push();
	strokeWeight(floor(random(1, 4)));
	stroke(random(palette));

	const n = random(2) < 1 ? SIDES : SIDES * 2;
	const offset = (floor(random(1, 6)) * s) / 2 / 5;

	for (let i = 0; i < n; i++) {
		line(s / 2, 0, s / 2 - offset, 0);
		rotate(360 / n);
	}
	pop();
}

function drawInlineShape(s) {
	if (random(3) < 1) return;

	push();
	noStroke();
	fill(random(palette));

	const d = (floor(random(1, 4)) * s) / 6;
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

function offset(amplitude) {
	return random(-amplitude / 2, amplitude / 2);
}
