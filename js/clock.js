//declare global variables
var interval,
    current_mins,
    current_break,
    break_counter = document.querySelector('#break').textContent, //grab content from #break
    break_length = parseInt(break_counter, 10), //parse integer
    session_counter = document.querySelector('#session').textContent, //grab content from #session
    session_length = parseInt(session_counter, 10), //parse integer
    reset = document.querySelector('#reset'),
    seconds = 60;


//hiding and showing elements 
function hide(element) {
    element.style.display = 'none';
}

function show(element) {
    element.style.display = 'block';
}

//count down function on initial start
function countDown() {
    if (seconds === 0) {
        current_mins--;
        seconds = 59;
    } else {
        seconds--;
    }

    if (current_mins === 0 && seconds === 0) {
        document.querySelector('.total_title').innerHTML = 'Break';
        document.querySelector('.total_title').style.color = '#8d9ca6';
        clearInterval(interval);
        current_break = break_length;
        interval = setInterval(breakCtrl, 1000); //call break time function once current session complete
    }

    document.querySelector('#total').innerHTML = current_mins + ':' + ((seconds < 10) ? '0' : '') + String(seconds); //update time with current minus, if seconds < 10 make adjustments
    hide(reset); //hide reset once clock starts
}

//break time function after session complete
function breakCtrl() {
    if (seconds === 0) {
        current_break--;
        seconds = 59;
    } else {
        seconds--;
    }

    if (current_break === 0 && seconds === 0) {
        clearInterval(interval);
        document.querySelector('.total_title').innerHTML = "Time's up!";
        document.querySelector('.total_title').style.color = '#ec4ce6';
        alert("Time's up!");
    }

    document.querySelector('#total').innerHTML = current_break + ':' + ((seconds < 10) ? '0' : '') + String(seconds); //update time with current break, if seconds < 10 make adjustments
}

//when clock is clicked on starts timer
var total = document.querySelector('.clock');
total.addEventListener('click', function startTimer() {
    var minutes = session_length;
    current_mins = minutes - 1;

    //pause and continue controls for clock
    if (interval) {
        clearInterval(interval);
        interval = undefined;
        show(reset);
    } else {
        interval = setInterval(countDown, 1000);
    }
}, false);

//reseting the clock default 
reset.addEventListener('click', function() {
    session_length = 25;
    current_mins = session_length;
    break_length = 5;
    seconds = 60;

    document.querySelector('#total').textContent = session_length;
    document.querySelector('#break').textContent = break_length;
    document.querySelector('#session').textContent = session_length;
}, false);

//break plus increase
var break_plus = document.querySelector('#break_plus');
break_plus.addEventListener('click', function() {
    break_length++;
    document.querySelector('#break').textContent = break_length;
}, false);

//break minus decrease
var break_minus = document.querySelector('#break_minus');
break_minus.addEventListener('click', function() {
    break_length--;
    if (break_length < 1) {
        break_length = 1;
    }

    document.querySelector('#break').textContent = break_length;
}, false);

//session plus increase
var session_plus = document.querySelector('#session_plus');
session_plus.addEventListener('click', function() {
    session_length++;

    document.querySelector('#session').textContent = session_length;
    document.querySelector('#total').textContent = session_length;
}, false);

//session minus decrease
var session_minus = document.querySelector('#session_minus');
session_minus.addEventListener('click', function() {
    session_length--;
    if (session_length < 1) {
        session_length = 1;
    }

    document.querySelector('#session').textContent = session_length;
    document.querySelector('#total').textContent = session_length;
}, false);