const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W, H;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


/* =====================================================
   PLAYER
===================================================== */

const player = {
    x: 520,
    y: 450,

    size: 18,
    speed: 3,

    cash: 40000,
    income: 25000,
    debt: 0,

    health: 100,
    stress: 10,

    month: 1,
    year: 2019,

    hour: 8,
    minute: 0,

    workedToday: false,
    sleptToday: false
};


/* =====================================================
   INPUT
===================================================== */

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

    const el = document.getElementById(id);

    el.addEventListener("touchstart", e => {
        e.preventDefault();
        keys[key] = true;
    });

    el.addEventListener("touchend", e => {
        e.preventDefault();
        keys[key] = false;
    });

    el.addEventListener("mousedown", () => {
        keys[key] = true;
    });

    el.addEventListener("mouseup", () => {
        keys[key] = false;
    });
}

button("up", "w");
button("down", "s");
button("left", "a");
button("right", "d");

document
    .getElementById("interact")
    .addEventListener("click", interact);


/* =====================================================
   WORLD
===================================================== */

const buildings = [

    {
        name: "YOUR APARTMENT",
        x: 100,
        y: 180,
        w: 230,
        h: 150,
        type: "home"
    },

    {
        name: "OFFICE",
        x: 650,
        y: 150,
        w: 250,
        h: 180,
        type: "work"
    },

    {
        name: "GROCERY SHOP",
        x: 100,
        y: 570,
        w: 260,
        h: 150,
        type: "shop"
    },

    {
        name: "BANK",
        x: 700,
        y: 570,
        w: 250,
        h: 150,
        type: "bank"
    },

    {
        name: "BUS STOP",
        x: 420,
        y: 650,
        w: 130,
        h: 70,
        type: "bus"
    }

];


/* =====================================================
   NPCs
===================================================== */

const npcs = [

    {
        x: 470,
        y: 350,
        name: "Neighbour",
        speed: 0.5,
        direction: 1
    },

    {
        x: 580,
        y: 520,
        name: "Worker",
        speed: 0.7,
        direction: -1
    },

    {
        x: 390,
        y: 450,
        name: "Shopper",
        speed: 0.4,
        direction: 1
    },

    {
        x: 600,
        y: 300,
        name: "Office Worker",
        speed: 0.6,
        direction: -1
    }

];


/* =====================================================
   CAMERA
===================================================== */

const camera = {
    x: 0,
    y: 0
};


/* =====================================================
   COLLISION
===================================================== */

function collides(x, y) {

    const half = player.size / 2;

    for (const b of buildings) {

        if (
            x + half > b.x &&
            x - half < b.x + b.w &&
            y + half > b.y &&
            y - half < b.y + b.h
        ) {
            return true;
        }

    }

    return false;
}


/* =====================================================
   PLAYER MOVEMENT
===================================================== */

function updatePlayer() {

    let dx = 0;
    let dy = 0;

    if (keys["w"] || keys["arrowup"])
        dy -= 1;

    if (keys["s"] || keys["arrowdown"])
        dy += 1;

    if (keys["a"] || keys["arrowleft"])
        dx -= 1;

    if (keys["d"] || keys["arrowright"])
        dx += 1;


    if (dx || dy) {

        const length =
            Math.sqrt(dx * dx + dy * dy);

        dx /= length;
        dy /= length;


        const newX =
            player.x + dx * player.speed;

        const newY =
            player.y + dy * player.speed;


        if (!collides(newX, player.y)) {
            player.x = newX;
        }

        if (!collides(player.x, newY)) {
            player.y = newY;
        }

    }

}


/* =====================================================
   NPC MOVEMENT
===================================================== */

function updateNPCs() {

    npcs.forEach(npc => {

        npc.x +=
            npc.speed * npc.direction;


        if (npc.x < 350) {
            npc.direction = 1;
        }


        if (npc.x > 620) {
            npc.direction = -1;
        }

    });

}


/* =====================================================
   DRAW WORLD
===================================================== */

function drawWorld() {

    ctx.fillStyle = "#101010";

    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    /* Roads */

    ctx.fillStyle = "#181818";

    ctx.fillRect(
        0 - camera.x,
        360 - camera.y,
        1200,
        120
    );

    ctx.fillRect(
        360 - camera.x,
        0 - camera.y,
        120,
        900
    );


    /* Road markings */

    ctx.strokeStyle = "#292929";
    ctx.lineWidth = 2;

    for (
        let x = 0;
        x < 1200;
        x += 70
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x - camera.x,
            420 - camera.y
        );

        ctx.lineTo(
            x + 35 - camera.x,
            420 - camera.y
        );

        ctx.stroke();

    }


    for (
        let y = 0;
        y < 900;
        y += 70
    ) {

        ctx.beginPath();

        ctx.moveTo(
            420 - camera.x,
            y - camera.y
        );

        ctx.lineTo(
            420 - camera.x,
            y + 35 - camera.y
        );

        ctx.stroke();

    }

}


/* =====================================================
   DRAW BUILDINGS
===================================================== */

function drawBuildings() {

    buildings.forEach(b => {

        const x = b.x - camera.x;
        const y = b.y - camera.y;


        ctx.fillStyle = "#292929";

        ctx.fillRect(
            x,
            y,
            b.w,
            b.h
        );


        ctx.strokeStyle = "#505050";

        ctx.strokeRect(
            x,
            y,
            b.w,
            b.h
        );


        ctx.fillStyle = "#eeeeee";

        ctx.font = "bold 13px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            b.name,
            x + b.w / 2,
            y + b.h / 2
        );


        ctx.textAlign = "left";


        /* windows */

        if (
            b.type !== "bus"
        ) {

            ctx.fillStyle = "#151515";

            for (
                let wx = x + 25;
                wx < x + b.w - 15;
                wx += 45
            ) {

                ctx.fillRect(
                    wx,
                    y + 25,
                    18,
                    18
                );

            }

        }

    });

}


/* =====================================================
   DRAW NPCs
===================================================== */

function drawNPCs() {

    npcs.forEach(npc => {

        const x =
            npc.x - camera.x;

        const y =
            npc.y - camera.y;


        /* body */

        ctx.fillStyle = "#777";

        ctx.fillRect(
            x - 7,
            y - 5,
            14,
            18
        );


        /* head */

        ctx.fillStyle = "#aaa";

        ctx.beginPath();

        ctx.arc(
            x,
            y - 11,
            7,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

}


/* =====================================================
   DRAW PLAYER
===================================================== */

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


    /* direction marker */

    ctx.fillStyle = "#fff";

    ctx.fillRect(
        x + 5,
        y - 15,
        4,
        3
    );

}


/* =====================================================
   TIME
===================================================== */

let lastTime = Date.now();

function updateTime() {

    const now = Date.now();

    if (now - lastTime < 1000)
        return;

    lastTime = now;


    /* 10 minutes of game time
       = 1 real second */

    player.minute += 10;


    if (player.minute >= 60) {

        player.minute = 0;

        player.hour++;

    }


    if (player.hour >= 24) {

        player.hour = 0;

        newDay();

    }


    updateHUD();

}


/* =====================================================
   NEW DAY
===================================================== */

function newDay() {

    player.workedToday = false;
    player.sleptToday = false;


    /* Daily food cost */

    player.cash -= 180;


    if (player.cash < 0) {

        player.debt +=
            Math.abs(player.cash);

        player.cash = 0;

        player.stress += 5;

    }


    /* Stress affects health */

    if (player.stress > 70) {

        player.health -= 2;

    }


    /* Monthly reset */

    if (
        player.month === 12 &&
        player.hour === 0
    ) {

        player.month = 1;
        player.year++;

    }

}


/* =====================================================
   INTERACTION
===================================================== */

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


        if (distance < 140) {

            nearbyBuilding = b;

        }

    });


    const box =
        document.getElementById(
            "interaction"
        );


    if (nearbyBuilding) {

        box.style.display = "block";


        document
            .getElementById(
                "interactionText"
            )
            .innerText =
            `E — ${nearbyBuilding.name}`;

    } else {

        box.style.display = "none";

    }

}


/* =====================================================
   INTERACT
===================================================== */

function interact() {

    if (!nearbyBuilding)
        return;


    switch (
        nearbyBuilding.type
    ) {

        case "home":

            sleep();

            break;


        case "work":

            work();

            break;


        case "shop":

            shop();

            break;


        case "bank":

            bank();

            break;


        case "bus":

            bus();

            break;

    }


    updateHUD();

}


/* =====================================================
   HOME
===================================================== */

function sleep() {

    if (
        player.hour < 20 &&
        player.hour > 6
    ) {

        message(
            "It's too early to sleep."
        );

        return;

    }


    player.hour = 7;
    player.minute = 0;

    player.health =
        Math.min(
            100,
            player.health + 20
        );

    player.stress =
        Math.max(
            0,
            player.stress - 20
        );

    player.sleptToday = true;


    message(
        "You slept. Health restored."
    );

}


/* =====================================================
   WORK
===================================================== */

function work() {

    if (
        player.hour < 9 ||
        player.hour >= 18
    ) {

        message(
            "The office is closed."
        );

        return;

    }


    if (player.workedToday) {

        message(
            "You've already worked today."
        );

        return;

    }


    player.cash +=
        Math.round(
            player.income / 22
        );


    player.stress += 4;

    player.health -= 1;

    player.workedToday = true;


    message(
        "You worked today. Money earned."
    );

}


/* =====================================================
   SHOP
===================================================== */

function shop() {

    if (player.cash < 500) {

        message(
            "You don't have enough money."
        );

        return;

    }


    player.cash -= 500;

    player.health =
        Math.min(
            100,
            player.health + 5
        );

    player.stress =
        Math.max(
            0,
            player.stress - 2
        );


    message(
        "Groceries bought. -₹500"
    );

}


/* =====================================================
   BANK
===================================================== */

function bank() {

    if (player.debt > 0) {

        message(
            `Current debt: ₹${player.debt.toLocaleString("en-IN")}`
        );

        return;

    }


    player.cash += 10000;

    player.debt += 10000;

    player.stress += 8;


    message(
        "You borrowed ₹10,000."
    );

}


/* =====================================================
   BUS
===================================================== */

function bus() {

    player.stress =
        Math.max(
            0,
            player.stress - 2
        );


    message(
        "You took the bus. Transport cost ₹100."
    );


    if (player.cash >= 100) {

        player.cash -= 100;

    } else {

        player.debt += 100;

    }

}


/* =====================================================
   CAMERA
===================================================== */

function updateCamera() {

    camera.x =
        player.x - W / 2;

    camera.y =
        player.y - H / 2;


    camera.x =
        Math.max(
            0,
            Math.min(
                camera.x,
                1200 - W
            )
        );


    camera.y =
        Math.max(
            0,
            Math.min(
                camera.y,
                900 - H
            )
        );

}


/* =====================================================
   HUD
===================================================== */

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
        `${String(player.hour).padStart(2, "0")}:${String(player.minute).padStart(2, "0")}`;


    document
        .getElementById("cash")
        .innerText =
        "₹" +
        Math.max(
            0,
            player.cash
        ).toLocaleString("en-IN");


    document
        .getElementById("health")
        .innerText =
        Math.max(
            0,
            player.health
        );


    document
        .getElementById("stress")
        .innerText =
        Math.min(
            100,
            player.stress
        );

}


/* =====================================================
   MESSAGE
===================================================== */

let messageTimer;

function message(text) {

    const el =
        document.getElementById(
            "message"
        );

    el.innerText = text;

    el.classList.add("show");


    clearTimeout(messageTimer);


    messageTimer =
        setTimeout(() => {

            el.classList.remove("show");

        }, 2500);

}


/* =====================================================
   DAY / NIGHT
===================================================== */

function drawNight() {

    let alpha = 0;


    if (
        player.hour >= 20 ||
        player.hour < 6
    ) {

        alpha = 0.45;

    }

    else if (
        player.hour >= 18
    ) {

        alpha = 0.25;

    }


    if (alpha > 0) {

        ctx.fillStyle =
            `rgba(0,0,20,${alpha})`;

        ctx.fillRect(
            0,
            0,
            W,
            H
        );

    }

}


/* =====================================================
   GAME LOOP
===================================================== */

function loop() {

    updatePlayer();

    updateNPCs();

    updateTime();

    checkNearby();

    updateCamera();


    drawWorld();

    drawBuildings();

    drawNPCs();

    drawPlayer();

    drawNight();


    requestAnimationFrame(loop);

}


updateHUD();

loop();
