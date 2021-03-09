let CURRENT_USER = ""
let WISHLIST = CURRENT_USER.wishlists
let FURNITURE = CURRENT_USER.furnitures
let CATEGORIES_ARRAY = ['modern', 'minimalist', 'bohemian', 'rustic', 'farmhouse', 'glam']

document.addEventListener("DOMContentLoaded", () => {
    userLogin()
})

function userLogin() {
    document.getElementById('login').addEventListener('submit', (event) => {
        event.preventDefault()
        let username = event.target.username.value
        fetch(`http://localhost:3000/users/${username}`)
        .then(resp => resp.json())
        .then(user => {
            CURRENT_USER = user
            document.querySelector('h1').innerHTML = `${user.username}'s Wishlist`
            renderUserPage(user)
        })
    })
}

function renderUserPage(user) {
    let navbar = document.getElementById("navbar")
    let furnitureButton = document.createElement("button")
        furnitureButton.innerHTML = "View Furniture"
        furnitureButton.classList.add('right')
        furnitureButton.classList.add('nav-buttons')
        furnitureButton.addEventListener('click', () => viewFurniture(user.furnitures))
    let wishlistButton = document.createElement("button")
        wishlistButton.innerHTML = "View Wishlists"
        wishlistButton.classList.add('right')
        wishlistButton.classList.add('nav-buttons')
        wishlistButton.addEventListener('click', () => viewWishlists(user.wishlists))
    navbar.append(furnitureButton, wishlistButton)
    document.getElementById("login").remove()
}