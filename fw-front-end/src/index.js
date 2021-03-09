let CURRENT_USER = ""
// let wishlistS = CURRENT_USER.wishlists
// let furniture = CURRENT_USER.furnitures
let CATEGORIES_ARRAY = ['chairs', 'couchs', 'tablse', 'tv stands', 'dresses', 'night stands', 'curtains', 'desks', 'bins', 'beds']

document.addEventListener("DOMContentLoaded", ()=> {
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
            document.querySelector('h1').innerHTML = `${user.username}'s Room`
            renderUserPage(user)
        })
    })
}

function renderUserPage(user) {
    let navbar = document.getElementById("navbar")
    let furnitureButton = document.createElement("button")
        furnitureButton.innerHTML = "View furniture"
        furnitureButton.classList.add('right')
        furnitureButton.classList.add('nav-buttons')
        furnitureButton.addEventListener('click', () => viewfurniture(user.furnitures))
    let wishlistButton = document.createElement("button")
        wishlistButton.innerHTML = "View wishlists"
        wishlistButton.classList.add('right')
        wishlistButton.classList.add('nav-buttons')
        wishlistButton.addEventListener('click', () => viewwishlists(user.wishlists))
    navbar.append(wishlistButton, furnitureButton)
    document.getElementById("login").remove()
}