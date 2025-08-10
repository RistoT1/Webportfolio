export async function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  const submitButton = contactForm.querySelector('.submit-button');
  if (!submitButton) return;

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    if (submitButton.disabled) return; // Prevent double submission

    const originalText = submitButton.textContent;
    submitButton.textContent = 'sending...';
    submitButton.disabled = true;

    try {
      await emailjs.sendForm(
        'service_uscpzpf',
        'template_ib7gycn',
        contactForm,
        'Rh9QWf5yealeF8mbJ'
      );

      submitButton.textContent = 'message sent';
      contactForm.reset();

    } catch (error) {
      console.error('EmailJS error:', error);
      submitButton.textContent = 'send failed';

    } finally {
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    }
  });
}
