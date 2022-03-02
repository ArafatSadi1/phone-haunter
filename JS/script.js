const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}
    `
    fetch(url)
    .then(res => res.json())
    .then(data => searchResult(data.data));
}

const searchResult = phones => {
    const searchResult = document.getElementById('search-result')
    // clear search result
    searchResult.textContent = '';
    phones.forEach( phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <button onclick="loadSingleResult('${phone.slug}')">Details</button>
        </div>
        </div>
         `
        searchResult.appendChild(div)
    })
}

const loadSingleResult = (phone) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleMeal(data.data))
}

const displaySingleMeal = (singlePhone) => {
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