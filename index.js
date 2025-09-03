// ---- imports and helpers ----
import GAMES_DATA from "./games.js";
const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}

// ---- Challenge 3: render game cards ----
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (const game of games) {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.innerHTML = `
      <img class="game-img" src="${game.img}" alt="${game.name}" />
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p>Raised: $${game.pledged.toLocaleString("en-US")} of $${game.goal.toLocaleString("en-US")}</p>
      <p>Backers: ${game.backers.toLocaleString("en-US")}</p>
    `;
    gamesContainer.appendChild(card);
  }
}

// initial render
addGamesToPage(GAMES_JSON);

// ---- Challenge 4: stats (reduce + toLocaleString) ----
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, g) => acc + g.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString("en-US");

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, g) => acc + g.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString("en-US");

// ---- Challenge 5: filters ----
// function filterUnfundedOnly() {
//   deleteChildElements(gamesContainer);
//   const unfunded = GAMES_JSON.filter(g => g.pledged < g.goal);
//   addGamesToPage(unfunded);
// }

// function filterFundedOnly() {
//   deleteChildElements(gamesContainer);
//   const funded = GAMES_JSON.filter(g => g.pledged >= g.goal);
//   addGamesToPage(funded);
// }

// function showAllGames() {
//   deleteChildElements(gamesContainer);
//   addGamesToPage(GAMES_JSON);
// }

// // buttons
// document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
// document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
// document.getElementById("all-btn").addEventListener("click", showAllGames);

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  const unfunded = GAMES_JSON.filter(g => g.pledged < g.goal);
  addGamesToPage(unfunded);
  console.log("unfunded count:", unfunded.length); // -> 7
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  const funded = GAMES_JSON.filter(g => g.pledged >= g.goal);
  addGamesToPage(funded);
  console.log("funded count:", funded.length); // -> 4
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

// buttons
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);


// ---- Challenge 6: company blurb ----
// const descriptionContainer = document.getElementById("description-container");
// const unfundedCount = GAMES_JSON.filter(g => g.pledged < g.goal).length;

// const blurb = document.createElement("p");
// blurb.innerHTML = `
//   Sea Monster has raised $${totalRaised.toLocaleString("en-US")} across
//   ${GAMES_JSON.length.toLocaleString("en-US")} games.
//   ${unfundedCount} ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded.
//   Thanks for ${totalContributions.toLocaleString("en-US")} total contributions.
// `;
// descriptionContainer.appendChild(blurb);

// Challenge 6

const descriptionContainer = document.getElementById("description-container")

// count unfunded games
const unfundedCount = GAMES_JSON.reduce((acc, g) => acc + (g.pledged < g.goal ? 1 : 0), 0)

// totals (safe to compute here in case you did not keep earlier vars)
const totalRaisedBlurb = GAMES_JSON.reduce((acc, g) => acc + g.pledged, 0)
const totalGames  = GAMES_JSON.length

// build the sentence with a ternary for correct grammar
const summaryP = document.createElement("p")
summaryP.innerHTML = `
  A total of $${totalRaisedBlurb.toLocaleString("en-US")} has been raised for
  ${totalGames.toLocaleString("en-US")} games.
  Currently, ${unfundedCount} ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded.
  We need your help to fund these amazing games!
`
descriptionContainer.appendChild(summaryP)


// ---- Challenge 7: top two games ----
// helper to avoid repeated formatting
const money = n => `$${n.toLocaleString("en-US")}`;

function renderTopTwo(games) {
  // guard + avoid dupes if this runs more than once
  if (!games?.length) return;
  [firstGameContainer, secondGameContainer].forEach(el => {
    while (el.firstChild) el.removeChild(el.firstChild);
  });

  const [top, second] = [...games].sort((a, b) => b.pledged - a.pledged);

  const p1 = document.createElement("p");
  p1.innerHTML = `<strong>${top.name}</strong> (${money(top.pledged)})`;
  firstGameContainer.appendChild(p1);

  if (second) {
    const p2 = document.createElement("p");
    p2.innerHTML = `<strong>${second.name}</strong> (${money(second.pledged)})`;
    secondGameContainer.appendChild(p2);
  }
}

// const firstGameContainer = document.getElementById("first-game");
// const secondGameContainer = document.getElementById("second-game");

// const [topGame, runnerUp] = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// const topEl = document.createElement("p");
// topEl.textContent = `${topGame.name} ($${topGame.pledged.toLocaleString("en-US")})`;
// firstGameContainer.appendChild(topEl);

// const secondEl = document.createElement("p");
// secondEl.textContent = `${runnerUp.name} ($${runnerUp.pledged.toLocaleString("en-US")})`;
// secondGameContainer.appendChild(secondEl);






// /*****************************************************************************
//  * Challenge 2: Review the provided code. The provided code includes:
//  * -> Statements that import data from games.js
//  * -> A function that deletes all child elements from a parent element in the DOM
// */

// // import the JSON data about the crowd funded games from the games.js file
// import GAMES_DATA from './games.js';

// // create a list of objects to store the data about the games using JSON.parse
// const GAMES_JSON = JSON.parse(GAMES_DATA)

// // remove all child elements from a parent element in the DOM
// function deleteChildElements(parent) {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }

// /*****************************************************************************
//  * Challenge 3: Add data about each game as a card to the games-container
//  * Skills used: DOM manipulation, for loops, template literals, functions
// */

// // grab the element with the id games-container
// const gamesContainer = document.getElementById("games-container");

// // create a function that adds all data from the games array to the page
// function addGamesToPage(games) {

//     // --- Challenge 3: render game cards ---
// const gamesContainer = document.getElementById("games-container");

// function addGamesToPage(games) {
//   for (const game of games) {
//     const card = document.createElement("div");
//     card.classList.add("game-card");
//     card.innerHTML = `
//       <img class="game-img" src="${game.img}" alt="${game.name}" />
//       <h3>${game.name}</h3>
//       <p>${game.description}</p>
//       <p>Raised: $${game.pledged.toLocaleString()} of $${game.goal.toLocaleString()}</p>
//       <p>Backers: ${game.backers.toLocaleString()}</p>
//     `;
//     gamesContainer.appendChild(card);
//   }
// }

// // add all games initially
// addGamesToPage(GAMES_JSON);

// // --- Challenge 4: stats ---
// const contributionsCard = document.getElementById("num-contributions");
// const totalContributions = GAMES_JSON.reduce((sum, g) => sum + g.backers, 0);
// contributionsCard.innerHTML = totalContributions.toLocaleString();

// const raisedCard = document.getElementById("total-raised");
// const totalRaised = GAMES_JSON.reduce((sum, g) => sum + g.pledged, 0);
// raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// const gamesCard = document.getElementById("num-games");
// gamesCard.innerHTML = GAMES_JSON.length.toString();

// // --- Challenge 5: filters ---
// function filterUnfundedOnly() {
//   deleteChildElements(gamesContainer);
//   const unfunded = GAMES_JSON.filter(g => g.pledged < g.goal);
//   addGamesToPage(unfunded);
// }

// function filterFundedOnly() {
//   deleteChildElements(gamesContainer);
//   const funded = GAMES_JSON.filter(g => g.pledged >= g.goal);
//   addGamesToPage(funded);
// }

// function showAllGames() {
//   deleteChildElements(gamesContainer);
//   addGamesToPage(GAMES_JSON);
// }

// // buttons
// const unfundedBtn = document.getElementById("unfunded-btn");
// const fundedBtn = document.getElementById("funded-btn");
// const allBtn = document.getElementById("all-btn");

// unfundedBtn.addEventListener("click", filterUnfundedOnly);
// fundedBtn.addEventListener("click", filterFundedOnly);
// allBtn.addEventListener("click", showAllGames);

// // --- Challenge 6: company blurb ---
// const descriptionContainer = document.getElementById("description-container");
// const unfundedCount = GAMES_JSON.filter(g => g.pledged < g.goal).length;

// const desc = document.createElement("p");
// desc.innerHTML = `
//   Sea Monster has raised $${totalRaised.toLocaleString()} across ${GAMES_JSON.length} games.
//   ${unfundedCount} ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded.
//   Thanks for ${totalContributions.toLocaleString()} total contributions.
// `;
// descriptionContainer.appendChild(desc);

// // --- Challenge 7: top two games ---
// const firstGameContainer = document.getElementById("first-game");
// const secondGameContainer = document.getElementById("second-game");

// const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);
// const [topGame, runnerUp] = [...sortedGames];

// const topEl = document.createElement("p");
// topEl.textContent = `${topGame.name} ($${topGame.pledged.toLocaleString()})`;
// firstGameContainer.appendChild(topEl);

// const secondEl = document.createElement("p");
// secondEl.textContent = `${runnerUp.name} ($${runnerUp.pledged.toLocaleString()})`;
// secondGameContainer.appendChild(secondEl);
//     // loop over each item in the data


//         // create a new div element, which will become the game card


//         // add the class game-card to the list


//         // set the inner HTML using a template literal to display some info 
//         // about each game
//         // TIP: if your images are not displaying, make sure there is space
//         // between the end of the src attribute and the end of the tag ("/>")


//         // append the game to the games-container

// }

// // call the function we just defined using the correct variable
// // later, we'll call this function using a different list of games


// /*************************************************************************************
//  * Challenge 4: Create the summary statistics at the top of the page displaying the
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: arrow functions, reduce, template literals
// */

// // // grab the contributions card element
// // const contributionsCard = document.getElementById("num-contributions");

// // // use reduce() to count the number of total contributions by summing the backers


// // // set the inner HTML using a template literal and toLocaleString to get a number with commas


// // // grab the amount raised card, then use reduce() to find the total amount raised
// // const raisedCard = document.getElementById("total-raised");

// // // set inner HTML using template literal


// // // grab number of games card and set its inner HTML
// // const gamesCard = document.getElementById("num-games");


// // /*************************************************************************************
// //  * Challenge 5: Add functions to filter the funded and unfunded games
// //  * total number of contributions, amount donated, and number of games on the site.
// //  * Skills used: functions, filter
// // */

// // // show only games that do not yet have enough funding
// // function filterUnfundedOnly() {
// //     deleteChildElements(gamesContainer);

// //     // use filter() to get a list of games that have not yet met their goal


// //     // use the function we previously created to add the unfunded games to the DOM

// // }

// // // show only games that are fully funded
// // function filterFundedOnly() {
// //     deleteChildElements(gamesContainer);

// //     // use filter() to get a list of games that have met or exceeded their goal


// //     // use the function we previously created to add unfunded games to the DOM

// // }

// // // show all games
// // function showAllGames() {
// //     deleteChildElements(gamesContainer);

// //     // add all games from the JSON data to the DOM

// // }

// // // select each button in the "Our Games" section
// // const unfundedBtn = document.getElementById("unfunded-btn");
// // const fundedBtn = document.getElementById("funded-btn");
// // const allBtn = document.getElementById("all-btn");

// // // add event listeners with the correct functions to each button


// // /*************************************************************************************
// //  * Challenge 6: Add more information at the top of the page about the company.
// //  * Skills used: template literals, ternary operator
// // */

// // // grab the description container
// // const descriptionContainer = document.getElementById("description-container");

// // // use filter or reduce to count the number of unfunded games


// // // create a string that explains the number of unfunded games using the ternary operator


// // // create a new DOM element containing the template string and append it to the description container

// // /************************************************************************************
// //  * Challenge 7: Select & display the top 2 games
// //  * Skills used: spread operator, destructuring, template literals, sort 
// //  */

// // const firstGameContainer = document.getElementById("first-game");
// // const secondGameContainer = document.getElementById("second-game");

// // const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
// //     return item2.pledged - item1.pledged;
// // });

// // use destructuring and the spread operator to grab the first and second games

// // create a new element to hold the name of the top pledge game, then append it to the correct element

// // do the same for the runner up item