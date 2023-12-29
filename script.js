const notesContainer = document.querySelector(".notes-container");
const addNoteBtn = document.querySelector(".add-note");
let notes;

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
    notes = document.querySelectorAll(".inp-box"); // Update the 'notes' variable
}

showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

addNoteBtn.addEventListener("click", () => {
    let inpBox = document.createElement("p");
    let img = document.createElement("img");
    inpBox.className = "inp-box";
    inpBox.setAttribute("contenteditable", "true");
    img.src = "/delete.png";
    notesContainer.appendChild(inpBox).appendChild(img);
    updateStorage();
    showNotes(); // Update 'notes' after adding a new note
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
        showNotes(); // Update 'notes' after removing a note
    } else if (e.target.tagName === "P") {
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            };
        });
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
