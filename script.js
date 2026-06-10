const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');

function updateHeader(){
  header.classList.toggle('scrolled', window.scrollY > 24);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ---------------------------------------------------------------------------
   Lead form -> Power Automate -> Dynamics 365 Sales (Lead)

   SETUP: After you build the Power Automate flow ("When an HTTP request is
   received"), copy its "HTTP POST URL" and paste it between the quotes below.
--------------------------------------------------------------------------- */
const FORM_ENDPOINT = ''; // <-- paste your Power Automate HTTP POST URL here

const leadForm = document.getElementById('lead-form');
if (leadForm) {
  const statusEl = leadForm.querySelector('.form-status');
  const submitBtn = leadForm.querySelector('button[type="submit"]');

  const setStatus = (msg, ok) => {
    statusEl.hidden = false;
    statusEl.textContent = msg;
    statusEl.style.color = ok ? '#1a7f37' : '#c0392b';
    statusEl.style.marginTop = '0.75rem';
    statusEl.style.fontWeight = '600';
  };

  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: if a bot filled the hidden field, pretend success and stop.
    const fd = new FormData(leadForm);
    if ((fd.get('company_website') || '').toString().trim() !== '') {
      leadForm.reset();
      setStatus('Thanks — we got your details and will be in touch shortly.', true);
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus('This form isn’t connected yet. Please call (779) 210-8350 or email info@printautomationdesign.com.', false);
      return;
    }

    const payload = {
      name: (fd.get('name') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      phone: (fd.get('phone') || '').toString().trim(),
      message: (fd.get('message') || '').toString().trim(),
      source: 'printautomationdesign.com',
      submittedAt: new Date().toISOString()
    };

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.hidden = true;

    try {
      // text/plain + no-cors keeps this a "simple" request so the static site
      // can post to Power Automate without CORS preflight problems. The flow
      // still receives the JSON body; the response is opaque, so we treat a
      // completed request as success (the flow also emails info@ as a backup).
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(payload)
      });
      leadForm.reset();
      setStatus('Thanks — we got your details and will be in touch shortly.', true);
    } catch (err) {
      setStatus('Something went wrong. Please call (779) 210-8350 or email info@printautomationdesign.com.', false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
