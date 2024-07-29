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

var mewo = document.getElementById("mewo");
mewo.addEventListener("mouseover", play);
function play() {
	if (typeof sound === 'undefined') sound = new Audio("https://dimden.dev/sounds/mewo.mp3");
	sound.play();
}
