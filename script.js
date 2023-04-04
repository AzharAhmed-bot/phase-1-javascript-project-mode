document.addEventListener('DOMContentLoaded',()=>{
fetch('http://localhost:3000/comics')
  .then(response => response.json()) // parse the JSON data
  .then(data => {
     // get the container element
    data.forEach(comic => { 
        // loop through each comic in the JSON data
      // create a card element for the comic
      const container = document.querySelector('#comics-container');
      const card = document.createElement('div');
      card.classList.add('card');
      // add the comic data to the card
      card.innerHTML = `
        <img src="${comic.image}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${comic.title}</h5>
          <p class="card-text">${comic.description}</p>
          <p class="card-text">Superhero: ${comic.superhero}</p>
          <p class="card-text">Price: ${comic.price}</p>
        </div>
      `;
      container.appendChild(card); // add the card to the container
    });
  })
  .catch(error => console.log(error)); 

  const submitgrps=document.querySelector("#connectionForm")
submitgrps.addEventListener('submit',(e)=>{
 e.preventDefault();
 console.log("Submitted")})
})