let addBtn = document.querySelector(".add-btn");
let addFlag = false;
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");

addBtn.addEventListener("click", (e) => {
    // Display Modal
    // Generate Ticket
    addFlag = !addFlag;
    if (addFlag) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
});

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;
    console.log(key);
    if (key === "Shift") {
        createTicket();
        modalCont.style.display = "none";
        addFlag = false;
        textAreaCont.value = "";
    }
})

function createTicket() {
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-cont">
    <div class="ticket-color"></div>
    <div class="ticket-id">#sample_id</div>
    <div class="ticket-area">
        Harum cum blanditiis vitae tempore dolorem amet. Minus </div>
</div>
    `;

    mainCont.appendChild(ticketCont);
}