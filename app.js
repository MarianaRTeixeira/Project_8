// Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

const next = document.querySelector(".right");
const previous = document.querySelector(".left");


// Fetch data from API 

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


// Create the function for Display Employees
function displayEmployees(employeeData) {
    employees = employeeData;

    // store the employee HTML as we create it
    let employeeHTML = ' ';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;



        employeeHTML += `
        <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        </div>
        </div> 
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}

//Modal Function
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    
    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" /}
            <div class="text-container">
                <h2 class="name"> ${name.first} ${name.last}</h2>
                <p class="email>${email}</p>
                <p class="address>${city}</p>
                <hr />
                <p>${phone}</p>
                <p class="adress">${street}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
            `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

//Event listeners

// --> Display card <--
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// --> Close Modal  <--
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


// --> search engine  <--
function searchEngine() { //w3schools
    const search = document.getElementById('search'); //id from the input
    const cards = document.querySelectorAll('.card');  //place were the text is 
    const filter = search.value.toUpperCase(); //to search no matter if is upper or lower case

    //create the loop for the search
    for (let i = 0; i < cards.length; i++) {
        const textH2 = cards[i].querySelector('h2'); //seach on every card for the h2vtext
        const nameCard = textH2.textContent;

        if (nameCard.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = ""; //show the results
        } else {
            cards[i].style.display = 'none'; //no resukts
        }
    }
}
search.addEventListener('keyup', searchEngine);


