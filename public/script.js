// ========== DOM Elements ==========
const iftarForm = document.getElementById('iftarForm');
const orderFormDiv = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const newOrderBtn = document.getElementById('newOrderBtn');
const toast = document.getElementById('toast');

// ========== Form Submission ==========
iftarForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('customerName').value.trim();
  const order = document.getElementById('customerOrder').value.trim();

  if (!name || !order) {
    showToast('Please fill in all fields', true);
    return;
  }

  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, order }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success
      orderFormDiv.style.display = 'none';
      successMessage.classList.add('show');
      iftarForm.reset();
    } else {
      showToast(data.error || 'Something went wrong', true);
    }
  } catch (err) {
    showToast('Connection error. Please try again.', true);
    console.error(err);
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// ========== New Order Button ==========
newOrderBtn.addEventListener('click', () => {
  successMessage.classList.remove('show');
  orderFormDiv.style.display = 'block';
  // Re-trigger animation
  const card = document.querySelector('.order-card');
  card.style.animation = 'none';
  card.offsetHeight; // trigger reflow
  card.style.animation = 'fadeInUp 0.5s ease-out both';
});

// ========== Toast Notification ==========
let toastTimeout;
function showToast(message, isError = false) {
  toast.textContent = message;
  toast.className = 'toast show' + (isError ? ' error' : '');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
