//Global variables
const galleryDiv = document.getElementById('gallery');

//fetch API call to receive 12 results and only English keyboard companies.
fetch(
  'https://randomuser.me/api/?results=12&nat=au,br,ca,de,dk,es,fi,fr,gb,ie,nl,nz,tr,us'
)
  .then((response) => response.json())
  .then((data) => createUserObject(data.results));

//Created a people array to store individual people as objects.
const people = [];

//Created a function to take in data from the API call, loop through it and generate an object for each.
function createUserObject(data) {
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
      address: `${data[i].location.street.number} ${data[i].location.street.name}, 
        ${data[i].location.city}, ${data[i].location.state}
        ${data[i].location.postcode}`,
      birthday: data[i].dob.date,
    };
    //Formatted the birthday property to a more readable format.
    let birthday = person.birthday.substring(0, 10);
    birthday = new Date(birthday).toDateString();
    birthday = birthday.substring(4, 16);
    person.birthday = birthday;
    people.push(person);
  }
  //Called the generateUserDisplay function passing in the array of people objects.
  generateUserDisplay(people);
}

// Function to take in an array of people objects, loop through them, generate HTML for each,
// create a div and append the div to the page. Also adds an event listener to each card, which
// calls the createModalFunction if clicked.
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
    } ${user[i].lastName}</h3>
    <a href=""><p class="${[i]}person card-text">${user[i].email}</p></a>
                    <p class="${[i]}person card-text cap">${
      user[i].city
    }, <strong>${user[i].state}</strong></p>
                </div>
                </div>
        </div>`;
    const userCard = document.createElement('div');
    userCard.setAttribute('id', `${[i]}card`);
    userCard.innerHTML = generateHTML;
    galleryDiv.appendChild(userCard);
    userCard.addEventListener('click', (e) => {
      const currentPerson = parseInt(e.target.className);
      generateModalText(currentPerson, people);
    });
  }
}

//Function that takes in the current index value the clicked card as well as the array of people.
//Generates the modal text and calls the generateModal function.
function generateModalText(person, array) {
  let currentModal = array[person];
  let modalHTML = ` <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${currentModal.image.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${currentModal.firstName} ${currentModal.lastName}</h3>
          <a href=""><p class="modal-text">${currentModal.email}</p></a>
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

//Takes in the modaltext and a classname. Uses parseInt to find the number of the classname, which will
//serve as the index value. Appends the modal to the page and adds event listeners to the close and next
//buttons.
function generateModal(modaltext, number) {
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
      if (indexValue - 1 >= 0) {
        generateModalText(indexValue - 1, people);
      }
    }
  });

  const nextButton = document.getElementById('modal-next');
  nextButton.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const modalParentDiv = document.querySelector('.modal-container')
        .parentElement;
      const modalCurrentDiv = document.querySelector('.modal-container');
      modalParentDiv.removeChild(modalCurrentDiv);
      if (indexValue + 1 <= 11) {
        generateModalText(indexValue + 1, people);
      }
    }
  });
}

//Creates the search input and button on the page.
const searchHTML = `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<button class="search-button">Submit</button>
</form>`;
const search = document.createElement('div');
search.innerHTML = searchHTML;
searchDiv = document.querySelector('.search-container');
searchDiv.appendChild(search);

//Function that handles search on the page. Takes in any input and loops through the cards to determine
//if any firstname meets the search criteria. If it does, they are shown. If not, they are hidden.
//If there is nothing in the search field, all are displayed.
function searchUsers(value) {
  for (let i = 0; i < people.length; i++) {
    if (people[i].firstName.toLowerCase().includes(value)) {
      let currentIndex = people.indexOf(people[i]);
      currentIndex = currentIndex + 'card';

      document.getElementById(currentIndex).style.display = 'flex';
    } else {
      let currentIndex = people.indexOf(people[i]);
      currentIndex = currentIndex + 'card';
      document.getElementById(currentIndex).style.display = 'none';
    }
    if (value === '') {
      let currentIndex = people.indexOf(people[i]);
      currentIndex = currentIndex + 'card';
      document.getElementById(currentIndex).style.display = 'flex';
    }
  }
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
//Adds an event listener to the search button if it is clicked to run search.
searchButton.addEventListener('click', () => {
  searchUsers(searchInput.value.toLowerCase());
});

//Adds an event listener to the search input if anything is typed to run the search.
searchInput.addEventListener('keyup', () => {
  searchUsers(searchInput.value.toLowerCase());
});
