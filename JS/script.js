const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    if(searchText === 'oppo' || searchText === 'samsung' || searchText === 'iphone'){
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}
        `
        fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data));
        document.getElementById('error').style.display = 'none';
    }
    else{
        const searchResult = document.getElementById('search-result')
        // clear search result
        searchResult.textContent = '';
        document.getElementById('error').style.display = 'block';      
    }
    searchField.value = '';
}

const displayResult = phones => {
    const searchResult = document.getElementById('search-result')
    // clear search result
    searchResult.textContent = '';
    for(let i = 1; i <= 20; i++){
        const phone = phones.data[i]
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card m-2 p-4 h-80">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h3 class="card-title">${phone.phone_name}</h3>
        <button onclick="loadSingleResult('${phone.slug}')">Details</button>
        </div>
        </div>
         `
        searchResult.appendChild(div)    
    }
}

const loadSingleResult = (phone) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySinglePhone(data.data))
}

const displaySinglePhone = (singlePhone) => {
    const singleMealContainer = document.getElementById('phone-detail')
    singleMealContainer.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${singlePhone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${singlePhone.name}</h5>
      <p>${singlePhone.releaseDate}</p>
    </div>
    `
    singleMealContainer.appendChild(div)
}