let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let addFlag = false;
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textAreaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[3];
let removeFlag = false;
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
let toolBoxcolor = document.querySelectorAll(".color");
let ticketArr = [];



// Listener for modal coloring
allPriorityColors.forEach(function (colorElem, idx) {
    colorElem.addEventListener("click", (e) => {
        allPriorityColors.forEach((colorRemove, idx) => {
            colorRemove.classList.remove("border");
        })

        colorElem.classList.add("border");
        modalPriorityColor = colorElem.classList[1];
    })
})


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

removeBtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
})

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key === "Shift") {
        createTicket(modalPriorityColor, textAreaCont.value, undefined);
        modalCont.style.display = "none";
        addFlag = false;
        textAreaCont.value = "";
    }
})

function createTicket(ticketColor, ticketTask, ticketId) {
    let id = ticketId;
    if (ticketId == undefined) {
        id = shortid();
    }
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-cont">
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-area">${ticketTask}</div>
    </div>
    <div class="ticket-lock">
    <i class="fas fa-lock"></i>
    </div>
`;
    mainCont.appendChild(ticketCont);
    // create object of ticket and add to array.
    ticketArr.push({ ticketColor, ticketTask, ticketId: id });
    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}


function handleRemoval(ticket) {
    if (removeFlag) {
        ticket.remove();
    }
}

function handleLock(ticket) {
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".ticket-area")
    ticketLock.addEventListener("click", (e) => {
        if (ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");
        } else {
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");
        }
    })
}

function handleColor(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e) => {
        let currTicketColor = ticketColor.classList[1];
        let currentticolorIdx = colors.findIndex((colors) => {
            return currTicketColor === colors;
        })
        console.log(currTicketColor, " ", currentticolorIdx);
        currentticolorIdx++;
        currentticolorIdx = currentticolorIdx % colors.length;
        let newTicketColor = colors[currentticolorIdx];
        ticketColor.classList.remove((currTicketColor));
        ticketColor.classList.add(newTicketColor);
    })

}

