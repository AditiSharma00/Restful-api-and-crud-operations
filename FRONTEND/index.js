const postsList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit=document.querySelector('.btn')
const url = `http://localhost:5000/api/posts`;

const displayPost = (posts) => {
  posts.forEach((post) => {
    output += `
          <div class="card col-md-6 bg-light">
            <div class="card-body" data-id=${post._id}>
              <h5 class="card-title">${post.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
              <p class="card-text">
                ${post.body}
              </p>
              <a href="#" class="btn btn-primary" id="edit-post">Edit</a>
              <a href="#" class="btn btn-primary" id="delete-post">Delete</a>
            </div>
          </div>
        
        `;
  });
  postsList.innerHTML = output;
};
// Get -Read the post
//Method:GET
let output = "";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    displayPost(data);
  });
//Method: POST
addPostForm.addEventListener("submit", (e) => {
  console.log(titleValue.value);
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      displayPost(dataArr);
      titleValue.value = "";
      bodyValue.value = "";
    });
});
//      METHOD:DELETE $ METHOD PATCH
postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let deletebuttonclicked = e.target.id === "delete-post";
  let editbuttonclicked=e.target.id=="edit-post"
  let id=e.target.parentElement.dataset.id;

  if (deletebuttonclicked) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  if(editbuttonclicked){
    const parent=e.target.parentElement;
    const titleContent=parent.querySelector('.card-title').textContent;
    let bodyContent=parent.querySelector('.card-text').textContent;
    titleValue.value=titleContent;
    bodyValue.value=bodyContent;
    // console.log(titleContent,bodyContent);
   
  }
  //update -update the existing post
btnSubmit.addEventListener('click',(e)=>{
  e.preventDefault();
  fetch(`${url}/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      title:titleValue.value,
      body:bodyValue.value
    })
  })
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data);
    location.reload();
  })
})
});
