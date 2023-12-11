const bar = document.querySelector("#bar");
const close = document.querySelector("#close");
const nav = document.querySelector(".navbar");
let listProduct = document.querySelector(".products");

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

const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();
        });
}

const addDataToHTML = () => {
    if (products.length > 0) {

        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('product');
            newProduct.innerHTML =
            `<img src="${product.image} " alt="">
             <h4 class="name">${product.name}</h4>
             <span>${product.price}</span>
             <a href="/single-product-detail.html?id= + ${product.id}">Detalhes</a>`;
            listProduct.appendChild(newProduct);
        });
    }
}

initApp();

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


