document.addEventListener("DOMContentLoaded", function () {
    window.onscroll = function () { scrollFunction() };
});

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var i = 1;
var showNext = function () {
    i++;
    if (i === 7) {
        i = 1;
    }
    var image = document.getElementsByTagName('img')[0];
    var newImage = "Images/" + i + ".jpg"
    var newAlt = "image" + i;
    image.setAttribute("src", newImage);
    image.setAttribute("alt", newAlt);
}

var showPre = function () {
    i--;
    if (i === 0) {
        i = 6;
    }
    var image = document.getElementsByTagName('img')[0];
    var newImage = "Images/" + i + ".jpg";
    var newAlt = "image" + i;
    image.setAttribute("src", newImage);
    image.setAttribute("alt", newAlt);
}

var myInterval;
var play = function () {
    myInterval = setInterval(function () {
        showNext();
    }, 2250);
}();

var setButtons = function () {
    var btnAll = document.getElementById('all');
    var btnPhones = document.getElementById('phones');
    var btnLaps = document.getElementById('laps');
    var btnCameras = document.getElementById('cameras');
    btnAll.removeAttribute('class');
    btnPhones.removeAttribute('class');
    btnLaps.removeAttribute('class');
    btnCameras.removeAttribute('class');
}

var setClasses = function () {
    var allCards = document.querySelectorAll('.all-cards .card');
    for (var i = 0; i < allCards.length; i++) {
        if (i < 3) {
            allCards[i].children[0].classList.add('camera-card');
        } else if (i < 7) {
            allCards[i].children[0].classList.add('laptop-card');
        } else {
            allCards[i].children[0].classList.add('phone-card');
        }
    }
}();

var elements = document.querySelectorAll('.card');
var showAllCate = function () {
    var btnAll = document.getElementById('all');
    if (btnAll.hasAttribute('class')) {
    } else {
        setButtons();
        btnAll.setAttribute('class', 'active');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'flex'
        }
    }
}

var showPhones = function () {
    showAllCate();
    var phones = document.querySelectorAll('.all-cards .card .phone-card');
    var btnPhones = document.getElementById('phones');
    if (btnPhones.hasAttribute('class')) {
    } else {
        setButtons();
        btnPhones.setAttribute('class', 'active');
        for (var j = 0; j < elements.length; j++) {
            if (elements[j].querySelector('.phone-card')) {
                for (var i = 0; i < phones.length; i++) {
                    phones[i].style.display = 'flex'
                }
            } else {
                elements[j].style.display = 'none'
            }
        }
    }
}

var showLaps = function () {
    showAllCate();
    var laps = document.querySelectorAll('.all-cards .card .laptop-card');
    var btnLaps = document.getElementById('laps');
    if (btnLaps.hasAttribute('class')) {
    } else {
        setButtons();
        btnLaps.setAttribute('class', 'active');
        for (var j = 0; j < elements.length; j++) {
            if (elements[j].querySelector('.laptop-card')) {
                for (var i = 0; i < laps.length; i++) {
                    laps[i].style.display = 'flex'
                }
            } else {
                elements[j].style.display = 'none'
            }
        }
    }
}

var showCameras = function () {
    showAllCate();
    var cameras = document.querySelectorAll('.all-cards .card .camera-card');
    var btnCameras = document.getElementById('cameras');
    if (btnCameras.hasAttribute('class')) {
    } else {
        setButtons();
        btnCameras.setAttribute('class', 'active');
        for (var j = 0; j < elements.length; j++) {
            if (elements[j].querySelector('.camera-card')) {
                for (var i = 0; i < cameras.length; i++) {
                    cameras[i].style.display = 'flex'
                }
            } else {
                elements[j].style.display = 'none'
            }
        }
    }
}


var counter = 0;
var latestCount;
var myDate = new Date();
myDate.setDate(myDate.getDate() + 3);
var boughtItems = [];
function addToCart() {
    counter++;
    console.log(counter);
    document.cookie = "elements=" + counter + ";expires=" + myDate;
    document.getElementsByTagName('span')[0].innerHTML = counter;
    return counter;
}
document.body.onload = function () {
    var latestCount = addToCart();
    console.log(latestCount);
    document.getElementsByTagName('span')[0].innerHTML = latestCount;
};

function updateCounter() {
    var counter = document.cookie
        .split('; ')
        .find(row => row.startsWith('elements='))
        ?.split('=')[1] || 0;

    document.getElementsByTagName('span')[0].innerHTML = counter;
    return parseInt(counter);
}


function addToCart(event) {
    var counter = updateCounter();
    counter += 1;
    document.cookie = "elements=" + counter + ";expires=" + myDate.toUTCString();
    document.getElementsByTagName('span')[0].innerHTML = counter;

    // Store product information instead of DOM elements in localStorage
    var productInfo = {
        image: event.target.parentNode.parentNode.querySelector('.card-img-top').src,
        title: event.target.parentNode.querySelector('.card-title').textContent,
        price: event.target.parentNode.querySelector('.price').textContent
        // Include any other necessary information about the product
    };

    // Store product info in an array in localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(productInfo);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    updateCounter();
    localStorage.removeItem('cartItems'); // Clear cart items from localStorage
    boughtItems = []; // Clear boughtItems array
}

window.onload = function () {
    updateCounter();
    var storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        boughtItems = JSON.parse(storedItems);
    }
}

// deleteCookie('elements');

var updateCart = function () {
    const counterValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('elements='))
        ?.split('=')[1];
    if (counterValue === '0') {
        alert("You don't have any items in your cart !");
    } else {
        var cart = window.open("cart.html", '_blank');
        cart.addEventListener('DOMContentLoaded', function () {
            var cartBody = cart.document.querySelector('.cart-items');
            boughtItems.forEach(function (item) {
                cartBody.appendChild(item.cloneNode(true));
            });
        })
    }
};

// Check if the browser supports the Page Visibility API
if (typeof document.hidden !== 'undefined') {
    // Listen for visibility change events
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            // When the tab becomes visible again (user switches back to it)
            window.location.reload();
        }
    });
}

// Additionally, you can also handle focus events to reload when the tab gains focus
window.addEventListener('focus', function () {
    window.location.reload();
});
