// Minimal JS: mobile menu + year
const btn = document.querySelector('.navToggle');
const mobile = document.getElementById('mobileNav');

if (btn && mobile) {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    mobile.hidden = expanded;
  });

  // Close menu when clicking a link
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', 'false');
    mobile.hidden = true;
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();
