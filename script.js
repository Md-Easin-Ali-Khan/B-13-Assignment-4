let interviewList =[];
let rejectedList =[]


let totalNumber = document.getElementById("total");
let interviewNumber = document.getElementById("interview");
let rejectedNumber = document.getElementById("rejected");

const allFilterBtn = document.getElementById("all-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectedFilterBtn = document.getElementById("rejected-filter-btn")

let cards = document.getElementById("cards");
let mainCounter = document.querySelector("main");

function counter() {
    totalNumber.innerText = cards.children.length;
    interviewNumber.innerText = interviewList.length;
    rejectedNumber.innerText =rejectedList.length
}
counter()

function toggleBtn(btn){

    allFilterBtn.classList.add("bg-gray-300", "text-gray-500");

    allFilterBtn.classList.remove("bg-sky-600", "text-white");
    interviewFilterBtn.classList.remove("bg-sky-600", "text-white");
    rejectedFilterBtn.classList.remove("bg-sky-600", "text-white");

    let selected = document.getElementById(btn);
    console.log(selected)

    selected.classList.add("bg-sky-600", "text-white")

}