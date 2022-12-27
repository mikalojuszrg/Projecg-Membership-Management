const userForm = document.querySelector("#userForm");
const membershipForm = document.querySelector("#membershipForm");
const membershipSelect = document.querySelector("#membership");
const mainSection = document.querySelector("#section--main");
const serviceId = membershipSelect.value;

const postUser = () => {
  // const serviceId = membershipSelect.value;

  fetch(`http://localhost:3000/users`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userForm[0].value,
      surname: userForm[1].value,
      email: userForm[2].value,
      service_id: serviceId,
    }),
  }).then((response) => {
    if (response.ok) {
      console.log(response.json());
      return response.json();
    }
  });
};

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

const getMemberships = () => {
  fetch("http://localhost:3000/memberships")
    .then((resp) => resp.json())
    .then((response) => {
      renderMembershipCards(response);
    });
};

// getMemberships();

const renderOptions = (options) => {
  options.forEach((option) => {
    const newOption = document.createElement("option");
    newOption.value = option._id;
    newOption.textContent = option.name;
    membershipSelect.appendChild(newOption);
  });
};

const getOptions = () => {
  fetch("http://localhost:3000/memberships")
    .then((resp) => resp.json())
    .then((response) => {
      renderOptions(response);
    });
};

getMemberships();

window.addEventListener("load", getOptions);

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  postUser();
});

const renderMembershipCards = (cards) => {
  cards.forEach((card) => {
    console.log(card);
  });
};
