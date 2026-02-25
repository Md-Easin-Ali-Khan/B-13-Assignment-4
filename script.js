let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let jobCounter = document.getElementById('jobCounter');
let noCard = document.getElementById('no-card');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('totalCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');


// Central counter update
function calculateCount() {
    const totalCards = document.querySelectorAll('#totalCards .card').length;

    total.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === 'interview-filter-btn') {
        jobCounter.innerText = interviewList.length + " of 8 jobs";
    } else if (currentStatus === 'rejected-filter-btn') {
        jobCounter.innerText = rejectedList.length + " of 8 jobs";
    } else {
        jobCounter.innerText = totalCards + " jobs";
    }

    checkEmpty(); // Always check empty after count
}

// Central empty check
function checkEmpty() {
    if (currentStatus === 'all-filter-btn') {
        noCard.style.display = allCardSection.querySelectorAll('.card').length === 0 ? 'block' : 'none';
    } else if (currentStatus === 'interview-filter-btn') {
        noCard.style.display = interviewList.length === 0 ? 'block' : 'none';
    } else if (currentStatus === 'rejected-filter-btn') {
        noCard.style.display = rejectedList.length === 0 ? 'block' : 'none';
    }
}

// Toggle filters
function toggleStyle(id) {
    allFilterBtn.classList.add('bg-gray-300', 'text-gray-500');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-gray-500');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-gray-500');

    allFilterBtn.classList.remove('bg-sky-800', 'text-white');
    interviewFilterBtn.classList.remove('bg-sky-800', 'text-white');
    rejectedFilterBtn.classList.remove('bg-sky-800', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-gray-300', 'text-gray-500');
    selected.classList.add('bg-sky-800', 'text-white');

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderReject();
    } else {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }

    calculateCount();
}

// Delegation for buttons
mainContainer.addEventListener('click', function (event) {
    let card;
    if (event.target.classList.contains('interview-btn') || event.target.classList.contains('rejected-btn')) {
        card = event.target.closest('.card');
        const jobName = card.querySelector('.jobName').innerText;
        const designation = card.querySelector('.designation').innerText;
        const aboutJob = card.querySelector('.aboutJob').innerText;
        const jobDescription = card.querySelector('.jobDescription').innerText;

        if (event.target.classList.contains('interview-btn')) {
            card.querySelector('.status').innerText = 'INTERVIEW';
            const existing = interviewList.find(item => item.jobName === jobName);
            if (!existing) interviewList.push({ jobName, designation, aboutJob, status: 'INTERVIEW', jobDescription });
            rejectedList = rejectedList.filter(item => item.jobName !== jobName);
        } else {
            card.querySelector('.status').innerText = 'REJECTED';
            const existing = rejectedList.find(item => item.jobName === jobName);
            if (!existing) rejectedList.push({ jobName, designation, aboutJob, status: 'REJECTED', jobDescription });
            interviewList = interviewList.filter(item => item.jobName !== jobName);
        }

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderReject();

        calculateCount();
    }

    // Delete button
    if (event.target.closest('.btn-delete')) {
        card = event.target.closest('.card');
        const jobName = card.querySelector('.jobName').innerText;

        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);
        card.remove();

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderReject();

        calculateCount();
    }
});

// Render functions
function renderInterview() {
    filterSection.innerHTML = '';
    interviewList.forEach(interview => {
        const div = document.createElement('div');
        div.className = 'card flex justify-between bg-gray-200 rounded-lg p-6';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="jobName text-3xl font-bold text-blue-950">${interview.jobName}</p>
                    <p class="designation font-bold text-lg text-gray-500">${interview.designation}</p>
                </div>
                <div class="flex gap-2">
                    <p class="aboutJob font-bold text-lg text-gray-500">${interview.aboutJob}</p>
                </div>
                <p class="status font-bold text-blue-950">${interview.status}</p>
                <p class="jobDescription text-gray-700">${interview.jobDescription}</p>
                <div class="flex gap-5">
                    <button class="interview-btn border rounded-md border-green-600 text-green-600 font-bold px-4 py-2">INTERVIEW</button>
                    <button class="rejected-btn border rounded-md border-red-400 text-red-500 font-bold px-4 py-2">REJECTED</button>
                </div>
            </div>
            <div>
                <button class="btn-delete border border-gray-400 rounded-full px-2 py-2">
                    <i class="text-gray-500 fa-regular fa-trash-can"></i>
                </button>
            </div>`;
        filterSection.appendChild(div);
    });
}

function renderReject() {
    filterSection.innerHTML = '';
    rejectedList.forEach(rejected => {
        const div = document.createElement('div');
        div.className = 'card flex justify-between bg-gray-200 rounded-lg p-6';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="jobName text-3xl font-bold text-blue-950">${rejected.jobName}</p>
                    <p class="designation font-bold text-lg text-gray-500">${rejected.designation}</p>
                </div>
                <div class="flex gap-2">
                    <p class="aboutJob font-bold text-lg text-gray-500">${rejected.aboutJob}</p>
                </div>
                <p class="status font-bold text-blue-950">${rejected.status}</p>
                <p class="jobDescription text-gray-700">${rejected.jobDescription}</p>
                <div class="flex gap-5">
                    <button class="interview-btn border rounded-md border-green-600 text-green-600 font-bold px-4 py-2">INTERVIEW</button>
                    <button class="rejected-btn border rounded-md border-red-400 text-red-500 font-bold px-4 py-2">REJECTED</button>
                </div>
            </div>
            <div>
                <button class="btn-delete border border-gray-400 rounded-full px-2 py-2">
                    <i class="text-gray-500 fa-regular fa-trash-can"></i>
                </button>
            </div>`;
        filterSection.appendChild(div);
    });
}

// Initial
calculateCount();
checkEmpty();