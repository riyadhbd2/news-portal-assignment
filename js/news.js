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
        allNews.forEach(category => {
            // console.log(category);
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('col')
            newsDiv.innerHTML =`
            <div onclick="loadAllCategory('${category.category_id}')">${category.category_name}</div>
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
                    <img id="author-image" class= "rounded-5" src ="${category.author.img}"> 
                    <p id ="author-name" class="ms-1">${category.author.name}</p>
                </div>
                <div class="child flex mt-4">
                    <i class="fa-solid fa-eye mt-1"></i>
                    <p class="ms-1">${category.total_view}</p>
                </div>
                <div class="child mt-4">
                    <button>Details News</button>
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

const displayNewsDetails =()=>{
     
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


allNewsLoad();