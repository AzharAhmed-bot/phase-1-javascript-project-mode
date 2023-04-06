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
        <h5 class="card-title">Title: ${comic.title}</h5>
          <p class="card-text">${comic.description}</p>
          <p class="card-text">Superhero: ${comic.superhero}</p>
          <p class="card-texti">Price: ${comic.price}</p>
          <p class="card-text">Available: ${comic.available} books </p>
          <p class="card-text">Comments: ${comic.comments} </p><br />
          <p class="card-texto">Offers: ${comic.offers} </p>
        </div>
      `;
    
        container.appendChild(card); // add the card to the container
        const editButton=document.createElement("button")
      editButton.textContent="Update"
     card.appendChild(editButton)
     editButton.addEventListener("click",()=>{
      //console.log("clicked")
      const newPrice=prompt("Enter New Price: ",comic.price)
      const newOffer=prompt("Enter New Offer: ",comic.offers)
      fetch(`http://localhost:3000/comics/${comic.id}`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          price: newPrice,
          offers:newOffer
        })
      })
      .then(resp=>resp.json())
      .then(data=>console.log(data))
     })
      })

      
     
  
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
              <p id="newOfferPlaced">Price: $${filtering.price}</p>
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
            //console.log(result)
            fetch(`http://localhost:3000/comics/${filtering.id}`,{
              method:"PATCH",
              headers:{
                'Content-type':'application/json'
              },
              body:JSON.stringify({comments:result})
            })
            .then(resp=> resp.json())
            .then(data=>{
              alert("Feedback succcesfully received!")
              console.log(data)

            });
            gettingComments.reset()
          })
         //--------------------------------------------------------------------------------------------------------------------------//   
        input.value=''
        } else {
          display.innerHTML = '<h1 id="error">Book Not in Stock But will be Available Soon</h1>';
        }
      })
     .catch((error) => {
        alert("Oops! wrong information")
     }); 
    })


                         //Adding submit Event for the put request for the Admin//
    //------------------------------------------------------------------------------------------------------//
  const updating=document.querySelector("#updating")
  const urls=document.querySelector("#url")
  const titles=document.querySelector("#title")
  const superheros=document.querySelector("#superhero")
  const descriptions=document.querySelector("#Description")
  const prices=document.querySelector("#price")
  const availables=document.querySelector("#available")
  //const offer=document.querySelector("#offer").value;
  
  updating.addEventListener("submit",(e)=>{
    e.preventDefault()
   fetch("http://localhost:3000/comics",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({

     title: titles.value,
     image: urls.value,
     superhero: superheros.value,
     description: descriptions.value,
     price: prices.value,
     available: availables.value,
     comments:[],
     offers:[]
    })
   })
   .then(resp=>{resp.json()})
   .then(data=>{console.log(data)})
 updating.reset()
});
  //--------------------------------------------------------------------------------------------------------------------//





});
    