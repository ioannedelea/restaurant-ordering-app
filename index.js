import { menuArray } from "./data.js";
const orderItems = document.getElementById("ordered-items");
let addToOrder = []; // instantiate the variable that holds the added items

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addItemsToOrder(e.target.dataset.add);
    console.log(addToOrder);
    // hidden.style.display ='block'
  } else if (e.target.dataset.delete) {
    e.preventDefault();
    removeItem(e.target.dataset.delete);
  }
});

/* Function that returns the html for the items in the menu */

function getMenuHTML() {
  let menuHTML = ``;

  menuArray.forEach(function (menuItem) {
    menuHTML += `

    <div class="items-ordered">
    <img src="images/${menuItem.image}" alt="${menuItem.name}"/>
    <div class="items-details">
      <p class="item-name">${menuItem.name}</p>
      <p class="item-ingredients">${menuItem.ingredients}</p>
      <p class="item-price">${menuItem.price}</p>
    </div>
    <div class="items-add">
      <img src="images/add-btn.png" data-add="${menuItem.id}"/>
    </div>
  </div>
   
    `;
  });

  return menuHTML;
}

function renderMenu() {
  document.getElementById("order-items").innerHTML = getMenuHTML();
}

function addItemsToOrder(menuItem) {
  const addedItem = menuArray.filter(function (item) {
    return item.id == menuItem;
  })[0];
  addToOrder.push(addedItem);
  renderOrder();
}

function renderOrder() {
  renderMenu();
  let order = "";
  addToOrder.forEach(function (menuItem, index) {
    order += `<div class="order-summary">
                <div>
              <h2>${menuItem.name} <a href="#" class="delete-item" data-delete=${menuItem.index}>remove</a></h2>
              </div>
            <div>
              <h2>${menuItem.price}</h2>
            </div>
          </div>`;
  });
  orderItems.innerHTML = order;
  //addingOfPrices();
}

function removeItem(itemId) {
  addToOrder.splice(itemId, 1);
  if (addToOrder.length === 0) {
    //hidden.style.display ='none'
  }
  renderOrder();
}

renderMenu();
