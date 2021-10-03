// JSON 파일로부터 아이템들을 동적으로 받아오기
function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items)
}


// 리스트를 업데이트함
function displayItems(items) {
  const container = document.querySelector('.items')
  container.innerHTML = items.map(item => createHTMLString(item)).join('')
}
// HTML 리스트를 만듦
function createHTMLString(item) {
  return `
    <li class="item ${item.color} ${item.type}">
      <img src=${item.image} alt="${item.color} ${item.type}" class="item__thumbnail">
      <span class="item__description">${item.gender}, ${item.size} size</span>
    </li>
  `
}


// 버튼을 클릭하면 클릭한 카테고리의 아이템들이 나타남
function filteringItem(item, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].innerHTML.indexOf(item) === -1) {
      array[i].style.display = "none"
    } else {
      array[i].style.display = "flex"
    }
  }
}

function onButtonClick(event, items) {
  const key = event.target.dataset.key
  const value = event.target.dataset.value
  if ( key == null || value == null ) return
  
  items.forEach(item => {
    const shoppingListEls = document.querySelectorAll('.item')
    if (value === item.type) {
      filteringItem(item.type, shoppingListEls)
    } else if (value === item.color) {
      filteringItem(item.color, shoppingListEls)
    }
    
  }) 
}

// 로고를 클릭하면 전체가, 각 항목을 클릭하면 
// 각 항목에 맞는 리스트가 출력되도록 하는 이벤트리스터 등록
function setEventListeners(items) {
  const logo = document.querySelector('.logo')
  const buttons = document.querySelector('.select')
  logo.addEventListener('click', () => displayItems(items))
  buttons.addEventListener('click', event => onButtonClick(event, items))
}

// main
loadItems()
  .then(items => {
    displayItems(items)
    setEventListeners(items)
  })
  .catch(() => console.log('error'))
