const loadAll = () =>{
    fetch(' https://openapi.programming-hero.com/api/news/category/01')
    .then(res => res.json())
    .then(data => console.log(data.data))
}


loadAll();