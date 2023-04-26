//import { get, post } from "./request.js"
const key = ['c', 'a', 'b', 'false', 'true', 'personal'];

function startQuiz() {
  let totalQs = 6;
  let currentQ = 0;
  let questions = document.querySelectorAll('.Questions');
  let next = document.getElementById('next');
  let submit = document.getElementById('btn');
  //$questions = $('.Questions');
  for(let i = 1; i <= totalQs; i++) {
    questions[i].hidden = true;
  }
  questions[currentQ].removeAttribute('hidden');
  //console.log(currentQ);
  next.addEventListener('click', function() {
    //questions[currentQ].setAttribute('hidden');
    questions[currentQ].hidden = true;
    currentQ += 1;

    if(currentQ > totalQs) {
      //next.setAttribute('hidden');
      next.hidden = true;
      submit.removeAttribute('hidden');
    }
    else {
      questions[currentQ].removeAttribute('hidden');
      console.log(currentQ);
    }
  })
}


function getRadios(value) {
  return value.checked;
}




function submitButton(e) {
  e.preventDefault();
  let radioButtons = [...document.querySelectorAll('input[type="radio"]')];
  let textAnswer = document.querySelector('input[name="quiz6"]');

  radioButtons = radioButtons.filter(getRadios);
  let answers = [...radioButtons, textAnswer];
  answers.forEach(function(value, index, arr) {
    arr[index] = value.value.toLowerCase();
  });

  grade(answers, key);
}

function grade(answers,arr) {
  const results = document.querySelector('#score');
  let score = 0;
  let submit = document.getElementById('btn');
  submit.hidden = true;
  for(let i = 0; i < arr.length; i++) {
    if(answers[i] === arr[i]) {
      score++;
    }
  }
  results.innerHTML = "<h1>Score: " + score + " out of " + key.length + ".";

  saveAnswers(answers, score);
}

function post(endpoint, params="") {

    return jQuery.ajax({

        type: "POST",
        url: endpoint,
        data: {
            info: params
        },
        dataType: "html"

    })

}

async function saveAnswers(answers, score) {
  let user = document.querySelector('input[name="name"]').value
  let results = await post('./submit.php', JSON.stringify({user: user, answers: answers, score: score}));
}

startQuiz();
const submitBtn = document.querySelector('input[type="submit"]');
submitBtn.addEventListener("click", submitButton);
