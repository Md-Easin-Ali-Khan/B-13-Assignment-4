let interviewList = [];
let rejectedList = []
let currentStatus = 'all'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount')
let rejectedCount = document.getElementById('rejectedCount');
let jobCounter = document.getElementById('jobCounter');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('totalCards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')


function calculateCount() {
    total.innerText = document.querySelectorAll('#totalCards .card').length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}

calculateCount()

// toggleFunction
function toggleStyle(id) {
    allFilterBtn.classList.add('bg-gray-300', 'text-white')
    interviewFilterBtn.classList.add('bg-gray-300', 'text-white')
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-white')

    allFilterBtn.classList.remove('bg-sky-800', 'text-white')
    interviewFilterBtn.classList.remove('bg-sky-800', 'text-white')
    rejectedFilterBtn.classList.remove('bg-sky-800', 'text-white')

    const selected = document.getElementById(id)

    currentStatus = id
    selected.classList.remove('bg-gray-300', 'text-white')
    selected.classList.add('bg-sky-800', 'text-white')

    // filtering area
    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()

        jobCounter.innerText = interviewList.length + " jobs"

    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')

        jobCounter.innerText = allCardSection.children.length + " jobs"

    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderReject()

        jobCounter.innerText = rejectedList.length + " jobs"
    }
}


// delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText
        const designation = parenNode.querySelector('.designation').innerText
        const aboutJob = parenNode.querySelector('.aboutJob').innerText
        const status = parenNode.querySelector('.status').innerText
        const jobDescription = parenNode.querySelector('.jobDescription').innerText

        parenNode.querySelector('.status').innerText = 'INTERVIEW'

        const cardInfo = {
            jobName,
            designation,
            aboutJob,
            status: 'INTERVIEW',
            jobDescription
        }

        const plantExist = interviewList.find(item => item.jobName == cardInfo.jobName)

        if (!plantExist) {
            interviewList.push(cardInfo)
        }

        rejectedList = rejectedList.filter(item => item.jobName != cardInfo.jobName)

        if (currentStatus == 'rejected-filter-btn') {
            renderReject()
        }

        calculateCount()


    }
    else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText
        const designation = parenNode.querySelector('.designation').innerText
        const aboutJob = parenNode.querySelector('.aboutJob').innerText
        const status = parenNode.querySelector('.status').innerText
        const jobDescription = parenNode.querySelector('.jobDescription').innerText

        parenNode.querySelector('.status').innerText = 'REJECTED'

        const cardInfo = {
            jobName,
            designation,
            aboutJob,
            status: 'REJECTED',
            jobDescription
        }

        const plantExist = rejectedList.find(item => item.jobName == cardInfo.jobName)

        if (!plantExist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.jobName != cardInfo.jobName)


        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        calculateCount()

    }
    else if (event.target.closest('.btn-delete')) {

        const card = event.target.closest('.card');

        const jobName = card.querySelector('.jobName').innerText;

        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        card.remove();

        calculateCount();

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }
        else if (currentStatus === 'rejected-filter-btn') {
            renderReject();
        }
    }

})

function renderInterview() {
    filterSection.innerHTML = ''

    // crating innerHtml
    for (let interview of interviewList) {

        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-gray-200 rounded-lg p-6'
        div.innerHTML = 
            `
                <div class="space-y-6">
                    <div>
                        <p class="jobName text-3xl font-bold text-blue-950">${interview.jobName}</p>
                        <p class="designation font-bold text-lg text-gray-500">${interview.designation}</p>
                    </div>
                    <div class="flex gap-2">
                        <p class="aboutJob font-bold text-lg text-gray-500">${interview.aboutJob}</p>
                    </div>

                    <p class="status font-bold text-blue-950">NOT APPLIED</p>
                    <p class="jobDescription text-gray-700">${interview.jobDescription}</p>

                    <div class="flex gap-5">
                        <button class="interview-btn border rounded-md border-green-600 text-green-600 font-bold px-4 py-2">INTERVIEW</button>
                        <button class="rejected-btn border rounded-md border-red-400 text-red-500 font-bold px-4 py-2">REJECTED</button>
                    </div>
                </div>

                <div>
                    <button class="btn-delete border border-gray-400 rounded-full  px-2 py-2">
                        <i class="text-gray-500 fa-regular fa-trash-can"></i>
                    </button>
                </div>

        `
        filterSection.appendChild(div)
    }
}

function renderReject() {

    filterSection.innerHTML = ''

    // crating innerHtml
    for (let rejected of rejectedList) {

        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-gray-200 rounded-lg p-6'
        div.innerHTML = 
            `
                <div class="space-y-6">
                    <div>
                        <p class="jobName text-3xl font-bold text-blue-950">${rejected.jobName}</p>
                        <p class="designation font-bold text-lg text-gray-500">${rejected.designation}</p>
                    </div>
                    <div class="flex gap-2">
                        <p class="aboutJob font-bold text-lg text-gray-500">${rejected.aboutJob}</p>
                    </div>

                    <p class="status font-bold text-blue-950">NOT APPLIED</p>
                    <p class="jobDescription text-gray-700">${rejected.jobDescription}</p>

                    <div class="flex gap-5">
                        <button class="interview-btn border rounded-md border-green-600 text-green-600 font-bold px-4 py-2">INTERVIEW</button>
                        <button class="rejected-btn border rounded-md border-red-400 text-red-500 font-bold px-4 py-2">REJECTED</button>
                    </div>
                </div>

                <div>
                    <button class="btn-delete border border-gray-400 rounded-full  px-2 py-2">
                        <i class="text-gray-500 fa-regular fa-trash-can"></i>
                    </button>
                </div>       
            `
        filterSection.appendChild(div)
    }
}

