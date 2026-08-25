/* =====================================================
   BANKRUPT
   ECONOMIC SURVIVAL GAME
   VERSION 2
===================================================== */

let player = {
    month: 1,
    year: 2019,

    cash: 40000,
    income: 25000,

    debt: 0,

    inflation: 4,

    health: 100,
    stress: 10,

    rent: 7000,
    food: 5000,

    jobSecurity: 90,

    knowledge: 0,

    bitcoinKnowledge: 0,

    reputation: 0
};


/* =====================================================
   HISTORICAL STORY EVENTS
===================================================== */

const historicalEvents = [

    /* 2019 */

    {
        year: 2019,
        title: "A Normal Life",
        text:
        "Your salary arrives on time. Prices are manageable and you still believe that saving money is enough.",
        choices: [
            ["Save aggressively", 3000, 0, 2],
            ["Enjoy the month", -3000, 5, -8],
            ["Learn about investing", -1000, 0, 2]
        ]
    },

    {
        year: 2019,
        title: "The Safety Net",
        text:
        "Your parents tell you to keep an emergency fund. You wonder if keeping cash is really the safest choice.",
        choices: [
            ["Build savings", 3000, 0, 0],
            ["Help your family", -3000, 0, -5],
            ["Take financial risk", 5000, -2, 8]
        ]
    },


    /* 2020 */

    {
        year: 2020,
        title: "The World Stops",
        text:
        "Businesses close. Streets become empty. Nobody knows how long it will last.",
        choices: [
            ["Stay home and protect your job", 0, 5, 5],
            ["Take whatever work you can find", 3000, -5, 10],
            ["Use your savings", -5000, 5, -5]
        ]
    },

    {
        year: 2020,
        title: "Job Security",
        text:
        "Your company announces salary cuts. Nobody knows who will be next.",
        choices: [
            ["Accept the pay cut", -3000, 0, 8],
            ["Look for another job", -1000, 0, 12],
            ["Start freelancing", 4000, -5, 15]
        ]
    },

    {
        year: 2020,
        title: "Emergency Fund",
        text:
        "Months of uncertainty have changed the way you think about money.",
        choices: [
            ["Keep cash", 2000, 0, -2],
            ["Buy necessities", -3000, 5, -5],
            ["Invest a small amount", -3000, 0, 5]
        ]
    },


    /* 2021 */

    {
        year: 2021,
        title: "The Recovery",
        text:
        "The economy starts reopening. People begin spending again.",
        choices: [
            ["Work harder", 5000, -5, 10],
            ["Save the recovery money", 3000, 0, 2],
            ["Spend and enjoy", -5000, 8, -10]
        ]
    },

    {
        year: 2021,
        title: "Everything Is Going Up",
        text:
        "Asset prices are rising everywhere. Friends are making money and telling you that you're missing out.",
        choices: [
            ["Ignore the hype", 0, 0, -3],
            ["Invest carefully", -5000, 0, 8],
            ["Go all in", -10000, -5, 20]
        ]
    },


    /* 2022 */

    {
        year: 2022,
        title: "The Inflation Shock",
        text:
        "Fuel, food and rent are becoming noticeably more expensive. Your salary hasn't changed.",
        choices: [
            ["Cut your lifestyle", 3000, -5, 8],
            ["Ask for a raise", 3000, 0, 12],
            ["Borrow to maintain your lifestyle", 5000, 0, 15]
        ]
    },

    {
        year: 2022,
        title: "Your Salary Feels Smaller",
        text:
        "You receive the same amount of money as before. Somehow, it buys less.",
        choices: [
            ["Work overtime", 5000, -5, 12],
            ["Reduce expenses", 2000, -5, 8],
            ["Borrow money", 5000, 0, 15]
        ]
    },

    {
        year: 2022,
        title: "The Interest Rate Problem",
        text:
        "Borrowing becomes more expensive. Your existing debt suddenly matters much more.",
        choices: [
            ["Pay down debt", -5000, 0, -5],
            ["Refinance", 3000, 0, 8],
            ["Ignore it", 0, 0, 15]
        ]
    },


    /* 2023 */

    {
        year: 2023,
        title: "Debt Trap",
        text:
        "Your monthly payments are eating more of your salary.",
        choices: [
            ["Aggressively repay debt", -7000, -3, -8],
            ["Pay minimum", -3000, 0, 5],
            ["Borrow again", 5000, 0, 15]
        ]
    },

    {
        year: 2023,
        title: "The Second Job",
        text:
        "A friend suggests working nights to increase your income.",
        choices: [
            ["Take the second job", 8000, -10, 20],
            ["Protect your health", 0, 5, -8],
            ["Start an online business", 4000, -5, 15]
        ]
    },


    /* 2024 */

    {
        year: 2024,
        title: "Cost Of Living",
        text:
        "Your income has increased over the years. But so have rent, food, transport and everything else.",
        choices: [
            ["Move somewhere cheaper", 3000, -5, 8],
            ["Accept higher rent", -4000, 0, 5],
            ["Move back with family", 5000, 5, -10]
        ]
    },

    {
        year: 2024,
        title: "A Question About Money",
        text:
        "You begin asking a question you never thought about before: what actually gives money its value?",
        choices: [
            ["Ignore the question", 0, 0, 0],
            ["Study monetary history", -500, 0, -5],
            ["Study Bitcoin", -500, 0, -5]
        ]
    },


    /* 2025 */

    {
        year: 2025,
        title: "The Old System",
        text:
        "You read about banking crises, monetary policy and the consequences of financial instability.",
        choices: [
            ["Learn more", 0, 0, -5],
            ["Focus only on earning", 2000, 0, 5],
            ["Stop caring", 0, -5, 10]
        ]
    },

    {
        year: 2025,
        title: "A Strange Idea",
        text:
        "You discover a digital monetary network designed to operate without a central authority.",
        choices: [
            ["Study how it works", -500, 0, -5],
            ["Dismiss it", 0, 0, 0],
            ["Buy a tiny amount", -1000, 0, 5]
        ]
    },

    {
        year: 2025,
        title: "The Newspaper",
        text:
        "You learn about the financial crisis of 2008 and the ideas that followed it.",
        choices: [
            ["Read the history", 0, 0, -8],
            ["Ignore it", 0, 0, 3],
            ["Research alternative money", -500, 0, -10]
        ]
    },


    /* FINAL */

    {
        year: 2026,
        title: "What Is Money?",
        text:
        "After years of surviving inflation, debt and uncertainty, you finally understand that the game was never only about earning more.",
        choices: [
            ["Keep learning", 0, 5, -15],
            ["Return to normal life", 5000, 0, -5],
            ["Build your own financial system", -2000, 0, -10]
        ]
    }

];


/* =====================================================
   START
===================================================== */

function startGame() {

    document
        .getElementById("introScreen")
        .classList.remove("active");

    document
        .getElementById("gameScreen")
        .classList.add("active");

    updateUI();

    startMonth();
}


/* =====================================================
   MONTH ENGINE
===================================================== */

function startMonth() {

    calculateInflation();

    receiveIncome();

    payExpenses();

    calculateDebt();

    updateJobSecurity();

    updateUI();

    checkGameState();

    if (!document
        .getElementById("gameScreen")
        .classList.contains("active")) {
        return;
    }

    showMonthlyEvent();
}


/* =====================================================
   INFLATION
===================================================== */

function calculateInflation() {

    let base;

    if (player.year === 2019) {
        base = 4;
    }

    else if (player.year === 2020) {
        base = 4.5;
    }

    else if (player.year === 2021) {
        base = 5;
    }

    else if (player.year === 2022) {
        base = 7;
    }

    else if (player.year === 2023) {
        base = 6;
    }

    else if (player.year === 2024) {
        base = 5;
    }

    else {
        base = 4;
    }

    player.inflation =
        base + (Math.random() * 1.5 - 0.5);

}


/* =====================================================
   INCOME
===================================================== */

function receiveIncome() {

    let incomeMultiplier = 1;

    /*
       Salary grows slowly.
       Prices can grow faster.
    */

    if (player.year === 2021) {
        incomeMultiplier = 1.03;
    }

    if (player.year === 2022) {
        incomeMultiplier = 1.02;
    }

    if (player.year === 2023) {
        incomeMultiplier = 1.03;
    }

    if (player.year === 2024) {
        incomeMultiplier = 1.04;
    }

    if (player.year >= 2025) {
        incomeMultiplier = 1.04;
    }

    player.income =
        Math.round(
            player.income *
            incomeMultiplier
        );

    player.cash += player.income;

}


/* =====================================================
   EXPENSES
===================================================== */

function payExpenses() {

    let inflationMultiplier =
        1 + (player.inflation / 100);

    let rent =
        Math.round(
            player.rent *
            inflationMultiplier
        );

    let food =
        Math.round(
            player.food *
            inflationMultiplier
        );

    let transport =
        Math.round(
            2500 *
            inflationMultiplier
        );

    let total =
        rent +
        food +
        transport;

    player.cash -= total;

    player.expenses = total;

}


/* =====================================================
   DEBT
===================================================== */

function calculateDebt() {

    if (player.debt <= 0) {
        return;
    }

    /*
       3% monthly interest.
       Debt becomes dangerous very quickly.
    */

    let interest =
        Math.round(
            player.debt * 0.03
        );

    player.debt += interest;

}


/* =====================================================
   JOB SECURITY
===================================================== */

function updateJobSecurity() {

    if (player.year === 2020) {

        player.jobSecurity -= 2;

    }

    if (player.year === 2022) {

        player.jobSecurity -= 1;

    }

    player.jobSecurity =
        Math.max(
            0,
            Math.min(
                100,
                player.jobSecurity
            )
        );

}


/* =====================================================
   EVENT SELECTION
===================================================== */

function showMonthlyEvent() {

    let available =
        historicalEvents.filter(
            event =>
                event.year === player.year
        );

    /*
       If no event exists for current year,
       create a generic event.
    */

    if (available.length === 0) {

        showGenericEvent();

        return;

    }

    let event =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];

    displayEvent(event);

}


/* =====================================================
   GENERIC EVENT
===================================================== */

function showGenericEvent() {

    let generic = {

        title: "Another Ordinary Month",

        text:
        "Nothing dramatic happens this month. But your bills still arrive.",

        choices: [

            [
                "Save money",
                2000,
                0,
                2
            ],

            [
                "Work harder",
                4000,
                -5,
                8
            ],

            [
                "Enjoy yourself",
                -3000,
                5,
                -8
            ]

        ]

    };

    displayEvent(generic);

}


/* =====================================================
   DISPLAY EVENT
===================================================== */

function displayEvent(event) {

    document
        .getElementById("eventTitle")
        .innerText =
        event.title;

    document
        .getElementById("eventText")
        .innerText =
        event.text;

    let choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    event.choices.forEach(
        (choice, index) => {

            let button =
                document.createElement(
                    "button"
                );

            let money =
                choice[1];

            let health =
                choice[2];

            let stress =
                choice[3];


            button.innerHTML = `

                ${choice[0]}

                <small>

                Money:
                ${money >= 0 ? "+" : ""}
                ₹${Math.abs(money)}

                |
                Health:
                ${health >= 0 ? "+" : ""}
                ${health}

                |
                Stress:
                ${stress >= 0 ? "+" : ""}
                ${stress}

                </small>
            `;


            button.onclick =
                function () {

                    makeChoice(
                        choice
                    );

                };


            choices.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   PLAYER CHOICE
===================================================== */

function makeChoice(choice) {

    let money =
        choice[1];

    let health =
        choice[2];

    let stress =
        choice[3];


    /*
       MONEY
    */

    if (money >= 0) {

        player.cash += money;

    }

    else {

        let cost =
            Math.abs(money);

        if (player.cash >= cost) {

            player.cash -= cost;

        }

        else {

            let shortage =
                cost -
                player.cash;

            player.cash = 0;

            player.debt +=
                shortage;

        }

    }


    /*
       HEALTH
    */

    player.health += health;


    /*
       STRESS
    */

    player.stress += stress;


    /*
       SPECIAL KNOWLEDGE
    */

    let currentTitle =
        document
        .getElementById("eventTitle")
        .innerText;


    if (
        currentTitle
        .toLowerCase()
        .includes("bitcoin")
    ) {

        player.bitcoinKnowledge += 10;

    }


    if (
        currentTitle
        .toLowerCase()
        .includes("money")
        ||
        currentTitle
        .toLowerCase()
        .includes("history")
    ) {

        player.knowledge += 5;

    }


    /*
       LIMITS
    */

    player.health =
        Math.max(
            0,
            Math.min(
                100,
                player.health
            )
        );

    player.stress =
        Math.max(
            0,
            Math.min(
                100,
                player.stress
            )
        );


    addLog(
        `You chose: ${choice[0]}`
    );


    /*
       NEXT MONTH
    */

    advanceMonth();

}


/* =====================================================
   ADVANCE
===================================================== */

function advanceMonth() {

    player.month++;

    /*
       12 months = new year
    */

    if (
        player.month > 12
    ) {

        player.month = 1;

        player.year++;

    }


    /*
       Game ends after 2026 story.
    */

    if (
        player.year > 2026
    ) {

        finishGame();

        return;

    }


    startMonth();

}


/* =====================================================
   GAME STATE
===================================================== */

function checkGameState() {

    /*
       BANKRUPTCY
    */

    if (
        player.cash <= 0 &&
        player.debt >= 100000
    ) {

        endGame(
            "BANKRUPT",
            "Your debt has grown faster than your ability to repay it.",
            "💀"
        );

        return;

    }


    /*
       HEALTH
    */

    if (
        player.health <= 0
    ) {

        endGame(
            "YOU BROKE DOWN",
            "The financial pressure finally destroyed your ability to keep going.",
            "🫥"
        );

        return;

    }


    /*
       STRESS
    */

    if (
        player.stress >= 100
    ) {

        endGame(
            "MENTAL BREAKDOWN",
            "You survived the bills, but the pressure became unbearable.",
            "😵"
        );

        return;

    }

}


/* =====================================================
   FINAL ENDING
===================================================== */

function finishGame() {

    let title;
    let text;
    let icon;


    /*
       BEST ENDING
    */

    if (
        player.debt < 20000 &&
        player.cash > 50000 &&
        player.knowledge >= 15
    ) {

        title =
            "FINANCIAL SURVIVOR";

        text =
            "You didn't become rich. You became harder to break.";

        icon =
            "🏆";

    }


    /*
       BITCOIN DISCOVERY ENDING
    */

    else if (
        player.bitcoinKnowledge >= 20
    ) {

        title =
            "THE OTHER SIDE OF MONEY";

        text =
            "You started looking beyond the traditional financial system. The question was no longer only how to earn money — but who controls it.";

        icon =
            "₿";

    }


    /*
       NORMAL SURVIVAL
    */

    else {

        title =
            "YOU SURVIVED";

        text =
            "Five years passed. You learned that surviving an economy can be harder than surviving a job.";

        icon =
            "🧍";

    }


    endGame(
        title,
        text,
        icon
    );

}


/* =====================================================
   END SCREEN
===================================================== */

function endGame(
    title,
    text,
    icon
) {

    document
        .getElementById("gameScreen")
        .classList.remove("active");

    document
        .getElementById("endScreen")
        .classList.add("active");


    document
        .getElementById("endIcon")
        .innerText =
        icon;


    document
        .getElementById("endTitle")
        .innerText =
        title;


    document
        .getElementById("endText")
        .innerText =
        text;


    document
        .getElementById("finalMonth")
        .innerText =
        player.year;


    document
        .getElementById("finalCash")
        .innerText =
        money(player.cash);


    document
        .getElementById("finalDebt")
        .innerText =
        money(player.debt);

}


/* =====================================================
   UI
===================================================== */

function updateUI() {

    document
        .getElementById("month")
        .innerText =
        `${player.month}/${player.year}`;


    document
        .getElementById("cash")
        .innerText =
        money(player.cash);


    document
        .getElementById("income")
        .innerText =
        money(player.income);


    document
        .getElementById("debt")
        .innerText =
        money(player.debt);


    document
        .getElementById("inflation")
        .innerText =
        player.inflation
        .toFixed(1)
        + "%";


    document
        .getElementById("health")
        .innerText =
        player.health;


    document
        .getElementById("stress")
        .innerText =
        player.stress;


    document
        .getElementById("healthBar")
        .style.width =
        player.health
        + "%";


    document
        .getElementById("stressBar")
        .style.width =
        player.stress
        + "%";


    document
        .getElementById("storyDate")
        .innerText =
        `${monthName(player.month)} ${player.year}`;

}


/* =====================================================
   MONTH NAME
===================================================== */

function monthName(month) {

    const names = [

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

    return names[
        month - 1
    ];

}


/* =====================================================
   MONEY
===================================================== */

function money(value) {

    return (
        "₹" +
        Math.round(value)
            .toLocaleString("en-IN")
    );

}


/* =====================================================
   LOG
===================================================== */

function addLog(text) {

    let log =
        document
        .getElementById("logContent");


    let entry =
        document.createElement(
            "div"
        );


    entry.innerText =
        "› " + text;


    log.prepend(
        entry
    );

}
