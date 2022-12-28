const userForm = document.querySelector("#userForm");
const membershipForm = document.querySelector("#membershipForm");
const membershipFormDiv = document.querySelector("#memberships--form");
const cardsSection = document.querySelector("#memberships--cards");
const newMembershipBtn = document.querySelector("#newMemberships--button");
const membershipTitle = document.querySelector("#memberships--title");
const membershiDescription = document.querySelector(
  "#memberships--description"
);
const membershipSelect = document.querySelector("#membership");

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

membershipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  postMembership();
  setTimeout(() => {
    window.location.href = "memberships.html";
  }, "1000");
});
