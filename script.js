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
          <p class="card-text">${comic.description}</p>
          <h5 class="card-title">${comic.title}</h5>
          <p class="card-text">Superhero: ${comic.superhero}</p>
          <p class="card-text">Price: ${comic.price}</p>
          <p class="card-text">Available: ${comic.available} books </p>
        </div>
      `;
      container.appendChild(card); // add the card to the container
   
    });
})
 const connectionForm=document.querySelector("#connectionForm")
 const input = document.querySelector('#form-groups');
 const display = document.querySelector('#display-submit');
 const submitgrps=document.querySelector("#submit-groups")
 
  submitgrps.addEventListener('mouseover',(e)=>{console.log(e.target.style.color= "white")})
  submitgrps.addEventListener("mouseout",(e)=>{console.log(e.target.style.color= "black")})
  connectionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value;
    fetch('http://localhost:3000/comics')
    .then((response) => response.json())
    .then((data) => {
        let filtering=data.find((comic) => comic.title === title)
       //console.log(filtering)
        if (filtering) {
            //console.log(data)
            
          display.innerHTML = `
            <div class="comic">
              <h2>${filtering.title}</h2>
              <img src="${filtering.image}" alt="${filtering.superhero}" />
              <p>${filtering.description}</p>
              <p>Price: $${filtering.price}</p>
              <p id="lets-test">Available: ${filtering.available} books</p>
           <form id=getting-comment> <input id="comment" type="text" placeholder="leave a comment for us about the book"${filtering.comment}/>
             <input id="submit-comment" type="submit" value="leave comment"/> 
             <form/>
            <button id="buying">Buy Now</button>
            </div>
          `;
       
                                 // Adding event listener for the buy button below//
     //-----------------------------------------------------------------------------------------------------------------------------//
     const buyingButton=document.querySelector("#buying")
     buyingButton.addEventListener('click',(e)=>{
        e.preventDefault();
        if(filtering.available>0){
         var newAvailable = filtering.available--;
          fetch(`http://localhost:3000/comics/${filtering.id}`,{
             method:"PATCH",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({available : newAvailable})
          })
         .then(resp=>{resp.json()})
         .then(data=>{
          document.querySelector("#lets-test").textContent=`Available: ${newAvailable} books`
          //document.querySelector(".card-texts").textContent=`Available: ${newAvailable} books`
             alert("Book successfully bought Thank you!")
         })

        }
        else if(filtering.available<=0){
            fetch(`http://localhost:3000/comics/${filtering.id}`,{
             method:"DELETE",
             headers:{
                 "Content-Type":"application/json"
             }
          })
         .then(resp=>{resp.json()})
         .then(data=>{
            alert("Book Out of Stock!")   
         })
        }
     })
      //---------------------------------------------------------------------------------------------------------------//  
      
      

                                     //Adding event listener for the submit button//
          //----------------------------------------------------------------------------------------------------------------------------//
          const gettingComments=document.querySelector('#getting-comment');
          gettingComments.addEventListener("submit",(e)=>{
            e.preventDefault();
            const commentito=document.querySelector("#comment");
            const result= commentito.value
            console.log(result)
            fetch(`http://localhost:3000/comics/${filtering.id}`,{
              method:"PATCH",
              headers:{
                'Content-type':'application/json'
              },
              body:JSON.stringify({comments:result})
            })
            .then(resp=> resp.json())
            .then(data=>{
              alert("Feed back succcesfully received!")
              console.log(data)});
            gettingComments.reset()
          })
         //--------------------------------------------------------------------------------------------------------------------------//   
        input.value=''
        } else {
          display.innerHTML = '<h1 id="error">Comic not found.</h1>';
        }
      })
     .catch((error) => {
        alert("Oops! wrong information")
     }); 
    })
});

    