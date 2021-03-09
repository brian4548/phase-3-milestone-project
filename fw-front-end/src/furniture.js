//READ FUNCTIONS

function viewFurniture(furnitures) {
    document.getElementById('card-container').innerHTML = ""
    document.getElementById('create-container').innerHTML = ""
    document.getElementById('footer').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Furniture Item"
        addButton.addEventListener('click', () => renderAddFurnitureForm())
    document.getElementById('create-container').append(addButton)
    furnitures.forEach(renderFurniture)
    CATEGORIES_ARRAY.forEach(cat => {
        let catButton = document.createElement('button')
            catButton.innerHTML = cat
            catButton.addEventListener('click', () => filterByCategory(cat))
            document.getElementById('footer').append(catButton)
    })
}

function renderFurniture(furniture) {
    let getLocation = document.querySelector("#card-container")
    let div = document.getElementById(`furniture-${furniture.id}`)
    let header = document.createElement("h2")
        header.innerHTML = furniture.name
    let image = document.createElement("img")
        image.src = furniture.image
    let brand = document.createElement("h4")
        brand.innerHTML = furniture.brand
    let category = document.createElement("p")
        category.innerHTML = furniture.category
    let paragraph = document.createElement("p")
        paragraph.innerHTML = furniture.color
    let button1 = document.createElement("button")
        button1.innerHTML = "Edit Item"
        button1.addEventListener('click', () => renderEditFurnitureForm(furniture))
    let button2 = document.createElement("button")
        button2.innerHTML = "Delete Item"
        button2.addEventListener('click', () => deleteItem(furniture))
    if (div) {
        div.append(header, image, brand, category, paragraph, button1, button2)
    } else {
        div = document.createElement("div")
        div.id = `furniture-${furniture.id}`
        div.classList.add("card")
        div.append(header, image, brand, category, paragraph, button1, button2)
        getLocation.append(div)
    }
}

//CREATE FUNCTIONS

function renderAddFurnitureForm() {
    let container = document.getElementById('create-container')
        container.innerHTML = ""
    let form = document.createElement('form')
        form.addEventListener('submit', (event) => createFurniture(event))
    let name = document.createElement('input')
        name.type = "text"
        name.name = "name"
        name.placeholder = "item name"
    let brand = document.createElement('input')
        brand.type = "text"
        brand.name = "brand"
        brand.placeholder = "brand name"
    let category = document.createElement('select')
        category.name = "category"
        let placeholder = document.createElement('option')
            placeholder.innerHTML = "category"
            placeholder.setAttribute("disabled", true)
            placeholder.setAttribute("selected", true)
            placeholder.setAttribute("hidden", true)
        category.append(placeholder)
        CATEGORIES_ARRAY.forEach(cat => {
            let option = document.createElement('option')
                option.value = cat
                option.innerHTML = cat
                category.append(option)
        })
    let color = document.createElement('input')
        color.type = "text"
        color.name = "color"
        color.placeholder = "color"
    let image = document.createElement('input')
        image.type = "text"
        image.name = "image"
        image.placeholder = "image url"
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, brand, category, color, image, submit)
    container.append(form)
}

function createFurniture(event) {
    event.preventDefault()
    document.getElementById('create-container').innerHTML = ""
    let addButton = document.createElement('button')
        addButton.innerHTML = "Add Furniture Item"
        addButton.addEventListener('click', () => renderAddFurnitureForm())
    document.getElementById('create-container').append(addButton)
    let newFurniture = {
        name: event.target.name.value,
        brand: event.target.brand.value,
        category: event.target.category.value,
        color: event.target.color.value,
        image: event.target.image.value,
        user_id: CURRENT_USER.id
    }
    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newFurniture)
    }
    fetch('http://localhost:3000/furnitures', reqPack)
        .then(resp => resp.json())
        .then(furns => {
            renderFurniture(furns)})
}

function filterByCategory(cat) {
    let filteredFurniture = CURRENT_USER.furnitures.filter(item => item.category === cat)
    viewFurniture(filteredFurniture)
}

// UPDATE FUNCTIONS

function renderEditFurnitureForm(furniture) {
    let form = document.createElement('form')
        form.addEventListener('submit', (event) => updateItem(event, furniture))
    let name = document.createElement('input')
        name.type = "text"
        name.name = "name"
        name.value = furniture.name
    let brand = document.createElement('input')
        brand.type = "text"
        brand.name = "brand"
        brand.value = furniture.brand
    let category = document.createElement('select')
        category.name = "category"
        let currentCat = document.createElement('option')
            currentCat.innerHTML = furniture.category
            currentCat.setAttribute("selected", true)
        category.append(currentCat)
        let array = CATEGORIES_ARRAY.filter(cat => cat != furniture.category)
        array.forEach(cat => {
            let option = document.createElement('option')
                option.value = cat
                option.innerHTML = cat
                category.append(option)
        })
    let color = document.createElement('input')
        color.type = "text"
        color.name = "color"
        color.value = furniture.color
    let image = document.createElement('input')
        image.type = "text"
        image.name = "image"
        image.value = furniture.image
    let submit = document.createElement('input')
        submit.type = "submit"
    form.append(name, brand, category, color, image, submit)
    document.getElementById(`furniture-${furniture.id}`).append(form)
}

function updateItem(event, furniture) {
    event.preventDefault()

    let updatedItem = {
        name: event.target.name.value,
        brand: event.target.brand.value,
        category: event.target.category.value,
        color: event.target.color.value,
        image: event.target.image.value
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(updatedItem)
    }

    fetch(`http://localhost:3000/furnitures/${furniture.id}`, reqPack)
        .then(resp => resp.json())
        .then(item => {
            document.getElementById(`furniture-${furniture.id}`).innerHTML = ""
            renderFurniture(item)
        })
}

// DELETE FUNCTIONS

function deleteItem(furniture) {
    fetch(`http://localhost:3000/furnitures/${furniture.id}`, {method: "DELETE"})
    let index = CURRENT_USER.furnitures.indexOf(furniture)
    
    CURRENT_USER.furnitures.splice(index, 1)
    
    viewFurniture(CURRENT_USER.furnitures)
}