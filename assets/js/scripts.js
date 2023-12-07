const bar = document.querySelector("#bar");
const close = document.querySelector("#close");
const nav = document.querySelector(".navbar");

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

let http = new XMLHttpRequest();

http.open('get', './products.json', true);
http.send();

http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {

        let products = JSON.parse(this.responseText);
        let output = "";

        for (let item of products) {
            output += `
                <div class="product ${item.category}">
                    <img src="${item.image}" alt="">
                    <h4 class="name">${item.name}</h4>
                    <span>${item.price}</span>
                    <a href="/single-product-detail.html?id= + ${item.id}">Adicionar ao carrinho</a>
                </div>
            `
        }
        document.querySelector(".products").innerHTML = output;
    }

    
}

function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");

    buttons.forEach(button => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    let elements = document.querySelectorAll(".product");

    elements.forEach(element => {
        if (value == 'todos') {
            element.classList.remove('hide');
        } else if (element.classList.contains(value)) {
            element.classList.remove('hide');
        } else {
            element.classList.add('hide');
        }
    });
}

document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".name");
    let cards = document.querySelectorAll(".product");

    elements.forEach((element, index) => {
        if (element.innerText.includes(searchInput)) {
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide");
        }
    });
});

window.onload = () => {
    filterProduct("todos");
}
