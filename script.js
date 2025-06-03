// ----- SEARCH BAR FUNCTIONALITY -----
const searchInput = document.getElementById('mobile-search');
const recentBox = document.getElementById('recent-search');
const keyword = document.getElementById('recent-keyword');

// Show dropdown when input is focused
searchInput.addEventListener('focus', () => {
  recentBox.style.display = 'block';
});

// Prevent dropdown from closing too fast when clicked
let dropdownClicked = false;

recentBox.addEventListener('mousedown', () => {
  dropdownClicked = true;
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    if (!dropdownClicked) recentBox.style.display = 'none';
    dropdownClicked = false;
  }, 100);
});

// Fill input when dropdown is clicked
recentBox.addEventListener('click', () => {
  searchInput.value = keyword.textContent;
  recentBox.style.display = 'none';
  searchInput.focus(); // allow immediate Enter
});

// Redirect on Enter
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim().toLowerCase();
    if (query === 'general visit pass') {
      window.location.href = 'booking.html'; // adjust to your target page
    } else {
      alert('No results found for "' + searchInput.value + '"');
    }
  }
});


// ----- HAMBURGER MENU -----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.nav-menu-mobile');

hamburger.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});


// ----- PASS CLICKS -----
document.querySelectorAll('.pass').forEach(pass => {
  if (pass.getAttribute('data-label') !== 'General Visit Pass') {
    pass.style.cursor = 'pointer';
    pass.addEventListener('click', () => {
      alert('Sorry, service not available at the moment :(');
    });
  }
});


// ----- SCROLL TO TOP FUNCTION -----
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

document.querySelector('.place-order').addEventListener('click', function (e) {
  e.preventDefault();

  // Get all form groups with data-required="true"
  const requiredGroups = document.querySelectorAll('.billing-details .form-group[data-required="true"]');
  let billingIncomplete = false;

  // Loop over each form group
  for (let group of requiredGroups) {
    // Find the input or select inside this group
    const input = group.querySelector('input, select, textarea');

    // If input is missing or empty, mark incomplete
    if (!input || !input.value.trim()) {
      billingIncomplete = true;
      break;
    }
  }

  if (billingIncomplete) {
    alert('Please fill in your billing address.');
    return;
  }

  // Continue with card validation as before:
  const cardNumber = document.querySelector('.card-placeholder input[placeholder="Card Number"]');
  const expiry = document.querySelector('.card-placeholder input[placeholder="MM/YY"]');
  const cvc = document.querySelector('.card-placeholder input[placeholder="CVC"]');
  const cardholder = document.querySelector('.card-placeholder input[placeholder="Cardholder Name"]');

  if (!cardNumber || cardNumber.value.trim().replace(/\s+/g, '').length < 16) {
    alert('Please enter a valid 16-digit card number.');
    return;
  }

  if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value.trim())) {
    alert('Please enter a valid expiration date in MM/YY format.');
    return;
  }

  if (!cvc || !/^\d{3,4}$/.test(cvc.value.trim())) {
    alert('Please enter a valid CVC (3 or 4 digits).');
    return;
  }

  if (!cardholder || cardholder.value.trim() === '') {
    alert('Please enter the cardholder\'s full name.');
    return;
  }

  // Terms checkbox
  const termsCheckbox = document.querySelector('.terms input[type="checkbox"]');
  if (!termsCheckbox.checked) {
    alert('You must agree to the Terms & Conditions before placing your order.');
    return;
  }

  alert('Order placed successfully!');
});


