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

const contactForm = document.querySelector('[data-formspree]');

if (contactForm) {
  const submitButton = contactForm.querySelector('.form__submit');
  const statusMessage = contactForm.querySelector('.form__status');
  const successMessage = contactForm.parentElement.querySelector('.formSuccess');
  const resetButton = successMessage.querySelector('.formSuccess__reset');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Sender…';
    contactForm.setAttribute('aria-busy', 'true');
    statusMessage.hidden = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Submission failed');

      contactForm.hidden = true;
      successMessage.hidden = false;
      successMessage.focus();
    } catch {
      statusMessage.textContent = 'Meldingen kunne ikke sendes akkurat nå. Prøv igjen, eller kontakt meg på e-post.';
      statusMessage.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Send melding';
      contactForm.removeAttribute('aria-busy');
    }
  });

  resetButton.addEventListener('click', () => {
    contactForm.reset();
    contactForm.hidden = false;
    successMessage.hidden = true;
    contactForm.removeAttribute('aria-busy');
    submitButton.disabled = false;
    submitButton.textContent = 'Send melding';
    contactForm.querySelector('input[name="navn"]').focus();
  });
}
