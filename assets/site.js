// Fuzzy Software — site behavior
document.addEventListener('DOMContentLoaded', function () {
    // Copyright year
    var year = document.getElementById('copyright-year');
    if (year) year.textContent = new Date().getFullYear();

    // Mobile navigation
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');

    function setNav(open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            setNav(!nav.classList.contains('is-open'));
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                setNav(false);
                toggle.focus();
            }
        });
    }

    // Contact form (Formspree)
    var form = document.getElementById('contact-form');
    var message = document.getElementById('form-message');

    function showMessage(text, kind) {
        message.textContent = text;
        message.className = 'form-message ' + (kind === 'success' ? 'is-success' : 'is-error');
        message.hidden = false;
    }

    if (form && message) {
        var required = ['name', 'email', 'message'];

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            message.hidden = true;

            var data = new FormData(form);
            var valid = true;

            required.forEach(function (name) {
                var field = document.getElementById(name);
                var value = (data.get(name) || '').toString().trim();
                field.classList.toggle('is-invalid', !value);
                if (!value) valid = false;
            });

            if (!valid) {
                showMessage('Please complete the required fields.', 'error');
                return;
            }

            var email = data.get('email').toString();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('email').classList.add('is-invalid');
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            var submit = form.querySelector('button[type="submit"]');
            if (submit) submit.disabled = true;

            try {
                var response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    showMessage('Thank you. Your message has been received and we will be in touch.', 'success');
                    form.reset();
                } else {
                    showMessage('Your message could not be sent. Please try again or email contact@fuzzysoftwarellc.com.', 'error');
                }
            } catch (err) {
                showMessage('A connection error occurred. Please try again or email contact@fuzzysoftwarellc.com.', 'error');
            } finally {
                if (submit) submit.disabled = false;
            }
        });

        form.querySelectorAll('input, textarea').forEach(function (input) {
            input.addEventListener('input', function () { this.classList.remove('is-invalid'); });
        });
    }
});
