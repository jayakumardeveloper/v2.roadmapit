// Load the header.html
$("#stickyHeader").load("/header.html");
$("#mnav-menu-item").load("/mobile-nav.html");

// Load the footer.html content into the footer section
$(".footer").append('<div id="footer-content"></div>');
$("#footer-content").load("/footer.html");

// Digital Marketing partner slider setup

if (document.querySelector(".partnerSlider")) {
  new Swiper(".partnerSlider", {
    spaceBetween: 30,
    slidesPerView: 3,
    // centeredSlides: "auto",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 30,
      },
    },
  });
}

// Digital Marketing project Slider

if (document.querySelector(".projectSlider")) {
  new Swiper(".projectSlider", {
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: {
      nextEl: ".project-slider-next",
      prevEl: ".project-slider-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

// Digital Marketing testimonials slider
if (document.querySelector(".testimonialsSlider")) {
  new Swiper(".testimonialsSlider", {
    spaceBetween: 0,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".testimonial-slider-next",
      prevEl: ".testimonial-slider-prev",
    },
  });
}

// Mobile App testimonials slider
if (document.querySelector(".h2-testimonialsSlider")) {
  new Swiper(".h2-testimonialsSlider", {
    direction: "vertical",
    spaceBetween: 0,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".testimonial-slider-next",
      prevEl: ".testimonial-slider-prev",
    },
  });
}

// Signup slider
if (document.querySelector(".signupSwiper")) {
  new Swiper(".signupSwiper", {
    effect: 'fade',
    fadeEffect: {
      crossFade: true // Optional: enables crossfade effect
    },
    spaceBetween: 30,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    speed: 800,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// erp-product slider
if (document.querySelector(".swiper-ess")) {
  new Swiper(".swiper-ess", {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    speed: 800,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// SCM product slider
if (document.querySelector(".lap-screen")) {
  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  new Swiper(".lap-screen", {
    spaceBetween: 2,
    speed: 800,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      }
    }
  });
}

// planning & manufacturing slider
if (document.querySelector(".swiper-apple")) {
  new Swiper(".swiper-apple", {
    effect: 'fade',
    fadeEffect: {
      crossFade: true // Optional: enables crossfade effect
    },
    spaceBetween: 30,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    speed: 1000,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".apple-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        var icons = ['fa-line-chart', 'fa-cog', 'fa-bell'];
        var icon = icons[index % icons.length];
        return '<span class="' + className + '"><i class="fa fa-3x ' + icon + '" aria-hidden="true"></i></span>';
      }
    },
  });
}

// faq

document.querySelectorAll('.faq-toggler').forEach(faq => {
  faq.addEventListener('click', () => {
    const allFaqs = document.querySelectorAll('.faq-toggler');

    allFaqs.forEach(otherFaq => {
      if (otherFaq !== faq) {
        otherFaq.classList.remove('active-faq');
        const otherPlus = otherFaq.querySelector('.plus');
        const otherMinus = otherFaq.querySelector('.minuse');
        otherPlus.classList.remove('hidden');
        otherMinus.classList.add('hidden');
        otherFaq.style.height = `${otherFaq.children[0].clientHeight + 10}px`;
      }
    });

    faq.classList.toggle('active-faq');
    const plus = faq.querySelector('.plus');
    const minus = faq.querySelector('.minuse');
    plus.classList.toggle('hidden');
    minus.classList.toggle('hidden');

    // Adjust height
    if (faq.classList.contains('active-faq')) {
      const headerHeight = faq.children[0].clientHeight;
      const contentHeight = faq.children[1].clientHeight;
      faq.style.height = `${headerHeight + contentHeight + 10}px`;
    } else {
      faq.style.height = `${faq.children[0].clientHeight + 10}px`;
    }
  });
});

// Initialize FAQs (first FAQ open by default)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-toggler').forEach((faq, index) => {
    const plus = faq.querySelector('.plus');
    const minus = faq.querySelector('.minuse');

    if (index === 0) {
      faq.classList.add('active-faq');
      plus.classList.add('hidden');
      minus.classList.remove('hidden');
      faq.style.height = `${faq.children[0].clientHeight + faq.children[1].clientHeight + 10}px`;
    } else {
      faq.classList.remove('active-faq');
      plus.classList.remove('hidden');
      minus.classList.add('hidden');
      faq.style.height = `${faq.children[0].clientHeight + 10}px`;
    }
  });
});

// faq home 2
const h2FaqsWrapper = document.querySelectorAll(".h2-faq-wrapper");

h2FaqsWrapper.forEach((element) => {
  const faqs = element.querySelectorAll(".faq-toggler");
  window.addEventListener("load", (event) => {
    faqs.forEach((item, index) => {
      if (index !== 0) {
        item.classList.remove("active-faq");
        item.style.height = item.children[0].clientHeight + "px";
      } else {
        item.classList.add("active-faq");
      }
    });
  });
});

h2FaqsWrapper.forEach((element) => {
  const faqs = element.querySelectorAll(".faq-toggler");
  faqs.forEach((item) => {
    item.addEventListener("click", (e) => {
      for (let i = 0; i < e.target.parentElement.children.length; i++) {
        if (e.target.parentElement.children[i] === e.target) {
          e.target.parentElement.children[i].classList.add("active-faq");
          e.target.parentElement.children[i].style.height =
            e.target.parentElement.children[i].children[0].clientHeight +
            e.target.parentElement.children[i].children[1].clientHeight +
            "px";
        } else {
          e.target.parentElement.children[i].classList.remove("active-faq");
          e.target.parentElement.children[i].style.height =
            e.target.parentElement.children[i].children[0].clientHeight + "px";
        }
      }
    });
  });
});

$(document).ready(function () {
  // Calculate years of experience dynamically
  const startYear = 2004;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

  // Set the count data attribute dynamically
  $("#yrsExpContainer").attr("data-count-fm", yearsOfExperience);

  // Immediately update the text content
  $("#yrsExp").text(yearsOfExperience + "+");

  // Ensure the counter animation starts when in view
  scrollAnimate();
});

// counter
const counter = (item) => {
  let countdown = null;
  const count = Number(item.getAttribute("data-count-fm"));
  const valueType = item.getAttribute("data-type-fm");
  const speed = Number(item.getAttribute("data-speed-fm"));
  let startNumber = 0;
  clearInterval(countdown);
  countdown = setInterval(function () {
    item.innerText = startNumber + valueType;
    if (count > 10000 && startNumber < count - 10000) {
      startNumber += 1000;
    } else if (count > 1000 && startNumber < count - 1000) {
      startNumber += 100;
    } else if (count > 100 && startNumber < count - 100) {
      startNumber += 10;
    } else {
      startNumber++;
    }
    if (startNumber > count) {
      clearInterval(countdown);
    }
  }, speed / count);
};

// scroll control

let running = [];

const scrollAnimate = (event) => {
  const allData = document.querySelectorAll("[data-scroll-fm='scroll']");
  if (allData) {
    allData.forEach((item) => {
      const rect = item.getBoundingClientRect()?.y;
      if (rect - window.innerHeight <= 0 && rect >= 0) {
        if (running.indexOf(item) < 0) {
          const animType = item.getAttribute("data-anim-type");
          switch (animType) {
            case "count-width":
              if (item.classList.value.includes("width-increase")) {
                item.classList.remove("width-increase");
                setTimeout(() => {
                  item.classList.add("width-increase");
                }, 10);
              } else {
                item.classList.add("width-increase");
              }

              break;

            default:
              break;
          }
          if (item.getAttribute("data-count-fm")) {
            counter(item);
          }
          running.push(item);
        }
      } else {
        running = running.filter((value) => value != item);
      }
    });
  }
};

window.addEventListener("load", (event) => {
  scrollAnimate(event);
});

// Function to handle scroll and load events
function handleScroll() {
  scrollAnimate(); // Call your scrollAnimate function

  // Sticky header logic
  const header = document.getElementById("stickyHeader");
  if (!header.classList.contains("bg-white") && window.scrollY > 0) {
    header.classList.add("bg-white", "shadow-card-shadow");
  } else if (
    header.classList.contains("bg-white") && // Adjusted the condition here
    window.scrollY === 0
  ) {
    header.classList.remove("bg-white", "shadow-card-shadow");
  }
}

// Add event listeners for both scroll and load events
window.addEventListener("load", handleScroll);
window.addEventListener("scroll", handleScroll);


// IT Solutions project Slider

if (document.querySelector(".projectSlider-h3")) {
  new Swiper(".projectSlider-h3", {
    spaceBetween: 30,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".project-slider-next",
      prevEl: ".project-slider-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector(".testimonials-h3")) {
  const swiper = new Swiper(".testimonials-h3", {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    speed: 800,
    navigation: {
      nextEl: ".testimonials-slider-next",
      prevEl: ".testimonials-slider-prev",
    },
    loop: true,
  });

  const sliderEl = document.querySelector(".testimonials-h3");

  // Pause autoplay on hover
  sliderEl.addEventListener("mouseenter", () => {
    swiper.autoplay.stop();
  });

  // Resume autoplay on mouse leave
  sliderEl.addEventListener("mouseleave", () => {
    swiper.autoplay.start();
  });
}

// Thumbslider
if (document.querySelector(".project-detail-slider-thumb")) {
  const swiperThumb = new Swiper(".project-detail-slider-thumb", {
    spaceBetween: 30,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper2 = new Swiper(".project-detail-slider", {
    spaceBetween: 10,
    thumbs: {
      swiper: swiperThumb,
    },
  });
}

// modal slider
// image slider zoom
let sliderActive = 0;
const swiper3 = new Swiper(".modal-slider", {
  initialSlide: sliderActive,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
const zoomBtns = document.querySelectorAll(".zoom-slider");

if (zoomBtns) {
  zoomBtns.forEach((btn, index) => {
    btn.addEventListener("click", (index) => {
      document.getElementById("slider-modal").classList.remove("hidden");
      sliderActive = index;
    });
  });
}

if (document.getElementById("modal-close")) {
  document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("slider-modal").classList.add("hidden");
  });
}

if (document.querySelector(".ms-swiper")) {
  new Swiper(".ms-swiper", {
    spaceBetween: 30,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
}

// Home four testimonials slider
if (document.querySelector(".h4-testimonialsSlider")) {
  new Swiper(".h4-testimonialsSlider", {
    spaceBetween: 0,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".testimonial-slider-next",
      prevEl: ".testimonial-slider-prev",
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });
}

// team slider
if (document.querySelector(".h4-teamSlider")) {
  new Swiper(".h4-teamSlider", {
    spaceBetween: 30,
    slidesPerView: 1,
    // centeredSlides: "auto",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },

      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}
// Navigation bar
let lastScrollTop = 0;
// const navbar = document.getElementById("mnav-menu-item");
const navbar = document.getElementById("stickyHeader");

window.addEventListener("scroll", function (e) {
  e.preventDefault();
  // Check if the window width is greater than 1024px
  if (window.innerWidth > 2500) {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.style.transform = "translateY(-200%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  } else {
    // Reset the navbar position if the screen is less than or equal to 1024px
    navbar.style.transform = "translateY(0)";
  }
});
// Header dropdown scripts
$(document).ready(function () {

  // All products load more

  // Hide all items except the first 8
  $('#product-list .RM-productDiv').slice(8).addClass('hidden-list');

  // Show more items when the button is clicked
  $('#load-more').on('click', function () {
    let hiddenItems = $('#product-list .RM-productDiv.hidden-list');

    // Show up to 4 hidden items at a time
    hiddenItems.slice(0, 4).removeClass('hidden-list');

    // Hide the button if there are no more hidden items
    if (hiddenItems.length <= 4) {
      $(this).addClass('hidden-list');
    }
  });

  // All products inner-scroll active tab

  const $tabs = $(".RM-Left_list li");
  const $rightContainer = $(".RM-Right_container");
  const $sections = $(".RM-Right_element");

  function updateActiveTab() {
    const scrollY = $rightContainer.scrollTop();

    $sections.each(function (index) {
      const $section = $(this);
      const sectionTop = $section.position().top - 10;
      const sectionHeight = $section.outerHeight();

      // Check if the current section is in view
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        $tabs.removeClass("RM-Selectlist");
        $tabs.eq(index).addClass("RM-Selectlist");
      }
    });
  }

  const $tabsLink = $tabs.find('a');

  $tabsLink.click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    const targetId = $(this).attr('data-prod');
    const $targetElement = $('#' + targetId);
    const targetContainer = $('.RM-allproductsect');
    const scrollTo = targetContainer.offset().top + 50;
    $('html, body').scrollTop(scrollTo);
    let scrollToInner;

    if ($targetElement.length) {
      scrollToInner = $targetElement.offset().top - $('.RM-Right_container').offset().top + $('.RM-Right_container').scrollTop();
      $('.RM-Right_container').scrollTop(scrollToInner);
    }
  });

  $rightContainer.on("scroll", function () {
    updateActiveTab();
    const scrollTop = $rightContainer.scrollTop();
    $rightContainer.stop().animate({ scrollTop: scrollTop }, 200);
  });

  $(window).on('resize', updateActiveTab);

  // Back to top
  $('.back-to-top').fadeOut('slow');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      if ($(this).scrollTop() === 0) {
        $('.back-to-top').fadeOut('slow');
      }
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 120, 'easeInOutExpo');
    return false;
  });
  // Validation Signup Form
  if (document.querySelector("#signupForm")) {
    $("#signupForm").validate({
      rules: {
        compyname: { required: true },
        username: { required: true, minlength: 3 },
        password: { required: true, minlength: 8 },
        confPassword: { required: true, equalTo: "#password" },
        mailId: { required: true, email: true },
        mobNum: { required: true, minlength: 10, maxlength: 13 },
        selectList: { required: true },
        agreeCheck: { required: true }
      },
      messages: {
        compyname: "Please enter your Company Name.",
        username: {
          required: "Please enter a Username.",
          minlength: "Your username must be at least 3 characters long."
        },
        password: {
          required: "Please provide a Password.",
          minlength: "Your Password must be at least 8 characters long."
        },
        confPassword: {
          required: "Please Confirm your Password.",
          equalTo: "Passwords do not match."
        },
        mailId: {
          required: "Please enter your Email.",
          email: "Please enter a valid Email."
        },
        mobNum: {
          required: "Please enter your mobile number.",
          minlength: "Your mobile number must be at least 10 digits long.",
          maxlength: "Your mobile number cannot exceed 13 digits."
        },
        selectList: "Please select a city.",
        agreeCheck: "You must agree to the terms."
      },
      errorElement: 'em',
      errorPlacement: function (label, element) {
        if (element.parent('.form-floating').length) {
          label.insertAfter(element.parent());
          label.addClass('text-danger');
        } else {
          label.insertAfter(element);
          label.addClass('text-danger');
          // default
        }
      }
      // ,
      // submitHandler: function (form) {
      //   form.submit(); // Submit the form if validation passes
      // }
    });

    function validateUserName(fieldId) {
      var cusName = $("#" + fieldId).val();
      var cusNameTrim = $.trim(cusName);
      var regex = /^[A-Za-z]+(?: [A-Za-z]+)*(?:\.[A-Za-z]+)?$/;

      if (cusNameTrim === "" || /^\s/.test(cusNameTrim)) {
        $("#" + fieldId).removeClass("error");
        $("#" + fieldId).val("");
        $("#" + fieldId).attr("aria-invalid", "true");
        return false;
      } else {
        if (regex.test(cusNameTrim)) {
          $("#" + fieldId).val(cusNameTrim);
          $("#" + fieldId).removeClass("error").addClass("form-control");
          $("#" + fieldId + "-errorLabel").css("display", "none").text("");
          $("#" + fieldId).attr("aria-invalid", "false");
          return true;
        } else {
          $("#" + fieldId).addClass("error");
          $("#" + fieldId + "-errorLabel").css("display", "block").text("Please enter a valid Username");
          $("#" + fieldId).attr("aria-invalid", "true");
          return false;
        }
      }
    }

    $('#username').on('blur', function () {
      validateUserName("username");
    });

    $("#username").on('input', function () {
      $('#username-errorLabel').css('display', 'none').text("");
      $("#username").removeClass("error");
      var regexName = /^[a-zA-Z .]*$/;
      var value = $(this).val();
      if (!regexName.test(value)) {
        $(this).val(value.replace(/[^a-zA-Z .]/g, ''));
      }
    });

    function validateCompanyName(companyName) {
      var compNameTrim = $.trim($("#" + companyName).val());
      var regex = /^[A-Za-z0-9]+(?:[ .&-][A-Za-z0-9]+)*(?:\.)?$/;

      if (compNameTrim === "" || /^\s/.test(compNameTrim)) {
        $("#" + companyName).removeClass("error");
        $("#" + companyName).val("");  // Clear field if only spaces
        $("#" + companyName + "-errorLabel").css("display", "block").text("");
        $("#" + companyName).attr("aria-invalid", "true");
        return false;
      } else {
        if (regex.test(compNameTrim)) {
          $("#" + companyName).val(compNameTrim);
          $("#" + companyName).removeClass("error").addClass("form-control");
          $("#" + companyName + "-errorLabel").css("display", "none").text("");
          $("#" + companyName).attr("aria-invalid", "false");
          return true;
        } else {
          $("#" + companyName).addClass("error");
          $("#" + companyName + "-errorLabel").css("display", "block").text("Please enter a valid Company Name");
          $("#" + companyName).attr("aria-invalid", "true");
          return false;
        }
      }
    }

    $("#compyname").on('blur', function () {
      validateCompanyName(this.id);
    });

    $("#compyname").on('input', function () {
      $('#compyname-errorLabel').css('display', 'none').text("");
      $("#compyname").removeClass("error");

      var regexName = /^[A-Za-z0-9 .&-]*$/;
      var value = $(this).val();
      if (!regexName.test(value)) {
        $(this).val(value.replace(/[^A-Za-z0-9 .&-]/g, ''));
      }
    });

    function validatePassword() {
      var password = $("#password").val().trim();
      var confirmPassword = $("#confPassword").val().trim();

      // Regex for password validation
      var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      // Password field validation
      if (password === "") {
        $("#password-errorLabel").css("display", "block").text("");
        $("#password").addClass("error").attr("aria-invalid", "true");
        return false;
      } else if (!passwordRegex.test(password)) {
        $("#password-errorLabel").css("display", "block").text("Include a number, a letter, and a special character.");
        $("#password").addClass("error").attr("aria-invalid", "true");
        return false;
      } else {
        $("#password-errorLabel").css("display", "none").text("");
        $("#password").removeClass("error").attr("aria-invalid", "false");
      }

      // Confirm Password validation
      if (confirmPassword === "") {
        $("#confPassword-errorLabel").css("display", "block").text("");
        $("#confPassword").addClass("error").attr("aria-invalid", "true");
        return false;
      } else if (confirmPassword !== password) {
        $("#confPassword-errorLabel").css("display", "block").text("Passwords do not match.");
        $("#confPassword").addClass("error").attr("aria-invalid", "true");
        return false;
      } else {
        $("#confPassword-errorLabel").css("display", "none").text("");
        $("#confPassword").removeClass("error").attr("aria-invalid", "false");
      }
      return true;
    }

    $("#password, #confPassword").on("blur", function () {
      validatePassword();
    });

    $("#password, #confPassword").on("input", function () {
      $(this).removeClass("error").attr("aria-invalid", "false");
      $("#" + this.id + "-errorLabel").css("display", "none").text("");
    });

    function validateMobileNum(fieldId) {
      var mobNo = $("#" + fieldId).val().trim();
      var length = mobNo.length;
      // var regex = /^(?:\+?91|00|0)?[-. ]?[6789]\d{9}$/;
      var regex = /^(?:\+91|91|0)?[6789]\d{9}$/;

      if (length !== 0) {
        if (regex.test(mobNo)) {
          $("#" + fieldId + "-errorLabel").css("display", "none").text("");
          $("#" + fieldId).val(mobNo);
          const ourMobNo = mobNo.slice(-10);

          // Restrict specific numbers
          if (ourMobNo === "9442590611" || ourMobNo === "9443483240") {
            $("#" + fieldId + "-errorLabel").css("display", "block").text("Please Enter your Mobile Number");
            $("#" + fieldId).val("");
            $("#" + fieldId).attr("aria-invalid", "true");
            return false;
          } else {
            $("#" + fieldId).attr("aria-invalid", "false");
            return true;
          }
        } else {
          $("#" + fieldId + "-errorLabel").css("display", "none").text("");
          // $("#" + fieldId).val("");
          $("#" + fieldId).attr("aria-invalid", "false");
          return true;
        }
      } else {
        $("#" + fieldId + "-errorLabel").css("display", "none").text("");
        return true;
      }
    }

    // Attach event listeners dynamically
    $("#mobNum").on("blur", function () {
      validateMobileNum(this.id);
    });

    $("#mobNum").on("input", function () {
      $("#" + this.id + "-errorLabel").css("display", "none").text("");
      this.value = this.value.replace(/^\s+/, "");
    });

    function validateEmail(fieldId) {
      var email = $("#" + fieldId).val().trim();
      var regex = /^(?!.*(\...*){4,})[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (email !== "") {
        if (email.toLowerCase() === "mktg@roadmapit.com") {
          $("#" + fieldId).addClass("error");
          $("#" + fieldId + "-errorLabel").text("Please Enter your Email").css("display", "block");
          $("#" + fieldId).attr("aria-invalid", "true");
          return false;
        }
        if (regex.test(email)) {
          $("#" + fieldId).removeClass("error").addClass("form-control");
          $("#" + fieldId + "-errorLabel").text("").css("display", "none");
          $("#" + fieldId).attr("aria-invalid", "false");
          return true;
        } else {
          $("#" + fieldId).addClass("error");
          $("#" + fieldId + "-errorLabel").text("").css("display", "none");
          $("#" + fieldId).attr("aria-invalid", "true");
          return false;
        }
      } else {
        $("#" + fieldId).removeClass("error").addClass("form-control");
        $("#" + fieldId + "-errorLabel").text("").css("display", "none");
        return true;
      }
    }

    // Attach event listeners dynamically for multiple fields
    $("#mailId").on("blur", function () {
      validateEmail(this.id);
    });

    $("#mailId").on("input", function () {
      $("#" + this.id + "-errorLabel").css("display", "none").text("");
      var value = $(this).val().replace(/\s+/g, "");
      $(this).val(value.toLowerCase());
    });

    $(".RM-form-submit").click(function () {
      $("#signupForm").valid();
    });

    $(".signOtpBtn").click(function (e) {
      e.preventDefault();

      var requiredFields = ["#compyname", "#username", "#mailId", "#password", "#confPassword", "#mobNum"];
      var isValid = true;
      var firstInvalidField = null;

      requiredFields.forEach(function (field) {
        if (!$(field).valid()) {
          isValid = false;
          if (!firstInvalidField) {
            firstInvalidField = field;
          }
        }
      });

      if (isValid) {
        $("#signOtp").slideDown();
      } else if (firstInvalidField) {
        $(firstInvalidField).focus();
      }
    });

    // Initially hide OTP field
    $("#signOtp").hide();
  }

  //<!-- pop up -->
  $(".mytooltip").hover(
    function (e) {
      // e.preventDefault();
      e.stopPropagation();
      $(this).find('.tooltip-content').show();
      $(this).find('.tooltip-content').hover(
        function (e) {
          // e.preventDefault();
          e.stopPropagation();
          $('.tooltip-content').stop(true);
        },
        function (e) {
          // e.preventDefault();
          e.stopPropagation();
          $('.tooltip-content').hide();
          $('.tooltip-content').stop();
        }
      );
      // $(this).find('.tooltip-content').delay(4000).fadeOut();
    },
    function (e) {
      // e.preventDefault();
      e.stopPropagation();
      $('.tooltip-content').stop();
      $('.tooltip-content').hide();
    }
  );
  $('.spl1').click(function () {
    $('.tooltip-content').css("display", "none");
  });
  // owl-carousel
  var owl = $('.rtl_slide');
  if (owl) {
    owl.owlCarousel({
      rtl: false,
      items: 5,
      margin: 10,
      loop: true,
      autoplay: true,
      slideTransition: 'linear',
      autoplayTimeout: 2500,
      autoplaySpeed: 2500,
      autoplayHoverPause: false,
      dots: false,
      responsive: {
        0: {
          items: 2
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    }).trigger("play.owl.autoplay");
  }

  if ($('.inventory-owl')) {
    var owl = $(".inventory-owl");

    owl.owlCarousel({
      rtl: false,
      items: 1,
      margin: 0,
      loop: true,
      autoplay: true,
      autoplayTimeout: 7000,
      autoplaySpeed: 3000,
      autoplayHoverPause: false,
      dots: true,
      nav: false,
      slideTransition: 'linear',
      animateOut: 'animate__zoomOut animate__faster animate__animated',
      animateIn: 'animate__fadeInDown animate__faster animate__animated',
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      },
      vertical: true,
      verticalSwiping: true,
      slideBy: 1,
      mouseDrag: true,
      touchDrag: true
    });

    // Trigger autoplay when the page loads
    owl.trigger('play.owl.autoplay');
  }
  // search engin blog
  // Fetching the JSON data from the external file
  $.getJSON('/items.json', function (data) {
    const items = data;  // Use the fetched data

    // Now you can call the searchFunction() or use `items` for displaying
    // Example: Call search function once data is loaded
    $('#searchInput').on('input', function () {
      searchFunction(items);
    });

    // Adding the "Enter" key press functionality to trigger the search
    $('#searchInput').on('keypress', function (event) {
      if (event.key === 'Enter') {
        searchFunction(items);  // Trigger search when Enter key is pressed
      }
    });

    // Remove "No results found" message when clicking outside input
    $(document).on('click', function (e) {
      var searchContainer = $('#searchContainer');
      var resultsContainer = $('#searchResults');
      if (!searchContainer.is(e.target) && searchContainer.has(e.target).length === 0) {
        clearResults();  // Clear the results when click is outside input and results
        resultsContainer.hide();
      }
    });
  });

  // Function to trigger search when typing in the search box
  function searchFunction(items) {
    var input = $('#searchInput');
    var filter = input.val().toUpperCase();
    var resultCountDiv = $('#resultCount');
    var resultsContainer = $('#searchResults');

    // Clear previous results
    resultsContainer.empty();

    var count = 0; // Variable to count the results

    // Loop through the items and check for matching items
    items.forEach(function (item) {
      if (item.title.toUpperCase().indexOf(filter) > -1 && filter !== "") {
        var itemElement = $('<div>').addClass('row item');

        // Create the image, title, and description for the matching item
        var imageElement = $('<img>').addClass('itemImg img-fluid col-4').attr('src', item.image);
        itemElement.append(imageElement);

        var textContainer = $('<div>').addClass('itemContent col-8');

        var titleElement = $('<h1>');
        textContainer.append(titleElement);

        // var hyperLink = $('<a>').addClass('text-dark').attr('href', item.link).text(item.title);
        var hyperLink = $('<a>').attr('href', item.link).text(item.title);
        titleElement.append(hyperLink);

        var descriptionElement = $('<p>').text(item.description);
        textContainer.append(descriptionElement);

        // Append the text container to the item element
        itemElement.append(textContainer);

        // Append the item to the results container
        resultsContainer.append(itemElement);
        count++;
      }
    });

    // Display the result count and toggle visibility of the result dropdown
    if (count === 0) {
      resultCountDiv.text("No results found.");
      resultsContainer.hide(); // Hide dropdown when no results
    } else {
      resultCountDiv.text(count + " result(s) found.");
      resultsContainer.show(); // Show dropdown when results exist
    }
  }

  // Function to clear results when typing in the input field
  function clearResults() {
    var resultsContainer = $('#searchResults');
    var resultCountDiv = $('#resultCount');

    // Clear previous results when typing in the search box
    resultsContainer.empty();
    resultCountDiv.text(''); // Hide result count until search button is clicked
  }

  // blog navigation
  const itemsPerPage = 4;
  let currentPage = 1;
  const $items = $('.blog-row .blog-col');
  const totalItems = $items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to display items based on the selected page
  function displayItems(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Hide all items and show only the relevant ones
    $items.hide().slice(start, end).show();

    // Update pagination buttons
    updatePagination();
  }

  // Function to create numbered pagination
  function updatePagination() {
    const $pagination = $('#page-numbers');
    $pagination.empty(); // Clear previous numbers

    for (let i = 1; i <= totalPages; i++) {
      let pageBtn = $('<button>')
        .addClass('pagination-number')
        .text(i)
        .attr('data-page', i);

      // Highlight current page
      if (i === currentPage) {
        pageBtn.addClass('active');
      }

      // Handle page click
      pageBtn.click(function () {
        currentPage = parseInt($(this).attr('data-page'));
        displayItems(currentPage);
      });

      $pagination.append(pageBtn);
    }

    // Enable/Disable Prev & Next buttons instead of hiding
    $('#prev').prop('disabled', currentPage === 1);
    $('#next').prop('disabled', currentPage === totalPages);
  }

  // Handle Prev & Next Clicks
  $('#prev').click(function () {
    if (currentPage > 1) {
      currentPage--;
      displayItems(currentPage);
    }
  });

  $('#next').click(function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayItems(currentPage);
    }
  });

  // Initialize Pagination
  displayItems(currentPage);


  // // social media
  var currentPageUrl = encodeURIComponent(window.location.href);

  // Social media share URLs
  var twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentPageUrl}`;
  var linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentPageUrl}`;

  // Create share buttons
  var shareContainer = $('#socialShareContainer');
  var socialButtons = [
    { name: 'Twitter', url: twitterShareUrl, class: 'btn-twitter', icon: 'bi-twitter' },
    { name: 'LinkedIn', url: linkedinShareUrl, class: 'btn-linkedin', icon: 'bi-linkedin' }
  ];

  socialButtons.forEach(function (button) {
    var buttonElement = $('<a>')
      .addClass(`btn ${button.class} me-2 d-flex align-items-center`)
      .attr('href', button.url)
      .attr('target', '_blank')
      .html(`<i class="bi ${button.icon} me-2"></i> Share on ${button.name}`);
    shareContainer.append(buttonElement);
  });

  // contact validation
  // jQuery validation
  $("#contactForm").submit(function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;
    // Clear previous errors
    $('.error').remove();

    // Name Validation using regex (allows alphabets and spaces only)
    const nameRegex = /^[A-Za-z\s]+$/;
    if ($("#name").val().trim() === "" || !nameRegex.test($("#name").val().trim())) {
      $("#name").after('<span class="error text-danger">Please enter a valid Name (alphabets and spaces only).</span>');
      isValid = false;
    }

    // Email Validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if ($("#email").val().trim() === "" || !emailRegex.test($("#email").val().trim())) {
      $("#email").after('<span class="error text-danger">Please enter a valid Email.</span>');
      isValid = false;
    }

    // Phone Validation using regex (only 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if ($("#phone").val().trim() === "" || !phoneRegex.test($("#phone").val().trim())) {
      $("#phone").after('<span class="error text-danger">Phone Number must be 10 digits.</span>');
      isValid = false;
    }

    // Product Selection Validation (check if it’s not the default option)
    if ($("#productList").val() === "" || $("#productList").val() === "Subject") {
      $("#productList").after('<span class="error text-danger">Please select a Products.</span>');
      isValid = false;
    }

    // Message Validation (non-empty)
    if ($("#message").val().trim() === "") {
      $("#message").after('<span class="error text-danger">Message is required.</span>');
      isValid = false;
    }

    // Show SweetAlert based on validation result
    if (isValid) {
      // Success Alert using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully!',
        text: 'We have received your message and will get back to you soon.',
        confirmButtonText: 'Done!'
      }).then(() => {
        // Optionally reset the form if needed
        $("#contactForm")[0].reset();
      });
    } else {
      // Error Alert using SweetAlert
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Please fix the errors and try again.',
      //   confirmButtonText: 'OK'
      // });
    }
  });

  // // signup
  // $("#signOtp").hide();
  // function signupOptShow() {
  //   $(".signOtpBtn").on('click', function () {
  //     $("#signOtp").show();
  //   });
  // }
  // signupOptShow();

  // trail page
  let trailCardData = [
    {
      imgSrc: "/assets/img/all-products/erp-icon.svg",
      imgAlt: "Enterprise Resource Planning",
      title: "Enterprise Resource Planning",
      link: "/signup/erp-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/erp-all-icon.svg",
      imgAlt: "University/ College/ School ERP",
      title: "University/ College/ School ERP",
      link: "/signup/eduErp-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/core-hr-icon.svg",
      imgAlt: "CORE HR(Payroll+ESS)",
      title: "CORE HR(Payroll+ESS)",
      link: "/signup/coreHr-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/crm-icon.svg",
      imgAlt: "Customer Relationship Management",
      title: "Customer Relationship Management",
      link: "/signup/crm-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/project-icon.svg",
      imgAlt: "Project Management",
      title: "Project Management",
      link: "/signup/project-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/fixed-asset-icon.svg",
      imgAlt: "Fixed Asset",
      title: "Fixed Asset",
      link: "/signup/fixedAsset-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/pos-icon.svg",
      imgAlt: "POS/Billing",
      title: "POS/Billing",
      link: "/signup/posBilling-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/restaurant-icon.svg",
      imgAlt: "Restaurant Management",
      title: "Restaurant Management",
      link: "/signup/restaurant-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/hotel-icon.svg",
      imgAlt: "Hotel Management",
      title: "Hotel Management",
      link: "/signup/hotel-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/Visitors-icon.svg",
      imgAlt: "Visitor Management",
      title: "Visitor Management",
      link: "/signup/visitors-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/event-icon.png",
      imgAlt: "Event Management",
      title: "Event Management",
      link: "/signup/event-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/facility-icon.svg",
      imgAlt: "Facility Management",
      title: "Facility Management",
      link: "/signup/facility-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/clinic-icon.svg",
      imgAlt: "Clinic Management",
      title: "Clinic Management",
      link: "/signup/clinic-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/warranty-icon.svg",
      imgAlt: "Warranty Management",
      title: "Warranty Management",
      link: "/signup/warranty-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/ticket-icon.png",
      imgAlt: "Tickets Management",
      title: "Tickets Management",
      link: "/signup/ticket-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/expenses-icon.svg",
      imgAlt: "Expense Management",
      title: "Expense Management",
      link: "/signup/expense-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/bookofKnowledge-icon.svg",
      imgAlt: "Book of Knowledge",
      title: "Book of Knowledge",
      link: "/signup/book-knowledge-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/learning-icon.svg",
      imgAlt: "Learning Management",
      title: "Learning Management",
      link: "/signup/learning-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/warehouse-icon.svg",
      imgAlt: "Warehouse Management",
      title: "Warehouse Management",
      link: "/signup/warehouse-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/distributor-icon.svg",
      imgAlt: "Distributor Management",
      title: "Distributor Management",
      link: "/signup/distributor-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/workshop-icon.svg",
      imgAlt: "Workshop Management",
      title: "Workshop Management",
      link: "/signup/workshop-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/plant-icon.svg",
      imgAlt: "Plant Maintenance",
      title: "Plant Maintenance",
      link: "/signup/plantMainten-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/supplier-icon.svg",
      imgAlt: "Supplier Portal",
      title: "Supplier Portal",
      link: "/signup/supplier-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/subContract-icon.svg",
      imgAlt: "Subcontract Portal",
      title: "Subcontract Portal",
      link: "/signup/subcontract-signup.html"
    },
    {
      imgSrc: "/assets/img/all-products/travel-icon.svg",
      imgAlt: "Travel Management",
      title: "Travel Management",
      link: "/signup/travel-signup.html"
    },
  ];

  // Select the container where the cards will be added
  let container = $(".trailCardsList");

  // Loop through the data and append the cards dynamically
  trailCardData.forEach(function (card) {
    let cardHtml = `
        <div class="col-11 mx-auto mx-md-0 col-md-3 pt-10 pb-10 pr-10 pl-10 wow animate__animated animate__fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
            <a href="${card.link}">
                <div class="trailCard">
                    <div class="trailLogo">
                        <img src="${card.imgSrc}" alt="${card.imgAlt}" class="img-fluid">
                    </div>
                    <div class="trailTitle">${card.title}</div>
                    <div class="trailBtn"><span class="pe-1 fs-6">Try Now</span><i class="bi bi-arrow-right-short"></i></div>
                </div>
            </a>
        </div>
    `;
    container.append(cardHtml);
  });
  // industries page
  $('.indus_link').on('shown.bs.tab', function (event) {
    event.target.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  });
  // meta tag dynamic domain
  const currentUrl = window.location.origin;
  const ogUrlMetaTag = document.querySelector('meta[property="og:url"]');
  const ogUrlImgTag = document.querySelector('meta[property="og:image"]');
  const twitterUrlImgTag = document.querySelector('meta[name="twitter:image"]');
  const twitterUrlTag = document.querySelector('meta[name="twitter:url"]');
  if (ogUrlMetaTag) {
    ogUrlMetaTag.setAttribute('content', currentUrl);
    ogUrlImgTag.setAttribute('content', currentUrl + "/assets/img/icon/roadmap_logo_favicon.png");
    twitterUrlTag.setAttribute('content', currentUrl);
    twitterUrlImgTag.setAttribute('content', currentUrl + "/assets/img/icon/roadmap_logo_favicon.png");
  }
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', currentUrl);
  }
  // Initialize jQuery Validation Plugin
  $('#emailForm').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      consent: {
        required: true // Requires the consent checkbox to be checked
      }
    },
    messages: {
      email: {
        required: "Please enter an email address.",
        email: "Please enter a valid email address."
      },
      consent: {
        required: "Please agree to receive emails."
      }
    },
    errorPlacement: function (error, element) {
      // Place error message in the respective error container
      error.addClass('text-danger fs-6');
      if (element.attr('name') === 'email') {
        error.appendTo(element.closest('.px-2').find('.error-container-email'));
      } else if (element.attr('name') === 'consent') {
        error.appendTo(element.closest('.consent').find('.error-container-consent'));
      }
    },
    submitHandler: function (form, event) {
      // Prevent default form submission
      event.preventDefault();

      // Show loading state
      var $submitBtn = $(form).find('.submit-btn');
      $submitBtn.addClass('loading').prop('disabled', true);

      // Simulate server-side processing (replace with actual AJAX if needed)
      setTimeout(function () {
        // Hide loading state
        $submitBtn.removeClass('loading').prop('disabled', false);

        // Reset form inputs (email and consent)
        $(form).find('input[name="email"]').val('');
        $(form).find('input[name="consent"]').prop('checked', false);

        // Close the first modal
        $('#erpModal').modal('hide');

        // Show the second modal after a slight delay
        setTimeout(function () {
          $('#erpModalThanks').modal('show');
        }, 300);
      }, 1000); // Simulated 1-second delay
    }
  });

  // Handle form submission
  $('#erpModal .submit-btn').on('click', function (e) {
    e.preventDefault();
    $('#emailForm').submit();
  });

  // Prevent direct toggle of the second modal
  $('[data-bs-target="#erpModalThanks"]').on('click', function (e) {
    e.preventDefault();
  });

  // Clear error messages, reset form, and clear inputs when modal is closed
  $('#erpModal').on('hidden.bs.modal', function () {
    $('#emailForm').validate().resetForm();
    $('.error-container-email, .error-container-consent').empty();
    $('.submit-btn').removeClass('loading').prop('disabled', false);
    $('#emailForm input[name="email"]').val('');
    $('#emailForm input[name="consent"]').prop('checked', false);
  });
  // Lead Magnet CTA
  $("#CTAForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        pattern: /^[0-9+\-\(\) ]{7,15}$/
      },
      terms: {
        required: true
      }
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Name must be at least 2 characters long"
      },
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email address"
      },
      phone: {
        required: "Please enter your phone number",
        pattern: "Please enter a valid phone number (7-15 digits, may include +, -, (), or spaces)"
      },
      terms: {
        required: "You must agree to the terms and conditions"
      }
    },
    errorPlacement: function (error, element) {
      error.addClass('text-danger');
      if (element.attr("name") === "terms") {
        error.appendTo(element.closest(".form-check"));
      } else {
        error.appendTo(element.parent());
      }
    },
    submitHandler: function (form) {
      alert("Form submitted successfully!");
    }
  });
  if ($('.Indus-buss-swiper')) {
    var swiper = new Swiper(".Indus-buss-swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        }
      },
    });
  }
  // modal cta mail popup
  $('#loadModalBtn').on('click', function () {
    // Append modal only if it doesn't already exist
    if ($('#erpModal').length === 0) {
      $('body').append(`
                <!-- Modal 1 -->
                <div class="modal fade" id="erpModal" tabindex="-1" aria-labelledby="erpModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="erpModal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body pt-0 px-0">
                                <img src="../assets/img/all-products/erp-file-download.png" alt="erp file download">
                                <div class="px-2 text-center">
                                    <p class="fs-6 fw-semibold mb-2">10 Questions Every CEO Must Ask Before Choosing ERP.</p>
                                    <p class="fs-6 mb-0">Subscribe and Download the File.</p>
                                    <form id="emailForm" method="POST" action="#" class="mt-3">
                                        <div class="consent mt-2 text-left w-[300px] mx-auto">
                                            <div class="form-check mb-2">
                                                <input class="form-check-input" type="checkbox" name="consent" id="consent">
                                                <label class="form-check-label text-sb-orange" for="consent">I agree to receive emails from Roadmap ERP</label>
                                            </div>
                                            <div class="error-container-consent mt-1"></div>
                                        </div>
                                        <div class="w-[300px] flex items-center text-lg border rounded-[10px] border-white/10 ps-4 pe-5 mx-auto">
                                            <input type="text" name="email" placeholder="users@gmail.com" class="w-full bg-transparent focus:outline-none h-[56px]">
                                            <button type="submit" class="submit-btn">
                                                <i class="bi bi-send-fill fs-5 text-sb-orange"></i>
                                                <span class="spinner-border text-sb-orange spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <div class="error-container-email mt-2"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

      // Show the modal using Bootstrap JS
      const modal = new bootstrap.Modal(document.getElementById('erpModal'));
      modal.show();
    } else {
      // If already appended, just show the modal
      const modal = new bootstrap.Modal(document.getElementById('erpModal'));
      modal.show();
    }
  });

});