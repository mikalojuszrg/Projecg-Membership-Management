const userForm = document.querySelector("#userForm");
const membershipForm = document.querySelector("#membershipForm");
const membershipSelect = document.querySelector("#membership");
const mainSection = document.querySelector("#section--main");

const postUser = () => {
  const serviceId = membershipSelect.value;
  const requestBody = {
    name: userForm[0].value,
    surname: userForm[1].value,
    email: userForm[2].value,
    service_id: serviceId,
  };
  console.log("Request body:", requestBody);
  fetch(`http://localhost:3000/users`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then((response) => {
    if (response.ok) {
      console.log(response.json());
      return response.json();
    }
  });
};

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

window.addEventListener("load", getOptions);

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  postUser();
});
