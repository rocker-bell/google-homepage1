const mode = document.getElementById("nav-icon1");
const mail = document.getElementById("nav-icon2");
const profile = document.getElementById("nav-icon3");

// modal

const modal = document.createElement("span");
modal.classList.add("modal");

// boxes

const box1 = document.createElement("div");
box1.classList.add("box", "box1");

const box2 = document.createElement("div");
box2.classList.add("box", "box2");

const box3 = document.createElement("div");
box3.classList.add("box", "box3");

const box4 = document.createElement("div");
box4.classList.add("box", "box4");

const box5 = document.createElement("div");
box5.classList.add("box", "box5");

const box6 = document.createElement("div");
box6.classList.add("box", "box6");

const box7 = document.createElement("div");
box7.classList.add("box", "box7");

const box8 = document.createElement("div");
box8.classList.add("box", "box8");

const box9 = document.createElement("div");
box9.classList.add("box", "box9");

// modal nav

const checkout_button = document.createElement("button");
checkout_button.classList.add("checkout_button")
checkout_button.innerText = "x"


mode.addEventListener("click", function () {
    const modal_container = document.createElement("span");
    modal_container.classList.add("modal-container");
    modal.appendChild(box1);
    modal.appendChild(box2);
    modal.appendChild(box3);
    modal.appendChild(box4);
    modal.appendChild(box5);
    modal.appendChild(box6);
    modal.appendChild(box7);
    modal.appendChild(box8);
    modal.appendChild(box9);
    modal_container.appendChild(checkout_button);
    checkout_button.addEventListener("click", function() {
        modal_container.style.display = "none"
    })
    modal_container.appendChild(modal);
    
    document.body.appendChild(modal_container);
});

mail.addEventListener("click", function () {
    console.log("nav-icon2");
});

profile.addEventListener("click", function () {
    console.log("nav-icon3");
});