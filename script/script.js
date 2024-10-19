// load the categories
const loadCategories = async () => {
    const res =await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories)
}
// display the categories
const displayCategories = (data) => {
    const categoryContainer = document.getElementById('pet-categories')
    data.forEach(category => {
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex item-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
        <img class=""w-10 src="${category.category_icon}"/>
        <h4 class="text-xl font-bold">${category.category}</h4>
        </button>
        `
        categoryContainer.appendChild(div)
    });
}

// loadAllPets
const loadAllPets = async () => {
    loadingSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    setTimeout(() => {
        displayAllPets(data.pets)
        storedPetData = data.pets
        loadingSpinner(false)
    }, 2000)
};

// displayAllPets
const displayAllPets = (data) => {
    const petContainers = document.getElementById('all-pets')
    petContainers.innerHTML = ''
    
    if (data.length === 0) {
        petContainers.classList.remove('grid')
        petContainers.innerHTML=`
        <div class="bg-gray-100 p-20 rounded-xl text-center space-y-4">
        <img src="./assets/error.webp"/>
        <h3 class="text-3xl font-semibold">No Data Available!!</h3>
        </div>
        `
        return
    } else {
        petContainers.classList.add('grid')
    }
    
    data.forEach(pet => {
        const div = document.createElement('div')
        div.classList.add(
            'flex',
            'flex-col',
            'gap-2',
            'p-4',
            'border',
            'rounded-xl',
            'font-bold'
        )
        div.innerHTML =`
        <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}"/>
        <h3 class="text-xl">${pet.pet_name}</h3>
        <p class="text-sm left-5 text-gray-700">Breed: ${pet.breed ? pet.breed : 'Not Available'}</p>
        <p class="text-sm left-5 text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'}</p>
        <p class="text-sm left-5 text-gray-700">Gender: ${pet.gender ? pet.gender : 'Not Available'}</p>
        <p class="text-sm left-5 text-gray-700">Price: ${pet.price ? '$' + pet.price : 'Not Available'}</p>

        <hr class="my-2"/>
        
        <div class="flex justify-between items-center gap-2"> 

        <button onclick="like('${pet.image}')" class="btn bg-white text-[#0E7A81] border rounded-lg py-1 px-4"><i class="fa-regular fa-thumbs-up"></i></button>

        <button onclick="adoptModal(this)" class="btn bg-white text-[#0E7A81] border rounded-lg py-1 px-4">Adopt</button>

        <button onclick="loadPetsDetails('${pet.petId}')" class="btn bg-white text-[#0E7A81] border rounded-lg py-1 px-4">Details</button>

        </div>
        
        `
        petContainers.appendChild(div)
    })
}

// loadPetsByCategory
const loadPetsByCategory = async (category) => {
    // Remove active button if exist
    removeActiveClasses()
    // Show active button
    addActiveClasses(category)
    loadingSpinner(true)
    // console.log(category)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json()
    setTimeout(() => {
        displayAllPets(data.data)
        storedPetData = data.data
        loadingSpinner(false)
    }, 2000)
}

// adopt button functionality
const adoptModal = event => {
    let count = 3
    const countContainer = document.getElementById('countdown-container')
    countContainer.innerText = count
    my_modal_2.showModal()
    const interval = setInterval(() => {
        count--
        if (count !== 0) countContainer.innerText = count
        if(count<1){
            clearInterval(interval)
            my_modal_2.close()
            event.textContent = 'Adopted'
            event.disabled = true
        }

    }, 1000)
}

// loadPetsByCategory
const loadPetsDetails = async (id) => {
    // console.log(category)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json()
    displayPetDetails(data.petData)
}

// displayPetDetails
const displayPetDetails = data => {
    console.log(data)
    const modalBody = document.getElementById('details-container')
    modalBody.innerHTML = `
    <img class="h-60 rounded-xl object-cover w-full" src="${data.image}">
    <h3 class="text-xl font-bold my-2">${data.pet_name}</h3>
    <div class="flex items-start gap-6">
        <div>
         <p class="text-gray-600 text-sm"><i class="fa-solid fa-paw"></i>Breed: ${data.breed ? data.breed : "Not Available"}</p>

         <p class="text-gray-600 text-sm"><i class="fa-solid fa-paw"></i>Gender: ${data.gender ? data.gender : "Not Available"}</p>
         
         <p class="text-gray-600 text-sm"><i class="fa-solid fa-syringe"></i>Vaccinated Status: ${data.vaccinated_status? data.vaccinated_status : "Not Available"}</p>
        </div>

        <div>
        <p class="text-gray-600 text-sm"><i class="fa-solid fa-calendar-days"></i>Birth Date: ${data.date_of_birth? data.date_of_birth : "Not Available"}</p>
        
        <p class="text-gray-600 text-sm"><i class="fa-solid fa-dollar-sign"></i>Price: ${data.price? '$' + data.price : "Not Available"}</p>
        </div>
    </div>
    <hr class="my-2"/>
    <h3 class="font-semibold text-md">Details Information</h3>
    <p class="text-sm text-gray-600">${data.pet_details ? data.pet_details : "Not Available"}</p>
    `

    my_modal_5.showModal()
}


loadAllPets()
loadCategories()