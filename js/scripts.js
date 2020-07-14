fetch('https://randomuser.me/api/?results=12')
  .then((response) => response.json())
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
    <div class="card person${[i]}">
            <div class="card-img-container person${[i]}">
                <div class="card-img-container person${[i]}">
                    <img class="card-img person${[i]}" src="${
      user[i].image.large
    }" alt="profile picture">
                </div>
                <div class="card-info-container person${[i]}">
                    <h3 id="name" class="card-name cap person${[i]}">${
      user[i].firstName
    }</h3>
                    <p class="card-text person${[i]}">${user[i].email}</p>
                    <p class="card-text cap person${[i]}">${user[i].city}, ${
      user[i].state
    }</p>
                </div>
                </div>
        </div>`;
    const userCard = document.createElement('div');
    userCard.setAttribute('id', `card${[i]}`);
    userCard.innerHTML = generateHTML;
    galleryDiv.appendChild(userCard);
  }
}

galleryDiv.addEventListener('click', (e) => {
  if (e.target.className.includes('person')) {
    console.log(e.target.className);
  }
});
