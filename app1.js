const mode = document.getElementById("nav-icon1");
const mail = document.getElementById("nav-icon2");
const profile = document.getElementById("nav-icon3");

// modal
const modal = document.createElement("span");
modal.classList.add("modal");

// boxes
const boxes = [];
for (let i = 1; i <= 9; i++) {
    const box = document.createElement("div");
    box.classList.add("box", `box${i}`);
    boxes.push(box);
}

// modal nav
const checkout_button = document.createElement("button");
checkout_button.classList.add("checkout_button");
checkout_button.innerText = "x";

mode.addEventListener("click", function () {
    const modal_container = document.createElement("span");
    modal_container.classList.add("modal-container");

    boxes.forEach(box => modal.appendChild(box));
    modal_container.appendChild(checkout_button);
    modal_container.appendChild(modal);

    checkout_button.addEventListener("click", function() {
        document.body.removeChild(modal_container);
    });

    document.body.appendChild(modal_container);
});

modal.addEventListener('click', function (event) {
    if (event.target.classList.contains('box')) {
        console.log(event.target.classList[1]);
    }
});

mail.addEventListener("click", function () {
    console.log("nav-icon2");
});

profile.addEventListener("click", function () {
    console.log("nav-icon3");
});