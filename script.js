const ques = [
    {
        ques : "Which is largest animal in the world",
        ans : [
            {text : "Shark",correct:false},
            {text : "Blue whale",correct:true},
            {text : "Elephent",correct:false},
            {text : "Giraffe",correct:false}
        ]
    },
    {
        ques : "Which is largest Country in the world",
        ans : [
            {text : "India",correct:false},
            {text : "Rusia",correct:true},
            {text : "China",correct:false},
            {text : "America",correct:false}
        ]
    },
    {
        ques : "In which year India got freedom",
        ans : [
            {text : "1971",correct:false},
            {text : "1976",correct:false},
            {text : "1947",correct:true},
            {text : "1951",correct:false}
        ]
    },
    {
        ques : "Which state in india is called GOD'S OWN COUNTRY",
        ans : [
            {text : "Maharashtra",correct:false},
            {text : "Tamilnadu",correct:false},
            {text : "Mizoram",correct:false},
            {text : "Kerala",correct:true}
        ]
    }
   
];
async function getQues(){
    const endpoint = `https://quizapi.io/api/v1/questions?apiKey=6D7zXZ2EWXu9OS2St27R14BD6oCVHLNLuuHiMvZn&category=devops&difficulty=Easy&limit=10`;
    try{
        const response = await fetch(endpoint);
        const result = await response.json();
        // console.log(result);
        for(let i =0;i<result.length;i++){
            let obj = {};
            const q = result[i].question;
            const a = result[i].answers;
            let arr = [];
            let brr = Object.values(a);
            let c = result[i].correct_answers
            let crr = Object.values(c);
            for(let j =0;j<brr.length;j++){
                let obj2 = {};
                obj2.text = brr[j];
                obj2.correct = crr[j];
                // console.log(crr[j])
                arr.push(obj2);
            }
            // console.log(arr);
            obj.ques = q;
            obj.ans = arr;
            ques.push(obj);


        }
    }
    catch(e){
        console.log(e);
    }

}
getQues();
// console.log(ques)

const quesElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn")
const nextButton = document.getElementById("next-btn");

let currentIndex= 0;
let score = 0;

function startQuiz(){
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}
function showQuestion(){
    reset();
    let currentQuestion = ques[currentIndex];
    let quesNo = currentIndex + 1;
    quesElement.innerHTML = quesNo+". "+currentQuestion.ques;
   

    currentQuestion.ans.forEach(answer =>{
        const button = document.createElement("button");
        if(answer.text === null){
            button.innerText = "null"
        }
        else{

            button.innerHTML = answer.text;
        }
        button.classList.add("btn");
        answerButton.append(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })

}
function reset(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selected = e.target;
    const isCurrect = selected.dataset.correct === "true";

    if(isCurrect){
        selected.classList.add("correct");
        score++;
    }
    else{
        selected.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";

}
function showScore(){
    reset();
    quesElement.innerHTML = `Your scored ${score} out of ${ques.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNext(){
    currentIndex++;
    if(currentIndex < ques.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentIndex < ques.length){
        handleNext();
    }
    else{
        startQuiz();
    }
})

startQuiz();
