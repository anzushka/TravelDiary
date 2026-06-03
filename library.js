const libraryList = document.getElementById("library-list");
const previewPrefecture = document.getElementById("preview-prefecture");
const previewMeta = document.getElementById("preview-meta");
const previewNotes = document.getElementById("preview-notes");
const editModalOverlay = document.getElementById("edit-modal-overlay");
const editCityInput = document.getElementById("edit-city-input");
const editDateInput = document.getElementById("edit-date-input");
const editRatingInput = document.getElementById("edit-rating-input");
const editNotesInput = document.getElementById("edit-notes-input");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

let editingPrefectureId = null;
let editingEntryIndex = null;

let memories = JSON.parse(localStorage.getItem("memories")) || {};

const prefectureNames =
    JSON.parse(localStorage.getItem("prefectureNames")) || {};

function renderLibrary() {
    libraryList.innerHTML = "";

    Object.keys(memories).forEach((prefectureId) => {
        const entries = memories[prefectureId];

        if (entries.length === 0) return;

        const group = document.createElement("div");
        group.classList.add("prefecture-group");

        group.innerHTML = `
            <h2>
                ${prefectureNames[prefectureId] || prefectureId}
            </h2>
        `;

        entries.forEach((entry, index) => {
            const entryRow = document.createElement("div");
            entryRow.classList.add("library-entry");

            entryRow.innerHTML = `
                <span>${entry.city}</span>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            `;

            entryRow.querySelector("span").addEventListener("click", () => {
                showPreview(prefectureId, index);
            });

            entryRow.querySelectorAll("button")[0].addEventListener("click", () => {
                openEditModal(prefectureId, index);
            });

            entryRow.querySelectorAll("button")[1].addEventListener("click", () => {
                deleteEntry(prefectureId, index);
            });

            group.appendChild(entryRow);
        });

        libraryList.appendChild(group);
    });
}

function showPreview(prefectureId, index) {
    const entry = memories[prefectureId][index];

    previewPrefecture.textContent = prefectureId;

    previewMeta.innerHTML = `
        <p>${entry.city}, visited on ${entry.date}.</p>
        <p>${"O".repeat(entry.rating)}</p>
    `;

    previewNotes.innerHTML = `
        <p>${entry.notes}</p>
    `;
}

function openEditModal(prefectureId, index) {
    const entry = memories[prefectureId][index];

    editingPrefectureId = prefectureId;
    editingEntryIndex = index;

    editCityInput.value = entry.city;
    editDateInput.value = entry.date.replaceAll("/", "-");
    editRatingInput.value = entry.rating;
    editNotesInput.value = entry.notes;

    editModalOverlay.classList.remove("hidden");
}

cancelEditBtn.addEventListener("click", () => {
    editModalOverlay.classList.add("hidden");
});

saveEditBtn.addEventListener("click", () => {
    const updatedEntry = {
        city: editCityInput.value,
        date: editDateInput.value.replaceAll("-", "/"),
        rating: Number(editRatingInput.value),
        notes: editNotesInput.value
    };

    memories[editingPrefectureId][editingEntryIndex] = updatedEntry;

    localStorage.setItem("memories", JSON.stringify(memories));

    editModalOverlay.classList.add("hidden");

    renderLibrary();
    showPreview(editingPrefectureId, editingEntryIndex);
});

function deleteEntry(prefectureId, index) {
    memories[prefectureId].splice(index, 1);

    localStorage.setItem("memories", JSON.stringify(memories));

    previewPrefecture.textContent = "Select an entry";
    previewMeta.innerHTML = "<p>No memory selected.</p>";
    previewNotes.innerHTML = "";

    renderLibrary();
}

renderLibrary();