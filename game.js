const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W, H;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


/* =========================
   PLAYER
========================= */

const player = {

    x: 500,
    y: 400,

    size: 18,

    speed: 3,

    cash: 40000,

    health: 100,

    stress: 10,

    month: 1,

    year: 2019,

    hour: 8,

    minute: 0

};


/* =========================
   INPUT
========================= */

const keys = {};

window.addEventListener("keydown", e => {

    keys[e.key.toLowerCase()] = true;

    if (e.key.toLowerCase() === "e") {
        interact();
    }

});

window.addEventListener("keyup", e => {

    keys[e.key.toLowerCase()] = false;

});


function button(id, key) {

    const el =
        document.getElementById(id);

    el.addEventListener("touchstart",
        e => {
            e.preventDefault();
            keys[key] = true;
        });

    el.addEventListener("touchend",
        e => {
            e.preventDefault();
            keys[key] = false;
        });

    el.addEventListener("mousedown",
        () => keys[key] = true);

    el.addEventListener("mouseup",
        () => keys[key] = false);

}


button("up", "w");
button("down", "s");
button("left", "a");
button("right", "d");


document
    .getElementById("interact")
    .addEventListener("click", interact);


/* =========================
   WORLD
========================= */

const buildings = [

    {
        name: "YOUR APARTMENT",
        x: 100,
        y: 180,
        w: 230,
        h: 150,
        color: "#333",
        type: "home"
    },

    {
        name: "OFFICE",
        x: 650,
        y: 150,
        w: 250,
        h: 180,
        color: "#292929",
        type: "work"
    },

    {
        name: "GROCERY SHOP",
        x: 100,
        y: 570,
        w: 260,
        h: 150,
        color: "#303030",
        type: "shop"
    },

    {
        name: "BANK",
        x: 700,
        y: 570,
        w: 250,
        h: 150,
        color: "#252525",
        type: "bank"
    }

];


/* =========================
   CAMERA
========================= */

let camera = {
    x: 0,
    y: 0
};


/* =========================
   DRAW
========================= */

function draw() {

    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    camera.x =
        player.x - W / 2;

    camera.y =
        player.y - H / 2;


    drawWorld();

    drawBuildings();

    drawPlayer();

}


/* =========================
   WORLD
========================= */

function drawWorld() {

    ctx.fillStyle = "#111";

    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    /*
       ROAD GRID
    */

    ctx.strokeStyle = "#1b1b1b";

    ctx.lineWidth = 2;


    for (
        let x = -camera.x % 80;
        x < W;
        x += 80
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);

        ctx.stroke();

    }


    for (
        let y = -camera.y % 80;
        y < H;
        y += 80
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);
        ctx.lineTo(W, y);

        ctx.stroke();

    }

}


/* =========================
   BUILDINGS
========================= */

function drawBuildings() {

    buildings.forEach(b => {

        const x =
            b.x - camera.x;

        const y =
            b.y - camera.y;


        ctx.fillStyle =
            b.color;

        ctx.fillRect(
            x,
            y,
            b.w,
            b.h
        );


        ctx.strokeStyle =
            "#555";

        ctx.strokeRect(
            x,
            y,
            b.w,
            b.h
        );


        ctx.fillStyle =
            "#aaa";

        ctx.font =
            "bold 14px Arial";

        ctx.textAlign =
            "center";


        ctx.fillText(
            b.name,
            x + b.w / 2,
            y + b.h / 2
        );


        ctx.textAlign =
            "left";

    });

}


/* =========================
   PLAYER
========================= */

function drawPlayer() {

    const x =
        player.x - camera.x;

    const y =
        player.y - camera.y;


    /* shadow */

    ctx.fillStyle =
        "rgba(0,0,0,.5)";

    ctx.beginPath();

    ctx.ellipse(
        x,
        y + 12,
        12,
        5,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* body */

    ctx.fillStyle =
        "#f5f5f5";

    ctx.fillRect(
        x - 8,
        y - 8,
        16,
        20
    );


    /* head */

    ctx.fillStyle =
        "#d0d0d0";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 14,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* =========================
   MOVEMENT
========================= */

function updatePlayer() {

    let dx = 0;
    let dy = 0;


    if (
        keys["w"] ||
        keys["arrowup"]
    ) dy -= 1;


    if (
        keys["s"] ||
        keys["arrowdown"]
    ) dy += 1;


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) dx -= 1;


    if (
        keys["d"] ||
        keys["arrowright"]
    ) dx += 1;


    if (dx || dy) {

        const length =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        dx /= length;
        dy /= length;


        player.x +=
            dx * player.speed;

        player.y +=
            dy * player.speed;

    }

}


/* =========================
   TIME
========================= */

let lastTime = Date.now();

function updateTime() {

    const now = Date.now();

    if (now - lastTime < 1000)
        return;

    lastTime = now;

    player.minute += 10;


    if (player.minute >= 60) {

        player.minute = 0;

        player.hour++;

    }


    if (player.hour >= 24) {

        player.hour = 0;

        nextDay();

    }


    updateHUD();

}


function nextDay() {

    /*
       Later this becomes
       the complete daily
       economic simulation.
    */

}


/* =========================
   INTERACTION
========================= */

let nearbyBuilding = null;


function checkNearby() {

    nearbyBuilding = null;


    buildings.forEach(b => {

        const centerX =
            b.x + b.w / 2;

        const centerY =
            b.y + b.h / 2;


        const distance =
            Math.hypot(
                player.x - centerX,
                player.y - centerY
            );


        if (distance < 150) {

            nearbyBuilding = b;

        }

    });


    const box =
        document.getElementById(
            "interaction"
        );


    if (nearbyBuilding) {

        box.style.display =
            "block";

        document
            .getElementById(
                "interactionText"
            )
            .innerText =
            `E — ${nearbyBuilding.name}`;

    } else {

        box.style.display =
            "none";

    }

}


function interact() {

    if (!nearbyBuilding)
        return;


    switch (
        nearbyBuilding.type
    ) {

        case "home":

            message(
                "You are home. Rest restores health."
            );

            player.health =
                Math.min(
                    100,
                    player.health + 5
                );

            player.stress =
                Math.max(
                    0,
                    player.stress - 5
                );

            break;


        case "work":

            message(
                "You worked today. +₹1,000"
            );

            player.cash += 1000;

            player.stress += 3;

            break;


        case "shop":

            if (player.cash >= 500) {

                player.cash -= 500;

                message(
                    "You bought groceries. -₹500"
                );

                player.health =
                    Math.min(
                        100,
                        player.health + 3
                    );

            } else {

                message(
                    "You don't have enough money."
                );

            }

            break;


        case "bank":

            message(
                "The bank is where your debt begins..."
            );

            break;

    }


    updateHUD();

}


/* =========================
   MESSAGE
========================= */

let messageTimer;


function message(text) {

    const el =
        document.getElementById(
            "message"
        );

    el.innerText =
        text;

    el.classList.add("show");


    clearTimeout(messageTimer);


    messageTimer =
        setTimeout(
            () =>
                el.classList.remove("show"),
            2500
        );

}


/* =========================
   HUD
========================= */

function updateHUD() {

    const months = [

        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"

    ];


    document
        .getElementById("date")
        .innerText =
        `${months[player.month - 1]} ${player.year}`;


    document
        .getElementById("time")
        .innerText =
        `${String(player.hour).padStart(2,"0")}:${String(player.minute).padStart(2,"0")}`;


    document
        .getElementById("cash")
        .innerText =
        "₹" +
        player.cash.toLocaleString("en-IN");


    document
        .getElementById("health")
        .innerText =
        player.health;


    document
        .getElementById("stress")
        .innerText =
        player.stress;

}


/* =========================
   GAME LOOP
========================= */

function loop() {

    updatePlayer();

    checkNearby();

    updateTime();

    draw();

    requestAnimationFrame(loop);

}


updateHUD();

loop();
