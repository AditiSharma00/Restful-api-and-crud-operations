const postsList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");

const url = `http://localhost:5000/api/posts`;

const displayPost = (posts) => {
  posts.forEach((post) => {
    output += `
          <div class="card col-md-6 bg-light">
            <div class="card-body">
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
//      METHOD:DELETE
postsList.addEventListener("click", (e) => {
    e.preventDefault();
    let deletebuttonclicked=e.target.id==="delete-post";
    fetch(url,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
})