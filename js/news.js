// Load all data 
const allNewsLoad = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllNewsCategory(data.data.news_category))
    .catch(error => console.log(error))
}


// Display All Data 
const displayAllNewsCategory = allNews =>{
    const displayNews = document.getElementById('display-news');
        allNews.forEach(catagory => {
            // console.log(category);
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('col')
            newsDiv.innerHTML =`
            <div onclick="loadAllCategory('${catagory.category_id}')">${catagory.category_name}</div>
            `
            displayNews.appendChild(newsDiv);
        });
}

// Load All Catagories 

const loadAllCategory =(id) =>{
    startSpinner(true);
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => displayAllCategories(data.data))
    .catch(error => console.log(error))
    
}

// Display All Catagories 

const displayAllCategories = categories =>{
    const num = categories.length;
    showNumber(num);
    const allCatagories = document.getElementById('catagory-container');
    allCatagories.innerHTML = ``;
    categories.forEach(category => {
        console.log(category);
        const newCatagoryDiv = document.createElement('div');
        newCatagoryDiv.classList.add('col');
        newCatagoryDiv.innerHTML = `
        <div onclick="newsDetails('${category._id}') class="card h-100 border border-warning">
            <img src="${category.image_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${category.title}</h5>
                <p class="card-text">${category.details.slice(0, 150)+ '...'}</p>
            </div>
            <div id="author" class="mt-4">
                <div class="child flex mt-3">
                    <img src ="${category.author.img}" id="author-image" class= "rounded-5" alt="..."> 
                    <div class="author-name">
                        <p class="ms-1">${category.author.name ? category.author.name : 'No name found'}</p>
                        <p>${category.author.published_date}</p>
                    </div>
                </div>
                <div class="child flex mt-4">
                    <i class="fa-solid fa-eye mt-1"></i>
                    <p class="ms-1">${category.total_view ? category.total_view : 'No view yet'}</p>
                </div>
                <div class="child mt-4">
                    <button onclick="newsDetails('${category._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Details News</button>
                </div>
            </div>
        </div>
        `
        allCatagories.appendChild(newCatagoryDiv);
        
    });
    startSpinner(false);

}

// Load All Details

const newsDetails = (newsId) =>{
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
    .catch(error => console.log(error))
}

// Display news details 

const displayNewsDetails = (details)=>{
    console.log(details);
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText =`'${details.title}'`
    const modalDetails = document.getElementById('news-details');
    modalDetails.innerText = `'${details.details}'`
    
}


// Spinner function
const startSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    } else {
        spinnerSection.classList.add('d-none')
    }
}

// Categories Count 
const showNumber = numbers =>{
    const number = document.getElementById('numbers');
    number.innerText = `
    ${numbers} news are available in this category`
}

// Blog details 
document.getElementById('btn-blog').addEventListener('click', function(){
    const blogDetails = document.getElementById('blog-details');
    const newBlogDiv = document.createElement('div');
    newBlogDiv.innerHTML = `
        <h3>Todays All Blogs</h3>
        <h6>What is the differences between var, let and const?</h6>
        <p>Var declarations are globally scoped or function scoped while let and const are block scoped. var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared. They are all hoisted to the top of their scope.</p>
        <h6>What is the differences between arrow function and regular function?</h6>
        <p>Regular functions created using function declarations or expressions are constructible and callable. Since regular functions are constructible, they can be called using the new keyword. However, the arrow functions are only callable and not constructible, i.e arrow functions can never be used as constructor functions.</p>
        <h6>What is the differences between map, foreach, filter nd find?</h6>
        <p>Map() will return a new array as per the conditions applied. forEach() will not return anything. forEach() returns undefined. filter() method will return an array of matching elements else will return an empty array if no matching happens.</p>
        <h6>Why templete string is used?</h6>
        <p>One of the powerful features introduced in TypeScript 4.1 is template literal types which provide greater flexibility and control over string literal types. In TypeScript, a string literal type is a type that represents a specific set of string values.</p>
        `
    blogDetails.appendChild(newBlogDiv);
})

allNewsLoad();