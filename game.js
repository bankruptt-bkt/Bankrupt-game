/* =========================================
   BANKRUPT
   SURVIVAL GAME — VERSION 1
========================================= */


/* PLAYER */

let player = {

    month: 1,

    cash: 40000,

    income: 25000,

    debt: 0,

    inflation: 4,

    health: 100,

    stress: 10,

    rent: 7000,

    food: 5000,

    expenses: 12000,

    overtime: false

};


/* EVENTS */

const events = [

    {
        title: "The Price of Food Rises",
        text: "Your local shopkeeper says food prices have increased again.",
        choices: [
            ["Accept the new prices", 0, 0, 0],
            ["Buy cheaper food", -2000, 5, 5],
            ["Borrow money", 3000, 0, 10]
        ]
    },

    {
        title: "Your Boss Has An Offer",
        text: "Your boss offers overtime. More money, but fewer hours to rest.",
        choices: [
            ["Take the overtime", 5000, 0, 12],
            ["Refuse", 0, 0, -5],
            ["Ask for a raise", 2000, 0, 8]
        ]
    },

    {
        title: "Unexpected Medical Expense",
        text: "You suddenly need medical treatment.",
        choices: [
            ["Pay the bill", -4000, -10, 0],
            ["Borrow money", 4000, -5, 8],
            ["Ignore it", 0, -20, 5]
        ]
    },

    {
        title: "Rent Increase",
        text: "Your landlord informs you that rent is increasing.",
        choices: [
            ["Stay", -2000, 0, 5],
            ["Move somewhere cheaper", 1000, -5, 8],
            ["Borrow for the deposit", 5000, 0, 12]
        ]
    },

    {
        title: "A Friend Needs Help",
        text: "A close friend has lost their job and asks you for money.",
        choices: [
            ["Help them", -3000, 0, -8],
            ["Give a small amount", -1000, 0, -3],
            ["Refuse", 0, 0, 5]
        ]
    },

    {
        title: "The Economy Slows Down",
        text: "Businesses are cutting costs. People are worried about their jobs.",
        choices: [
            ["Keep working normally", 0, 0, 5],
            ["Find another job", -2000, 0, 10],
            ["Start freelancing", 4000, -5, 12]
        ]
    },

    {
        title: "Your Savings Look Smaller",
        text: "You realize that the money you saved buys less than it used to.",
        choices: [
            ["Keep saving cash", 0, 0, 2],
            ["Buy something useful", -3000, 5, -5],
            ["Take a financial risk", 7000, -5, 15]
        ]
    }

];


/* START */

function startGame() {

    document.getElementById("introScreen").classList.remove("active");

    document.getElementById("gameScreen").classList.add("active");

    updateUI();

    nextMonth();

}


/* NEXT MONTH */

function nextMonth() {

    updateInflation();

    receiveSalary();

    payMonthlyExpenses();

    applyDebtInterest();

    updateUI();

    checkGameState();

    if (player.month > 1) {

        randomEvent();

    }

}


/* INFLATION */

function updateInflation() {

    let change = (Math.random() * 2) - 0.5;

    player.inflation += change;

    if (player.inflation < 2) {

        player.inflation = 2;

    }

}


/* SALARY */

function receiveSalary() {

    player.cash += player.income;

}


/* EXPENSES */

function payMonthlyExpenses() {

    let inflationMultiplier =
        1 + (player.inflation / 100);

    let foodCost =
        Math.round(player.food * inflationMultiplier);

    let rentCost =
        Math.round(player.rent * inflationMultiplier);

    let total =
        foodCost + rentCost;

    player.cash -= total;

    player.expenses = total;

}


/* DEBT */

function applyDebtInterest() {

    if (player.debt > 0) {

        let interest =
            Math.round(player.debt * 0.03);

        player.debt += interest;

    }

}


/* RANDOM EVENT */

function randomEvent() {

    let event =
        events[Math.floor(Math.random() * events.length)];

    showEvent(event);

}


/* SHOW EVENT */

function showEvent(event) {

    document.getElementById("eventTitle").innerText =
        event.title;

    document.getElementById("eventText").innerText =
        event.text;

    let choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    event.choices.forEach((choice, index) => {

        let button =
            document.createElement("button");

        button.innerHTML = `
            ${choice[0]}
            <small>
                ${choice[1] >= 0 ? "+" : ""}
                ₹${Math.abs(choice[1])}
                / Health ${choice[2] >= 0 ? "+" : ""}
                ${choice[2]}
                / Stress ${choice[3] >= 0 ? "+" : ""}
                ${choice[3]}
            </small>
        `;

        button.onclick = function () {

            applyChoice(choice);

        };

        choices.appendChild(button);

    });

}


/* APPLY CHOICE */

function applyChoice(choice) {

    let money =
        choice[1];

    let health =
        choice[2];

    let stress =
        choice[3];


    /* Positive money can be income
       Negative money = spending */

    if (money >= 0) {

        player.cash += money;

    } else {

        let cost =
            Math.abs(money);

        if (player.cash >= cost) {

            player.cash -= cost;

        } else {

            player.debt +=
                cost - player.cash;

            player.cash = 0;

        }

    }


    player.health += health;

    player.stress += stress;


    /* LIMITS */

    player.health =
        Math.max(0, Math.min(100, player.health));

    player.stress =
        Math.max(0, Math.min(100, player.stress));


    addLog(
        `Month ${player.month}: ${money >= 0 ? "+" : ""}₹${money}`
    );


    /* NEXT MONTH */

    player.month++;

    nextMonth();

}


/* UPDATE UI */

function updateUI() {

    document.getElementById("month")
        .innerText = player.month;

    document.getElementById("cash")
        .innerText = money(player.cash);

    document.getElementById("income")
        .innerText = money(player.income);

    document.getElementById("debt")
        .innerText = money(player.debt);

    document.getElementById("inflation")
        .innerText =
        player.inflation.toFixed(1) + "%";

    document.getElementById("health")
        .innerText =
        player.health;

    document.getElementById("stress")
        .innerText =
        player.stress;


    document.getElementById("healthBar")
        .style.width =
        player.health + "%";

    document.getElementById("stressBar")
        .style.width =
        player.stress + "%";


    let year =
        2019 +
        Math.floor((player.month - 1) / 12);

    let monthNames = [

        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"

    ];

    let monthIndex =
        (player.month - 1) % 12;

    document.getElementById("storyDate")
        .innerText =
        `${monthNames[monthIndex]} ${year}`;

}


/* MONEY FORMAT */

function money(value) {

    return "₹" +
        Math.round(value)
            .toLocaleString("en-IN");

}


/* LOG */

function addLog(text) {

    let log =
        document.getElementById("logContent");

    let entry =
        document.createElement("div");

    entry.innerText =
        "› " + text;

    log.prepend(entry);

}


/* GAME STATE */

function checkGameState() {

    /* BANKRUPT */

    if (
        player.cash <= 0 &&
        player.debt > 100000
    ) {

        endGame(
            "BANKRUPT",
            "Your debt has become impossible to manage.",
            "💀"
        );

        return;

    }


    /* HEALTH */

    if (player.health <= 0) {

        endGame(
            "YOU BROKE DOWN",
            "The pressure became too much.",
            "🫥"
        );

        return;

    }


    /* STRESS */

    if (player.stress >= 100) {

        endGame(
            "MENTAL BREAKDOWN",
            "Money wasn't the only thing you lost.",
            "😵"
        );

        return;

    }


    /* SURVIVAL */

    if (player.month >= 61) {

        endGame(
            "YOU SURVIVED",
            "Five years passed. You made it through.",
            "🏆"
        );

    }

}


/* END */

function endGame(title, text, icon) {

    document.getElementById("gameScreen")
        .classList.remove("active");

    document.getElementById("endScreen")
        .classList.add("active");


    document.getElementById("endIcon")
        .innerText = icon;

    document.getElementById("endTitle")
        .innerText = title;

    document.getElementById("endText")
        .innerText = text;

    document.getElementById("finalMonth")
        .innerText = player.month;

    document.getElementById("finalCash")
        .innerText =
        money(player.cash);

    document.getElementById("finalDebt")
        .innerText =
        money(player.debt);

}
