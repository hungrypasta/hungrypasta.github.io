const template = document.createElement('template');

template.innerHTML = `
	<div id="container">
		<div class="box"><marquee marquee direction="right" scrollamount="15"><img height="30" src="https://media.tenor.com/9zmtHZ0tIjkAAAAi/nyancat-rainbow-cat.gif"><img height="30" src="https://www.nyan.cat/cats/wtf.gif"></marquee></div>
		<div id="headImg"></div>
		<!-- <iframe src="https://sadhost.neocities.org/images/layouts/wp.jpeg"></iframe><p><a href="https://sadhost.neocities.org/images/layouts/wp.jpeg"></a></p> --->
		<div class="box">
			<nav class="navbar">
				<ul>
					<li><a href="index.html">home</a></li>
					<li><a href="images.html">images</a></li>
					<li><a href="other.html">other</a></li>
				</ul>
			</nav>
		</div>
	</div>
`;

document.body.appendChild(template.content);

let mewo = document.getElementById("mewo");
mewo.onclick = play;
mewo.addEventListener("mouseover", play);
function play() {
	if (typeof sound === 'undefined') sound = new Audio("https://dimden.dev/sounds/mewo.mp3");
	sound.play();
}

let grid = document.getElementById("grid");
for (let i = 0; i < 30; i++) {
	for (let j = 0; j < 30; j++) {
		grid.innerHTML += `<div id="cell"></div>`;
	}
}

color = "black";

//let cell = document.getElementById("cell");
grid.addEventListener("mouseover", look);
function look() {
	let cell = getHovered();
	cell.style.background = color;
}

function getHovered() {
    let n = document.querySelector(":hover");
    let nn;
    while (n) {
        nn = n;
        n = nn.querySelector(":hover");
    }
    return nn;
}


function changeColor(buttonColor) {
	//let button = document.getElementById("red");
	//color = button.innerHTML.toString();
	color = buttonColor;
}
