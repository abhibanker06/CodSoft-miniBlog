const token = localStorage.getItem("token");
let quill;

document.addEventListener('DOMContentLoaded',()=>{
  const loginBtn = document.getElementById("loginBtn");
      const logoutBtn = document.getElementById("logoutBtn");

      if (token) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
      } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
      }

      quill = new Quill('#quillEditor', {
        theme: 'snow',
        placeholder: 'Write your post content here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });
})


document.getElementById("createPostForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const title = document.getElementById("postTitle").value;
    const category = document.getElementById("postCategory").value;
    const image = document.getElementById("postImage").value;
    const excerpt = document.getElementById("postExcerpt").value;
    const content = quill.root.innerHTML;
    const tags = document.getElementById("postTags").value;
  

    
  
    if (!token) {
      alert("Please login first.");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const res = await fetch("https://miniblog-iwf4.onrender.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          category,
          image,
          excerpt,
          content,
          tags
        })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Post created successfully!");
        window.location.href = "index.html"; // Redirect to homepage or post list
      } else {
        alert(data.error || "Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("An error occurred while creating the post.");
    }
  });
  