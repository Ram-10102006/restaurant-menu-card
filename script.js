// 🌶️ Andhra Delight Ordering Logic

const items = document.querySelectorAll('.item');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const addToCartBtn = document.getElementById('addToCart');
const modalClose = document.getElementById('modalClose');

let currentItem = null;
let cart = [];

items.forEach(item => {
  item.addEventListener('click', () => {
    const name = item.querySelector('.name').textContent;
    const price = parseInt(item.querySelector('.price').textContent.replace('₹',''));
    const img = item.querySelector('img').src;

    currentItem = { name, price, img };
    modalImg.src = img;
    modalName.textContent = name;
    modalPrice.textContent = `₹${price}`;
    modal.classList.remove('hidden');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

addToCartBtn.addEventListener('click', () => {
  cart.push(currentItem);
  updateCart();
  modal.classList.add('hidden');
});

function updateCart() {
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;
    const el = document.createElement('div');
    el.classList.add('cart-item');
    el.innerHTML = `
      <span>${item.name}</span>
      <div>
        ₹${item.price}
        <button onclick="removeItem(${index})">🗑️</button>
      </div>`;
    cartDiv.appendChild(el);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  document.getElementById('subtotal').textContent = `₹${subtotal}`;
  document.getElementById('tax').textContent = `₹${tax.toFixed(0)}`;
  document.getElementById('total').textContent = `₹${total.toFixed(0)}`;
}

window.removeItem = function(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById('clearCart').addEventListener('click', () => {
  cart = [];
  updateCart();
});

document.getElementById('submitOrder').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Please add at least one item before submitting.');
    return;
  }

  const name = document.getElementById('customer-name').value || 'Customer';
  const phone = document.getElementById('customer-phone').value || 'Not provided';
  const note = document.getElementById('customer-note').value || '';

  let orderText = `Order from ${name}\nPhone: ${phone}\n\nItems:\n`;
  cart.forEach(i => {
    orderText += `- ${i.name} (₹${i.price})\n`;
  });
  const subtotal = document.getElementById('subtotal').textContent;
  const total = document.getElementById('total').textContent;
  orderText += `\nSubtotal: ${subtotal}\nTotal: ${total}\n\nNote: ${note}`;

  const mailto = `mailto:ramnagendrapkodanda@gmail.com?subject=New Food Order&body=${encodeURIComponent(orderText)}`;
  window.location.href = mailto;
});