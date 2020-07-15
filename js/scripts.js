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
      index: [i],
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
    userCard.addEventListener('click', (e) => {
      console.log(parseInt(e.target.className));
      const currentPerson = parseInt(e.target.className);
      generateModalText(currentPerson, people);
    });
  }
  //   galleryDiv.addEventListener('click', (e) => {
  //     if (e.target.className.includes('person')) {
  //       console.log(parseInt(e.target.className));
  //       const currentPerson = parseInt(e.target.className);
  //       generateModalText(currentPerson, people);
  //     }
  //   });
}
function generateModalText(person, array) {
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
  </div>
  <div class="modal-btn-container">
  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
  <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div>
  `;
  generateModal(modalHTML, currentModal);
}

function generateModal(modaltext, number) {
  console.log(number);
  let indexValue = parseInt(number.index);
  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = modaltext;
  galleryDiv.appendChild(modalDiv);

  const modalCloseButton = document.getElementById('modal-close-btn');

  modalCloseButton.addEventListener('click', () => {
    galleryDiv.removeChild(modalDiv);
  });

  const prevButton = document.getElementById('modal-prev');

  prevButton.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const modalParentDiv = document.querySelector('.modal-container')
        .parentElement;
      const modalCurrentDiv = document.querySelector('.modal-container');
      modalParentDiv.removeChild(modalCurrentDiv);
      generateModalText(indexValue - 1, people);
    }
  });

  const nextButton = document.getElementById('modal-next');
  nextButton.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const modalParentDiv = document.querySelector('.modal-container')
        .parentElement;
      const modalCurrentDiv = document.querySelector('.modal-container');
      modalParentDiv.removeChild(modalCurrentDiv);
      generateModalText(indexValue + 1, people);
    }
  });
}

const searchHTML = `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<button class="search-button">Submit</button>
</form>`;
const search = document.createElement('div');
search.innerHTML = searchHTML;
searchDiv = document.querySelector('.search-container');
searchDiv.appendChild(search);

function searchUsers(value) {
  //debugger;
  for (let i = 0; i < people.length; i++) {
    //console.log(people[i].firstName);
    if (people[i].firstName.toLowerCase().includes(value)) {
      let currentIndex = people.indexOf(people[i]);
      currentIndex = currentIndex + 'card';
      console.log(document.getElementById(currentIndex));

      document.getElementById(currentIndex).style.display = 'flex';
    } else {
      let currentIndex = people.indexOf(people[i]);
      currentIndex = currentIndex + 'card';
      document.getElementById(currentIndex).style.display = 'none';
    }
    if (value === '') {
      let currentIndex = people.indexOf(people[i]);
      currentIndex = currentIndex + 'card';
      console.log(document.getElementById(currentIndex));

      document.getElementById(currentIndex).style.display = 'flex';
    }
  }
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
searchButton.addEventListener('click', () => {
  console.log('click');
  console.log(searchInput.value.toLowerCase());
  searchUsers(searchInput.value.toLowerCase());
});

searchInput.addEventListener('keyup', () => {
  console.log('click');
  console.log(searchInput.value.toLowerCase());
  searchUsers(searchInput.value.toLowerCase());
});
