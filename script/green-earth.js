let allPlantsInfo = [];
let cart = [];

/**spinner**/
const manageSpinner = (status) => {
    const spinner = document.getElementById('spinner');
    const cardTreeSection = document.getElementById('card-tree-section');

    if (status) {
        spinner.classList.remove('hidden');
        cardTreeSection.classList.add('hidden');
    } else {
        spinner.classList.add('hidden');
        cardTreeSection.classList.remove('hidden');
    }
};

/**categories section **/
const loadCategories = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/categories");
        const data = await res.json();
        displayCategory(data.categories);
    } catch (error) {
        console.log(error);
    }
};

const displayCategory = (category) => {
    const categoryDiv = document.getElementById('category-section');
    categoryDiv.innerHTML = `
        <li onclick="clickCategory('all')" 
            class="list-none text-xl py-2 px-4 mt-4 rounded-lg cursor-pointer hover:bg-green-400 bg-green-500">
            All Trees
        </li>
    `;

    category.forEach((cat) => {
        categoryDiv.innerHTML += `
            <li onclick="clickCategory(${cat.id})" 
                class="list-none text-xl py-2 px-4 mt-4 rounded-lg cursor-pointer hover:bg-green-400">
                ${cat.category_name}
            </li>`;
    });

    categoryDiv.addEventListener('click', (e) => {
        const allLi = document.querySelectorAll('li');
        allLi.forEach((li) => li.classList.remove('bg-green-500'));
        if (e.target.localName === 'li') {
            e.target.classList.add('bg-green-500');
        }
    });
};

const clickCategory = async (id) => {
    manageSpinner(true);
    try {
        if (id === "all") {
            const res = await fetch("https://openapi.programming-hero.com/api/plants");
            const data = await res.json();
            allPlantsInfo = data.plants;
            displayAllPlants(data.plants);
        } else {
            const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
            const data = await res.json();
            allPlantsInfo = data.plants;
            displayCategoryCard(data.plants);
        }
    } catch (error) {
        console.log(error);
    } finally {
        manageSpinner(false);
    }
};

/**load all trees**/
const loadAllPlants = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/plants");
        const data = await res.json();
        allPlantsInfo = data.plants; 
        displayAllPlants(data.plants);
    } catch (error) {
        console.log(error);
    }
};

const displayAllPlants = (plants) => {
    const cardTrees = document.getElementById('card-tree-section');
    cardTrees.innerHTML = "";

    plants.forEach((plant) => {
        cardTrees.innerHTML += `
          <div class="bg-white p-3 rounded-lg w-[343px] hover:shadow-2xl">
            <div class="w-full h-48 object-contain">
                <img class="w-full h-full object-cover rounded-md" src="${plant.image}" alt="${plant.name}">
            </div>
            <h1 onclick="showModalInfo(${plant.id})" class="mt-3 text-xl font-bold">${plant.name}</h1>
            <p class="my-3 h-16 text-xs">${plant.description}</p>
            <div class="flex justify-between mb-3">
                <h2 class="bg-green-200 px-2 rounded-full">${plant.category}</h2>
                <h2 class="font-semibold mr-3"><span class="text-xl font-bolder">৳</span>${plant.price}</h2>
            </div>
            <button onclick="addToCart(${plant.id})" 
                class="bg-green-700 w-full text-white rounded-3xl py-1 cursor-pointer hover:bg-green-600 active:bg-green-400">
                Add to Cart
            </button>
          </div>`;
    });
};

const displayCategoryCard = (catCard) => {
    const cardTreeSection = document.getElementById('card-tree-section');
    cardTreeSection.innerHTML = "";
    catCard.forEach((plant) => {
        cardTreeSection.innerHTML += `
          <div class="bg-white p-3 rounded-lg w-[343px] hover:shadow-2xl">
                <div class="w-[311px] h-[187px] mx-auto">
                    <img class="w-full h-full object-cover rounded-md" src="${plant.image}" alt="${plant.name}">
                </div>
                <h1 onclick="showModalInfo(${plant.id})" class="mt-3 text-xl font-bold">${plant.name}</h1>
                <p class="my-3 h-16 text-xs">${plant.description}</p>
                <div class="flex justify-between mb-3">
                    <h2 class="bg-green-200 px-2 rounded-full">${plant.category}</h2>
                    <h2 class="font-semibold mr-3"><span class="text-xl font-bolder">৳</span>${plant.price}</h2>
                </div>
                <button onclick="addToCart(${plant.id})" 
                    class="bg-green-700 w-full text-white rounded-3xl py-1 cursor-pointer hover:bg-green-600 active:bg-green-400">
                    Add to Cart
                </button>
          </div>`;
    });
};

/**modal**/
const showModalInfo = (plantId) => {
    const plant = allPlantsInfo.find(p => p.id === plantId);
    if (plant) {
        const modalDetails = document.getElementById('modal-details');
        modalDetails.innerHTML = `
            <h1 class="text-xl font-bold">${plant.name}</h1>
            <div class="w-full h-64">
                <img class="w-full h-full object-cover rounded-md" src="${plant.image}" alt="${plant.name}">
            </div>
            <h3 class="text-sm"><span class="text-lg font-semibold">Category:</span> ${plant.category}</h3>
            <h3><span class="font-semibold">Price:</span> ৳${plant.price}</h3>
            <p>${plant.description}</p>
        `;
        document.getElementById('my_modal_5').showModal();
    }
};

/**cart functionality**/
const addToCart = (plantId) => {
    const plant = allPlantsInfo.find(p => p.id === plantId);
    if (plant) {
        const existingItem = cart.find(item => item.id === plantId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: plant.id,
                name: plant.name,
                price: plant.price,
                quantity: 1
            });
        }
        updateCartDisplay();

        alert(`${plant.name} has been added to your cart!`);
    }
};

const removeFromCart = (plantId) => {
    const itemIndex = cart.findIndex(item => item.id === plantId);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
    }
};

const updateCartDisplay = () => {
    const cartItems = document.getElementById('cart-items');
    const totalCost = document.getElementById('total-cost');
    const totalItems = document.getElementById('total-items');

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="flex justify-between items-center bg-green-100 p-2 rounded mb-2">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p class="text-sm">৳${item.price} x ${item.quantity}</p>
                </div>
                <div class="flex items-center">
                    <span class="font-semibold">৳${itemTotal}</span>
                    <button onclick="removeFromCart(${item.id})" 
                        class="ml-2 text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    });

    totalCost.textContent = `৳${total}`;
    totalItems.textContent = count;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500">Your cart is empty</p>';
        totalCost.textContent = '৳0';
        totalItems.textContent = '0';
    }
};

window.onload = () => {
    loadCategories();
    loadAllPlants();
};
