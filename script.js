let interviewList = [];
let rejectedList = []
let currentStatus = 'all'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount')
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('totalCards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')


function calculateCount() {
    total.innerText = allCardSection.children.length //3
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}

calculateCount()

// toggleFunction
function toggleStyle(id) {
    allFilterBtn.classList.add('bg-gray-300', 'text-black')
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black')
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black')

    allFilterBtn.classList.remove('bg-black', 'text-white')
    interviewFilterBtn.classList.remove('bg-black', 'text-white')
    rejectedFilterBtn.classList.remove('bg-black', 'text-white')

    const selected = document.getElementById(id)

    currentStatus = id
    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-black', 'text-white')

    // filtering area
    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderReject()
    }
}


// step 2 delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText
        const aboutJob = parenNode.querySelector('.aboutJob').innerText
        const status = parenNode.querySelector('.status').innerText
        const jobDescription = parenNode.querySelector('.jobDescription').innerText

        parenNode.querySelector('.status').innerText = 'INTERVIEW'

        const cardInfo = {
            jobName,
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


    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText
        const aboutJob = parenNode.querySelector('.aboutJob').innerText
        const status = parenNode.querySelector('.status').innerText
        const jobDescription = parenNode.querySelector('.jobDescription').innerText

        parenNode.querySelector('.status').innerText = 'REJECTED'

        const cardInfo = {
            jobName,
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

})

function renderInterview() {
    filterSection.innerHTML = ''

    // crating innerHtml
    for (let interview of interviewList) {

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
            <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="jobName text-4xl">${interview.jobName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="aboutJob bg-gray-200 px-5">Bright Indicate</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${interview.status}</p>
                     <p class="jobDescription">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">REJECTED</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete border-1 border-gray-400 rounded-full  px-2 py-2">
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
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="jobName text-4xl">${rejected.jobName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="aboutJob bg-gray-200 px-5">Bright Indicate</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${rejected.status}</p>
                     <p class="jobDescription">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">REJECTED</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete border-1 border-gray-400 rounded-full  px-2 py-2">
                        <i class="text-gray-500 fa-regular fa-trash-can"></i>
                    </button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

