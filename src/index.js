let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach((toy) => {
        createToyCard(toy);
      });
    })
    .catch((error) => console.error("Error fetching toys:", error));
}


  fetchToys();
});

function createToyCard(toy) {
  const card = document.createElement("div");
  card.className = "card";
  const name = document.createElement("h2");
  name.textContent = toy.name;
  const image = document.createElement("img");
  image.src = toy.image;
  image.className = "toy-avatar";
  const likes = document.createElement("p");
  likes.textContent = `${toy.likes} Likes`;
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.textContent = "Like ❤️";
  const cardContainer = document.querySelector(".card-container");

  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeButton);

  cardContainer.appendChild(card);
}



const toyForm = document.querySelector(".add-toy-form");

toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = toyForm.querySelector("input[name='name']").value;
  const imageInput = toyForm.querySelector("input[name='image']").value;

  const newToy = {
    name: nameInput,
    image: imageInput,
    likes: 0
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then((response) => response.json())
    .then((toy) => {
      createToyCard(toy);
      toyForm.reset();
    })
    .catch((error) => console.error("Error adding new toy:", error));
});