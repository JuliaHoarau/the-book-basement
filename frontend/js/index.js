function fetchData() {
    fetch('/api/index')
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        const html = data.map(books => {
            return `
            <div class="container">
            <img src="img/don-quixote.jpg" alt=" Avatar" class="image">
            <div class="overlay">
                <div class="text">
                    <h2>${books.bookTitle}</h2>
                    <p><strong>Original Title:</strong> ${books.originalTitle}</p>
                    <p><strong>Year Published:</strong> ${books.yearofPublication}</p>
                    <p><strong>Genre:</strong> ${books.genre}</p>
                    <p><strong>Million Copies Sold:</strong> ${books.millionsSold}</p>
                </div>
            </div>
        </div>
            `
        }).join("")
        console.log(html)
        document
        .querySelector('#app')
        .insertAdjacentHTML("afterbegin", html)
    })
}

fetchData()
  