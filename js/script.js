const addBtn = document.querySelector("#addnote");
const main = document.querySelector(".main");
const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const dateObj = new Date();
let day = dateObj.getDate();
let month = months[dateObj.getMonth()];
let year = dateObj.getFullYear();
let counter = 0;
//Saved in localstorage
const savedNotes = () => {
    const note = document.querySelectorAll(".box textarea");
    // console.log(note);
    const data = [];
    note.forEach((e) => {
        data.push(e.value);
    })
    localStorage.setItem("task", JSON.stringify(data));
}

addBtn.addEventListener("click", () => {
    myNotes();
});
//Create elementt
const myNotes = (text = "") => {
    const notes = document.createElement('div');
    notes.classList.add("box");

    // if (counter % 2 !== 0) {
    //     notes.style.backgroundColor = "#43d8a6";
    // } else {
    //     notes.style.backgroundColor = "#dbdb94";
    // }
    // counter++;
    notes.innerHTML = `
     <textarea>${text}</textarea>
        <div class="icons">
           <div class="date">
            <span>${month} ${day} ${year}</span>
          </div> 
          <div class="tool ">
            <i class="save fa-regular fa-floppy-disk"></i></span>
          <i class="del fa-regular fa-trash-can"></i>
          </div>
        </div>`;
    // main.appendChild(notes);
    main.insertBefore(notes, main.firstChild);
    notes.style.backgroundColor = randomColor();
    function randomColor() {
        var letters = '0123456789ABCDEF';                       
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    
    savedNotes();
    notes.querySelector(".del").addEventListener("click",
        () => {
            notes.remove();
            savedNotes();
        }
    );
    notes.querySelector(".save").addEventListener("click",
        () => {
            savedNotes();
        })

}
(
    function () {
        let lsNotes = JSON.parse(localStorage.getItem("task"));
        //  console.log(lsNotes);
        lsNotes.forEach((lsNotes) => {
            myNotes(lsNotes);
        })
    }
)();