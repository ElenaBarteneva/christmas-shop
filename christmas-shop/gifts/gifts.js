import gifts from '../assets/gifts.json' with {type: 'json'};

// Burger-menu ------------------------------
const burgerButton = document.getElementById('menu-toggle')
const inactiveLink = document.querySelectorAll('.navigation li a')
const activeLink = document.querySelector('.navigation li.active-link')
const body = document.querySelector('body')

const toggleMenu = () => {
    document.querySelector('.navigation').classList.toggle('open')

    if (body.classList.contains('overflow-hidden')) {
        body.classList.remove('overflow-hidden') 
    }
    else {
        body.classList.add('overflow-hidden')
    }
}

burgerButton.addEventListener('click', toggleMenu)
document.getElementById('burger').addEventListener('click', toggleMenu)

inactiveLink.forEach(el => el.addEventListener('click', toggleMenu))
activeLink.addEventListener('click', toggleMenu)

window.addEventListener('resize', () => {
    document.querySelector('.navigation').classList.remove('open')
    body.classList.remove('overflow-hidden');
})

// --------------------------------

// Cards --------------------------
const cardsContainer = document.querySelector('.cards-container');

function generateCards(category) {
    cardsContainer.innerHTML = '';
    let giftsCards;
    if (category === 'all') {
        giftsCards = Object.values(gifts);
    } else if (category === 'for work') {
        giftsCards = Object.values(gifts).filter(({ category }) => category === "For Work");
    } else if (category === 'for health') {
        giftsCards = Object.values(gifts).filter(({ category }) => category === "For Health");
    } else if (category === 'for harmony') {
        giftsCards = Object.values(gifts).filter(({ category }) => category === "For Harmony");
    }

    for (let element of giftsCards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = element.id;
        const img = document.createElement("img");
        img.src = '.' + element.img;
        img.alt = element.name;
        card.appendChild(img);
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        const categoryOfCard = document.createElement('h4');
        const category = element.category.toLowerCase().split(' ').join('.');
        categoryOfCard.classList.add(category);
        categoryOfCard.innerHTML= element.category.toUpperCase();
        const nameOfCard = document.createElement('p');
        nameOfCard.classList.add('subheading');
        nameOfCard.innerHTML = element.name.toUpperCase();
        textContainer.appendChild(categoryOfCard);
        textContainer.appendChild(nameOfCard);
        card.appendChild(textContainer);
        cardsContainer.appendChild(card);
    }
}

generateCards('all');

//----------------------------------------
// Popup ---------------------------------
const popupWrapper = document.querySelector('.popup-wrapper')
const popupContent = document.querySelector('.popup-content')
const closeButton = document.querySelector('.popup-close')

function openPopup(event) {
    const card = event.target.closest('.card');
    const gift = Object.values(gifts).find(({ id }) => Number(id) === Number(card.id));
    generatePopup(gift);
    popupWrapper.classList.remove('hidden')
    event.preventDefault();
    body.classList.add('overflow-hidden');
}

function closePopup() {
    popupWrapper.classList.add('hidden')
    body.classList.remove('overflow-hidden');
    popupContent.innerHTML = '';
}


closeButton.addEventListener('click', closePopup);

popupWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup-wrapper')) {
        closePopup();
}
});

function generatePopup(gift) {
    popupContent.innerHTML = '';
    const superpowers = gift.superpowers;
    popupContent.innerHTML = `
    <div class="popup-img">
                <img alt="${gift.name}" src="${'../' + gift.img}">
            </div>
            <div class="description">
                <div class="popup-heading">
                    <h4 class="for work">${gift.category.toUpperCase()}</h4>
                    <p class="subheading">${gift.name.toUpperCase()}</p>
                    <p class='gift-description'>${gift.description}</p>
                </div>
                <div class="superpowers">
                    <h4 class="superpowers-header">Adds superpowers to:</h4>
                    <div class="superpowers-container">
                        <div class="superpowers-item">
                            <p class="superpowers-item-name">Live</p>
                            <p class="superpowers-item-rate">${gift.superpowers.live}</p>
                            <div class="superpowers-item-stars"></div>
                        </div>
                        <div class="superpowers-item">
                            <p class="superpowers-item-name">Create</p>
                            <p class="superpowers-item-rate">${gift.superpowers.create}</p>
                            <div class="superpowers-item-stars"></div>
                        </div>
                        <div class="superpowers-item">
                            <p class="superpowers-item-name">Love</p>
                            <p class="superpowers-item-rate">${gift.superpowers.love}</p>
                            <div class="superpowers-item-stars"></div>
                        </div>
                        <div class="superpowers-item">
                            <p class="superpowers-item-name">Dream</p>
                            <p class="superpowers-item-rate">${gift.superpowers.dream}</p>
                            <div class="superpowers-item-stars"></div>
                        </div>
                    </div>
                </div>
            </div>`

    function putSuperPowersStars(category, container) {
        const snowflakeImage = document.createElement('img');
        snowflakeImage.alt = 'snowflake icon';
        snowflakeImage.src = '.././assets/images/snowflake.png'
        let categoryRate;


        if (category === 'live') {
            categoryRate = Number(superpowers.live.replace('+', '')) / 100;
        } else if (category === 'create') {
            categoryRate = Number(superpowers.create.replace('+', '')) / 100;
        } else if (category === 'love') {
            categoryRate = Number(superpowers.love.replace('+', '')) / 100;
        } else if (category === 'dream') {
            categoryRate = Number(superpowers.dream.replace('+', '')) / 100;
        }

        for (let i = 0; i < categoryRate; i++ ) {
            const clonedImage = snowflakeImage.cloneNode();
            container.appendChild(clonedImage);
        } 
    }

    const liveStarsContainer = document.querySelector('.superpowers-container .superpowers-item:nth-child(1) .superpowers-item-stars');
    putSuperPowersStars('live', liveStarsContainer);
    const createStarsContainer = document.querySelector('.superpowers-container .superpowers-item:nth-child(2) .superpowers-item-stars');
    putSuperPowersStars('create', createStarsContainer);
    const loveStarsContainer = document.querySelector('.superpowers-container .superpowers-item:nth-child(3) .superpowers-item-stars');
    putSuperPowersStars('love', loveStarsContainer);
    const dreamStarsContainer = document.querySelector('.superpowers-container .superpowers-item:nth-child(4) .superpowers-item-stars');
    putSuperPowersStars('dream', dreamStarsContainer);

}

if (cardsContainer) {
    cardsContainer.addEventListener('click', (event) => {
        if (event.target.closest('.card')) {
            openPopup(event);
        }
    })
}

//---------------------------------------------------
// Tabs --------------------------------------------
const tabsContainer = document.querySelector('.tabs')

tabsContainer.addEventListener('click', (event) => {
        if (event.target.closest('.tab')) {
            openTab(event);
        }
    })

    function openTab(event) {
        for (let tab of tabsContainer.children) {
            if (tab.classList.contains('active')) {
               tab.classList.remove('active') 
            }
        }
            
        const tab = event.target.closest('.tab');
        if (tab.innerHTML === 'ALL') {
            tab.classList.add('active');
            generateCards('all');
        } else if (tab.innerHTML === 'FOR WORK') {
            tab.classList.add('active');
            generateCards('for work');
        } else if (tab.innerHTML === 'FOR HEALTH') {
            tab.classList.add('active');
            generateCards('for health');
        } else if (tab.innerHTML === 'FOR HARMONY') {
            tab.classList.add('active');
            generateCards('for harmony');
        }
    }

//---------------------------------------------------
// UP button ---------------------------------------
const goTopButton = document.querySelector('.go-top');

goTopButton.addEventListener('click', goToTop);
window.addEventListener('scroll', trackScroll);
console.log(document.documentElement.clientHeight);

function goToTop() {
    window.scrollTo({
        top: 0,
    });
}

function trackScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 300) {
        goTopButton.classList.add('go-top-show');
    } else {
        goTopButton.classList.remove('go-top-show');
    }

}

//----------------------------------------------

