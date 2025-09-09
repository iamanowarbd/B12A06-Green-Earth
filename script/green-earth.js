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

loadCategories()