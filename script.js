// All query selectors and variables needed to run the programme

const start_btn = document.querySelector(".start_button button");
const info_box = document.querySelector(".information_box");
const exit_btn = info_box.querySelector(".buttons .exit_button");
const continue_btn = info_box.querySelector(".buttons .continue_button");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_text");
const timeCount = document.querySelector(".timer .time_sec");
const time_line = document.querySelector("header .time_line");
const next_btn = document.querySelector("footer .next_button");
const result_box = document.querySelector(".result_box");
const quit_quiz = result_box.querySelector(".buttons .quit");
const restart_quiz = result_box.querySelector(".buttons .restart");
let question_count = 0;
let question_number = 1;
let userScore = 0;
let counter;
let widthValue = 0;
let time = 75;

// BUTTONS

// start button
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //(this will show information box) this will add active info to the end of the CSS for information_box and because it is read hierarchally information_box become opaque and visible to the user.
}

// exit button
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //(this will hide information box) this will remove active information from the CSS of information_box and make is transparent again.
}

// quit button
quit_quiz.onclick = () => {
    window.location.reload(); //This will reload the current window
}

// continue button
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //this will hide the information box
    quiz_box.classList.add("activeQuiz"); //this will show the quiz box
    showQuestions(0); //calling showQestions function
    startTimer(75);
}

// restart button
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    question_count = 0;
    question_number = 1;
    userScore = 0;
    showQuestions(question_count);
    clearInterval(counter);
    startTimer(75);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

// next button
next_btn.onclick = () => {
    if (question_count < questions.length - 1) { //if question count is less than total question length
        question_count++; //increment the que_count value
        question_number++; //increment the que_numb value
        showQuestions(question_count); //calling showQestions function (question count keeping track of what question you are on and supplying the appropriate index for your array)
        next_btn.classList.remove("show"); //hide the next button
    } else {
        showResult(); //calling showResult function
    }
}

// FUNCTIONS

// What to show in the question_text div
function showQuestions(index) {
    const que_text = document.querySelector(".question_text");

    // creating span and div tags for the question and options and then passing the value using an array index
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //replacing the HTML of the que_text with the span tags just made
    option_list.innerHTML = option_tag; //replacing the HTML of the option_tag

    const option = option_list.querySelectorAll(".option");

    // give all the options an onclick attribute
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Show the results 
function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = 'You scored ' + (Math.floor((userScore / questions.length) * 100));
    scoreText.innerHTML = scoreTag
}

//when the user selects an answer
function optionSelected(answer) {
    let userAns = answer.textContent; //grabbing what answer the user has given
    let correctAns = questions[question_count].answer; //grabbing the correct answer from the array

    if (userAns == correctAns) { //if the user selects the correct answer (continued on next line)
        userScore += 1; //then the score is increased by 1.
    } else {
        time -= 15; //If the user selects the wrong answer, decrease 15 seconds from the total time.
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //When the user selects an option make sure they can't select another.
    }
}

// TIMER

function startTimer() {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time; //replacing the text content of time_sec with the value of time.
        time--; //decrementing the value of time.
        if (time < 0) { //when the time is 0:
            clearInterval(counter); //clear counter; 
            timeText.textContent = "Time is up"; //and change the time text to "Time is up".
        }
    }
}