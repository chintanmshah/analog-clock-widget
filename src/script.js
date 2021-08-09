var secondsHand = document.getElementById("seconds-dot");
var minutesHand = document.getElementById("min-hand");
var hourHand = document.getElementById("hour-hand");

function startClock() {
	var d = new Date();
	var sec = d.getSeconds() + d.getMilliseconds() / 1000;
	var mins = d.getMinutes() + d.getSeconds() / 60;
	var hours = (d.getHours() % 12) + d.getMinutes() / 60;

	secondsHand.style.transform = `rotate(${sec * 6}deg)`;
	minutesHand.style.transform = `rotate(${mins * 6}deg)`;
	hourHand.style.transform = `rotate(${hours * 30}deg)`;
}

if (secondsHand && minutesHand && hourHand) window.setInterval(startClock, 50);

var displayClockSize = document.getElementById('clock-size');
// var slider = document.getElementById('size-slider');

document.getElementById('size-slider').onchange = function() {
	displayClockSize.innerHTML = `[${this.value} px]`;
	console.log(this.value);
};
