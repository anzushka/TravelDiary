console.log("Script loaded!");

const prefectures = document.querySelectorAll(".land");

const prefectureNames = {};

prefectures.forEach((prefecture) => {
    prefectureNames[prefecture.id] =
        prefecture.getAttribute("title");
});

localStorage.setItem(
    "prefectureNames",
    JSON.stringify(prefectureNames)
);

const prefectureName = document.getElementById("prefecture-name");
const memoryMeta = document.getElementById("memory-meta");
const memoryContainer = document.getElementById("memory-container");

let currentPrefectureId = null;
let currentMemoryIndex = 0;

let memories = {};

const savedMemories = localStorage.getItem("memories");

if (savedMemories) {
    memories = JSON.parse(savedMemories);
}

prefectures.forEach((prefecture) => {
    prefecture.addEventListener("click", () => {
        console.log(prefecture.id);
        console.log(prefecture.getAttribute("title"));

        currentPrefectureId = prefecture.id;
        currentMemoryIndex = 0;

        prefectures.forEach((p) => p.classList.remove("selected"));
        prefecture.classList.add("selected");

        showMemory(prefecture);
    });
});



function showMemory(prefecture) {
    const prefectureId = prefecture.id;
    const prefectureTitle = prefecture.getAttribute("title");

    prefectureName.textContent = `${prefectureTitle} Prefecture`;

    const entries = memories[prefectureId] || [];

    if (entries.length === 0) {
        memoryMeta.innerHTML = "";
        memoryContainer.innerHTML = "<p>No memories yet.</p>";
        return;
    }

    const memory = entries[currentMemoryIndex];

    memoryMeta.innerHTML = `
        <p>${memory.city}, visited on ${memory.date}.</p>
        <p class="rating">${"O".repeat(memory.rating)}</p>
    `;

    memoryContainer.innerHTML = `
        <p>${memory.notes}</p>
    `;
}

const previousBtn = document.getElementById("previous-memory");
const nextBtn = document.getElementById("next-memory");

previousBtn.addEventListener("click", () => {
    const entries = memories[currentPrefectureId] || [];

    if (entries.length === 0) return;

    currentMemoryIndex--;

    if (currentMemoryIndex < 0) {
        currentMemoryIndex = entries.length - 1;
    }

    showMemory(document.getElementById(currentPrefectureId));
});

nextBtn.addEventListener("click", () => {
    const entries = memories[currentPrefectureId] || [];

    if (entries.length === 0) return;

    currentMemoryIndex++;

    if (currentMemoryIndex >= entries.length) {
        currentMemoryIndex = 0;
    }

    showMemory(document.getElementById(currentPrefectureId));
});

const addMemoryBtn = document.getElementById("addMemory");
const modalOverlay = document.getElementById("modal-overlay");
const saveEntryBtn = document.getElementById("save-entry");
const cancelEntryBtn = document.getElementById("cancel-entry");

const cityInput = document.getElementById("city-input");
const dateInput = document.getElementById("date-input");
const ratingInput = document.getElementById("rating-input");
const notesInput = document.getElementById("notes-input");

addMemoryBtn.addEventListener("click", () => {
    if (!currentPrefectureId) return;

    modalOverlay.classList.remove("hidden");
});

cancelEntryBtn.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
});

saveEntryBtn.addEventListener("click", () => {
    if (!currentPrefectureId) return;

    const newEntry = {
        city: cityInput.value,
        date: dateInput.value.replaceAll("-", "/"),
        rating: Number(ratingInput.value),
        notes: notesInput.value
    };

    if (!memories[currentPrefectureId]) {
        memories[currentPrefectureId] = [];
    }

    memories[currentPrefectureId].unshift(newEntry);
    currentMemoryIndex = 0;

    localStorage.setItem(
        "memories",
        JSON.stringify(memories)
    );

    cityInput.value = "";
    dateInput.value = "";
    ratingInput.value = "";
    notesInput.value = "";

    modalOverlay.classList.add("hidden");

    showMemory(document.getElementById(currentPrefectureId));
});



