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
        // console.log(category);
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
                    <div class="author-name">
                        <p class="ms-1">${category.author.name}</p>
                        <p>${category.author.published_date}</p>
                    </div>
                </div>
                <div class="child flex mt-4">
                    <i class="fa-solid fa-eye mt-1"></i>
                    <p class="ms-1">${category.total_view}</p>
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



allNewsLoad();