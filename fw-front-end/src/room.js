
// READ FUNCTIONS

function viewwishlists(wishlists) {
    document.getElementById('card-container').innerHTML = ""
    document.getElementById('create-container').innerHTML = ""
    document.getElementById('footer').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Room"
        addButton.addEventListener('click', () => renderAddwishlistForm())
    document.getElementById('create-container').append(addButton)
    wishlists.forEach(renderwishlists)
    
}

function renderwishlists(wishlist) {
    let getLocation = document.querySelector("#card-container")
    let div = document.getElementById(`wishlist-${wishlist.id}`)
    let header = document.createElement("h2")
        header.innerHTML = wishlist.name
    let furnitureContainer = document.createElement('div')
        furnitureContainer.classList.add("wishlist-images")
    
    wishlist.furnitures.forEach(item => {
        let img = document.createElement('img')
            img.src = item.image
        furnitureContainer.append(img)
    })
    let season = document.createElement('p')
        season.innerHTML = wishlist.season
    let occasion = document.createElement('p')
        occasion.innerHTML = wishlist.occasion
    let button1 = document.createElement("button")
        button1.innerHTML = "Edit Room"
        button1.addEventListener('click', () => renderEditwishlistForm(wishlist))
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Room"
        button2.addEventListener('click', () => deletewishlist(wishlist))
    if (div) {
            div.innerHTML = ""
            div.append(header, furnitureContainer, season, occasion, button1, button2)
    } else {
            div = document.createElement("div")
            div.id = `wishlist-${wishlist.id}`
            div.classList.add("wishlist-card")
            div.append(header, furnitureContainer, season, occasion, button1, button2)
            getLocation.append(div)
    }
}

// CREATE FUNCTIONS 

function renderAddwishlistForm() {
    let container = document.getElementById('create-container')
        container.innerHTML = ""
    let form = document.createElement('form')
        form.id = "create-wishlist-form"
        form.addEventListener('submit', (event)=> createwishlist(event))
    let name = document.createElement('input')
        name.type = "text"   
        name.name = "name"
        name.placeholder = "Wishlist name"
    let season = document.createElement('input')
        season.type = "text"
        season.name = "season"
        season.placeholder = "Room"
    let occasion = document.createElement('input')
        occasion.type = "text"
        occasion.name = "occasion"
        occasion.placeholder = "Style"
    let furnitureDiv = document.createElement('div')
    CURRENT_USER.furnitures.forEach(item => {
        let furnitureOption = document.createElement('input')
            furnitureOption.type = "checkbox"
            furnitureOption.id = item.id
            furnitureOption.value = item.id
            furnitureOption.name = `furniture-${item.id}`
        let furnitureLabel = document.createElement('label')
            furnitureLabel.for = item.id
            furnitureLabel.innerHTML = item.name
        let br = document.createElement('br')
            furnitureDiv.append(furnitureOption, furnitureLabel, br)
    })
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, furnitureDiv, submit)
    container.append(form)
}

function createwishlist(event) {
    event.preventDefault()
    
    let newwishlist = {
        name: event.target.name.value,
        season: event.target.season.value,
        occasion: event.target.occasion.value,
        user_id: CURRENT_USER.id
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newwishlist)
    }

    fetch('http://localhost:3000/wishlists', reqPack)
        .then(r => r.json())
        .then(wishlist =>  {
            CURRENT_USER.wishlists.push(wishlist)
            let arrayOfItems = []
            let checkboxes = document.querySelectorAll("input[type='checkbox']");
                checkboxes.forEach(box => {
                    if (box.checked) {
                        let item = CURRENT_USER.furnitures.find(item => item.id === parseInt(box.id))
                        arrayOfItems.push(item)
                    }
            })
            let newwishlist = CURRENT_USER.wishlists[CURRENT_USER.wishlists.length - 1]
            newwishlist.furnitures = []
            createwishlistfurniture(arrayOfItems, newwishlist)
        
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Room"
        addButton.addEventListener('click', () => renderAddwishlistForm())
    document.getElementById('create-container').append(addButton)
        })
}

async function createwishlistfurniture(arrayOfItems, wishlist) {
    if (arrayOfItems.length > 0) {
        let newwishlistfurniture = {
            furniture_id: arrayOfItems[0].id,
            wishlist_id: wishlist.id
        }

        let reqPack = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newwishlistfurniture)
        }

        let resp = await fetch('http://localhost:3000/wishlist_furnitures', reqPack)
        let data = await resp.json()
        wishlist.furnitures.push(arrayOfItems[0])
        arrayOfItems.shift()
        createwishlistfurniture(arrayOfItems, wishlist)
    } else {
        renderwishlists(wishlist)
    }      
}

// UPDATE FUNCTIONS

function renderEditwishlistForm(wishlist) {
    let form = document.createElement('form')
        form.addEventListener('submit', (event) => updatewishlist(event, wishlist))
    let name = document.createElement('input')
        name.type = "text"
        name.name = "name"
        name.value = wishlist.name
    let season = document.createElement('input')
        season.type = "text"
        season.name = "season"
        season.value = wishlist.season
    let occasion = document.createElement('input')
        occasion.type = "text"
        occasion.name = "occasion"
        occasion.value = wishlist.occasion
    let furnitureDiv = document.createElement('div')
    CURRENT_USER.furnitures.forEach(item => {
        let furnitureOption = document.createElement('input')
            furnitureOption.type = "checkbox"
            furnitureOption.id = item.id
            furnitureOption.value = item.id
            furnitureOption.name = `furniture-${item.id}`
        let furnitureLabel = document.createElement('label')
            furnitureLabel.for = item.id
            furnitureLabel.innerHTML = item.name
        let br = document.createElement('br')
        furnitureDiv.append(furnitureOption, furnitureLabel, br)
        })
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, season, occasion, furnitureDiv, submit)
    document.getElementById(`wishlist-${wishlist.id}`).innerHTML = ""
    document.getElementById(`wishlist-${wishlist.id}`).append(form)
}

function updatewishlist(event, originalwishlist) {
    event.preventDefault()

    let originalfurnitures = []
        originalwishlist.furnitures.forEach(item => originalfurnitures.push(item))

    let editedwishlist = {
        name: event.target.name.value,
        season: event.target.season.value,
        occasion: event.target.occasion.value,
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(editedwishlist)
    }

    fetch(`http://localhost:3000/wishlists/${originalwishlist.id}`, reqPack)
        .then(resp => resp.json())
        .then(updatedwishlist => {
    
            let updatedfurniture = []
            let checkboxes = document.querySelectorAll("input[type='checkbox']")
                checkboxes.forEach(box => {
                    if (box.checked) {
                        updatedfurniture.push(box)
                    }
            })
            updatedwishlist.furnitures = []
            updatedfurniture.forEach(input => {
                let item = CURRENT_USER.furnitures.find(item => item.id === parseInt(input.id))
                updatedwishlist.furnitures.push(item)
            })
            // debugger
            renderwishlists(updatedwishlist)
            updatedfurniture.forEach(newItem => {
                originalfurnitures.forEach(oldItem => {
                    if (parseInt(newItem.id) === oldItem.id) {
                        let index = updatedfurniture.indexOf(newItem)
                        updatedfurniture.splice(index, 1)
                        let otherIndex = originalfurnitures.indexOf(oldItem)
                        originalfurnitures.splice(otherIndex, 1)
                    }
                })
            //what's left in updatedfurniture needs to create
            // debugger
            updatedfurniture.forEach(item => createwishlistfurniture(item, updatedwishlist))
            //what's left in originalfurniture needs to delete
            originalfurnitures.forEach(item => deletewishlistfurniture(item, updatedwishlist))
            
            })
        })
}

// DELETE FUNCTIONS

function deletewishlist(wishlist) {
    fetch(`http://localhost:3000/wishlists/${wishlist.id}`, {method: "DELETE"})
    let index = CURRENT_USER.wishlists.indexOf(wishlist)
    CURRENT_USER.wishlists.splice(index, 1)
    viewwishlists(CURRENT_USER.wishlists)
}

function deletewishlistfurniture(item, wishlist) {

    fetch(`http://localhost:3000/wishlist_furnitures`)
        .then(resp => resp.json())
        .then(joiners => {
            let toDelete = joiners.find(joiner => joiner.furniture_id === item.id && joiner.wishlist_id === wishlist.id)
            fetch(`http://localhost:3000/wishlist_furnitures/${toDelete.id}`, {method: "DELETE"})
        })

    

    // figure out how to get rid of those rendered images
}