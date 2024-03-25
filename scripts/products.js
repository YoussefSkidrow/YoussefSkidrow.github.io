const BASE_URL = 'http://localhost:3000';

const categoryNames = {
  'iphones': '1',
  'ipads': '2',
  'macbooks': '3',
  'applewatches': '4',
  'accessories': '5'
}


function renderFilters(products) {
  const filters = document.querySelector('.catalog-sidebar');
  filters.innerHTML = '';
  filters.innerHTML += `
          <h2 class="catalog-title" id="content">Фильтры</h2>
					<div class="catalog-sidebar-item">
						<span class="catalog-sidebar-title">Цена</span>
						<div class="catalog-sidebar-range">
							<input
								type="text"
								class="catalog-sidebar-input"
								id="min-price"
								placeholder="0"
							/>
							<span>-</span>
							<input
								type="text"
								class="catalog-sidebar-input"
								id="max-price"
								placeholder="200000"
							/>
						</div>
					</div>
  `




}


async function getProducts(categoryId, params) {
  let url = `${BASE_URL}/catalog/${categoryNames[categoryId]}`;
  const response = await fetch(url);
  const data = await response.json();
  let filtered = data.items;
  if (params) {
    if (params.minPrice) {
      filtered = filtered.filter(item => item.price >= params.minPrice);
    }
    if (params.maxPrice) {
      filtered = filtered.filter(item => item.price <= params.maxPrice);
    }
    if (params.storage) {
      filtered = filtered.filter(item => item.storage.includes(params.storage));
    }
    if (params.color) {
      filtered = filtered.filter(item => item.color.toLowerCase() === params.color.toLowerCase());
    }
  }
  console.log(filtered)
  return filtered
}

async function renderProducts(products) {
  const div = document.querySelector('.catalog-items');
  div.innerHTML = '';
  products.forEach(product => {
    div.innerHTML += `
      <div class="catalog-item" data-ident="${product.id}">
        <img
          src="${product.img}"
          alt="фото товара"
          class="catalog-item-img"
        />
        <span class="catalog-item-name">${product.name} ${product.storage}</span>
        <span class="catalog-item-price">${product.price}</span>
        <button class="catalog-item-btn button-blue">Заказать</button>
      </div>

    `
  })
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const categoryName = params.get('items');

  document.querySelectorAll('.catalog-item-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      buy(categoryNames[categoryName], e.target.parentNode.dataset.ident);
    })
  })
}



function checkboxChoose(className, paramName) {
  const checkboxes = document.querySelectorAll(className);
  const urlParams = new URLSearchParams(window.location.search);

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        checkboxes.forEach(cb => {
          if (cb !== event.target) {
            cb.checked = false;
          }
        });
        // Добавляем или обновляем параметр в URLSearchParams
        urlParams.set(paramName, event.target.value);
      } else {
        // Если чекбокс снят, удаляем параметр из URLSearchParams
        urlParams.delete(paramName);
      }

      // Обновляем адрес страницы с новыми параметрами
      history.replaceState(null, null, "?" + urlParams.toString());
    });
  });
}


async function submitForm(event) {
  event.preventDefault();
  const minPrice = document.getElementById('min-price').value;
  const maxPrice = document.getElementById('max-price').value;
  const storage = Array.from(document.querySelectorAll('input.checkbox-storage:checked')).map(input => input.value);
  const color = Array.from(document.querySelectorAll('input.checkbox-color:checked')).map(input => input.value);

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const categoryName = params.get('items');

  const filters = {}

  minPrice ? filters.minPrice = minPrice : delete filters.minPrice;
  maxPrice ? filters.maxPrice = maxPrice : delete filters.maxPrice;
  storage.length > 0 ? filters.storage = storage[0] : delete filters.storage;
  color.length > 0 ? filters.color = color[0] : delete filters.color;

  // const url = new URLSearchParams(filters).toString();
  // window.location.href = `catalog.html?items=${categoryName}&${url}`

  const products = await getProducts(categoryName, filters);
  return products
}


window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('sort', 'popular');
  urlParams.set('sortType', 'desc');
  history.replaceState(null, null, "?" + urlParams.toString());
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const categoryName = params.get('items');
  const products = await getProducts(categoryName)

  checkboxChoose('.checkbox-color', 'color')
  checkboxChoose('.checkbox-storage', 'storage')
  renderProducts(products)

  const applyButton = document.getElementById('apply');
  applyButton.addEventListener('click', async e => {
    const products = await submitForm(e);
    renderProducts(products);
  });


  sort('popular', 'popular', 'popularIndex');
  sort('price', 'price', 'price');
  sort('rating', 'rating', 'ratingIndex');

  document.querySelector('.catalog-mobile-btn').addEventListener('click', openFilters)
}

async function sort(selector, sort, sortName) {
  const urlParams = new URLSearchParams(window.location.search);


  const elem = document.getElementById(selector);
  const sortElems = document.querySelectorAll('.catalog-sort-type');

  elem.addEventListener('click', async (e) => {
    const sortType = urlParams.get('sortType') === 'asc' ? 'desc' : 'asc';
    urlParams.set("sort", sort);
    urlParams.set("sortType", sortType);
    history.replaceState(null, null, "?" + urlParams.toString());

    sortElems.forEach(elem => {
      if (elem.id === selector) {
        elem.classList.add('selected');
        if (sortType === 'asc') {
          elem.querySelector('.catalog-sort-arrow').style.transform = 'rotate(180deg)';
        } else {
          elem.querySelector('.catalog-sort-arrow').style.transform = 'rotate(0deg)';
        }
      } else {
        elem.classList.remove('selected');
      }
    })

    const products = await submitForm(e);
    const sortedProducts = products.sort((a, b) => sortType === 'asc' ? a[sortName] - b[sortName] : b[sortName] - a[sortName]);
    renderProducts(sortedProducts);
  })
}

const botID = 'sdfsrgewsgesbot';
function buy(categoryId, productId) {
  window.open('https://t.me/' + botID + '?start=' + categoryId + '-' + productId, '_blank');
}

function openFilters() {
  const filters = document.querySelector('.catalog-sidebar');
  filters.classList.toggle('active');
}