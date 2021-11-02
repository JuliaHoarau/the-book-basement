

fetch('/api/users')
.then(res => res.json())
.then (data =>{
    console.log(data);
    if(data.length >0){
        let temp =""

        data.forEach((u) => {
            temp += `<th>${u.userID}</th>`
            temp += `<td>${u.firstName}</td>`
            temp += `<td>${u.lastName}</td>`
            temp += `<td>${u.email}</td>`
            temp += `<td><a href="update_user.html?id=${u.userID}">Edit</a></td>`
            temp += `<td><a href="delete_user.html?id=${u.userID}">Delete</a></td></tr>`
        })

        document.getElementById('data').innerHTML = temp;
    }
})