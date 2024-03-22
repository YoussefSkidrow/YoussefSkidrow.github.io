const BASE_URL = 'http://localhost:3000';

console.log('index...')

window.addEventListener('DOMContentLoaded', async () => {
  const popularProducts = await getPopularProducts();
  renderSliderProducts('.carousel__slider', popularProducts);
  renderSliderProducts('.carousel-mobile', popularProducts);
  addListeners();
})

window.onresize = () => {
  if (window.innerWidth > 768) {

  }
}

async function request(url) {
  const response = await fetch(url);
  return response.json();
}

async function getPopularProducts() {
  const iphones = await request(`${BASE_URL}/catalog/1?items`);
  const applewatches = await request(`${BASE_URL}/catalog/4`);
  const accessories = await request(`${BASE_URL}/catalog/5`);
  const macbooks = await request(`${BASE_URL}/catalog/3`);
  const ipads = await request(`${BASE_URL}/catalog/2`);

  const producs = [...iphones.items, ...applewatches.items, ...accessories.items, ...macbooks.items, ...ipads.items];

  const popularProducs = producs.sort((a, b) => b.popularIndex - a.popularIndex).slice(0, 6);
  console.log(popularProducs)
  return popularProducs
}


function renderSliderProducts(selector, products) {
  const slider = document.querySelector(selector);

  if (selector === '.carousel__slider') {
    products.forEach(product => {
      slider.innerHTML += `
              <div class="carousel__slider__item" data-ident="${product.id} data-category="${product.categoryId}">
								<div class="item__3d-frame">
									<div
										class="item__3d-frame__box item__3d-frame__box--front popular-item"
									>
										<span class="popular-name">${product.name}</span>
										<img
											src="${product.img}"
											alt="Аксессуары"
											class="popular-image"
										/>
										<span class="popular-price">${product.price} руб.</span>
									</div>
									<div
										class="item__3d-frame__box item__3d-frame__box--left"
									></div>
									<div
										class="item__3d-frame__box item__3d-frame__box--right"
									></div>
								</div>
							</div>
      `
    })
  } else {
    products.forEach(product => {
      slider.innerHTML += `
					<div class="carousel-mobile-cell" data-ident="${product.id} data-category="${product.categoryId}>
						<img src="${product.img}" class="p" />
						<p class="n">${product.name}</p>
						<p class="b">Заказать</p>
						<p class="content"></p>
					</div>
      `
    })
  }
}

function addListeners() {
  const desktopSlider = document.querySelectorAll('.carousel__slider__item');
  const mobileSlider = document.querySelectorAll('.carousel-mobile-cell');

  desktopSlider.forEach(product => {
    product.addEventListener('click', () => {
      const productId = product.getAttribute('data-ident');
      const categoryId = product.getAttribute('data-category');
      buy(categoryId, productId);
    })
  });

  mobileSlider.forEach(product => {
    product.addEventListener('click', () => {
      const productId = product.parentNode.getAttribute('data-ident');
      const categoryId = product.parentNode.getAttribute('data-category');
      buy(categoryId, productId);
    })
  })
}


const botID = 'sdfsrgewsgesbot';
function buy(categoryId, productId) {
  window.open('https://t.me/' + botID + '?start=' + categoryId + '-' + productId, '_blank');
}