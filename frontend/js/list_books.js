// fetch('api/index')
// .then(res => res.json())
// .then(books => {
//     let bookListSection = document.getElementById('book-list')

//     for (let book of books) {
//         bookListSection.innerHTML += `
//         <article>
//             <span><strong>${book.bookID}</strong></span>
//             <span>${book.bookTitle}</span>
//             <a href="update_book.html?id=${book.bookID}">Edit</a>
//             <a href="delete_book.html?id=${book.bookID}">Delete</a>
//         </article>
//         `
//     }
// })

fetch('/api/index')
.then(res => res.json())
.then (data =>{
    console.log(data);
    if(data.length >0){
        let temp =""

        data.forEach((b) => {
            temp += `<th>${b.bookID}</th>`
            temp += `<td>${b.bookTitle}</td>`
            temp += `<td><a href="update_book.html?id=${b.bookID}">Edit</a></td>`
            temp += `<td><a href="delete_book.html?id=${b.bookID}">Delete</a></td></tr>`
        })

        document.getElementById('data').innerHTML = temp;
    }
})