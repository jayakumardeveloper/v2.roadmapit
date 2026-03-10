const playBtns = document.querySelectorAll('#play-video');
function mouseMoveParallax(e) {
  let t = document.getElementById(`${e}`);
  if (t) {
    new Parallax(t);
  }
}
(playBtns.forEach((e) => {
  e.addEventListener('click', () => {
    let t = e.getAttribute('data-video'),
      i = document.createElement('div');
    (i.classList.add('v-wrapper', 'v-modal'), i.setAttribute('id', 'video-modal'), (i.innerHTML = `\n      <button id="v-close" class="v-close-btn">X</button>\n      <div class="v-player video-ratio">\n        <iframe class="h-full w-full"\n          src="${t}"\n          title="YouTube video player"\n          frameborder="0"\n          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n          referrerpolicy="strict-origin-when-cross-origin"\n          allowfullscreen>\n        </iframe>\n      </div>`), document.body.appendChild(i));
    const o = document.getElementById('video-modal');
    (document.getElementById('v-close').addEventListener('click', () => {
      o.remove();
    }),
      o.addEventListener('click', (e) => {
        e.target === o && o.remove();
      }));
  });
}),
  mouseMoveParallax('parallax-mouse'));
const h2VerticalSwiper = document.querySelector('#h2-vertical-swiper');
h2VerticalSwiper && (h2VerticalSwiper.style.height = h2VerticalSwiper.firstElementChild.firstElementChild.clientHeight + 'px');
const optionInput = document.getElementById('option');
(optionInput &&
  (optionInput.addEventListener('focus', (e) => {
    e.target.nextElementSibling.classList.remove('hidden');
  }),
  optionInput.addEventListener('blur', (e) => {
    e.target.nextElementSibling.classList.add('hidden');
  })),
  document.addEventListener('DOMContentLoaded', function () {
    const e = document.querySelectorAll('.nav-link.group_item + div'),
      t = document.querySelectorAll('.relative.group .group-h-auto, .relative.sub-group .sub-group-h-auto');
    (e.forEach((e) => {
      (e.addEventListener('mouseenter', function () {
        const e = this.closest('.group');
        if (e) {
          const t = e.querySelector('.nav-link.group_item');
          t && (t.classList.add('groupItem'), t.classList.add('groupItem', 'beforeAction'));
        }
      }),
        e.addEventListener('mouseleave', function () {
          const e = this.closest('.group');
          if (e) {
            const t = e.querySelector('.nav-link.group_item');
            t && (t.classList.remove('groupItem'), t.classList.remove('groupItem', 'beforeAction'));
          }
        }));
    }),
      t.forEach((e) => {
        (e.addEventListener('mouseenter', function () {
          const e = this.closest('.group');
          if (e) {
            const t = e.querySelector('.nav-link.group_item');
            t && (t.classList.add('groupItem'), t.classList.add('groupItem', 'beforeAction'));
          }
        }),
          e.addEventListener('mouseleave', function () {
            const e = this.closest('.group');
            if (e) {
              const t = e.querySelector('.nav-link.group_item');
              t && (t.classList.remove('groupItem'), t.classList.remove('groupItem', 'beforeAction'));
            }
          }));
      }));
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) {
      return new bootstrap.Tooltip(e, { trigger: 'hover', container: 'body' });
    });
  }),
  document.addEventListener('DOMContentLoaded', () => {
    const e = document.querySelector('canvas'),
      t = e.getContext('2d');
    function i() {
      ((e.width = window.innerWidth), (e.height = window.innerHeight));
    }
    (i(),
      window.addEventListener('resize', () => {
        (clearTimeout(window._resizeTimer),
          (window._resizeTimer = setTimeout(() => {
            (i(), l());
          }, 150)));
      }));
    const o = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let n = !1;
    window.addEventListener('mousemove', (e) => {
      n ||
        (requestAnimationFrame(() => {
          ((o.x = e.clientX), (o.y = e.clientY), (n = !1));
        }),
        (n = !0));
    });
    const s = ['#000000', '#174991', '#ff9103'];
    let r = [];
    class a {
      constructor(e, t, i, o, n) {
        ((this.x = e), (this.y = t), (this.radius = i), (this.color = n), (this.radians = o * Math.PI * 2), (this.velocity = 0.05), (this.distanceFromCenter = 10), (this.lastMouse = { x: e, y: t }));
      }
      draw() {
        (t.beginPath(), (t.fillStyle = this.color), t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI), t.fill(), t.closePath());
      }
      update() {
        ((this.radians += this.velocity), (this.lastMouse.x += 0.07 * (o.x - this.lastMouse.x)), (this.lastMouse.y += 0.07 * (o.y - this.lastMouse.y)), (this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter), (this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter), this.draw());
      }
    }
    function l() {
      r = [new a(e.width / 2, e.height / 2, 4, 0.3, s[0]), new a(e.width / 2, e.height / 2, 4, 0.6, s[1]), new a(e.width / 2, e.height / 2, 4, 0.9, s[2])];
    }
    (l(),
      (function i() {
        (requestAnimationFrame(i), t.clearRect(0, 0, e.width, e.height));
        for (let e of r) e.update();
      })());
  }),
  document.addEventListener('DOMContentLoaded', function () {
    var Tawk_API = Tawk_API || {};

    Tawk_API.onPrechatSubmit = function (data) {
      // Force getting values from HTML (class-based)
      let name = document.querySelector('.tawk-input[name="name"]')?.value.trim();
      let email = document.querySelector('.tawk-input[name="email"]')?.value.trim();
      let phone = document.querySelector('.tawk-input[name="phone"]')?.value.trim();

      // -----------------------
      // VALIDATION
      // -----------------------

      if (!name) {
        alert('Please enter your name.');
        return false; // ❌ BLOCK CHAT
      }

      const emailPattern = /^\S+@\S+\.\S+$/;
      if (!email || !emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false; // ❌ BLOCK CHAT
      }

      const phonePattern = /^[0-9]{6,15}$/;
      if (!phone || !phonePattern.test(phone)) {
        alert('Please enter a valid phone number (6–15 digits).');
        return false; // ❌ BLOCK CHAT
      }

      // -----------------------
      // BUILD EMAIL TEMPLATE
      // -----------------------
      let emailBody = `
    <div style="font-family: Arial; color: #333; line-height: 1.6; margin: 40px auto; max-width: 500px;">
        <h2 style="text-align:center; font-size:20px;">Contact Details</h2>
        <table style="width:100%; border-collapse:collapse; border:1px solid #ddd;">
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        </table>
    </div>
    `;

      let postData = {
        mail_sub: `${name} - Tawk Contact`,
        mail_body: emailBody,
      };

      // -----------------------
      // SEND AJAX EMAIL
      // -----------------------
      fetch('https://webappqc.roadmaperp.com:8765/ords/rmqc27/web_email/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('Email sent:', result);
        })
        .catch((err) => console.error('Error:', err));

      return true; // ✅ ALLOW CHAT TO CONTINUE
    };
    document.querySelectorAll('.billing-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.billing-btn').forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
        const billing = this.dataset.billing;
        document.querySelectorAll('.price').forEach((price) => {
          const valueEl = price.querySelector('.price-value');
          const durationEl = price.querySelector('.price-duration');
          const current = parseFloat(valueEl.textContent);
          const target = parseFloat(price.dataset[billing]);
          animateValue(valueEl, current, target);
          durationEl.textContent = billing === 'yearly' ? '/year' : '/month';
        });
      });
    });
  }));
function animateValue(el, start, end, duration = 500) {
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = start + (end - start) * progress;
    el.textContent = value % 1 === 0 ? Math.round(value) : value.toFixed(1);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
document.addEventListener('DOMContentLoaded', () => {
  const defaults = { delay: 5000, slideInterval: 3000, slides: [] };
  const config = window.modalConfig ? { ...defaults, ...window.modalConfig } : defaults;
  const modalData = config.slides;
  if (!modalData || modalData.length === 0) return;
  const createModal = () => {
    let carouselImages = '';
    let indicatorsHTML = '';
    let contentSlidesHTML = '';
    modalData.forEach((item, index) => {
      const activeClass = index === 0 ? 'active' : '';
      carouselImages += `
        <img src="${item.img}"
             class="${activeClass}"
             alt="${item.title}" />
      `;
      indicatorsHTML += `
        <span class="indicator ${activeClass}"
              data-index="${index}"></span>
      `;
      contentSlidesHTML += `
        <div class="row content-slide ${activeClass}">

          <div class="content-text col-md-7 col-12">
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
          </div>

          <div class="action-buttons col-md-5 col-12">
            <a href="${item.btnLink}" class="btn-primary">
              ${item.btnText}
            </a>
          </div>
        </div>
      `;
    });
    const modalHTML = `
      <div class="modal-outerBox" id="modalOverlayFreeTrail">
        <div class="modal-innerBox">

          <div class="modal-closeBox" id="modalClose">
            <i class="bi bi-x-lg"></i>
          </div>

          <div class="modal-carousel">
            <div class="carousel-track">
              ${carouselImages}
            </div>

            <button class="carousel-control prev" id="prevBtn">
              <i class="bi bi-chevron-left"></i>
            </button>

            <button class="carousel-control next" id="nextBtn">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>

          <div class="modal-content-col">
            <div class="content-track">
              ${contentSlidesHTML}
            </div>
            <div class="carousel-indicators">
              ${indicatorsHTML}
            </div>
          </div>

        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  };
  createModal();
  const modalOverlay = document.getElementById('modalOverlayFreeTrail');
  const modalCloseBtn = document.getElementById('modalClose');
  const openModalBtn = document.getElementById('openModalBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slides = document.querySelectorAll('.carousel-track img');
  const contentSlides = document.querySelectorAll('.content-slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let slideInterval = null;
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    contentSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  };
  showSlide(0);
  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  };
  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  };
  const startCarousel = () => {
    stopCarousel();
    slideInterval = setInterval(nextSlide, config.slideInterval);
  };
  const stopCarousel = () => {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  };
  const openModal = () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    startCarousel();
  };
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    stopCarousel();
  };
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startCarousel();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startCarousel();
    });
  }
  indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startCarousel();
    });
  });
  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
  setTimeout(openModal, config.delay);
});