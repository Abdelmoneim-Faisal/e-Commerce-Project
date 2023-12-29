window.onload = function () {
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

    var storedItems = localStorage.getItem('cartItems');
    var cartItemsContainer = document.querySelector('.cart-items');
    var price = document.querySelector('.price');
    var total = 0;

    if (storedItems) {
        var boughtItems = JSON.parse(storedItems);
        boughtItems.forEach(function (item) {
            total += Number(item.price);
            price.innerHTML = total;

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style.width = '250px';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            var image = document.createElement('img')
            image.classList.add('card-img-top');
            image.src = item.image;

            var title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = item.title;

            var removeBtn = document.createElement('a');
            removeBtn.classList.add('btn', 'btn-primary');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', function () {
                // Remove the item from localStorage and update display
                var index = boughtItems.indexOf(item);
                if (index !== -1) {
                    boughtItems.splice(index, 1);
                    localStorage.setItem('cartItems', JSON.stringify(boughtItems));
                    cartItemsContainer.removeChild(cardDiv);
                    var myDate = new Date();
                    myDate.setDate(myDate.getDate() + 3);
                    document.cookie = "elements=" + cartItemsContainer.childElementCount + ";expires=" + myDate.toUTCString();
                    window.location.reload();
                    if (cartItemsContainer.childElementCount === 0) {
                        window.close();
                    }
                }
            });

            cardBodyDiv.appendChild(image)
            cardBodyDiv.appendChild(title);
            cardBodyDiv.appendChild(removeBtn);
            cardDiv.appendChild(cardBodyDiv);
            cartItemsContainer.appendChild(cardDiv);
        });
    }
}
