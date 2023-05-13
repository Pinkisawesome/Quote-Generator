"use strict";
const container = document.querySelector(".container");
const text = document.querySelector(".text__content");
const author = document.getElementById("author");
const twitterBtn = document.querySelector(".btn--twitter");
const newBtn = document.querySelector(".btn--new");
const loader = document.getElementById("loader");

// show loading
const loading = () => {
  loader.hidden = false;
  container.hidden = true;
};

// hide loading
const complete = () => {
  loader.hidden = true;
  container.hidden = false;
};

// show new quote
let apiQuotes = [];
const newQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  text.textContent = quote.text;
  quote.author
    ? (author.textContent = quote.author)
    : (author.textContent = "Unknown");
  complete();
};

// fetch quotes data from API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

// link twitter
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
};

// event listener
twitterBtn.addEventListener("click", tweetQuote);
newBtn.addEventListener("click", getQuotes);

getQuotes();
