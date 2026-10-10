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

const wizard = document.querySelector('[data-wizard]');

if (wizard) {
  const panels = Array.from(wizard.querySelectorAll('.wizard__step'));
  const progressItems = Array.from(wizard.querySelectorAll('.wizard__progress li'));
  const status = wizard.querySelector('.wizard__status');
  const backButton = wizard.querySelector('[data-back]');
  const skipButton = wizard.querySelector('[data-skip]');
  const nextButton = wizard.querySelector('[data-next]');
  let currentStep = 0;

  function showStep(stepIndex, moveFocus = true) {
    currentStep = Math.max(0, Math.min(stepIndex, panels.length - 1));

    panels.forEach((panel, index) => {
      panel.hidden = index !== currentStep;
      panel.querySelectorAll('[data-required]').forEach((field) => {
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

    status.textContent = `Steg ${currentStep + 1} av ${panels.length}`;
    backButton.hidden = currentStep === 0;
    skipButton.hidden = currentStep === 0 || currentStep === panels.length - 1;
    nextButton.innerHTML = currentStep === panels.length - 1
      ? 'Send forespørsel <span aria-hidden="true">→</span>'
      : 'Neste <span aria-hidden="true">→</span>';

    if (moveFocus) {
      const legend = panels[currentStep].querySelector('legend');
      legend.setAttribute('tabindex', '-1');
      legend.focus();
    }
  }

  wizard.addEventListener('submit', (event) => {
    if (currentStep < panels.length - 1) {
      event.preventDefault();
      showStep(currentStep + 1);
    }
  });

  backButton.addEventListener('click', () => showStep(currentStep - 1));
  skipButton.addEventListener('click', () => showStep(currentStep + 1));
  showStep(0, false);
}
