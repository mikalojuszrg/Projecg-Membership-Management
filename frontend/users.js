const userForm = document.querySelector("#userForm");
const membershipForm = document.querySelector("#membershipForm");
const membershipSelect = document.querySelector("#membership");
const mainSection = document.querySelector("#section--main");
const cardsSection = document.querySelector("#memberships--cards");
const sortBtn = document.querySelector("#button--sort");

const getUsersAsc = () => {
  fetch("http://localhost:3000/users/asc")
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      renderUserCards(response);
    });
};

const getUsersDsc = () => {
  fetch("http://localhost:3000/users/desc")
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
      renderUserCards(response);
    });
};

getUsersAsc();

let isAscending = true;

sortBtn.addEventListener("click", () => {
  cardsSection.innerHTML = "";

  if (isAscending) {
    getUsersDsc();
    sortBtn.textContent = "Sorting by name - Desc";
  } else {
    getUsersAsc();
    sortBtn.textContent = "Sorting by name - Asc";
  }

  isAscending = !isAscending;
});

const renderUserCards = (cards) => {
  cards.forEach((card) => {
    console.log(card);
    const cardDiv = document.createElement("div");
    const cardName = document.createElement("h2");
    const cardEmail = document.createElement("p");
    const cardMembership = document.createElement("p");

    cardName.textContent = `${card.name} ${card.surname}`;
    cardEmail.textContent = card.email;
    cardMembership.textContent = card.plans[0].name;

    cardDiv.appendChild(cardName);
    cardDiv.appendChild(cardEmail);
    cardDiv.appendChild(cardMembership);
    cardsSection.append(cardDiv);
  });
};
