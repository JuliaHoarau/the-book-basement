fetch('/nav_logged_in.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("nav");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})