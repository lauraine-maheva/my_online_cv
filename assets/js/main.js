/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})();

function sendEMail() {
  // Récupération sûre + trim (et valeurs par défaut)
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");
  const subjectEl = document.getElementById("subject"); // peut ne pas exister
  const phoneEl = document.getElementById("phone");     // peut ne pas exister

  const tempParams = {
    from_name: (nameEl?.value || "").trim(),
    to_mail: (emailEl?.value || "").trim(),
    subject: (subjectEl?.value || "").trim(),
    phone: (phoneEl?.value || "").trim(),
    message: (messageEl?.value || "").trim(),
  };

  // Vérif présence des éléments critiques (au cas où les IDs changent)
  if (!nameEl || !emailEl || !messageEl) {
    swal({
      title: "Formularfehler",
      text: "Pflichtfelder konnten nicht gefunden werden. Bitte aktualisieren Sie die Seite oder kontaktieren Sie den Administrator.",
      icon: "error",
      button: "OK"
    });
    return;
  }

  // Champs obligatoires
  if (!tempParams.from_name || !tempParams.to_mail || !tempParams.message) {
    swal({
      title: "Felder leer",
      text: "Bitte überprüfen Sie die Pflichtfelder (Name, E-Mail, Nachricht).",
      icon: "warning",
      button: "OK"
    });
    return;
  }

  // Validation e-mail
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempParams.to_mail);
  if (!isEmail) {
    swal({
      title: "Ungültige E-Mail",
      text: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      icon: "warning",
      button: "OK"
    });
    return;
  }

  // Payload attendu par l'API (toutes clés en string)
  const payload = {
    name: tempParams.from_name,
    email: tempParams.to_mail,
    subject: tempParams.subject || "",
    phone: tempParams.phone || "",
    message: tempParams.message
  };

  const submitBtn = document.querySelector('#contact-submit');
  submitBtn?.setAttribute('disabled', 'disabled');

  fetch('https://api.geekinstitut.com/api/contacts?enterprise=LAURAINE_MAHEVA', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(async (res) => {
    let data = null;
    try { data = await res.json(); } catch (e) { /* réponse vide/non JSON : OK */ }
    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return data;
  })
  .then(() => {
    swal({
      title: "Ihre Nachricht wurde gesendet.",
      text: "Vielen Dank für Ihre Kontaktaufnahme!",
      icon: "success",
      button: "OK"
    });
    // Reset uniquement les champs existants
    nameEl.value = '';
    emailEl.value = '';
    messageEl.value = '';
    if (subjectEl) subjectEl.value = '';
    if (phoneEl) phoneEl.value = '';
  })
  .catch((err) => {
    console.error('Kontaktformular Fehler:', err);
    swal({
      title: "Hoppla! Etwas ist schiefgelaufen",
      text: err.message || "Ihre Nachricht konnte momentan nicht gesendet werden.",
      icon: "error",
      button: "OK"
    });
  })
  .finally(() => {
    submitBtn?.removeAttribute('disabled');
  });
}







