const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    if(searchText.length == 0){
        const searchResult = document.getElementById('search-result')
        // clear search result
        searchResult.textContent = '';
        document.getElementById('error').style.display = 'block';  

    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}
        `
        fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data));
        document.getElementById('error').style.display = 'none';
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
        <div class="card m-2 p-4 h-80 rounded-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h3 class="card-title">${phone.brand}</h3>
                <h5 class="card-title">${phone.phone_name}</h5>
                <button class="btn btn-secondary" onclick="loadSingleResult('${phone.slug}')">Show Details</button>
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
    console.log(singlePhone)
    const sensoreInfo = singlePhone.mainFeatures.sensors;
    const senore = sensoreInfo.map(sensor => {
        return sensor;
    })
        const singlePhoneContainer = document.getElementById('phone-detail')
        singlePhoneContainer.textContent = '';
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3 p-4 rounded-3">
        <h4 class="fs-3 text-center">${singlePhone.brand}</h4>
         <div class="row g-0 align-items-center">
          <div class="col-md-4">
           <img src="${singlePhone.image}" class="img-fluid rounded-start" alt="...">
           <h5 class="mt-2 text-center">${singlePhone.name}</h5>
           <p class="card-text"><small class="text-muted">${singlePhone.releaseDate}</small></p>
          </div>
          <div class="col-md-8">
            <div class="card-body">
             <p><span class="fw-bold">Memory:</span> ${singlePhone.mainFeatures.memory}</p>
             <p><span class="fw-bold">Storage:</span> ${singlePhone.mainFeatures.storage}</p>
             <p><span class="fw-bold">Display:</span> ${singlePhone.mainFeatures.displaySize}</p>
             <p><span class="fw-bold">ChipSet:</span> ${singlePhone.mainFeatures.chipSet}</p>
             <p><span class="fw-bold">Sensore:</span> ${senore}</p>
             <p><span class="fw-bold">WLAN:</span> ${singlePhone.others.WLAN}</p>
             <p><span class="fw-bold">Bluetooth:</span> ${singlePhone.others.Bluetooth}</p>
             <p><span class="fw-bold">GPS:</span> ${singlePhone.others.GPS}</p>
             <p><span class="fw-bold">NFC:</span> ${singlePhone.others.NFC}</p>
             <p><span class="fw-bold">USB:</span> ${singlePhone.others.USB}</p>
            </div>
          </div>
         </div>
        </div>
        `
        singlePhoneContainer.appendChild(div)
}
