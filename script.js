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

const privacyDialog = document.getElementById('privacyDialog');
const privacyTrigger = document.querySelector('.formPrivacy__trigger');
const privacyClose = document.querySelector('[data-privacy-close]');

if (privacyDialog && privacyTrigger && privacyClose) {
  privacyTrigger.addEventListener('click', () => privacyDialog.showModal());
  privacyClose.addEventListener('click', () => privacyDialog.close());
}

const heroVideo = document.querySelector('.hero__video');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection && navigator.connection.saveData;

if (heroVideo && !reduceMotion && !saveData) {
  const startHeroVideo = () => heroVideo.play().catch(() => {});
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startHeroVideo, { timeout: 3000 });
  } else {
    window.setTimeout(startHeroVideo, 1500);
  }
}

const contactForm = document.querySelector('[data-formspree]');

if (contactForm) {
  const steps = Array.from(contactForm.querySelectorAll('.formStep'));
  const progressItems = Array.from(contactForm.querySelectorAll('.formProgress li'));
  const stepStatus = contactForm.querySelector('.formStepStatus');
  const backButton = contactForm.querySelector('[data-step-back]');
  const skipButton = contactForm.querySelector('[data-step-skip]');
  const nextButton = contactForm.querySelector('[data-step-next]');
  const submitButton = contactForm.querySelector('.form__submit');
  const statusMessage = contactForm.querySelector('.form__status');
  const successMessage = contactForm.parentElement.querySelector('.formSuccess');
  const resetButton = successMessage.querySelector('.formSuccess__reset');
  let currentStep = 0;

  function showStep(stepIndex, moveFocus = true) {
    currentStep = Math.max(0, Math.min(stepIndex, steps.length - 1));

    steps.forEach((step, index) => {
      step.hidden = index !== currentStep;
      step.querySelectorAll('[data-required]').forEach((field) => {
        field.required = index === currentStep;
      });
    });

    progressItems.forEach((item, index) => {
      if (index === currentStep) {
        item.setAttribute('aria-current', 'step');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    stepStatus.textContent = `Steg ${currentStep + 1} av ${steps.length}`;
    backButton.hidden = currentStep === 0;
    skipButton.hidden = currentStep === 0 || currentStep === steps.length - 1;
    nextButton.innerHTML = currentStep === steps.length - 1
      ? 'Send forespørsel <span aria-hidden="true">→</span>'
      : 'Neste <span aria-hidden="true">→</span>';

    if (moveFocus) {
      const legend = steps[currentStep].querySelector('legend');
      legend.setAttribute('tabindex', '-1');
      legend.focus();
    }
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
      return;
    }

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

  backButton.addEventListener('click', () => showStep(currentStep - 1));
  skipButton.addEventListener('click', () => showStep(currentStep + 1));

  resetButton.addEventListener('click', () => {
    contactForm.reset();
    showStep(0, false);
    contactForm.hidden = false;
    successMessage.hidden = true;
    contactForm.removeAttribute('aria-busy');
    submitButton.disabled = false;
    statusMessage.hidden = true;
    contactForm.querySelector('input[name="behov"]').focus();
  });

  showStep(0, false);
}
