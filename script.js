// script.js

// Mobile Detection and Layout Adjustment
function adjustLayoutForMobile() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-layout');
    } else {
        document.body.classList.remove('mobile-layout');
    }
}

window.addEventListener('load', adjustLayoutForMobile);
window.addEventListener('resize', adjustLayoutForMobile);

// Toggle Menu
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    if (menu) {
        menu.classList.toggle('open');
        toggleBodyOverflow(menu.classList.contains('open'));

        if (menu.classList.contains('open')) {
            document.addEventListener('click', closeMenuOutside);
        } else {
            document.removeEventListener('click', closeMenuOutside);
        }
    }
}

function closeMenuOutside(event) {
    const menu = document.getElementById('side-menu');
    if (menu && menu.classList.contains('open') && !menu.contains(event.target) && event.target.id !== "menu-btn") {
        menu.classList.remove('open');
        toggleBodyOverflow(false);
        document.removeEventListener('click', closeMenuOutside);
    }
}

function toggleBodyOverflow(shouldPreventScroll) {
    document.body.style.overflow = shouldPreventScroll ? 'hidden' : 'auto';
}

function switchContent(contentId) {
    const currentContent = document.querySelector('.content-area.active');
    if (currentContent) {
        currentContent.classList.remove('active');
    }

    const newContent = document.getElementById(contentId);
    if (newContent) {
        newContent.classList.add('active');
    } else {
        console.error("Content area with ID '" + contentId + "' not found.");
    }
}

// Calendar Functionality
const calendar = document.getElementById('calendar');
const currentMonthSpan = document.getElementById('current-month');
const daysGrid = document.getElementById('days-grid');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
let currentMonth = new Date();

function displayCalendar() {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    currentMonthSpan.textContent = `${monthName} ${currentMonth.getFullYear()}`;

    daysGrid.innerHTML = '';

    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        daysGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;

        const today = new Date();
        if (currentMonth.getFullYear() === today.getFullYear() &&
            currentMonth.getMonth() === today.getMonth() &&
            day === today.getDate()) {
            dayDiv.classList.add('today');
        }

        const eventsForDay = getEventsForDay(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
        if (eventsForDay.length > 0) {
            eventsForDay.forEach(event => {
                const eventText = document.createElement("span");
                eventText.classList.add("event-text");
                eventText.textContent = event.name;
                eventText.style.backgroundColor = event.color || "blue";
                dayDiv.appendChild(eventText);
            });
        }
        daysGrid.appendChild(dayDiv);
    }
}

function getEventsForDay(year, month, day) {
    const events = [];

    // Winter Vacation (Dec 25 - Jan 14)
    if ((year === 2024 && month === 12 && day >= 25) || (year === 2025 && month === 1 && day <= 14)) {
        events.push({ name: "Winter Vacation", color: "green" });
    }

    // Subject events (Dec 1-22 and Jan 15-30)
    if (year === 2024 && month === 12 && day >= 1 && day <= 22) {
        const subjects = [
            "Programming Fundamentals",
            "Web Development I",
            "Data Structures and Algorithms I",
            "Object-Oriented Programming",
            "Discrete Mathematics",
            "Introduction to Databases"
        ];
        // Distribute subjects over the days
        const subjectIndex = (day - 1) % subjects.length;
        events.push({ name: subjects[subjectIndex], color: "blue" });

    }
    if (year === 2025 && month === 1 && day >= 15 && day <= 30) {
        const subjects = [
            "Programming Fundamentals",
            "Web Development I",
            "Data Structures and Algorithms I",
            "Object-Oriented Programming",
            "Discrete Mathematics",
            "Introduction to Databases"
        ];
        const subjectIndex = (day - 15) % subjects.length;
        events.push({ name: subjects[subjectIndex], color: "blue" });
    }

    return events;
}

prevMonthBtn.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    displayCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    displayCalendar();
});

displayCalendar();

// Event Listeners (Consolidated)
const eventListeners = [
    { id: 'menu-btn', listener: toggleMenu },
    { id: 'home-btn', listener: () => switchContent('home-content') },
    { id: 'academic-btn', listener: () => switchContent('academic-screen') },
    { id: 'calendar-btn', listener: () => switchContent('calendar-content') },
    { id: 'back-btn', listener: () => window.history.back() },
    { id: 'notification-btn', listener: () => switchContent('notifications-content') },
    { id: 'notification-btn-bottom', listener: () => switchContent('notifications-content') },
    { id: 'home-menu', listener: () => switchContent('home-content') },
    { id: 'academic-menu', listener: () => switchContent('academic-screen') },
    { id: 'calendar-menu', listener: () => switchContent('calendar-content') },
    { id: 'chat-btn', listener: () => switchContent('chat-content') },
    { id: 'info-btn', listener: () => switchContent('info-content') },
    { id: 'chat-menu', listener: () => switchContent('chat-content') },
    { id: 'info-menu', listener: () => switchContent('info-content') },
    { id: 'notification-menu', listener: () => switchContent('notifications-content') },
    { id: 'attendance-menu', listener: () => switchContent('attendance-content') },
    { id: 'attendance-btn', listener: () => switchContent('attendance-content') }
];

eventListeners.forEach(item => {
    const element = document.getElementById(item.id);
    if (element) {
        element.addEventListener('click', item.listener);
    }
});

// Search Bar
const searchBar = document.querySelector('.search-bar');
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');

if (searchIcon && searchInput && searchBar) {
    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        searchInput.focus();
    });

    searchInput.addEventListener('blur', () => {
        if (searchInput.value === "") {
            searchBar.classList.remove('active');
        }
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        console.log("Searching for:", searchTerm);
    });
}
