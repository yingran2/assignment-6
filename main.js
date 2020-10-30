//Limits amount of checkboxes user can click
var flavor = document.getElementsByName('flavor');
var limit = 0;
for (var i = 0; i < flavor.length; i++) {
  flavor[i].addEventListener('change', checkFlavor);
}


function checkFlavor() {
  if (this.checked) {
    if (limit < 2) {
      limit++
    } else {
      this.checked = false;
    }
  } else {
    limit--;
  }
}

//Updates number next to cart icon
function updateCartAmount() {
  document.getElementById("cart").innerHTML = order.length;
}

//Creates array that populates cart
if (localStorage.getItem('myOrder')) {
  var order = JSON.parse(localStorage.getItem('myOrder'));
  updateCartAmount();
} else {
  var order = [];
}

//Creates new order properties and pushes to order array
function addCart() {
  if (document.getElementById('dropdown').value !== "") {
    var currentOrder = new Object();
    var pageFlavor = document.getElementById('pageFlavor').dataset.flavor;
    currentOrder.flavors = [pageFlavor]
    currentOrder.price = currentPrice;
    currentOrder.amount = document.getElementById('dropdown').value;
    for (var i = 0; i < flavor.length; i++) {
      if (flavor[i].checked) {
        currentOrder.flavors.push(flavor[i].value);
      }
    }
    order.push(currentOrder);
    updateCartAmount();
    localStorage.setItem('myOrder', JSON.stringify(order));
  }
}

//Creates new div on cart page to display orders
function updateCart() {
  if (order.length > 0) {
    for (var i = 0; i < order.length; i++) {
      var orderHtml = document.createElement("div");
      orderHtml.setAttribute('data-order-number', i);
      orderHtml.innerHTML = '<button id="close" onclick="removeFromCart()"></button><div class="inBasket"><h3>' + order[i].amount + '</h3><p span class="flavorChoice">' + order[i].flavors.join(', ') + '</p><p span class="orderPrice">' + order[i].price + '</p></div><div class="border long"></div>'
      document.getElementById('yourOrder').appendChild(orderHtml);
    }
  }
}

//Removes order
function removeFromCart() {
  var orderIndex = event.target.parentElement.dataset.orderNumber
  order.splice(orderIndex, 1);
  event.target.parentElement.parentNode.removeChild(event.target.parentElement);
  updateCartAmount();
  localStorage.setItem('myOrder', JSON.stringify(order));
}

//Supports dropdownChange() function, exposes divs
function showFlavors() {
  if (document.getElementById('flavors').style.display === "none") {
    document.getElementById('flavors').style.display = "block";
    document.getElementById("moreDescription").style.display = "block";
    document.getElementById('main').src = 'images/product1.jpg';
  }
}

//Supports dropdownChange() function, hides divs
function hideFlavors() {
  if (document.getElementById('flavors').style.display === "block") {
    document.getElementById('flavors').style.display = "none";
    document.getElementById('moreDescription').style.display = "none";
    document.getElementById('main').src = 'images/product1.jpg';
    for (var i = 0; i < flavor.length; i++) {
      flavor[i].checked = false;
    }
  }
}

//Change price for certain pack
function dropdownChange() {
  switch (document.getElementById('dropdown').value) {
    case 'Single':
      currentPrice = "$3";
      document.getElementById('price').innerHTML = "$3";
      hideFlavors();
      break;
    case '3-pack':
      currentPrice = "$9";
      document.getElementById('price').innerHTML = "$9";
      hideFlavors();
      break;
    case '6-pack':
      currentPrice = "$18";
      document.getElementById('price').innerHTML = "$18";
      showFlavors();
      break;
    case '12-pack':
      currentPrice = "$36";
      document.getElementById('price').innerHTML = "$36";
      showFlavors();
      break;
    default:
      currentPrice = "$0.00";
      document.getElementById('price').innerHTML = "$0.00";
      hideFlavors();
      break;
  }
} 