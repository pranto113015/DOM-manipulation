// console.log('window', window)
// console.log("document", document)



// selecting elements
const header = document.getElementById('header')
const postTitle = document.getElementById('postTitle')
const postContent = document.getElementById('postContent')
const createPostBtn = document.getElementById('createPostBtn')
const postsContainer = document.getElementById('postsContainer')

// Function to create post elements
const createPostElement = (post) => {
    const postElement = document.createElement('div')
    postElement.classList.add('bg-amber-300', 'p-4', 'border', 'rounded-lg', 'mb-4')

    postElement.innerHTML = `
    <div class="flex justify-between ">
      <div>
        <h2 class="font-bold text-lg">${post.title}</h2>
        <p>${post.content}</p>
      </div>
      <div class="flex gap-2">
        <button id="editPostBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">Edit</button>
        <button id="deletePostBtn" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">Delete</button>
      </div>
    </div>
  `
    postsContainer.appendChild(postElement)
}

window.addEventListener('DOMContentLoaded', () => {

    // header mouse events
    header.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'H1') {
            header.style.backgroundColor = 'yellow'
            header.style.color = 'skyblue'
        }
    })

    header.addEventListener('mouseout', () => {
        header.style.backgroundColor = 'blue'
        header.style.color = 'red'
    })

    // load posts from localStorage
    let blogPost = []
    const blogPostLocalStorage = localStorage.getItem('blogPost')
    if (blogPostLocalStorage) {
        blogPost = JSON.parse(blogPostLocalStorage)
        blogPost.forEach(post => createPostElement(post))
    }

    // input tracking
    let title = ''
    let content = ''

    postTitle.addEventListener('input', () => {
        title = postTitle.value
    })

    postContent.addEventListener('input', () => {
        content = postContent.value
    })

    // create post button
    createPostBtn.addEventListener('click', () => {
        if (title.trim() === '' || content.trim() === '') {
            alert('Please enter both title and content!')
            return
        }

        const newPost = {
            title,
            content,
            id: Date.now()
        }

        blogPost.push(newPost)
        postsContainer.innerHTML = ''
        blogPost.forEach(post => createPostElement(post))
        localStorage.setItem('blogPost', JSON.stringify(blogPost))

        // clear inputs
        postTitle.value = ''
        postContent.value = ''
        title = ''
        content = ''
    })

    // delete & edit event delegation
    postsContainer.addEventListener('click', (e) => {
        // DELETE POST
        if (e.target.id === 'deletePostBtn') {
            const postElement = e.target.closest('div.bg-amber-300')
            const title = postElement.querySelector('h2').textContent

            // remove from DOM
            postElement.remove()

            // remove from array and localStorage
            blogPost = blogPost.filter(post => post.title !== title)
            localStorage.setItem('blogPost', JSON.stringify(blogPost))
        }

        // EDIT POST
        if (e.target.id === 'editPostBtn') {
            const postElement = e.target.closest('div.bg-amber-300')
            const titleEl = postElement.querySelector('h2')
            const contentEl = postElement.querySelector('p')

            const oldTitle = titleEl.textContent
            const oldContent = contentEl.textContent

            // prompt for new title/content
            const newTitle = prompt('Edit title:', oldTitle)
            const newContent = prompt('Edit content:', oldContent)

            if (newTitle !== null && newContent !== null) {
                // update DOM
                titleEl.textContent = newTitle
                contentEl.textContent = newContent

                // update array & localStorage
                blogPost = blogPost.map(post =>
                    post.title === oldTitle
                        ? { ...post, title: newTitle, content: newContent }
                        : post
                )
                localStorage.setItem('blogPost', JSON.stringify(blogPost))
            }
        }
    })
})
