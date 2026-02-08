let slideIndex = 0;
showSlides(); // Start the auto-slideshow

// Next/previous controls
function plusSlides(n) {
  slideIndex += n;
  let slides = document.getElementsByClassName("mySlides");
  if (slideIndex > slides.length) {slideIndex = 1}
  if (slideIndex < 1) {slideIndex = slides.length}
  
  // Hide all, show specific
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}

// Automatic Slideshow Logic
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}
// Load posts from local storage
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
  displayPosts();
}

function createPost() {
  let input = document.getElementById("postInput").value;

  if (input.trim() === "") return;

  posts.push({
    text: input,
    likes: 0,
    comments: []
  });

  document.getElementById("postInput").value = "";
  savePosts();
}

function likePost(index) {
  posts[index].likes++;
  savePosts();
}

function addComment(index) {
  let commentInput = document.getElementById("commentInput" + index);
  let comment = commentInput.value;

  if (comment.trim() === "") return;

  posts[index].comments.push(comment);
  commentInput.value = "";
  savePosts();
}

function displayPosts() {
  let container = document.getElementById("postsContainer");
  container.innerHTML = "";

  posts.forEach((post, index) => {
    let postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
      <p>${post.text}</p>
      <button onclick="likePost(${index})">👍 Like (${post.likes})</button>

      <div class="comment-box">
        <input type="text" id="commentInput${index}" placeholder="Write comment">
        <button onclick="addComment(${index})">Comment</button>
      </div>

      <ul>
        ${post.comments.map(c => `<li>${c}</li>`).join("")}
      </ul>
    `;

    container.appendChild(postDiv);
  });
}

// Load posts when page opens
displayPosts();