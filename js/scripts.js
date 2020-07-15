fetch(
  'https://randomuser.me/api/?results=12&nat=au,br,ca,de,dk,es,fi,fr,gb,ie,nl,nz,tr,us'
)
  .then((response) => response.json())
  //   .then((data) => console.log(data));
  .then((data) => createUserObject(data.results));

const people = [];

function createUserObject(data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const person = {
      image: data[i].picture,
      firstName: data[i].name.first,
      lastName: data[i].name.last,
      email: data[i].email,
      city: data[i].location.city,
      state: data[i].location.state,
      phone: data[i].phone,
      address: `${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.city},
         ${data[i].location.postcode}`,
      birthday: data[i].dob.date,
    };

    let birthday = person.birthday.substring(0, 10);
    birthday = new Date(birthday).toDateString();
    birthday = birthday.substring(4, 16);
    console.log(birthday);
    person.birthday = birthday;
    people.push(person);
  }
  generateUserDisplay(people);
}

console.log(people);

document.getElementsByClassName('card');
document.getElementsByClassName('card-img-container');
const galleryDiv = document.getElementById('gallery');

function generateUserDisplay(user) {
  for (let i = 0; i < user.length; i++) {
    const generateHTML = `
    <div class="${[i]}person card">
            <div class="${[i]}person card-img-container">
                <div class="${[i]}person card-img-container">
                    <img class="${[i]}person card-img" src="${
      user[i].image.large
    }" alt="profile picture">
                </div>
                <div class="${[i]}person card-info-container">
                    <h3 id="name" class="${[i]}person card-name cap">${
      user[i].firstName
    }</h3>
                    <p class="${[i]}person card-text">${user[i].email}</p>
                    <p class="${[i]}person card-text cap">${user[i].city}, ${
      user[i].state
    }</p>
                </div>
                </div>
        </div>`;
    const userCard = document.createElement('div');
    userCard.setAttribute('id', `${[i]}card`);
    userCard.innerHTML = generateHTML;
    galleryDiv.appendChild(userCard);
  }
}
function generateModal(person, array) {
  let currentModal = array[person];
  console.log(currentModal);
  let modalHTML = ` <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${currentModal.image.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${currentModal.firstName}</h3>
          <p class="modal-text">${currentModal.email}</p>
          <p class="modal-text cap">${currentModal.city}</p>
          <hr>
          <p class="modal-text">${currentModal.phone}</p>
          <p class="modal-text">${currentModal.address}</p>
          <p class="modal-text">Birthday: ${currentModal.birthday}</p>
      </div>
  </div>`;

  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = modalHTML;
  galleryDiv.appendChild(modalDiv);

  const modalCloseButton = document.getElementById('modal-close-btn');

  modalCloseButton.addEventListener('click', () => {
    galleryDiv.removeChild(modalDiv);
  });
}

galleryDiv.addEventListener('click', (e) => {
  if (e.target.className.includes('person')) {
    console.log(parseInt(e.target.className));
    const currentPerson = parseInt(e.target.className);
    generateModal(currentPerson, people);
  }
});

const searchHTML = `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<button class="search-button">Submit</button>
</form>`;
const search = document.createElement('div');
search.innerHTML = searchHTML;
pageDiv = document.querySelector('.header-inner-container');
pageDiv.appendChild(search);

function searchUsers(value) {
  for (let i = 0; i < people.length; i++) {
    if (people[i].firstName.includes(search)) {
    }
  }
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
searchButton.addEventListener('click', () => {
  console.log('click');
  console.log(searchInput.value);
  searchUsers(searchInput.value);
});
