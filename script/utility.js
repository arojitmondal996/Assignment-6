// storedPetData
let storedPetData = []


// Loading Spinner
const loadingSpinner = show => {
    const spinner = document.getElementById('loader')
    if (show) {
        spinner.classList.remove('hidden')
        document.getElementById('all-pets').innerHTML = ''
    } else {
        spinner.classList.add('hidden')
    }
};

// Remove active button styles

const removeActiveClasses = () => {
    const allButtons = document.querySelectorAll('.category-btn')
    // console.log(allButtons)
    for (btn of allButtons) {
        btn.classList.remove(
        'bg-emerald-100',
        'rounded-full',
        'border-teal-800',
        'border-2'
        )
    btn.classList.add('rounded-xl')
    }
}

// Add Active class
const addActiveClasses = category => {
    const activeButton = document.getElementById(`btn-${category}`)
    // console.log(activeButton)
    activeButton.classList.remove('rounded-xl')
    activeButton.classList.add(
        'bg-emerald-100',
        'rounded-full',
        'border-teal-800',
        'border-2'
    )
};


// Handle like button
const like = imgUrl => {
    // console.log(imgUrl)
    const imageContainer = document.getElementById('likes-pet')
    const div =document.createElement('div')
    div.innerHTML = `<img class="rounded-lg" src="${imgUrl}"/>`
    imageContainer.appendChild(div)
}

// handle sort data
const sort = () => {
    loadingSpinner(true)
    // console.log(storedPetData)
    const sortedData = storedPetData.sort((a, b) => b.price-a.price)
    setTimeout(() => {
        loadingSpinner(false)
        displayAllPets(sortedData)
    }, 500)
}