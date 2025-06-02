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

