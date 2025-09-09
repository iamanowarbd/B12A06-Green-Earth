/**categories section **/
const loadCategories = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/categories");

        const data = await res.json();
        displayCategory(data.categories);
    }
    catch (error) {
        console.log(error)
    }
}

const displayCategory = (category) => {

    const categoryDiv = document.getElementById('category-section');

    categoryDiv.innerHTML = "";

    categoryDiv.innerHTML += `
    <li onclick="clickCategory('all')" 
        class="list-none text-xl py-2 px-4 mt-4 rounded-lg cursor-pointer hover:transition hover:bg-green-400 bg-green-500">
        All Trees
    </li>
  `;

    category.forEach((cat) => {
        categoryDiv.innerHTML += `
       <li onclick = "clickCategory(${cat.id})" class="list-none text-xl py-2 px-4 mt-4 rounded-lg cursor-pointer hover:transition hover:bg-green-400">${cat.category_name}</li>
       `

    })

    categoryDiv.addEventListener('click', (e) => {
        const allLi = document.querySelectorAll('li');
        allLi.forEach((li) =>
            li.classList.remove('bg-green-500')
        );
        if (e.target.localName === 'li') {
            e.target.classList.add('bg-green-500')
        }
    });

}
const clickCategory = async (id) => {
    if (id === "all") {
        loadAllPlants();
    }
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();

    displayCategoryCard(data.plants);
}

loadCategories()

/**load all trees**/

const displayCategoryCard = (catCard) => {
    const cardTreeSection = document.getElementById('card-tree-section');
    cardTreeSection.innerHTML = "";
    catCard.forEach((cards) => {
        cardTreeSection.innerHTML += `
        
          <div class= "bg-white p-3 rounded-lg w-[265px] hover:shadow-2xl ">
                <div class="w-[311px] h-[187px]">
                    <img class="w-full h-full object-cover rounded-md" src="${cards.image}">
                </div>
                  <h1 class="mt-3 text-xl font-bold">${cards.name}</h1>
                  <p class="my-3 h-16 text-xs">${cards.description}</p>
                  <div class="flex justify-between  mb-3 ">
                    <h2 class="bg-green-200 px-2 rounded-full">${cards.category}</h2>
                    <h2 class="font-semibold mr-3"><span class=" text-xl font-bolder">৳</span>${cards.price}</h2>
                  </div>
                  <button class="bg-green-700 w-full text-white rounded-3xl py-1 cursor-pointer active:bg-green-400 active:transition">Add to Cart</button>
               </div>
        `
    })
}

const loadAllPlants = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/plants");
        const data = await res.json();
        displayAllPlants(data.plants)

    }
    catch (error) {
        console.log(error);
    }
}

const displayAllPlants = (plants) => {
    const cardTrees = document.getElementById('card-tree-section');

    plants.forEach((plant) => {
        cardTrees.innerHTML += `
          <div class= "bg-white p-3 rounded-lg w-[265px] hover:shadow-2xl ">
                <div class="w-[243px] h-[185px]">
                    <img class="w-full h-full object-cover rounded-md" src="${plant.image}">
                </div>
                  <h1 class="mt-3 text-xl font-bold">${plant.name}</h1>
                  <p class="my-3 h-16 text-xs">${plant.description}</p>
                  <div class="flex justify-between  mb-3 ">
                    <h2 class="bg-green-200 px-2 rounded-full">${plant.category}</h2>
                    <h2 class="font-semibold mr-3"><span class=" text-xl font-bolder">৳</span>${plant.price}</h2>
                  </div>
                  <button onclick="addToCart('${plant.name}', ${plant.price})" class="bg-green-700 w-full text-white rounded-3xl py-1 cursor-pointer active:bg-green-400 active:transition">Add to Cart</button>
               </div>
        `
    })
}

loadAllPlants()
