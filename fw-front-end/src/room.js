function viewWishlists(wishlists) {
    document.getElementById('card-container').innerHTML = ""
    document.getElementById('create-container').innerHTML = ""
    document.getElementById('footer').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Wishlist"
        addButton.addEventListener('click', () => renderAddWishlistForm())
    document.getElementById('create-container').append(addButton)
    wishlists.forEach(renderWishlists)
    
}

function renderWishlists(wishlist) {
    let getLocation = document.querySelector("#card-container")
    let div = document.getElementById(`wishlist-${wishlist.id}`)
    let header = document.createElement("h2")
        header.innerHTML = wishlist.name
    let furnitureContainer = document.createElement('div')
    wishlist.furnitures.forEach(item => {
        let img = document.createElement('img')
            img.src = item.image
        furnitureContainer.append(img)
    })
    let type = document.createElement('p')
        type.innerHTML = wishlist.type
    let button1 = document.createElement("button")
        button1.innerHTML = "Edit Item"
        button1.addEventListener('click', () => renderEditWishlistForm(wishlist))
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Item"
        button2.addEventListener('click', () => deleteWishlist(wishlist))
    if (div) {
            div.append(header, furnitureContainer, type, button1, button2)
    } else {
            div = document.createElement("div")
            div.id = `wishlist-${wishlist.id}`
            div.classList.add("card")
            div.append(header, furnitureContainer, type, button1, button2)
            getLocation.append(div)
    }
}

// CREATE FUNCTIONS 

function renderAddWishlistForm() {
    let container = document.getElementById('create-container')
        container.innerHTML = ""
    let form = document.createElement('form')
        form.id = "create-wishlist-form"
        form.addEventListener('submit', (event)=> createWishlist(event))
    let name = document.createElement('input')
        name.type = "text"   
        name.name = "name"
        name.placeholder = "wishlist name"
    let type = document.createElement('input')
        type.type = "text"
        type.name = "type"
        type.placeholder = "type"
    let furniture = document.createElement('select')
        furniture.name = "furnitureId"
        furniture.setAttribute("multiple", true)
        let placeholder = document.createElement('option')
            placeholder.innerHTML = "furniture"
            placeholder.setAttribute("disabled", true)
            placeholder.setAttribute("selected", true)
            placeholder.setAttribute("hidden", true)
        furniture.append(placeholder)
        CURRENT_USER.furnitures.forEach(item => {
            let option = document.createElement('option')
                option.value = item.id
                option.innerHTML = item.name
                furniture.append(option)
        })
    let plus = document.createElement('button')
        plus.innerHTML = "+"
        plus.addEventListener('click', () => addFurnitureInput())
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, type, furniture, submit)
    container.append(form)
}

function addFurnitureInput() {
    let furniture = document.createElement('select')
        furniture.name = "furnitureId"
        let placeholder = document.createElement('option')
            placeholder.innerHTML = "furniture"
            placeholder.setAttribute("disabled", true)
            placeholder.setAttribute("selected", true)
            placeholder.setAttribute("hidden", true)
        furniture.append(placeholder)
        CURRENT_USER.furnitures.forEach(item => {
            let option = document.createElement('option')
                option.value = item.id
                option.innerHTML = item.name
                furniture.append(option)
        })
    let plus = document.createElement('button')
        plus.innerHTML = "+"
        plus.addEventListener('click', () => addFurnitureInput())
    document.getElementById('create-wishlist-form').append(furniture, plus)
}

function createWishlist(event) {
    event.preventDefault()
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Wishlist"
        addButton.addEventListener('click', () => renderAddWishlistForm())
    document.getElementById('create-container').append(addButton)
    let newWishlist = {
        name: event.target.name.value,
        type: event.target.type.value,
        user_id: CURRENT_USER.id
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newWishlist)
    }

    fetch('http://localhost:3000/wishlists', reqPack)
        .then(r => r.json())
        .then(wishlist =>  {
            CURRENT_USER.wishlists.push(wishlist)
            
            let furnitures = [CURRENT_USER.furnitures.find(item => {return item.id === parseInt(event.target.furnitureId.value)})]
            furnitures.forEach(furniture => createFurnitureWishlist(furniture, wishlist))
        })
}

function createFurnitureWishlist(furniture, wishlist) {
    let newFurnitureWishlist = {
        furniture_id: furniture.id,
        wishlist_id: wishlist.id
    }
    
    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newFurnitureWishlist)
    }

    fetch('http://localhost:3000/furniturewishlists', reqPack)
        .then(resp => resp.json())
        .then(data => {
            let wishlist = CURRENT_USER.wishlists.find(wishlist => wishlist.id === data.wishlist_id)
            let furniture = CURRENT_USER.furnitures.find(item => item.id === data.furniture_id)
            wishlist.furnitures = [furniture]
            renderWishlists(wishlist)
        })
}

// UPDATE FUNCTIONS

function renderEditWishlistForm(wishlist) {
    let form = document.createElement('form')
        form.addEventListener('submit', (event) => updateWishlist(event, wishlist))
    let name = document.createElement('input')
        name.type = "text"
        name.name = "name"
        name.value = outfit.name
    let type = document.createElement('input')
        type.type = "text"
        type.name = "type"
        type.value = wishlist.type

    let furniture = document.createElement('select')
       furniture.name = "furniture"
        let placeholder = document.createElement('option')
            placeholder.innerHTML = "furniture"
            placeholder.setAttribute("disabled", true)
            placeholder.setAttribute("selected", true)
            placeholder.setAttribute("hidden", true)
        furniture.append(placeholder)
        CURRENT_USER.furnitures.forEach(item => {
            let option = document.createElement('option')
                option.value = item
                option.innerHTML = item.name
                furniture.append(option)
        })
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, type, furniture, submit)
    document.getElementById(`wishlist-${wishlist.id}`).append(form)
}

function updateWishlist(event, wishlist) {
    event.preventDefault()

    let updatedWishlist = {
        name: event.target.name.value,
        type: event.target.type.value,
        
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(updatedWishlist)
    }

    fetch(`http://localhost:3000/wishlists/${wishlist.id}`, reqPack)
        .then(resp => resp.json())
        .then(item => {
            document.getElementById(`wishlist-${wishlist.id}`).innerHTML = ""
            renderWishlists(item)
        })
}

// DELETE FUNCTIONS

function deleteWishlist(wishlist) {
    fetch(`http://localhost:3000/wishlists/${wishlist.id}`, {method: "DELETE"})
    let index = CURRENT_USER.wishlists.indexOf(wishlist)
    CURRENT_USER.wishlists.splice(index, 1)
    viewWishlists(CURRENT_USER.wishlists)
}