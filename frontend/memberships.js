const userForm = document.querySelector("#userForm");
const membershipForm = document.querySelector("#membershipForm");
const membershipFormDiv = document.querySelector("#memberships--form");
const cardsSection = document.querySelector("#memberships--cards");
const newMembershipBtn = document.querySelector("#newMemberships--button");
const membershipTitle = document.querySelector("#memberships--title");
const membershiDescription = document.querySelector(
  "#memberships--description"
);

const postMembership = () => {
  fetch(`http://localhost:3000/memberships`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: membershipForm[0].value,
      price: membershipForm[1].value,
      description: membershipForm[2].value,
    }),
  }).then((response) => {
    if (response.ok) {
      console.log(response.json());
      const newMembership = document.createElement("option");
      newMembership.value = membershipForm[0].value;
      newMembership.textContent = membershipForm[0].value;
      membershipSelect.appendChild(newMembership);
    }
  });
};

// newMembershipBtn.addEventListener("click", () => {
//   // cardsSection.style.display = "none";
//   // membershipTitle.textContent = "User Management";
//   // membershiDescription.style.display = "none";
//   newMembershipBtn.style.display = "none";
//   // membershipFormDiv.style.display = "block";
//   // membershipForm.style.display = "flex";
// });

const getMemberships = () => {
  fetch("http://localhost:3000/memberships")
    .then((resp) => resp.json())
    .then((response) => {
      renderMembershipCards(response);
    });
};

const deleteMembership = (id) => {
  fetch(`http://localhost:3000/memberships/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

getMemberships();

// membershipForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   postMembership();
// });

const renderMembershipCards = (cards) => {
  cards.forEach((card) => {
    console.log(card);
    const cardDiv = document.createElement("div");
    const cardTitle = document.createElement("h2");
    const cardDescription = document.createElement("p");
    const deleteCardBtn = document.createElement("button");

    cardTitle.textContent = `${card.price} ${card.name}`;
    cardDescription.textContent = card.description;
    deleteCardBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    cardDiv.setAttribute("id", card._id);

    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardDescription);
    cardDiv.appendChild(deleteCardBtn);
    cardsSection.append(cardDiv);

    deleteCardBtn.addEventListener("click", () => {
      deleteMembership(card._id);
      cardDiv.style.display = "none";
    });
  });
};
