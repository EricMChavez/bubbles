var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
let circles = [];
let mouse = [ 0, 0 ];
let mousePath = [ 1, 2 ];
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},.7)`;
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
	};
	this.update = function() {
		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		if (
			this.y > mouse[1] - 100 &&
			this.y < mouse[1] + 100 &&
			(this.x > mouse[0] - 100 && this.x < mouse[0] + 100)
		) {
			if (this.radius < 40) {
				this.radius += 1;
			}
		} else if (this.radius > 5) {
			this.radius -= 1;
		}
		this.x += this.dx;
		this.y += this.dy;
	};
}
for (let i = 0; i < 300; i++) {
	let radius = 6;
	let x = Math.random() * (window.innerWidth - radius * 2) + radius;
	let y = Math.random() * (window.innerHeight - radius * 2) + radius;
	let dx = Math.random() - 0.5;
	let dy = Math.random() - 0.5;

	circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < circles.length; i++) {
		circles[i].draw();
		circles[i].update();
	}
	if (mouse[0] > window.innerWidth || mouse[0] < 0) {
		mousePath[0] = -mousePath[0];
	}
	if (mouse[1] > window.innerHeight || mouse[1] < 0) {
		mousePath[1] = -mousePath[1];
	}
	mouse[0] += mousePath[0];
	mouse[1] += mousePath[1];
}
function getMouse(e) {
	mouse[0] = e.clientX;
	mouse[1] = e.clientY;
}
animate();
window.addEventListener('mousemove', getMouse);
