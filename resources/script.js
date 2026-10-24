const topGames = document.querySelector('.featured');
const homePage = document.getElementById('home-page-body');
const basketCount = document.getElementById('basket-count');
const basketItemsContainer = document.querySelector('.basket-items');
const basketTotalContainer = document.querySelectorAll('.basket-total');
const checkoutBtnContainer = document.getElementById('checkout-btn-container');
const emptyBasketContainer = document.querySelector('.empty-basket');
const basketBottom = document.getElementById('basket-bottom');
const gamePage = document.querySelector('.for-sale-games');
const checkoutPage = document.getElementById('checkout-main-body');
const checkoutSummaryContainer = document.querySelector('.checkout-summary')
const payButton = document.getElementById('pay');
const basketHeader = document.getElementById('basket-header');
const basketSummary = document.getElementById('basket-summary');
const checkoutContainer = document.querySelector('.checkout-container');
const basketEmptied = document.querySelector('.basket-emptied');
const baskettop = document.getElementById('basket-top');
const paySubmitted = document.getElementById('pay-submitted');
const searchResults = document.getElementById('search-results');
const openSearchbar = document.getElementById('open-searchbar');
const resultsContainer = document.getElementById('search-results-container');
const allGamesBtn = document.querySelectorAll('.all-games-btn');
const genreBtn = document.getElementById('genre');
const priceBtn = document.getElementById('price');
const genreContainer = document.getElementById('genre-container');
const priceContainer = document.getElementById('price-container');
const genreOptions = document.getElementById('genre-options');
const priceOptions = document.getElementById('price-options');
const filter = document.getElementById('filter');
const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked')
const clearGenreBtn = document.getElementById('clear-genre');
const clearPriceBtn = document.getElementById('clear-price');
const totalContainer = document.getElementById('total');
const paymentContainer = document.querySelector('.payment');
const paymentOptionsLabels = document.querySelectorAll('#payment-inputs label');
const paymentOptionsIcons = document.querySelectorAll('#payment-inputs label i');
const paymentOptionsSpans = document.querySelectorAll('#payment-inputs span');
const gamesMainBody = document.getElementById('games-page-body');
const productPage = document.querySelector('.product-main-body');
const productBackButton = document.getElementById('all-games');
let countdown;
let toastTimer;
let previousBasket;
let isUserClick = false;


document.addEventListener('DOMContentLoaded', () => {
    if (gamePage) {
        reapplyFilters()
    }
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        reapplyFilters();
    }
});

function reapplyFilters() {
    const navSource = sessionStorage.getItem('navSource');
    const savedGenres = JSON.parse(sessionStorage.getItem('savedGenres'));
    const savedPrices = JSON.parse(sessionStorage.getItem('savedPrices'));
    if (savedGenres && savedGenres.length > 0) {
        document.querySelectorAll('input[name="genre-choice"]').forEach((genre) => {
            if (savedGenres.includes(genre.value)) {
                genre.checked = true;
                updateGenreClearButton();
            };
        });
    };
    if (savedPrices && savedPrices.length > 0) {
        document.querySelectorAll('input[name="price-choice"]').forEach((price) => {
            const [min, max] = price.value.split('-');
            const isMatched = savedPrices.some((range) => {
                return range.min === Number(min) && range.max === Number(max);
            });
            if (isMatched) {
                price.checked = true;
                updatePriceClearButton();
            };
        });
    };

    const searchQuery = new URLSearchParams(window.location.search).get('search');
    if (searchQuery) {
        if (navSource === 'fresh-search') {
            document.querySelectorAll('input[type="checkbox"]').forEach((box) => {
                box.checked = false;
            });
            sessionStorage.removeItem('savedGenres');
            sessionStorage.removeItem('savedPrices');
            if (clearGenreBtn) clearGenreBtn.innerHTML = '';
            if (clearPriceBtn) clearPriceBtn.innerHTML = '';
            const chosenFilters = document.getElementById('chosen-filters');
            if (chosenFilters) chosenFilters.innerHTML = '';
            sessionStorage.removeItem('navSource');
        } else {
            sessionStorage.removeItem('navSource');
        }
    } else if (navSource !== 'filtered') {
        sessionStorage.removeItem('savedGenres');
        sessionStorage.removeItem('savedPrices');
    } else {
        sessionStorage.removeItem('navSource');
    };

    applyFilters();

};



/* Check Basket length on start */

let basket = JSON.parse(localStorage.getItem('user-basket')) || [];
updateBasketCount()
function updateBasketCount() {
    basketCount.textContent = basket.reduce((total, game) => {
        return total + game.quantity;
    }, 0);
}

/* Product Array */

const gameData = [
    {
        id: 1,
        title: "Marvel's Spider-Man Miles Morales",
        image: "./resources/images/miles.jpeg",
        featimage: "./resources/images/spider.avif",
        alt: "Miles Morales swinging through the city as Spider-Man",
        description: "Experience the thrilling adventures of Miles Morales as he takes on the mantle of Spider-Man in this action-packed game.",
        price: 59.99,
        genre: ["Action-Adventure"],
        featured: true
    },
    {
        id: 2,
        title: "Minecraft",
        image: "./resources/images/minecraft2.jpg",
        alt: "",
        description: "Explore endless possibilities in this sandbox game where you can build, create, and survive in a blocky world.",
        price: 22.99,
        genre: ["Action-Adventure", "Open World"],
    },
    {
        id: 3,
        title: "Star Wars Jedi: Survivor",
        image: "./resources/images/jedi.jpg",
        featimage: "./resources/images/jediSurvivor.png",
        alt: "Star Wars Jedi: Survivor game cover",
        description: "Continue the adventures of Cal Kestis in this action-packed Star Wars game.",
        price: 18,
        genre: ["Action-Adventure"],
        featured: true
    },
    {
        id: 4,
        title: "Hitman: World Of Assassination",
        image: "./resources/images/hitman.jpeg",
        alt: "Hitman: World Of Assassination game cover",
        description: "Assassinate targets in this action-packed stealth game.",
        genre: ["Stealth"],
        price: 28.99
    },
    {
        id: 5,
        title: "The Witcher 3: Wild Hunt",
        image: "./resources/images/witcher.jpeg",
        featimage: "./resources/images/witcherLong.jpeg",
        alt: "The Witcher 3: Wild Hunt game cover",
        description: "Embark on a journey through a richly detailed open world in this action-packed RPG.",
        genre: ["RPG", "Open World"],
        price: 19.99,
        featured: true
    },
    {
        id: 6,
        title: "Red Dead Redemption 2",
        image: "./resources/images/reddead.jpeg",
        alt: "Red Dead Redemption 2 game cover",
        description: "Experience the epic tale of Arthur Morgan in this action-packed western game.",
        genre: ["Action-Adventure"],
        price: 16.99
    },
    {
        id: 7,
        title: "Assassin's Creed Valhalla",
        image: "./resources/images/creed.jpeg",
        alt: "Assassin's Creed Valhalla game cover",
        description: "Embark on a thrilling journey through the Viking age in this action-packed RPG.",
        genre: ["RPG"],
        price: 29.99
    },
    {
        id: 8,
        title: "God of War",
        image: "./resources/images/godofwar.jpeg",
        alt: "God of War game cover",
        description: "Experience the epic tale of Kratos in this action-packed mythological game.",
        genre: ["Action-Adventure"],
        price: 62.99
    },
    {
        id: 9,
        title: "Cyberpunk 2077",
        image: "./resources/images/cyberpunk.jpeg",
        alt: "Cyberpunk 2077 game cover",
        description: "Experience the futuristic world of Night City in this action-packed RPG.",
        genre: ["RPG"],
        price: 39.99
    },
    {
        id: 10,
        title: "Elden Ring",
        image: "./resources/images/eldenring.jpeg",
        alt: "Elden Ring game cover",
        description: "Embark on a journey through the dark and twisted world of Elden Ring in this action-packed RPG.",
        genre: ["RPG"],
        price: 44.99
    },
    {
        id: 11,
        title: "Sackboy: A Big Adventure",
        image: "./resources/images/sackboy.jpeg",
        alt: "",
        description: "Face exciting and unpredictable challenges as you explore handcrafted worlds with immersive and expressive controls.",
        price: 11.80,
        genre: ["Platformer"],
    },
    {
        id: 12,
        title: "Rayman: 30th Anniversary Edition",
        image: "./resources/images/rayman.jpeg",
        alt: "",
        description: "Celebrate 30 years of Rayman with the definitive edition of the platforming classic, featuring 5 versions and 120+ extra levels.",
        price: 14.99,
        genre: ["Platformer"],
    }
]

/* Featured Games Render */

function renderFeaturedGames() {
    const featuredGames = gameData.filter(checkGameFeatured);
    function checkGameFeatured(game) {
        return game.featured;
    }

    let homePageFeaturedGames = '';
    featuredGames.forEach((game) => {
        homePageFeaturedGames += `
        <div class="carousel-slide">
            <div class="featured-game">
                <div class="game-card"><a href="product.html?gameId=${game.id}" onclick="sessionStorage.setItem('navSource', 'catalogue-or-search')">
                    <img class="game-image" id="featured-image" src="${game.featimage}" alt="${game.alt}"></a>
                    
                    <div class="card-footer" id="price-tag">
                        <div class="tooltip">
                            <button class="cart-button" data-id="${game.id}" aria-label="Add to basket"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i><span class="tooltip-text" aria-hidden="true">Add to basket</span></button>
                        </div>
                        <p class="game-price">£${game.price}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    if (featuredGames.length > 0) {
        const firstGame = featuredGames[0];
        homePageFeaturedGames += `
        <div class="carousel-slide">
            <div class="featured-game">
                <div class="game-card"><a href="product.html?gameId=${firstGame.id}" onclick="sessionStorage.setItem('navSource', 'catalogue-or-search')">
                    <img class="game-image" id="featured-image" src="${firstGame.featimage}" alt="${firstGame.alt}"></a>
                
                    <div class="card-footer" id="price-tag">
                        <div class="tooltip">
                            <button class="cart-button" data-id="${firstGame.id}" aria-label="Add to basket"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i><span class="tooltip-text" aria-hidden="true">Add to basket</span></button>
                        </div>
                        <p class="game-price">£${firstGame.price}</p>
                        
                    </div>
                </div>  
            </div>
        </div>
        `;
    };

    topGames.innerHTML = homePageFeaturedGames;
    cartButtonListener();
};

const nextSlide = document.querySelector('.next-slide');
const previousSlide = document.querySelector('.previous-slide');
const carouselTrack = document.getElementById('carousel-track');
let currentIndex = 0;
function updateCarousel() {
    const offset = currentIndex * -100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
};
if (homePage) {
    nextSlide.addEventListener('click', (e) => {
        isUserClick = e.isTrusted;
        const slides = document.querySelectorAll('.carousel-slide');

        if (currentIndex < slides.length - 1) {
            currentIndex += 1;
            updateCarousel();
        }

        if (currentIndex === slides.length - 1) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentIndex = 0;
                updateCarousel();
                setTimeout(() => {
                    carouselTrack.style.transition = '';
                }, 50);
            }, 400);
        };
        
    });

    const heroCarousel = document.getElementById('hero-carousel');
    let autoPlayTimer = setInterval(() => nextSlide.click(), 3000);

    heroCarousel.addEventListener('mouseenter', (e) => {
        clearInterval(autoPlayTimer);
    });
    heroCarousel.addEventListener('mouseleave', (e) => {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => nextSlide.click(), 3000);
    });

    previousSlide.addEventListener('click', (e) => {
        isUserClick = e.isTrusted;
        const slides = document.querySelectorAll('.carousel-slide');
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateCarousel()
        } else {
            carouselTrack.style.transition = 'none';
            currentIndex = slides.length - 1;
            updateCarousel();
            setTimeout(() => {
                carouselTrack.style.transition = '';
                currentIndex = slides.length - 2;
                updateCarousel();
            }, 50);
        };        
    });
};

if (homePage) {
    document.querySelectorAll('.genre-card').forEach((card) => {
        card.addEventListener('click', (e) => {
            let genreName = card.querySelector('span').textContent;
            sessionStorage.setItem('savedGenres', JSON.stringify([genreName]));
            sessionStorage.setItem('navSource', 'filtered');
        });
    });
};

const navLinks = document.querySelector('.nav-links');
navLinks.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('a');
        
    if (clickedLink) {
        sessionStorage.removeItem('navSource');
        sessionStorage.removeItem('savedGenres');
        sessionStorage.removeItem('savedPrices');
    };
});

if (topGames) {
    renderFeaturedGames();
}

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');
const numericGameId = Number(gameId);

const selectedGame = gameData.find((game) => game.id === numericGameId);

/* Product Page */

if (selectedGame) {
    productPage.innerHTML = `
        <img class="product-image" src="${selectedGame.image}" alt="${selectedGame.alt}">
        <div class="product-details">
            <p class="product-description">${selectedGame.description}</p>
            <div class="buy-product">
                <p class="product-price">£${selectedGame.price}</p>
                <button class="cart-button" id="product-cart-btn" data-id="${selectedGame.id}">Add to Basket</button>
            </div>
        </div>
    `;
    cartButtonListener();
};

if (productPage) {
    const navSource = sessionStorage.getItem('navSource');
    if (navSource !== 'catalogue-or-search') {
        productBackButton.textContent = 'Return to search';
        productBackButton.addEventListener('click', () => {
            window.history.back();
        });
    } else {
        productBackButton.addEventListener('click', () => {
            window.location.href = 'games.html';
        })
    };
};

/* Basket Page Render */

const undoBtn = document.getElementById('undo-empty');
if (undoBtn) {
    undoBtn.addEventListener('click', (e) => {
        clearInterval(countdown);
        clearTimeout(toastTimer);
        hideToast();
        basket = [...previousBasket];
        previousBasket = null;
        localStorage.setItem('user-basket', JSON.stringify(basket));
        updateBasketCount();
        renderBasket();
        updateBasketTotal();
    })
}

function showToast() {
    basketEmptied.classList.add('visible');
    baskettop.classList.remove('visible');
}

function hideToast() {
    basketEmptied.classList.remove('visible');
    baskettop.classList.add('visible');
}

function updateBasketTotal() {
    if (basket.length !== 0) {
        const basketTotalPrice = basket.reduce((total, game) => {
                return total + game.price * game.quantity;
            }, 0);
            basketTotalContainer.forEach((container) => {
                container.innerHTML = `<h4>£<span class="basket-total-price">${basketTotalPrice.toFixed(2)}</span></h4>`;
            });
    } else {
        basketTotalContainer.forEach((container) => {
            container.innerHTML = '';
        });
        const basketMainBody = document.getElementById('basket-main-body');
        if (basketMainBody) {
            checkoutBtnContainer.innerHTML = '';
            emptyBasketContainer.innerHTML = '';
            basketBottom.style.display = 'none';
            basketHeader.style.opacity = '0';
        };
    };
};


function renderBasket() {
    updateBasketTotal();
    if (basket.length === 0) {
        basketItemsContainer.innerHTML = '<p>Your basket is empty.</p>';
        if (totalContainer) {
            totalContainer.style.display = 'none';
        };
        basketHeader.style.opacity = '0';
    } else {
        basketItemsContainer.innerHTML = basket.map((game) => {
            return `<div class="basket-item">
                <img class="basket-item-image" src="${game.image}" alt="${game.alt}">
                <div class="basket-item-details">
                    <h4 class="basket-item-name" id="basket-item-name">${game.title}</h4>
                    <div class="basket-price-amount">
                        <p class="basket-item-price">£${game.price}</p>
                        <div class="basket-item-quantity-controls">
                            <div class="tooltip">
                                <button class="cart-minus-button" data-id="${game.id}" aria-label="Decrease quantity">~<span class="tooltip-text">Decrease quantity</span></button>
                            </div>
                            <p class="basket-item-quantity">${game.quantity}</p>
                            <div class="tooltip">
                                <button class="cart-plus-button" data-id="${game.id}" aria-label="Increase quantity">+<span class="tooltip-text">Increase quantity</span></button>                    
                            </div>
                        </div>
                        <div class="tooltip">
                            <button class="remove-from-basket" data-id="${game.id}" aria-label="Delete from basket"><i class="fa-solid fa-trash-can" aria-hidden="true"></i><span class="tooltip-text">Delete from basket</span></button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join('');
        const totals = calculateTotals();
        basketBottom.style.display = 'block';
        basketHeader.style.opacity = '1';
        basketSummary.innerHTML = `<h2>Order Summary</h2>
        <div id="basket-totals" role="region" aria-label="Order Totals">
            <h4>Subtotal <span class="checkout-sub-total">£${totals.basketTotalPrice.toFixed(2)}</span></h4>
            <h4>Delivery Cost <span class="delivery-fee">${totals.deliveryFee === 0 ? '£0' : `£${totals.deliveryFee.toFixed(2)}`}</span></h4>
            <h3>Order Total <span>£${totals.grandTotal.toFixed(2)}</span></h3>
        </div>`
    };
    const removeButtons = document.querySelectorAll('.remove-from-basket');
    removeButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
                const gameIdToRemove = Number(e.currentTarget.dataset.id);
                basket = basket.filter((game) => game.id !== gameIdToRemove);
                localStorage.setItem('user-basket', JSON.stringify(basket));
                updateBasketCount();
                updateBasketTotal();
            const itemContainer = e.currentTarget.closest('.basket-item');
            itemContainer.classList.add('close');
            setTimeout(() => {
                renderBasket();
                if (basket.length === 0) {
                    basketBottom.innerHTML = '';
                    
                }
            }, 300);
        });
    });

    
    if (basket.length !== 0) {
        updateBasketTotal();
        checkoutBtnContainer.innerHTML = `<a href="checkout.html" id="checkout-btn">Checkout Now</a>`;
    
        emptyBasketContainer.innerHTML = '<button id="empty-basket-button" aria-label="Empty basket">Empty Basket</button>';

        const emptyBasketBtn = document.getElementById('empty-basket-button');
        emptyBasketBtn.addEventListener('click', (e) => {
            
            previousBasket = [...basket];
            basket = [];
            updateBasketTotal();
            localStorage.setItem('user-basket', JSON.stringify(basket));
            updateBasketCount();

            showToast();

            let timerSeconds = 5;
            const countdownTimer = document.getElementById('countdown');
            if (countdownTimer) {
                countdownTimer.textContent = `${timerSeconds}s`;

                countdown = setInterval(() => {
                    timerSeconds--;
                    countdownTimer.textContent = `${timerSeconds}s`;
                    if (timerSeconds <= 0) {
                        clearInterval(countdown);
                    };
    
                }, 1000)
            };

            toastTimer = setTimeout(() => {
                hideToast();
                previousBasket = null;
                clearInterval(countdown);
                basketBottom.innerHTML = '';
                basketBottom.style.display = 'none';
                renderBasket();
            }, 5000);
            
        });
    }; 

    const plusButtons = document.querySelectorAll('.cart-plus-button');
    plusButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const gameIdToIncrease = Number(e.currentTarget.dataset.id);
            const gameIndexToIncrease = basket.findIndex((game) => game.id === gameIdToIncrease);
            basket[gameIndexToIncrease].quantity += 1;
            localStorage.setItem('user-basket', JSON.stringify(basket));
            updateBasketCount();
            renderBasket();
        });
    });

    const minusButtons = document.querySelectorAll('.cart-minus-button');
    minusButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const gameIdToDecrease = Number(e.currentTarget.dataset.id);
            const gameIndexToDecrease = basket.findIndex((game) => game.id === gameIdToDecrease);
            if (basket[gameIndexToDecrease].quantity > 1) {
                basket[gameIndexToDecrease].quantity -= 1;
            } else {
                basket.splice(gameIndexToDecrease, 1);
            }

            localStorage.setItem('user-basket', JSON.stringify(basket));
            updateBasketCount();
            renderBasket();
        });
    });


}

/* Checkout Page Render */ 

const nextFormBtn = document.getElementById('next-form');
const backFormBtn = document.getElementById('back-form');
const backPaymentBtn = document.getElementById('back-pay-btn')
const paymentInputs = document.getElementById('payment-inputs');
const deliveryDetails = document.getElementById('delivery-details');
const paymentOptions = document.querySelector('.payment-options');
const customerDetailsContainer = document.querySelector('.customer-details');
const cardDetailsContainer = document.getElementById('card-details');
const checkoutForm = document.querySelector('#checkout-form');
const cardNameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumInput = document.getElementById('card-number');
const expiryDate = document.getElementById('expiry-date');
const securityCode = document.getElementById('security-code');
const deliveryHeader = document.getElementById('delivery-header');
const deliveryHeaderIcon = document.getElementById('delivery-header-icon');
const deliveryHeaderText = document.getElementById('delivery-header-text');
const paymentHeaderIcon = document.getElementById('payment-header-icon');
const paymentHeaderText = document.getElementById('payment-header-text');

function calculateTotals() {
    const basketTotalPrice = basket.reduce((total, game) => {
            return total + game.price * game.quantity;
        }, 0);
    const deliveryFee = basketTotalPrice > 80 ? 0 : 3.99;
    const grandTotal = basketTotalPrice + deliveryFee;
    return {
        basketTotalPrice,
        deliveryFee,
        grandTotal
    };
}

function renderCheckoutPage() {
    if (basket.length === 0) {
        window.location.replace("basket.html")
    } else {
        updateBasketTotal();
        const totals = calculateTotals();
        tableRows = basket.map((game) => `
        <tr>
            <td class="basket-item-name">${game.title}</td>
            <td class="basket-item-price">£${game.price}</td>
            <td class="basket-item-quantity">${game.quantity}</td>
        </tr>
        `).join('');
        
        checkoutSummaryContainer.innerHTML = `<h3>Order Summary</h3>
        <table class="checkout-table">
            <thead>
                <tr>
                    <th scope="col" class="game-title-header">Game Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
            <tfoot>
                <tr class="table-footer-first">
                    <td colspan="2">Subtotal</td>
                    <td>£<span class="checkout-sub-total">${totals.basketTotalPrice.toFixed(2)}</span></td>
                </tr>
                <tr>
                    <td colspan="2">Delivery Cost</td>
                    <td>${totals.deliveryFee === 0 ? '£0' : `£${totals.deliveryFee.toFixed(2)}`}</td>
                </tr>
                <tr class="grand-total-row">    
                    <td colspan="2"><strong>Order Total:</strong></td>
                    <td><strong>£${totals.grandTotal.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        `;
    
        /* Payment Form */

        function setupPaymentForm() {

            const paymentTypeRadios = document.querySelectorAll('input[name="payment-type"]');
            const cardDetailsContainer = document.getElementById('card-details');
            
            
            paymentTypeRadios.forEach(function(radio) {
                radio.addEventListener('change', function() {
                    const cardInputs = cardDetailsContainer.querySelectorAll('input');
                    if (radio.value === 'visa' || radio.value === 'mastercard') {
                        cardInputs.forEach(input => input.setAttribute('required', ''));
                        backFormBtn.disabled = true;
                        let originalHeight = paymentOptions.offsetHeight;
                        cardDetailsContainer.style.height = `${originalHeight}px`;
                        checkoutContainer.classList.add('form-step-three');
                        checkoutContainer.classList.remove('form-step-two');
                        
                        checkCardInputs();
                    } else if (radio.value === 'paypal') {
                        cardInputs.forEach(input => input.removeAttribute('required'));
                        payButton.innerHTML = `<button id="pay" type="submit" form="checkout-form">Proceed to Paypal</button>`;
                        backFormBtn.disabled = false;
                        if (window.matchMedia('(max-width: 750px)').matches) {
                            window.scrollTo({ behavior: 'smooth', top: 600});
                        } else {
                            window.scrollTo({ behavior: 'smooth', top: 400});
                        };
                        if (checkoutContainer.classList.contains('form-step-three')) {
                            checkoutContainer.classList.add('form-step-two');
                            checkoutContainer.classList.remove('form-step-three');
                        } else {
                            checkoutContainer.classList.add('form-step-two');
                        };
                    } else {
                        cardInputs.forEach(input => input.removeAttribute('required'));
                        payButton.innerHTML = `<button id="pay" type="submit" form="checkout-form">Pay with Apple Pay</button>`;
                        backFormBtn.disabled = false;
                        if (window.matchMedia('(max-width: 750px)').matches) {
                            window.scrollTo({ behavior: 'smooth', top: 600});
                        } else {
                            window.scrollTo({ behavior: 'smooth', top: 400});
                        };
                        if (checkoutContainer.classList.contains('form-step-three')) {
                            checkoutContainer.classList.add('form-step-two');
                            checkoutContainer.classList.remove('form-step-three');
                        } else {
                            checkoutContainer.classList.add('form-step-two');
                        };
                    };
                });
            });
            cardNumInput.addEventListener('input', (checkCardNum) => {
                let rawInput = checkCardNum.target.value;
                let cleanedNumbers = rawInput.replace(/\D/g, '');
                let formattedGroups = cleanedNumbers.match(/.{1,4}/g);
                if (formattedGroups) {
                    checkCardNum.target.value = formattedGroups.join(' ');
                } else {
                    checkCardNum.target.value = '';
                };
                checkCardInputs();
            });
            expiryDate.addEventListener('input', (checkExpiry) => {
                let rawInput = checkExpiry.target.value;
                let cleanedNumbers = rawInput.replace(/\D/g, '');
                
                if (cleanedNumbers.length === 1) {
                    let firstDigit = parseInt(cleanedNumbers);
                    if (firstDigit > 1) {
                        cleanedNumbers = '0' + cleanedNumbers;
                    };
                };
                if (cleanedNumbers.length >= 2) {
                    let month = cleanedNumbers.slice(0, 2);
                    let monthNum = parseInt(month);
                    if (monthNum > 12) {
                        cleanedNumbers = '12' + cleanedNumbers.slice(2);
                    };
                };

                if (cleanedNumbers.length >= 6) {
                    let year = cleanedNumbers.slice(2, 6);
                    cleanedNumbers = cleanedNumbers.slice(0, 2) + year.slice(2);
                };

                cleanedNumbers = cleanedNumbers.slice(0, 4);
                
                if (cleanedNumbers.length > 2) {
                    checkExpiry.target.value = cleanedNumbers.slice(0, 2) + '/' + cleanedNumbers.slice(2);
                } else {
                    checkExpiry.target.value = cleanedNumbers;
                };
                checkCardInputs();
            });

            securityCode.addEventListener('input', (capSecurityCode) => {
                let rawInput = capSecurityCode.target.value;
                let cleanedNumbers = rawInput.replace(/\D/g, '');
                capSecurityCode.target.value = cleanedNumbers;
                checkCardInputs();
            }); 
            
            cardNameInput.addEventListener('input', (e) => {
                checkCardInputs();
            });

            function checkCardInputs() {
                if (cardNameInput.value !== '' && cardNumInput.value.length === 19 && expiryDate.value.length === 5 && (securityCode.value.length === 3 || securityCode.value.length === 4)) {
                    payButton.innerHTML = `<button id="pay" type="submit" form="checkout-form">Pay £${totals.grandTotal.toFixed(2)}</button>`;
                    if (window.matchMedia('(max-width: 750px)').matches) {
                            window.scrollTo({ behavior: 'smooth', top: 600});
                    } else {
                        window.scrollTo({ behavior: 'smooth', top: 400});
                    };
                } else {
                    payButton.innerHTML = '';
                };
            };
        };

        if (checkoutContainer) {
            setupPaymentForm();
        };

        checkoutContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            checkoutContainer.style.display = 'none';
            checkoutSummaryContainer.style.display = 'none';
            basket = [];

            localStorage.setItem('user-basket', JSON.stringify(basket));
            updateBasketCount();
            paySubmitted.style.display = 'block';
            updateBasketTotal();
            const backToBasketText = document.getElementById('back-to-basket-text');
            const backToBasketIcon = document.getElementById('back-to-basket-icon');
            backToBasketIcon.style.display = 'none';
            backToBasketText.style.display = 'none';
        });

    };

};


if (nextFormBtn) {
    nextFormBtn.addEventListener('click', (e) => {

        let originalHeight = customerDetailsContainer.offsetHeight;
        const isDeliveryDetailsComplete = Array.from(customerDetailsContainer.querySelectorAll('input[type="text"]')).every(input => input.value !== '');
        if (isDeliveryDetailsComplete && emailInput.value.includes('@')) {
            checkoutContainer.classList.add('form-step-two');
            checkoutContainer.classList.remove('form-step-one');
        } else if (!emailInput.value.includes('@')) {
            emailInput.reportValidity();
        }
        if (window.matchMedia('(max-width: 900px)').matches) {
            paymentOptions.style.height = `${originalHeight}px`;
        }
    });
};

if (backFormBtn) {
    backFormBtn.addEventListener('click', (e) => {
        checkoutContainer.classList.add('form-step-one');
        checkoutContainer.classList.remove('form-step-two');
        const checkedRadio = paymentInputs.querySelector('input[type="radio"]:checked');
        if (checkedRadio) {
            checkedRadio.checked = false;
        };
    });
};

if (backPaymentBtn) {
    backPaymentBtn.addEventListener('click', (e) => {
        checkoutContainer.classList.remove('form-step-three');
        checkoutContainer.classList.add('form-step-two');
        const cardInputs = cardDetailsContainer.querySelectorAll('input');
        cardInputs.forEach(input => input.removeAttribute('required'));
        backFormBtn.disabled = false;
    });
};

/* Search Query Load */

function loadSearchQuery() {
    let searchQuery = new URLSearchParams(window.location.search).get('search');
    let filteredGames = gameData;
    if (searchQuery !== null && searchQuery.trim() !== '') {
        const lowercaseQuery = searchQuery.trim().toLowerCase();
        searchResults.innerHTML = `<button class="all-games-btn">All Games</button>
        <h2>Results for "${searchQuery}"</h2>`
        filteredGames = filteredGames.filter((game) => {
            return game.title.toLowerCase().includes(lowercaseQuery);
        });
    };
    const checkedGenres = Array.from(document.querySelectorAll('input[name="genre-choice"]:checked')).map((genre) => genre.value);
    if (checkedGenres.length > 0) {
        filteredGames = filteredGames.filter((game) => {
            return checkedGenres.some((genre) =>
                game.genre.includes(genre)
            );
        });
    };
    const checkedPrices = Array.from(
        document.querySelectorAll('input[name="price-choice"]:checked')
    ).map((price) => {
        const [min, max] = price.value.split('-');

        return {
            min: Number(min),
            max: Number(max)
        };
    });

    if (checkedPrices.length > 0) {
        filteredGames = filteredGames.filter((game) => {
            return checkedPrices.some((range) =>
                game.price >= range.min && game.price <= range.max
            );
        });
    };

    return filteredGames;
};


/* Game Card Render */

function renderGamePage(games = loadSearchQuery()) {
    if (!gamePage) return;
    updateBasketTotal();
    let gamesForSale = '';
    const searchQuery = new URLSearchParams(window.location.search).get('search');
        
    if (searchQuery != null) {
        searchResults.style.display = 'flex';
        searchResults.innerHTML = `<button class="all-games-btn">All Games</button>
        <h2>Results for "${searchQuery}"</h2>`;
    } else {
        searchResults.style.display = 'none';
    };

    if (games.length === 0) {
        if (searchQuery != null) {
            const lowercaseQuery = searchQuery.trim().toLowerCase();
            const searchMatches = gameData.filter((game) => game.title.toLowerCase().includes(lowercaseQuery));
            
            if (searchMatches.length === 0) {
                searchResults.innerHTML = `
                    <button class="all-games-btn" aria-label="Show all games">All Games</button>
                    <h2 role="status" aria-live="polite">No results found for "${searchQuery}"</h2>`;
                filter.style.display = 'none';
            } else {
                gamePage.innerHTML = `
                    <div id="no-matching-filters" role="status" aria-live="polite">
                        <p>No games match your current filters.</p>
                    </div>`;
            }
        } else {
            gamePage.innerHTML = `
                <div id="no-matching-filters" role="status" aria-live="polite">
                    <button class="all-games-btn" aria-label="Show all games">All Games</button>
                    <p>No games found matching your filters.</p>
                </div>`;
        };
        if (gamesMainBody) {
            gamesMainBody.classList.add('visible');
        };
        return;
    } else {
        games.forEach((game) => {
            gamesForSale += `
                <div class="game-shop-card">
                    <h3 class="game-title"><a href="product.html?gameId=${game.id}" onclick="sessionStorage.setItem('navSource', 'search-return')">${game.title}</a></h3>
                    <div class="game-card"><a href="product.html?gameId=${game.id}" onclick="sessionStorage.setItem('navSource', 'search-return')">
                        
                        
                        <img class="game-image" src="${game.image}" alt="${game.alt}">
                        <p class="game-description">${game.description}</p></a>
                        <button class="game-info">View Info<i class="fa-solid fa-info" aria-hidden="true"></i></button>
                    </div>  
                    <div class="card-footer">
                        <p class="game-price">£${game.price}</p>
                        <div class="tooltip">
                            <button class="cart-button" data-id="${game.id}" aria-label="Add to basket"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i><span class="tooltip-text" aria-hidden="true">Add to basket</span></button>
                        </div>
                    </div>
                </div>
            `
        });
        gamePage.innerHTML = gamesForSale;
    };

    cartButtonListener();
    if (gamesMainBody) {
        gamesMainBody.classList.add('visible');
    };

    const gameInfoBtns = document.querySelectorAll('.game-info');
    gameInfoBtns.forEach((btn) => {
        const card = btn.closest('.game-shop-card');
        const gameInfo = card.querySelector('.game-description');
        btn.addEventListener('click', (e) => {
            if (gameInfo.style.display === 'none' || gameInfo.style.display === '') {
                gameInfo.style.display = 'flex';
                btn.style.position = 'relative';
                btn.innerHTML = `Close<i class="fa-solid fa-xmark" aria-hidden="true"></i>`;
            } else {
                gameInfo.style.display = 'none';
                btn.style.position = 'absolute';
                btn.innerHTML = `View Info<i class="fa-solid fa-info" aria-hidden="true"></i>`;
            };
        
        });
    });
};

/* All Game Button */

const noMatches = document.getElementById('no-matching-filters');
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('all-games-btn') || e.target.closest('.all-games-btn')) {
        window.history.pushState({}, '', window.location.pathname);
        resultsContainer.style.display = 'none';
        if (noMatches) {
            noMatches.innerHTML = '';
        }
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        if (filter.style.display === 'none') {
            filter.style.display = 'flex';
        }
        checkedBoxes.forEach((box) => {
            box.checked = false;
        });
        renderGamePage();
    };
});

/* Filter Dropdown Buttons */
if (priceBtn) {
    priceBtn.addEventListener('click', (e) => {
        priceContainer.classList.toggle('show');
    });
}

if (genreBtn) {
    genreBtn.addEventListener('click', (e) => {
        genreContainer.classList.toggle('show');
    });
}

if (basketItemsContainer) {
    renderBasket();
}

/* Filter checkboxes */

function applyFilters() {
    const chosenFilters = document.getElementById('chosen-filters');
    if (chosenFilters) {
        chosenFilters.innerHTML = '';
    };
    clearAllFilters();
    const checkedGenres = Array.from(document.querySelectorAll('input[name="genre-choice"]:checked')).map((genre) => {
        return genre.value;
    });   
    checkedGenres.forEach((genre) => {
        const genreTag = document.createElement('span');
        const removeTag = document.createElement('i');
        removeTag.classList.add('fa-solid');
        removeTag.classList.add('fa-x');
        genreTag.textContent = genre;
        chosenFilters.appendChild(genreTag);
        genreTag.appendChild(removeTag);
        removeTag.addEventListener('click', (e) => {
            const currentCheckbox = document.querySelector(`input[name="genre-choice"][value="${genre}"]`);
            currentCheckbox.checked = false;
            applyFilters();
            sessionStorage.removeItem('savedGenres');
        });
    });

    const checkedPrices = Array.from(document.querySelectorAll('input[name="price-choice"]:checked')).map((price) => {
        const [minPrice, maxPrice] = price.value.split('-');
        return {min: Number(minPrice), max: Number(maxPrice), label: price.parentElement.textContent.trim(), value: price.value};
    });

    checkedPrices.forEach((priceobj) => {
        const priceTag = document.createElement('span');
        const removeTag = document.createElement('i');
        removeTag.classList.add('fa-solid');
        removeTag.classList.add('fa-x');
        priceTag.textContent = priceobj.label;
        chosenFilters.appendChild(priceTag);
        priceTag.appendChild(removeTag);
        removeTag.addEventListener('click', (e) => {
            const currentCheckbox = document.querySelector(`input[name="price-choice"][value="${priceobj.value}"]`);
            currentCheckbox.checked = false;
            applyFilters();
            sessionStorage.removeItem('savedPrices');
        });
    });

    chosenFilters.style.display = (checkedGenres.length > 0 || checkedPrices.length > 0) ? 'flex' : 'none';
    
    let filteredGames = gameData;
    if (checkedGenres.length > 0) {
        filteredGames = filteredGames.filter((game) => {
            return checkedGenres.some((genre) => game.genre.includes(genre));
        });
    };
    if (checkedPrices.length > 0) {
        filteredGames = filteredGames.filter((game) => {
            return checkedPrices.some((range) => game.price >= range.min && game.price <= range.max);
        });
    };
    renderGamePage(loadSearchQuery());
};


if (priceBtn) {
    genreOptions.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            applyFilters();  
            const checkedGenres = Array.from(genreOptions.querySelectorAll('input[type="checkbox"]:checked')).map(box => box.value);
            sessionStorage.setItem('savedGenres', JSON.stringify(checkedGenres));
        };
    });
};

if (priceBtn) {
    priceOptions.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            applyFilters();
            const checkedPrices = Array.from(document.querySelectorAll('input[name="price-choice"]:checked')).map(box => {
                const [minPrice, maxPrice] = box.value.split('-');
                return {min: Number(minPrice), max: Number(maxPrice)};
            });
            sessionStorage.setItem('savedPrices', JSON.stringify(checkedPrices));
        }
    });      
};

if (genreBtn) {
    document.addEventListener('click', (event) => {
        if (genreContainer.classList.contains('show') && !genreContainer.contains(event.target) && !genreBtn.contains(event.target) && !event.target.closest('#clear-genre')) {
            genreContainer.classList.remove('show');
        };
        if (priceContainer.classList.contains('show') && !priceContainer.contains(event.target) && !priceBtn.contains(event.target) && !event.target.closest('#clear-price')) {
            priceContainer.classList.remove('show');
        }; 
    });
};


document.addEventListener('click', (event) => {
    const gameInfoBtns = document.querySelectorAll('.game-info');
    if (gameInfoBtns.length === 0) {
        return;
    } else {
        gameInfoBtns.forEach((btn) => {
            const card = btn.closest('.game-shop-card');
            const gameInfo = card.querySelector('.game-description');
            if (gameInfo.style.display === 'flex' && !card.contains(event.target)) {
                gameInfo.style.display = 'none';
            };
        });
    };
});



if (genreContainer) {
    genreContainer.addEventListener('change', (e) => {
        updateGenreClearButton();
    });
};

function updateGenreClearButton() {
    if (genreContainer.querySelector('input[type="checkbox"]:checked')) {
        clearGenreBtn.innerHTML = `<button>Clear<i class="fa-solid fa-x" aria-hidden="true"></i></button>`;
    } else {
        clearGenreBtn.innerHTML = '';
    };
};

if (priceContainer) {
    priceContainer.addEventListener('change', (e) => {
        updatePriceClearButton();
    });
};



function clearAllFilters() {
    if (genreContainer.querySelector('input[type="checkbox"]:checked') || priceContainer.querySelector('input[type="checkbox"]:checked')) {
        clearAllFiltersBtn.style.display = 'flex';
    } else {
        clearAllFiltersBtn.style.display = 'none';
    };
};

const clearAllFiltersBtn = document.getElementById('clear-all-filters-btn');

if (gamesMainBody) {
    clearAllFiltersBtn.addEventListener('click', (e) => {
        const allCheckedBoxes = filter.querySelectorAll('input[type="checkbox"]:checked');
        allCheckedBoxes.forEach((box) => {
            box.checked = false;
        });
        sessionStorage.removeItem('savedGenres');
        sessionStorage.removeItem('savedPrices');
        applyFilters();
    });
};

function updatePriceClearButton() {
    if (priceContainer.querySelector('input[type="checkbox"]:checked')) {
        clearPriceBtn.innerHTML = `<button>Clear<i class="fa-solid fa-x" aria-hidden="true"></i></button>`;
    } else {
        clearPriceBtn.innerHTML = '';
    };
};


if (clearGenreBtn) {
    clearGenreBtn.addEventListener('click', (event) => {
        const genreCheckboxes = genreContainer.querySelectorAll('input[type="checkbox"]');    
        genreCheckboxes.forEach((box) => {
            box.checked = false;
        });
        event.stopPropagation()
        clearGenreBtn.innerHTML = '';
        sessionStorage.removeItem('savedGenres');
        renderGamePage();
        genreContainer.classList.add('show');
        applyFilters();
    });
};

if (clearPriceBtn) {
    clearPriceBtn.addEventListener('click', (event) => {
        const priceCheckboxes = priceContainer.querySelectorAll('input[type="checkbox"]');
        priceCheckboxes.forEach((box) => {
            box.checked = false;            
        });
        event.stopPropagation()
        clearPriceBtn.innerHTML = '';
        sessionStorage.removeItem('savedPrices');
        renderGamePage();
        priceContainer.classList.add('show');
        applyFilters();
    });
};

/* Add game to basket */

function cartButtonListener() {
    const cartButtons = document.querySelectorAll('.cart-button');

    cartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            
            const gameDataInfo = gameData.find((game) => game.id === Number(e.currentTarget.dataset.id));
                
            const existingGameIndex = basket.findIndex((game) => game.id === gameDataInfo.id);
            if (existingGameIndex > -1) {
                basket[existingGameIndex].quantity += 1;
            } else {
                gameDataInfo.quantity = 1;
                basket.push(gameDataInfo);  
            }

            localStorage.setItem('user-basket', JSON.stringify(basket));
            updateBasketCount();
            updateBasketTotal();
        });
    });
};

/* Search bar */

const searchbarInput = document.getElementById('search-input');
const searchDropdown = document.querySelector('.search-dropdown');
const searchButton = document.getElementById('search-button');

searchbarInput.addEventListener('input', (searchGames) => {
    let searchInput = searchGames.target.value;
    const lowercaseSearchInput = searchInput.toLowerCase();
    if (lowercaseSearchInput === '') {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
    } else {
        searchDropdown.style.display = 'flex';
        const filteredGames = gameData.filter((game) => {
            return game.title.toLowerCase().includes(lowercaseSearchInput);
        });

        
        if (filteredGames.length === 0) {
            searchDropdown.innerHTML = `<p id="empty-search" role="status" aria-live="polite">No games found.</p>`

        } else {
            let dropdownHTML = '';
            filteredGames.forEach((game) => {
                dropdownHTML += `<a href="product.html?gameId=${game.id}" class="search-item-link" onclick="sessionStorage.setItem('navSource', 'catalogue-or-search')">
                    <div class="search-item">
                        <img class="search-item-image" src="${game.image}" alt="${game.alt}">
                        <div class="search-item-details">
                            <h4 class="search-item-name">${game.title}</h4>
                            <div class="search-price-amount">
                                <p class="search-item-price">£${game.price}</p>
                            </div>
                        </div>
                    </div>
                </a>`;
            });
            searchDropdown.innerHTML = dropdownHTML;
        }
    };
});


searchbarInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && searchbarInput.value.trim() !== '') {
        event.preventDefault();
        performSearch();
    }

    if (event.key === 'Escape') {
        searchDropdown.style.display = 'none';
    }
});

searchButton.addEventListener('click', () => {
    if (searchbarInput.value.trim() !== '') {
        performSearch();
    }
});


openSearchbar.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.matchMedia('(max-width: 600px)').matches) {
        
        openSearchbar.classList.toggle('closed');
        searchbarInput.classList.toggle('open');
        searchButton.classList.toggle('open');
        if (searchbarInput.classList.contains('open')) {
            searchbarInput.focus();
        };
    };
});


function performSearch() {
    const query = searchbarInput.value.trim();

    if (query === '') return;

    sessionStorage.removeItem('savedGenres');
    sessionStorage.removeItem('savedPrices');
    sessionStorage.setItem('navSource', 'fresh-search');

    window.location.href =
        `games.html?search=${encodeURIComponent(query)}`;
};



/* Global event listeners */

document.addEventListener('click', (event) => {
    if (isUserClick === false && event.target.closest('#hero-carousel')) {
        return;
    };
    if (isUserClick) {
        searchDropdown.style.display = 'none';
        isUserClick = false;
        return;
    }
    if (!searchbarInput.contains(event.target) && !searchDropdown.contains(event.target)) {
        searchDropdown.style.display = 'none';
    };
    isUserClick = false;
});

document.addEventListener('click', (event) => {
    if (window.matchMedia('(max-width: 600px)').matches) {
        if (isUserClick === false && event.target.closest('#hero-carousel')) {
            return;
        };
        if (isUserClick) {
            searchbarInput.classList.remove('open');
            searchButton.classList.remove('open');
            openSearchbar.classList.remove('closed');
            isUserClick = false;
            return;
        };
        if (!searchbarInput.contains(event.target) && !searchDropdown.contains(event.target)) {
            searchbarInput.classList.remove('open');
            searchButton.classList.remove('open');
            openSearchbar.classList.remove('closed');
        };
    };
});
    

if (checkoutPage) {
    renderCheckoutPage()
}

if (homePage) {
    updateBasketTotal();
}


if (productPage) {
    updateBasketTotal();
}


