// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });
const toyCollection = document.querySelector('div#toy-collection')
const form = document.querySelector('form.add-toy-form')



fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => renderToy(toys))


function renderToy(toys) {
  toys.forEach(function(toy) {

    renderOneToy(toy)
    // const divTag = document.createElement('div')
    // divTag.className = "card"

    // divTag.innerHTML = `
    // <h2>${toy.name}</h2>
    // <img src=${toy.image} class="toy-avatar" />
    // <p>${toy.likes} Likes </p>
    // <button class="like-btn">Like <3</button>`

    // toyCollection.appendChild(divTag)
  })
}

function renderOneToy(toy) {
    const divTag = document.createElement('div')
    divTag.className = "card"
    divTag.id = toy.id

    divTag.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    <button class="delete-btn">X</button>
    `

    toyCollection.appendChild(divTag)
}


// Post new toy to the page 

form.addEventListener('submit', function(e) {
  
  const name = e.target[0].value
  const image = e.target[1].value 
  const toyObj = {name, image, likes: 5}
  
  fetch('http://localhost:3000/toys', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(toyObj)
  })
  .then(resp => resp.json())
  .then(toy => renderOneToy(toy)) 

})


// PATCH request to increase the number of likes

toyCollection.addEventListener('click', updateLikes)

function updateLikes(e) {
  const id = e.target.parentElement.id
  const currentLikes = parseInt(e.target.previousElementSibling.innerText)

  if (e.target.className === "like-btn") {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({likes: currentLikes + 1})
    })
    .then(resp => resp.json())
    .then(() => e.target.previousElementSibling.innerText = (`${currentLikes + 1} Likes`))
  }

}

// Delete request 
toyCollection.addEventListener('click', deleteToy)

function deleteToy(e) {
  const id = e.target.parentElement.id

  if (e.target.className === "delete-btn") {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => e.target.parentElement.remove())
  }
}