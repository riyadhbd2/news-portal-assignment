const allNewsLoad = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllNewsCategory(data.data.news_category));
}



const displayAllNewsCategory = allNews =>{
    const displayNews = document.getElementById('display-news');
        allNews.forEach(category => {
            console.log(category.category_name);
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('col')
            newsDiv.innerHTML =`
            <p>${category.category_name}</p>
            `
            displayNews.appendChild(newsDiv);
        });
}

allNewsLoad();