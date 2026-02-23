let interviewList = [];
let rejectedList = []

let totalNumber = document.getElementById("total");
let interviewNumber = document.getElementById("interview");
let rejectedNumber = document.getElementById("rejected");

const allFilterBtn = document.getElementById("all-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectedFilterBtn = document.getElementById("rejected-filter-btn")

let filterdCard = document.getElementById("filterd-section")
let cards = document.getElementById("cards");
let main = document.querySelector("main");

function counter() {
    totalNumber.innerText = cards.children.length;
    interviewNumber.innerText = interviewList.length;
    rejectedNumber.innerText = rejectedList.length
}
counter();

function toggleBtn(btn) {

    allFilterBtn.classList.add("bg-gray-300", "text-gray-500");

    allFilterBtn.classList.remove("bg-sky-600", "text-white");
    interviewFilterBtn.classList.remove("bg-sky-600", "text-white");
    rejectedFilterBtn.classList.remove("bg-sky-600", "text-white");

    let selected = document.getElementById(btn);

    selected.classList.add("bg-sky-600", "text-white")

    if (btn == "rejected-filter-btn") {
        cards.classList.add("hidden")
        filterdCard.classList.remove("hidden")
    } else if (btn == "all-filter-btn") {
        cards.classList.remove("hidden");
        filterdCard.classList.add("hidden")
    }

};

main.addEventListener("click", function (evt) {

    if (evt.target.classList.contains("reject-btn")) {

        let parentNode = evt.target.parentNode.parentNode;

        let jobName = parentNode.querySelector(".job-name").innerText;
        let jobTitle = parentNode.querySelector(".job-title").innerText;
        let jobDescription = parentNode.querySelector(".job-description").innerText;
        let status = parentNode.querySelector(".status-btn").innerText
        let jobInfo = parentNode.querySelector(".job-info").innerText

        parentNode.querySelector(".status-btn").innerText = "Rejected";

        let cardInfo = {
            jobName,
            jobTitle,
            jobDescription,
            status: "Rejected",
            jobInfo
        }

        const cardExist = interviewList.find(item => item.jobName == cardInfo.jobName);

        if (!cardExist) {
            interviewList.push(cardInfo)
        };

        renderInterview();
    };
});

function renderInterview() {
    filterdCard.innerHTML = ""

    for (let rejected of interviewList) {

        let div = document.createElement("div")
        div.className = "card p-6 border border-gray-400 rounded-lg"

        div.innerHTML =
            `
                <div class="wrap flex items-center justify-between">
                    <div class="mobile-content">
                        <h2 class="job-name font-bold text-blue-900 text-2xl">${rejected.jobName}</h2>
                        <p class="job-title text-gray-700 font-semibold text-xl">React Native Developer</p>
                    </div>
                    <div class="delet">
                        <i class="text-gray-500 fa-regular fa-trash-can"></i>
                    </div>
                </div>
                <p class="job-description my-5 text-gray-600">• Remote • Full-time • $130,000 - $175,000</p>
                <div><button class="btn status-btn">${rejected.status}</button></div>
                <p class="job-info my-5 text-gray-600">Build cross-platform mobile applications using React Native. Work on
                    products
                    used
                    by millions of users worldwide.</p>
                <div class="int-rej">
                    <button class="btn border-green-600 text-green-600">INTERVIEW</button>
                    <button class="btn border-red-600 text-red-600">REJECTED</button>
                </div>
        
            `
        filterdCard.appendChild(div)
    }
}