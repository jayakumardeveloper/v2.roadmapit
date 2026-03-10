$('#mnav-menu-item').load('/mobile-nav.html');
$(document).ready(function () {
  try {
    const currentYear = new Date().getFullYear();
    const $yearElement = $('#footerYear');
    if ($yearElement.length) {
      $yearElement.text(currentYear);
    } else {
      console.warn("Element with ID 'footerYear' not found!");
    }
  } catch (error) {
    console.error('Error updating footer year:', error);
  }
  function isHomePage() {
    const path = window.location.pathname;
    return path === '/' || path.endsWith('index.html');
  }
  $(document).ready(function () {
    if (!isHomePage()) {
      $('#stickyHeader').load('/header.html');
      if ($('#footer-content').length === 0) {
        $('.footer').append('<div id="footer-content"></div>');
      }
      $('#footer-content').load('/footer.html', function () {
        try {
          const currentYear = new Date().getFullYear();
          const $yearElement = $('#footerYear');
          if ($yearElement.length) {
            $yearElement.text(currentYear);
          } else {
            console.warn("Element with ID 'footerYear' not found!");
          }
        } catch (error) {
          console.error('Error updating footer year:', error);
        }
      });
      if (typeof hoverintent === 'function') {
        let tooltipSpan = null;
        const shiftX = 8;
        const shiftY = 10;
        function updatePosition(event) {
          if (!tooltipSpan) return;
          let left = event.clientX + shiftX;
          if (left + tooltipSpan.offsetWidth > window.innerWidth) {
            left = Math.max(0, event.clientX - shiftX - tooltipSpan.offsetWidth);
          }
          let top = event.clientY + shiftY;
          if (top + tooltipSpan.offsetHeight > window.innerHeight) {
            top = Math.max(0, event.clientY - shiftY - tooltipSpan.offsetHeight);
          }
          tooltipSpan.style.left = left + 'px';
          tooltipSpan.style.top = top + 'px';
        }
        function onOver(event) {
          const target = event.target.closest('[data-tooltip]');
          if (!target) return;
          if (target.classList.contains('button') || target.closest('.toolbar')) return;
          tooltipSpan = document.createElement('span');
          tooltipSpan.className = 'link__type';
          tooltipSpan.textContent = target.getAttribute('data-tooltip') || target.getAttribute('href') || '';
          Object.assign(tooltipSpan.style, { position: 'fixed', pointerEvents: 'none', zIndex: '1000' });
          document.body.appendChild(tooltipSpan);
          updatePosition(event);
          document.addEventListener('mousemove', updatePosition);
        }
        function onOut() {
          if (tooltipSpan) {
            tooltipSpan.remove();
            tooltipSpan = null;
            document.removeEventListener('mousemove', updatePosition);
          }
        }
        document.querySelectorAll('[data-tooltip]').forEach((el) => {
          hoverintent(el, onOver, onOut);
        });
      } else {
        console.warn('hoverIntent not loaded — tooltips disabled.');
      }
    }
  });
  if (isHomePage()) {
    function productOrderPriority() {
      const priorityOrder = ['ERP', 'Trade Pluz', 'Core HR', 'CRM', 'Field Service', 'Fixed Asset', 'Plant Maintenance', 'Project Management', 'Travel & Expenses Management', 'POS Retail', 'POS Restaurant', 'Ticket Management', 'DayBook', 'Edsyz'];
      const $parentElement = $('.products .all_prod_list .RM_prod_categories ul');
      if ($parentElement.length) {
        const $items = $parentElement.find('a');
        const sortedItems = $items.sort((a, b) => {
          const textA = $(a).text().trim().toLowerCase();
          const textB = $(b).text().trim().toLowerCase();
          const indexA = priorityOrder.findIndex((item) => item.toLowerCase() === textA);
          const indexB = priorityOrder.findIndex((item) => item.toLowerCase() === textB);
          return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        });
        $parentElement.empty();
        sortedItems.each(function (index) {
          const $item = $(this);
          $item.find('li').attr('data-target', index + 7);
          $parentElement.append($item);
        });
        $parentElement.find('li').removeClass('active');
        $(sortedItems[0]).closest('li').addClass('active');
      }
    }
    $('#mnav-menu-item').addClass('mnav-top-offset');

    const groupItem = 'groupItem';
    const beforeAction = 'beforeAction';
    const header = $('#stickyHeader');
    const root = $('#root');
    const overlay = $('.headerOverlay');

    // Menu Click Events
    $('.nav-link.prod_menu').click(() => toggleDropdown('.MainMenu', '.nav-link.prod_menu'));
    $('.nav-link.comm_menu').click(() => toggleDropdown('.Comm_MainMenu', '.nav-link.comm_menu'));
    $('.nav-link.price_menu').click(() => toggleDropdown('.price_MainMenu', '.nav-link.price_menu'));

    function toggleDropdown(menuSelector, linkSelector) {
      const $menu = $(menuSelector);
      const $link = $(linkSelector);
      const isCurrentlyOpen = $menu.hasClass('menu-active');

      // 1. Reset all menus and links
      $('.MainMenu, .Comm_MainMenu, .price_MainMenu').removeClass('menu-active');
      $('.nav-link').removeClass(groupItem).removeClass(beforeAction);

      if (!isCurrentlyOpen) {
        // 2. Open the selected menu
        $menu.addClass('menu-active');
        $link.addClass(groupItem).addClass(beforeAction);
        root.addClass('overflow-hidden');
        overlay.addClass('d-block');
        header.addClass('header-scrolled');

        // Reset tab category state
        const filter = $menu.find('.tab-category li').data('filter');
        setActiveRMCategory(filter);
        $('.RM_prod_categories li').removeClass('active').first().addClass('active');
      } else {
        // 3. Close if it was already open
        closeAllMenus();
        $menu.addClass('d-none');
      }

      // Close Event Listeners
      $(`${menuSelector} .close, .headerOverlay`).off('click').on('click', closeAllMenus);
    }

    function closeAllMenus() {
      $('.MainMenu, .Comm_MainMenu, .price_MainMenu').removeClass('menu-active');
      $('.nav-link').removeClass(groupItem).removeClass(beforeAction);
      root.removeClass('overflow-hidden');
      overlay.removeClass('d-block');

      // Only remove header styling if at the top of the page
      if ($(window).scrollTop() === 0) {
        header.removeClass('header-scrolled');
      }
    }
    function initializeTabs(triggerSelector, containerSelector) {
      $(triggerSelector).click(function () {
        const $menu = $(containerSelector);
        $menu.show();
        const $tabs = $menu.find('.tab-category li');
        const $contents = $menu.find('.all_prod_tab');
        $contents.not('.products').hide();
        $tabs.removeClass('active').first().addClass('active');
        $contents
          .hide()
          .filter(`.${$tabs.first().data('filter')}`)
          .show();
        $tabs.off('click').on('click', function () {
          const filter = $(this).data('filter');
          $tabs.removeClass('active');
          $(this).addClass('active');
          $contents.hide().filter(`.${filter}`).show();
          setActiveRMCategory(filter);
        });
      });
    }
    function setActiveRMCategory(category) {
      $('.RM_prod_categories li').removeClass('active');
      $('.' + category + ' .RM_prod_categories li')
        .first()
        .addClass('active');
      $('.' + category + ' .RM_prod_details')
        .first()
        .show();
      $('.' + category + ' .RM_prod_details')
        .not('#detail-1, #detail-7, #detail-26, #detail-28, #detail-34')
        .hide();
    }
    productOrderPriority();
    initializeTabs('.prod_menu', '.MainMenu');
    initializeTabs('.comm_menu', '.Comm_MainMenu');
    initializeTabs('.price_menu', '.price_MainMenu');
    $('.RM_prod_categories li').hover(
      function () {
        $('.RM_prod_categories li').removeClass('active');
        $(this).addClass('active');
      },
      function () {}
    );
    $('.RM_prod_details').not('#detail-1, #detail-7, #detail-26, #detail-28, #detail-34').hide();
    $('.RM_prod_categories li').hover(
      function () {
        var target = $(this).data('target');
        $('.RM_prod_details').hide();
        $('#detail-' + target).show();
      },
      function () {}
    );
    const cardData = [
      { icon: 'bi-boxes', title: 'Enterprise Resource Planning', description: 'An integrated suite of apps for real-time management.', link: '/pricing/erp-price.html' },
      { icon: 'bi-building', title: 'University/ College/ School ERP', description: 'Manage education institution’s administrative tasks.', link: '/pricing/university-college-school-erp-price.html' },
      { icon: 'bi-person-badge', title: 'CORE Payroll', description: 'It enhances the employee experience and reduces HR’s administrative workload.', link: '/pricing/core-hr-payroll-ess-price.html' },
      { icon: 'bi-gear-fill', title: 'Customer Relationship Management', description: 'Manage customer relationships efficiently.', link: '/pricing/crm-price.html' },
      { icon: 'bi-clipboard-check', title: 'Project Management', description: 'The practice of planning, organizing, and overseeing tasks to achieve goals within a set timeframe and budget.', link: '/pricing/project-management-price.html' },
      { icon: 'bi-house-door', title: 'Fixed Asset', description: 'Asset tracking, depreciation, maintenance, lifecycle management, and reporting.', link: '/pricing/fixed-asset-price.html' },
      { icon: 'bi-receipt', title: 'POS/Billing', description: 'The practice of planning, organizing, and overseeing tasks to achieve goals within a set timeframe and budget.', link: '/pricing/pos-billing-price.html' },
      { icon: 'bi-shop', title: 'Restaurant Management', description: 'Streamlines order taking, payment processing, menu management, and inventory tracking.', link: '/pricing/restaurant-pos-price.html' },
      { icon: 'bi-buildings', title: 'Hotel Management', description: 'Streamlines hotel operations, improves customer service, and enhances guest experience.', link: '/pricing/hotel-management-price.html' },
      { icon: 'bi-person-lines-fill', title: 'Visitor Management', description: 'Tools to monitor, manage, and enhance visitor experience while ensuring security and compliance.', link: '/pricing/visitors-management-price.html' },
      { icon: 'bi-calendar-event', title: 'Event Management', description: 'Tools to plan, organize, manage, and analyze events efficiently.', link: '/pricing/event-management-price.html' },
      { icon: 'bi-tools', title: 'Facility Management', description: 'Tools to plan, organize, manage, and analyze events efficiently.', link: '/pricing/facility-management-price.html' },
      { icon: 'bi-hospital', title: 'Clinic Management', description: 'Aims to streamline operations, enhance patient care, and ensure compliance.', link: '/pricing/clinic-management-price.html' },
      { icon: 'bi-gift', title: 'Warranty Management', description: 'Manage warranty processes, ensuring efficient tracking, compliance, and optimization.', link: '/pricing/warranty-management-price.html' },
      { icon: 'bi-ticket-perforated', title: 'Tickets Management', description: 'Tools to streamline task organization, improve collaboration, and enhance productivity.', link: '/pricing/ticket-management-price.html' },
      { icon: 'bi-credit-card', title: 'Expense Management', description: 'Software to track, manage, and optimize business expenses like travel, purchases, and budgets.', link: '/pricing/expenses-management-price.html' },
      { icon: 'bi-book', title: 'Book of Knowledge', description: 'A centralized repository of information, best practices, and policies.', link: '/pricing/book-of-knowledge-price.html' },
      { icon: 'bi-book-half', title: 'Learning Management', description: 'Software platform for delivering, tracking, and managing educational content and training.', link: '/pricing/learning-management-price.html' },
      { icon: 'bi-archive', title: 'Warehouse Management', description: 'A software solution that manages warehouse operations and inventory processes.', link: '/pricing/warehouse-management-price.html' },
      { icon: 'bi-truck', title: 'Distributor Management', description: 'A software solution that manages warehouse operations and inventory processes.', link: '/pricing/distributor-management-price.html' },
      { icon: 'bi-car-front', title: 'Workshop Management', description: 'A system designed to manage car repair and service operations.', link: '/pricing/workshop-management-price.html' },
      { icon: 'bi-wrench-adjustable-circle', title: 'Plant Maintenance', description: 'Software to maintain and manage equipment, machinery, and production systems in a plant.', link: '/pricing/plant-maintenance-price.html' },
      { icon: 'bi-person-circle', title: 'Supplier Portal', description: 'A web platform for suppliers to access data, submit requests, track orders, and manage agreements.', link: '/pricing/supplier-portal-price.html' },
      { icon: 'bi-person-workspace', title: 'Subcontract Portal', description: 'A platform that facilitates collaboration between a company and its subcontractors.', link: '/pricing/subcontract-portal-price.html' },
      { icon: 'bi-airplane-engines', title: 'Travel Management', description: 'Software to streamline business travel management, from booking to expense tracking.', link: '/pricing/travel-management-price.html' },
    ];
    function createCard({ icon, title, description, link }) {
      const card = $('<div>', { class: 'g-col-4 p-2 PA_Card animate__animated animate__faster animate__fadeInUp' });
      const row = $('<div>', { class: 'row gap-2 mx-auto w-100' });
      const iconContainer = $('<div>', { class: 'col-3 pt-10' }).append($('<i>', { class: `bi ${icon} display-4 text-sb-orange` }));
      const textContainer = $('<div>', { class: 'col-8 p-2' }).append($('<h1>', { class: 'fs-5 fw-bold mb-10', text: title }), $('<p>', { class: 'mb-0', text: description }));
      const linkElement = $('<a>', { href: link, class: 'd-block text-dark' }).append(row.append(iconContainer, textContainer));
      card.append(linkElement);
      return card;
    }
    function generateCards() {
      const container = $('#PA_cardContainer');
      cardData.forEach((data) => {
        const newCard = createCard(data);
        container.append(newCard);
      });
    }
    generateCards();
    const $menuBtn = $('#mobile-nav-btn');
    const $menuOverlay = $('#mnav-menu-overlay');
    const $navHeader = $('#stickyHeader');
    const $menuItem = $('#mnav-menu-item');
    const $menuIcon = $('#menu-btn');
    const $closeIcon = $('#close-btn');
    if ($menuBtn.length) {
      $menuBtn.on('click', function () {
        $menuIcon.toggleClass('hidden');
        $closeIcon.toggleClass('hidden');
        $menuItem.toggleClass('-translate-x-[100vw]');
        $('body').toggleClass('overflow-hidden');
        if ($menuIcon.hasClass('hidden')) {
          $navHeader.addClass('bg-white');
        } else if ($(window).scrollTop() === 0) {
          $navHeader.removeClass('bg-white');
        }
      });
    }
    if ($menuOverlay.length) {
      $menuOverlay.on('click', function () {
        $menuIcon.toggleClass('hidden');
        $closeIcon.toggleClass('hidden');
        $menuItem.toggleClass('-translate-x-[100vw]');
        $navHeader.removeClass('bg-white');
      });
    }
    try {
      let currentYear = new Date().getFullYear();
      let yearElement = $('#footerYear');
      if (yearElement.length) {
        yearElement.text(currentYear);
      } else {
        console.warn("Element with ID 'year' not found!");
      }
    } catch (error) {
      console.error('Error updating year dynamically:', error);
    }
    if (typeof hoverintent !== 'function') {
      console.error('hoverIntent not loaded');
      return;
    }
    let tooltipSpan = null;
    const shiftX = 8;
    const shiftY = 10;
    function updatePosition(event) {
      if (!tooltipSpan) return;
      let left = event.clientX + shiftX;
      if (left + tooltipSpan.offsetWidth > window.innerWidth) {
        left = Math.max(0, event.clientX - shiftX - tooltipSpan.offsetWidth);
      }
      let top = event.clientY + shiftY;
      if (top + tooltipSpan.offsetHeight > window.innerHeight) {
        top = Math.max(0, event.clientY - shiftY - tooltipSpan.offsetHeight);
      }
      tooltipSpan.style.left = left + 'px';
      tooltipSpan.style.top = top + 'px';
    }
    function onOver(event) {
      const target = event.target.closest('[data-tooltip]');
      if (!target) return;
      if (target.classList.contains('button') || target.closest('.toolbar')) return;
      tooltipSpan = document.createElement('span');
      tooltipSpan.className = 'link__type';
      const tooltipText = target.getAttribute('data-tooltip') || target.getAttribute('href');
      tooltipSpan.textContent = tooltipText || '';
      Object.assign(tooltipSpan.style, { position: 'fixed', pointerEvents: 'none', zIndex: '1000' });
      document.body.appendChild(tooltipSpan);
      updatePosition(event);
      document.addEventListener('mousemove', updatePosition);
    }
    function onOut() {
      if (tooltipSpan) {
        tooltipSpan.remove();
        tooltipSpan = null;
        document.removeEventListener('mousemove', updatePosition);
      }
    }
    document.querySelectorAll('[data-tooltip]').forEach((el) => {
      hoverintent(el, onOver, onOut);
    });
  }
  let selectedPdfUrl = '';
  let selectedFileName = '';
  let selectedFileImg = '';
  let modalContent = '';
  let serverOtp = null;
  let otpTimerInterval = null;
  $(document).on('click', '.brochure-link', function (e) {
    e.preventDefault();
    e.stopPropagation();
    selectedPdfUrl = $(this).data('pdf');
    selectedFileName = $(this).data('filename');
    modalContent = $(this).data('content');
    let modalImg = $(this).data('image');
    if ($('#erpModal').length === 0) {
      $('body').append(`
      <div class="modal fade" id="erpModal" tabindex="-1" aria-labelledby="erpModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="erpModal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-0 px-0">
              <img class="modalDynamicImg" src="" alt="erp file download" style="max-width: 100%; height: auto;" />
              <div class="px-2">
                <p class="fs-6 fw-semibold mb-1 px-3 modalDynamicText text-center"></p>
                <p class="text-sm mb-0 text-center">Subscribe and Download the PDF File.</p>
                <form id="emailForm">
                  <div id="step1">
                    <div class="mb-2 w-75 mx-auto">
                      <input type="text" id="namePopup" class="form-control" placeholder="Your Name">
                      <div class="error-container-name text-danger small"></div>
                    </div>
                    <div class="mb-2 w-75 mx-auto">
                      <input type="text" id="emailPopup" class="form-control" placeholder="Email Address">
                      <div class="error-container-email text-danger small"></div>
                    </div>
                    <div class="mb-2 w-75 mx-auto">
                      <input type="text" id="mobilePopup" class="form-control" placeholder="Mobile Number" maxlength="10">
                      <div class="error-container-mobile text-danger small"></div>
                    </div>
                    <div class="bg-btn-wrapper text-center mt-3">
                      <button type="button" id="getOtpBtn" class="bg-btn mx-auto px-4 py-2">
                        Get OTP <span class="spinner-border spinner-border-sm d-none"></span>
                      </button>
                    </div>
                  </div>
                  <div id="step2" class="d-none text-center">
                    <div class="mb-2">
                        <span class="small">OTP sent to </span><strong><span id="maskedMobile"></span></strong>
                        <a href="#" id="goBackBtn" class="small text-decoration-none text-primary fw-bold">Wrong Number? Edit</a>
                    </div>
                    <input type="text" id="otpInput" class="form-control mx-auto w-50" placeholder="Enter 6 Digit OTP" maxlength="6">
                    <div class="error-container-otp text-danger mt-1 small"></div>
                    <button type="button" id="verifyOtpBtn" class="btn btn-success mt-3 px-4 py-2">
                      Verify OTP & Download
                    </button>
                    <p class="mt-2 small">
                      <span id="otpTimer"></span>
                      <a href="#" id="resendOtp" class="d-none text-warning" style="text-decoration:none;">Resend OTP</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    }
    $('.modalDynamicImg').attr('src', modalImg);
    $('.modalDynamicText').html(modalContent);
    const modal = new bootstrap.Modal(document.getElementById('erpModal'));
    modal.show();
  });
  $(document).on('input', '#namePopup', function () {
    let cleaned = this.value.replace(/[^a-zA-Z\s\-']/g, '');
    if (this.value !== cleaned) this.value = cleaned;
  });
  $(document).on('input', '#mobilePopup', function () {
    let cleaned = this.value.replace(/[^0-9]/g, '');
    if (this.value !== cleaned) this.value = cleaned;
  });
  $(document).on('click', '#goBackBtn', function (e) {
    e.preventDefault();
    clearInterval(otpTimerInterval);
    $('#otpTimer').text('');
    $('#step2').addClass('d-none');
    $('#step1').removeClass('d-none');
    $('#otpInput').val('');
    $('.error-container-otp').text('');
  });
  function validateStep1() {
    let hasError = false;
    $('.error-container-name, .error-container-email, .error-container-mobile').text('');
    if ($('#namePopup').val().trim().length < 2) {
      $('.error-container-name').text('Enter valid name');
      hasError = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#emailPopup').val())) {
      $('.error-container-email').text('Enter valid email');
      hasError = true;
    }
    if (!/^\d{10}$/.test($('#mobilePopup').val())) {
      $('.error-container-mobile').text('Enter valid mobile number');
      hasError = true;
    }
    return !hasError;
  }
  $(document).on('click', '#getOtpBtn', function () {
    if (!validateStep1()) return;
    const phone = $('#mobilePopup').val();
    const $btn = $(this);
    $btn.prop('disabled', true).find('span').removeClass('d-none');
    $('#maskedMobile').text(phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'));
    $.ajax({
      url: 'https://webappqc.roadmaperp.com:8765/ords/roadstd/phone_validation/send_otp',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ phone_no: phone }),
      success: function (res) {
        serverOtp = res.OTP;
        $('#step1').addClass('d-none');
        $('#step2').removeClass('d-none');
        startOtpTimer();
      },
      error: function () {
        Swal.fire('Error', 'Failed to send OTP', 'error');
      },
      complete: function () {
        $btn.prop('disabled', false).find('span').addClass('d-none');
      },
    });
  });
  $(document).on('click', '#verifyOtpBtn', function () {
    const enteredOtp = $('#otpInput').val().trim();
    const $btn = $(this);
    $('.error-container-otp').text('');
    if (enteredOtp.length !== 6) {
      $('.error-container-otp').text('Enter valid 6-digit OTP');
      return;
    }
    if (parseInt(enteredOtp) !== parseInt(serverOtp)) {
      $('.error-container-otp').text('Invalid OTP');
      return;
    }
    clearInterval(otpTimerInterval);
    $btn.prop('disabled', true).text('Verifying...');
    Swal.fire({
      icon: 'success',
      title: 'Verified!',
      text: 'Your download will start shortly...',
      timer: 1500,
      showConfirmButton: false,
      didOpen: () => {
        const swalContainer = document.querySelector('.swal2-container');
        if (swalContainer) {
          swalContainer.style.zIndex = '99999';
        }
      },
    }).then(() => {
      submitFinalForm();
      $('#verifyOtpBtn').prop('disabled', false).text('Verify OTP & Download');
      $('#step1').removeClass('d-none');
      $('#step2').addClass('d-none');
      $('#emailForm')[0].reset();
    });
  });
  function startOtpTimer() {
    let sec = 30;
    $('#resendOtp').addClass('d-none');
    $('#otpTimer').text(`Resend OTP in ${sec}s`);
    if (otpTimerInterval) clearInterval(otpTimerInterval);
    otpTimerInterval = setInterval(() => {
      sec--;
      $('#otpTimer').text(`Resend OTP in ${sec}s`);
      if (sec <= 0) {
        clearInterval(otpTimerInterval);
        $('#otpTimer').text('');
        $('#resendOtp').removeClass('d-none');
      }
    }, 1000);
  }
  $(document).on('click', '#resendOtp', function (e) {
    e.preventDefault();
    $('#getOtpBtn').trigger('click');
  });
  function submitFinalForm() {
    const name = $('#namePopup').val();
    const phone = $('#mobilePopup').val();
    const email = $('#emailPopup').val();
    $.ajax({
      url: 'https://webappqc.roadmaperp.com:8765/ords/rmqc27/web_email/contact',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        mail_sub: `Brochure Download – ${name}`,
        mail_body: `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 100px auto; max-width: 500px;"><div style="text-align: center;"><img src="https://5.imimg.com/data5/SELLER/Default/2023/8/336830897/KS/AX/RB/18506272/roadmap-erp-on-cloud-system-500x500.png" alt="Roadmap IT solution ERP" style="max-width: 180px;"></div><h2 style="text-align: center; font-size: 20px;">Product Enquiry from Roadmap Website</h2><h3 style="background-color: #ff9103; color: #fff; padding: 8px; font-size: 18px; text-align: center;">Register Details</h3><table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd; background-color: white;"><tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr><tr style="background-color: #ffebd1;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr><tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}" style="color:#007BFF;">${email}</a></td></tr><tr style="background-color: #ffebd1;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Consent</strong></td><td style="padding: 8px; border: 1px solid #ddd;">Yes</td></tr></table></div>`,
      }),
      success: function () {
        const link = document.createElement('a');
        link.href = selectedPdfUrl;
        link.download = selectedFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        $('#erpModal').modal('hide');
      },
      error: function () {
        $('#verifyOtpBtn').prop('disabled', false).text('Verify OTP & Download');
        Swal.fire('Error', 'Submission failed', 'error');
      },
    });
  }
  $(document).on('hidden.bs.modal', '#erpModal', function () {
    $('#emailForm')[0].reset();
    $('.error-container-name, .error-container-otp, .error-container-email, .error-container-mobile').text('');
    $('#step1').removeClass('d-none');
    $('#step2').addClass('d-none');
    clearInterval(otpTimerInterval);
    $('#otpTimer').text('');
    $('#resendOtp').addClass('d-none');
    $('#getOtpBtn').prop('disabled', false).find('span').addClass('d-none');
    $('#verifyOtpBtn').prop('disabled', false).text('Verify OTP & Download');
  });
});
if (document.querySelector('.partnerSlider')) {
  new Swiper('.partnerSlider', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 30, slidesPerView: 3, loop: !0, autoplay: { delay: 2500, disableOnInteraction: !1 }, pagination: { el: '.swiper-pagination', clickable: !0 }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, breakpoints: { 640: { slidesPerView: 4, spaceBetween: 10 }, 768: { slidesPerView: 4, spaceBetween: 30 }, 1024: { slidesPerView: 7, spaceBetween: 30 } } });
}
if (document.querySelector('.projectSlider')) {
  new Swiper('.projectSlider', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 30, slidesPerView: 1, navigation: { nextEl: '.project-slider-next', prevEl: '.project-slider-prev' }, breakpoints: { 640: { slidesPerView: 2, spaceBetween: 10 }, 768: { slidesPerView: 3, spaceBetween: 30 }, 1024: { slidesPerView: 4, spaceBetween: 30 } } });
}
if (document.querySelector('.testimonialsSlider')) {
  new Swiper('.testimonialsSlider', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 0, slidesPerView: 1, loop: !0, speed: 800, autoplay: { delay: 5000, disableOnInteraction: !1 }, navigation: { nextEl: '.testimonial-slider-next', prevEl: '.testimonial-slider-prev' } });
}
if (document.querySelector('.h2-testimonialsSlider')) {
  new Swiper('.h2-testimonialsSlider', { observer: !1, observeParents: !1, resizeObserver: !1, direction: 'vertical', spaceBetween: 0, slidesPerView: 1, loop: !0, speed: 800, autoplay: { delay: 5000, disableOnInteraction: !1 }, navigation: { nextEl: '.testimonial-slider-next', prevEl: '.testimonial-slider-prev' } });
}
if (document.querySelector('.signupSwiper')) {
  new Swiper('.signupSwiper', { observer: !1, observeParents: !1, resizeObserver: !1, effect: 'fade', fadeEffect: { crossFade: !0 }, spaceBetween: 30, slidesPerView: 1, loop: !0, speed: 800, allowTouchMove: !1, autoplay: { delay: 3000, disableOnInteraction: !1 }, pagination: { el: '.swiper-pagination', clickable: !0 } });
}
if (document.querySelector('.swiper-ess')) {
  new Swiper('.swiper-ess', { observer: !1, observeParents: !1, resizeObserver: !1, effect: 'fade', fadeEffect: { crossFade: !0 }, spaceBetween: 30, slidesPerView: 1, loop: !0, speed: 800, allowTouchMove: !1, autoplay: { delay: 3000, disableOnInteraction: !1 }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
}
if (document.querySelector('.lap-screen')) {
  const progressCircle = document.querySelector('.autoplay-progress svg');
  const progressContent = document.querySelector('.autoplay-progress span');
  new Swiper('.lap-screen', {
    observer: !1,
    observeParents: !1,
    resizeObserver: !1,
    spaceBetween: 2,
    speed: 800,
    centeredSlides: !0,
    autoplay: { delay: 4500, disableOnInteraction: !1 },
    pagination: { el: '.swiper-pagination', clickable: !0 },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty('--progress', 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      },
    },
  });
}
if (document.querySelector('.swiper-apple')) {
  new Swiper('.swiper-apple', {
    observer: !1,
    observeParents: !1,
    resizeObserver: !1,
    effect: 'fade',
    fadeEffect: { crossFade: !0 },
    spaceBetween: 30,
    slidesPerView: 1,
    loop: !0,
    speed: 1000,
    allowTouchMove: !1,
    autoplay: { delay: 3000, disableOnInteraction: !1 },
    pagination: {
      el: '.apple-pagination',
      clickable: !0,
      renderBullet: function (index, className) {
        var icons = ['fa-line-chart', 'fa-cog', 'fa-bell'];
        var icon = icons[index % icons.length];
        return '<span class="' + className + '"><i class="fa fa-3x ' + icon + '" aria-hidden="true"></i></span>';
      },
    },
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const faqGroups = document.querySelectorAll('.h2-faq-wrapper, .faq-wrapper');
  faqGroups.forEach((group) => {
    const faqs = group.querySelectorAll('.faq-toggler');
    faqs[0].classList.add('active-faq');
    faqs.forEach((faq, index) => {
      faq.addEventListener('click', () => {
        faqs.forEach((f, i) => {
          if (i === index) {
            f.classList.add('active-faq');
          } else {
            f.classList.remove('active-faq');
          }
        });
      });
    });
  });
});
$(document).ready(function () {
  const startYear = 2003;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;
  $('#yrsExpContainer').attr('data-count-fm', yearsOfExperience);
  $('#yrsExp').text(yearsOfExperience + '+');
  scrollAnimate();
});
const counter = (item) => {
  let countdown = null;
  const count = Number(item.getAttribute('data-count-fm'));
  const valueType = item.getAttribute('data-type-fm');
  const speed = Number(item.getAttribute('data-speed-fm'));
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
let running = [];
let observer;
function scrollAnimate() {
  const allData = document.querySelectorAll("[data-scroll-fm='scroll']");
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target;
          if (entry.isIntersecting) {
            if (!running.includes(item)) {
              const animType = item.getAttribute('data-anim-type');
              switch (animType) {
                case 'count-width':
                  if (item.classList.contains('width-increase')) {
                    item.classList.remove('width-increase');
                    setTimeout(() => item.classList.add('width-increase'), 10);
                  } else {
                    item.classList.add('width-increase');
                  }
                  break;
                default:
                  break;
              }
              if (item.hasAttribute('data-count-fm')) {
                counter(item);
              }
              running.push(item);
            }
          } else {
            running = running.filter((el) => el !== item);
          }
        });
      },
      { threshold: 0.1 }
    );
  }
  allData.forEach((item) => observer.observe(item));
}
window.addEventListener('load', (event) => {
  scrollAnimate(event);
});
function handleScroll() {
  scrollAnimate();
  const header = document.getElementById('stickyHeader');
  if (!header.classList.contains('bg-white') && window.scrollY > 0) {
    header.classList.add('bg-white', 'shadow-card-shadow');
  } else if (header.classList.contains('bg-white') && window.scrollY === 0) {
    header.classList.remove('bg-white', 'shadow-card-shadow');
  }
}
window.addEventListener('load', handleScroll);
window.addEventListener('scroll', handleScroll);
if (document.querySelector('.projectSlider-h3')) {
  new Swiper('.projectSlider-h3', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 30, slidesPerView: 1, loop: !0, autoplay: { delay: 2500, disableOnInteraction: !1 }, navigation: { nextEl: '.project-slider-next', prevEl: '.project-slider-prev' }, breakpoints: { 640: { slidesPerView: 1, spaceBetween: 10 }, 1024: { slidesPerView: 4, spaceBetween: 30 } } });
}
if (document.querySelector('.testimonials-h3')) {
  requestAnimationFrame(() => {
    const swiper = new Swiper('.testimonials-h3', { observer: !1, observeParents: !1, resizeObserver: !1, autoplay: { delay: 2500, disableOnInteraction: !1 }, speed: 800, navigation: { nextEl: '.testimonials-slider-next', prevEl: '.testimonials-slider-prev' }, loop: !0 });
    const sliderEl = document.querySelector('.testimonials-h3');
    sliderEl.addEventListener('mouseenter', () => swiper.autoplay.stop());
    sliderEl.addEventListener('mouseleave', () => swiper.autoplay.start());
  });
}
if (document.querySelector('.project-detail-slider-thumb')) {
  const swiperThumb = new Swiper('.project-detail-slider-thumb', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 30, slidesPerView: 3, freeMode: !0, watchSlidesProgress: !0 });
  const swiper2 = new Swiper('.project-detail-slider', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 10, thumbs: { swiper: swiperThumb } });
}
if ($('.modal-slider').length) {
  let sliderActive = 0;
  const swiper3 = new Swiper('.modal-slider', { observer: !1, observeParents: !1, resizeObserver: !1, initialSlide: sliderActive, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
}
const zoomBtns = document.querySelectorAll('.zoom-slider');
if (zoomBtns) {
  zoomBtns.forEach((btn, index) => {
    btn.addEventListener('click', (index) => {
      document.getElementById('slider-modal').classList.remove('hidden');
      sliderActive = index;
    });
  });
}
if (document.getElementById('modal-close')) {
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('slider-modal').classList.add('hidden');
  });
}
if (document.querySelector('.ms-swiper')) {
  new Swiper('.ms-swiper', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 30, slidesPerView: 1, loop: !0, autoplay: { delay: 2500, disableOnInteraction: !1 }, breakpoints: { 360: { slidesPerView: 1, spaceBetween: 10 }, 640: { slidesPerView: 2, spaceBetween: 10 }, 768: { slidesPerView: 3, spaceBetween: 30 }, 1024: { slidesPerView: 5, spaceBetween: 30 } } });
}
if (document.querySelector('.h4-testimonialsSlider')) {
  new Swiper('.h4-testimonialsSlider', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 0, slidesPerView: 1, loop: !0, speed: 800, autoplay: { delay: 5000, disableOnInteraction: !1 }, navigation: { nextEl: '.testimonial-slider-next', prevEl: '.testimonial-slider-prev' }, breakpoints: { 360: { slidesPerView: 1, spaceBetween: 10 }, 1024: { slidesPerView: 2, spaceBetween: 10 } } });
}
if (document.querySelector('.h4-teamSlider')) {
  new Swiper('.h4-teamSlider', { observer: !1, observeParents: !1, resizeObserver: !1, spaceBetween: 30, slidesPerView: 1, loop: !0, autoplay: { delay: 2500, disableOnInteraction: !1 }, breakpoints: { 640: { slidesPerView: 1, spaceBetween: 10 }, 640: { slidesPerView: 2, spaceBetween: 30 }, 1024: { slidesPerView: 4, spaceBetween: 30 } } });
}
let lastScrollTop = 0;
const navbar = document.getElementById('stickyHeader');
window.addEventListener('scroll', function (e) {
  e.preventDefault();
  if (window.innerWidth > 2500) {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navbar.style.transform = 'translateY(-200%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  } else {
    navbar.style.transform = 'translateY(0)';
  }
});
$(document).ready(function () {
  $('#product-list .RM-productDiv').slice(8).addClass('hidden-list');
  $('#load-more').on('click', function () {
    let hiddenItems = $('#product-list .RM-productDiv.hidden-list');
    hiddenItems.slice(0, 4).removeClass('hidden-list');
    if (hiddenItems.length <= 4) {
      $(this).addClass('hidden-list');
    }
  });
  const $tabs = $('.RM-Left_list li');
  const $rightContainer = $('.RM-Right_container');
  const $sections = $('.RM-Right_element');
  function updateActiveTab() {
    const scrollY = $rightContainer.scrollTop();
    $sections.each(function (index) {
      const $section = $(this);
      const sectionTop = $section.position().top - 10;
      const sectionHeight = $section.outerHeight();
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        $tabs.removeClass('RM-Selectlist');
        $tabs.eq(index).addClass('RM-Selectlist');
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
  $rightContainer.on('scroll', function () {
    updateActiveTab();
    const scrollTop = $rightContainer.scrollTop();
    $rightContainer.stop().animate({ scrollTop: scrollTop }, 200);
  });
  $(window).on('resize', updateActiveTab);
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
    return !1;
  });
  $('.pricingPlan').click(function () {
    const planVal = $(this).attr('data-plan');
    localStorage.setItem('planPrice', planVal);
  });
  $.ajax({
    type: 'GET',
    url: '../assets/cities/CITIES_CRMS.csv',
    dataType: 'text',
    success: function (data) {
      populateSelect(data);
    },
  });
  function populateSelect(csvData) {
    var lines = csvData.split(/\r?\n|\r/);
    var options = '';
    for (var i = 0; i < lines.length; i++) {
      var data = lines[i].split(',');
      var value = data[0];
      var label = data[1];
      options += '<option value="' + value + '">' + label + '</option>';
    }
    $('#selectList').html(options);
  }
  $('input[type="password"]').each(function () {
    const $password = $(this);
    const $wrapper = $('<div></div>').css({
      position: 'relative',
    });
    $password.before($wrapper);
    $wrapper.append($password);
    const $eye = $('<i class="bi bi-eye-slash"></i>').css({
      position: 'absolute',
      right: '10px',
      top: '7px',
      cursor: 'pointer',
      'font-size': '1.1rem',
      color: '#6c757d',
    });
    $wrapper.append($eye);
    $eye.on('click', function () {
      const isPassword = $password.attr('type') === 'password';
      $password.attr('type', isPassword ? 'text' : 'password');
      $eye.toggleClass('bi-eye bi-eye-slash');
    });
  });
  const signupConfig = {
    'crm-signup.html': {
      appl: 'CRMS',
      login: 'https://webappqc.roadmaperp.com:8765/ords/r/crms/crms/login',
    },
    'plantmainten-signup.html': {
      appl: 'MNTS',
      login: 'https://webappqc.roadmaperp.com:8765/ords/f?p=916',
    },
    'fixedasset-signup.html': {
      appl: 'FAMS',
      login: 'https://webappqc.roadmaperp.com:8765/ords/r/fams/fams/login',
    },
    'corehr-signup.html': {
      appl: 'HRMS',
      login: 'https://webappqc.roadmaperp.com:8765/ords/r/hrms/hrms/login',
    },
    'posbilling-signup.html': {
      appl: 'POS',
      login: '../rmbilling/Roadmap_Installer.zip',
    },
  };
  const currentPageReg = window.location.pathname.split('/').pop().toLowerCase();
  if (signupConfig[currentPageReg]) {
    registerToProduct(signupConfig[currentPageReg].appl, signupConfig[currentPageReg].login);
    // console.log('Registration initialized for', signupConfig[currentPageReg].appl);
    // console.log('Login URL:', signupConfig[currentPageReg].login);
  }
  function registerToProduct(APPL_CODE, LOGIN_URL) {
    if (document.querySelector('#signupForm')) {
      let serverOtp = null;
      let otpTimer = null;
      let otpExpirySeconds = 300;
      let resendTimer = null;
      let resendSeconds = 30;
      let isResendBlocked = false;
      if ($('.changeMobBtn').length === 0) {
        $('.signOtpBtn').after('<span class="changeMobBtn text-danger cursor-pointer ms-2" style="font-size:13px; font-weight:600; display:none; text-decoration: underline;">Change Number</span>');
      }
      $(document).on('click', '.changeMobBtn', function () {
        $('#mobNum').prop('readonly', false).css('background-color', '').focus();
        $('#signOtp').slideUp();
        $('.signOtpBtn').html('Get OTP').prop('disabled', false).removeClass('disabled');
        $(this).hide();
        $('.changeMailBtn').hide();
        clearInterval(otpTimer);
        clearInterval(resendTimer);
        serverOtp = null;
        $('#otpTimer').text('');
        isResendBlocked = false;
        $('#otpVerified').val('no');
      });
      if ($('.changeMailBtn').length === 0) {
        $('.signOtpBtn').after('<span class="changeMailBtn text-danger cursor-pointer ms-2" style="font-size:13px; font-weight:600; display:none; text-decoration: underline;">Change Email</span>');
      }
      $(document).on('click', '.changeMailBtn', function () {
        $('#mailId').prop('readonly', false).css('background-color', '').focus();
        $('#signOtp').slideUp();
        $('.signOtpBtn').html('Get OTP').prop('disabled', false).removeClass('disabled');
        $(this).hide();
        $('.changeMobBtn').hide();
        clearInterval(otpTimer);
        clearInterval(resendTimer);
        serverOtp = null;
        $('#otpTimer').text('');
        isResendBlocked = false;
        $('#otpVerified').val('no');
      });
      $('#signupForm').validate({
        rules: {
          compyname: { required: true },
          username: { required: true, minlength: 3 },
          password: { required: true, minlength: 8 },
          confPassword: { required: true, equalTo: '#password' },
          mailId: { required: true, email: true },
          mobNum: { required: true, minlength: 10, maxlength: 13 },
          selectList: { required: true },
          agreeCheck: { required: true },
        },
        messages: {
          compyname: 'Company Name is required.',
          username: { required: 'Username is required.', minlength: 'Your username must be at least 3 characters long.' },
          password: { required: 'Password is required.', minlength: 'Your Password must be at least 8 characters long.' },
          confPassword: { required: 'Confirm Password is required.', equalTo: 'Passwords do not match.' },
          mailId: { required: 'Email is required.', email: 'Please enter a valid Email.' },
          mobNum: { required: 'Mobile Number is required.', minlength: 'Your mobile number must be at least 10 digits long.', maxlength: 'Your mobile number cannot exceed 13 digits.' },
          selectList: 'City is required.',
          agreeCheck: 'You must agree to the terms.',
        },
        errorElement: 'em',
        errorPlacement: function (error, element) {
          if (element.parent('.form-floating').length) {
            error.insertAfter(element.parent());
            error.addClass('text-danger');
          } else {
            error.insertAfter(element);
            error.addClass('text-danger');
          }
        },
      });
      function unlockFields() {
        ['#compyname', '#username', '#mailId', '#password', '#confPassword', '#mobNum'].forEach((f) => $(f).prop('readonly', false).css('background-color', ''));
      }
      function lockFields() {
        ['#compyname', '#username', '#mailId', '#password', '#confPassword', '#mobNum'].forEach((f) => $(f).prop('readonly', true).css('background-color', '#fff'));
      }
      $('.signOtpBtn').click(async function (e) {
        e.preventDefault();
        if (isResendBlocked) {
          showOtpAlert('Please wait before resending OTP.', 'info');
          return;
        }
        const requiredFields = ['#compyname', '#username', '#mailId', '#password', '#confPassword', '#mobNum'];
        let isValid = true;
        let firstInvalid = null;
        requiredFields.forEach((f) => {
          if (!$(f).valid()) {
            isValid = false;
            if (!firstInvalid) firstInvalid = f;
          }
        });
        if (!isValid) {
          $(firstInvalid).focus();
          return;
        }
        const mobile = $('#mobNum').val().trim();
        try {
          $('.signOtpBtn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...').prop('disabled', true);
          const response = await fetch('https://webappqc.roadmaperp.com:8765/ords/roadstd/phone_validation/send_otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone_no: mobile }),
          });
          const data = await response.json();
          if ((response.ok || data.OTP) && data.status !== 'failure') {
            serverOtp = String(data.OTP);
            const emailVal = $('#mailId').val().trim();
            if (emailVal) {
              fetch('https://webappqc.roadmaperp.com:8765/ords/rmqc27/otp_mail/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ p_otp: serverOtp, p_to_mail: emailVal }),
              }).catch((err) => showBootstrapAlert(err, 'danger'));
            }
            resetOtpUI();
            startOtpExpiryTimer();
            startResendCountdown();
            $('#signOtp').slideDown(() => $('#otpCode').focus());
            $('#otpVerified').val('no');
            showOtpAlert('OTP sent successfully to your mobile number & Mail.', 'success');
            $('.signOtpBtn').html('Resend OTP');
            $('.changeMobBtn, .changeMailBtn').show();
            lockFields();
          } else {
            throw new Error(data.message || 'Failed to send OTP');
          }
        } catch (err) {
          let msg = err.message || 'Failed to send OTP. Try again.';
          msg = msg.replace(/ORA-\d+:\s?/g, '');
          showOtpAlert(msg, 'danger');
          $('.signOtpBtn').html('Get OTP');
          unlockFields();
        } finally {
          $('.signOtpBtn').prop('disabled', false);
        }
      });
      $('#otpCode').on('input', function () {
        let otp = $(this).val().replace(/\D/g, '');
        $(this).val(otp);
        if (otp.length !== 6) return;
        $(this).prop('disabled', true);
        if (!serverOtp) {
          showOtpAlert('OTP expired. Please resend OTP.', 'warning');
          resetOtpUI();
          return;
        }
        if (otp === serverOtp) {
          clearInterval(otpTimer);
          $('#otpCode').removeClass('error').css('border', '2px solid green');
          $('#otpVerified').val('yes');
          $('#RM-signup-btn').prop('disabled', false);
          showOtpAlert('OTP verified successfully!', 'success');
        } else {
          $('#otpCode').addClass('error').css('border', '2px solid red');
          $('#otpVerified').val('no');
          showOtpAlert('Invalid OTP. Please try again.', 'danger', false);
          $('#otpCode').val('').prop('disabled', false).focus();
        }
      });
      function startOtpExpiryTimer() {
        let timeLeft = otpExpirySeconds;
        $('#otpTimer').text(`OTP expires in ${timeLeft}s`);
        otpTimer = setInterval(() => {
          timeLeft--;
          $('#otpTimer').text(`OTP expires in ${timeLeft}s`);
          if (timeLeft <= 0) {
            clearInterval(otpTimer);
            serverOtp = null;
            showOtpAlert('OTP expired. Please resend OTP.', 'warning');
            resetOtpUI();
          }
        }, 1000);
      }
      function startResendCountdown() {
        let timeLeft = resendSeconds;
        isResendBlocked = true;
        $('.signOtpBtn').prop('disabled', true).addClass('disabled');
        resendTimer = setInterval(() => {
          $('.signOtpBtn').text(`Resend in ${timeLeft}s`);
          timeLeft--;
          if (timeLeft < 0) {
            clearInterval(resendTimer);
            isResendBlocked = false;
            $('.signOtpBtn').prop('disabled', false).removeClass('disabled').text('Resend OTP');
          }
        }, 2000);
      }
      function resetOtpUI() {
        $('#otpCode').val('').prop('disabled', false).removeClass('error').css('border', '');
        $('#otpVerified').val('no');
        $('#RM-signup-btn').prop('disabled', true);
        $('#otpTimer').text('');
      }
      function showOtpAlert(message, type = 'success', autoHide = true) {
        $('#otpDynamicAlert').remove();
        const alertHtml = `
    <div id="otpDynamicAlert"
         class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
         role="alert"
         style="z-index:999999; min-width:300px; max-width:500px;">
      ${message}
      <button type="button" class="btn-close"></button>
    </div>
  `;
        $('body').append(alertHtml);
        $('#otpDynamicAlert .btn-close').on('click', function () {
          $('#otpDynamicAlert').remove();
        });
        if (autoHide) {
          setTimeout(() => {
            $('#otpDynamicAlert').fadeOut(300, function () {
              $(this).remove();
            });
          }, 3000);
        }
      }
      function validatePassword() {
        var password = $('#password').val().trim();
        var confirmPassword = $('#confPassword').val().trim();
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let isValid = true;
        if (password === '') {
          $('#password-errorLabel').css('display', 'block').text('Password is required.');
          $('#password').addClass('error').css('border', '2px solid red').attr('aria-invalid', 'true');
          isValid = false;
        } else if (!passwordRegex.test(password)) {
          $('#password-errorLabel').css('display', 'block').text('Password must include a letter, number, and special character.');
          $('#password').addClass('error').css('border', '2px solid red').attr('aria-invalid', 'true');
          isValid = false;
        } else {
          $('#password-errorLabel').css('display', 'none');
          $('#password').removeClass('error').css('border', '2px solid green').attr('aria-invalid', 'false');
        }
        if (confirmPassword === '') {
          $('#confPassword-errorLabel').css('display', 'block').text('Please confirm your password.');
          $('#confPassword').addClass('error').css('border', '2px solid red').attr('aria-invalid', 'true');
          isValid = false;
        } else if (password !== confirmPassword) {
          $('#confPassword-errorLabel').css('display', 'block').text('Passwords do not match.');
          $('#confPassword').addClass('error').css('border', '2px solid red').attr('aria-invalid', 'true');
          isValid = false;
        } else {
          $('#confPassword-errorLabel').css('display', 'none');
          $('#confPassword').removeClass('error').css('border', '2px solid green').attr('aria-invalid', 'false');
        }
        return isValid;
      }
      $('#password, #confPassword').on('blur', function () {
        validatePassword();
      });
      $('#password, #confPassword').on('input', function () {
        validatePassword();
      });
      function showBootstrapAlert(message, type = 'danger') {
        $('.dynamic-alert').remove();
        const alertHtml = `
    <div class="dynamic-alert alert alert-${type} alert-dismissible fade show
         position-fixed top-0 start-50 translate-middle-x mt-5"
         role="alert" style="z-index:999999; min-width:300px; max-width:500px;">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
        $('body').append(alertHtml);
        setTimeout(() => {
          $('.dynamic-alert').alert('close');
        }, 4000);
      }
      $('#signupForm').on('submit', function (e) {
        e.preventDefault();
        if (!$('#signupForm').valid()) return;
        if (!validatePassword()) {
          Swal.fire('Error', 'Please fix password errors before submitting.', 'error');
          return;
        }
        if ($('#otpVerified').val() !== 'yes') {
          Swal.fire('OTP Required', 'Please verify your OTP before submitting.', 'warning');
          $('#otpCode').focus();
          return;
        }
        const payload = {
          company_name: $('#compyname').val().trim(),
          username: $('#username').val().trim().toUpperCase(),
          pass: $('#password').val().trim(),
          email: $('#mailId').val().trim(),
          mobile: $('#mobNum').val().trim(),
          city: $('#selectList').val().trim(),
          appl: APPL_CODE,
        };
        $('#RM-signup-btn').text('Processing...').prop('disabled', true);
        $.ajax({
          url: 'https://webappqc.roadmaperp.com:8765/ords/roadstd/phone_validation/create_entity',
          type: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify(payload),
          success: async function (response) {
            if (response.status === 'success') {
              try {
                await fetch('https://webappqc.roadmaperp.com:8765/ords/rmqc27/success_mail/success_mail', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    p_link: LOGIN_URL,
                    p_to_mail: $('#mailId').val().trim(),
                  }),
                });
              } catch (err) {
                showBootstrapAlert(err, 'danger');
              }
              const frontConfetti = confetti.create(null, {
                resize: true,
                useWorker: true,
                zIndex: 99999999,
              });
              var count = 200;
              var defaults = {
                origin: { y: 0.7 },
              };
              function fire(particleRatio, opts) {
                frontConfetti({
                  ...defaults,
                  ...opts,
                  particleCount: Math.floor(count * particleRatio),
                });
              }
              Swal.fire({
                icon: 'success',
                title: '<i class="bi bi-stars text-sb-orange fs-3"></i> Your Trail Started Now! <i class="bi bi-stars text-sb-orange fs-3"></i>',
                text: 'You have successfully registered.',
                confirmButtonColor: '#ff9e22',
                confirmButtonText: 'Login Now',
                didOpen: () => {
                  const style = document.createElement('style');
                  style.id = 'swal-confetti-zindex';
                  style.type = 'text/css';
                  style.innerHTML = `
                      .swal2-container {
                        z-index: 99999 !important;
                      }
                      canvas {
                        z-index: 100000 !important;
                        pointer-events: none;
                      }
                    `;
                  document.head.appendChild(style);
                  fire(0.25, { spread: 26, startVelocity: 55 });
                  fire(0.2, { spread: 60 });
                  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
                  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
                  fire(0.1, { spread: 120, startVelocity: 45 });
                },
              }).then(() => {
                $('#signupForm')[0].reset();
                window.location.href = LOGIN_URL;
                $('#RM-signup-btn').prop('disabled', false).text('SIGN UP NOW');
              });
              return;
            }
            if (response.status === 'failure' && response.message && response.message.toLowerCase().includes('already exists')) {
              const cleanMsg = response.message.replace(/ORA-\d+:\s?/g, '');
              showBootstrapAlert(cleanMsg, 'danger');
              $('#RM-signup-btn').prop('disabled', false).text('SIGN UP NOW');
            }
          },
          error: function (response, status, xhr) {
            let apiMessage = 'Signup failed';
            if (xhr.responseJSON) {
              apiMessage = xhr.responseJSON.message || xhr.responseJSON.title || JSON.stringify(xhr.responseJSON);
            } else if (xhr.responseText) {
              apiMessage = xhr.responseText;
            }
            Swal.fire({
              icon: 'error',
              title: 'Signup Failed',
              text: apiMessage,
            });
            $('#RM-signup-btn').prop('disabled', false).text('SIGN UP NOW');
            console.log(response, status, xhr);
          },
        });
      });
      $('#signOtp').hide();
    }
  }
  $('.mytooltip').hover(
    function (e) {
      e.stopPropagation();
      $(this).find('.tooltip-content').show();
      $(this)
        .find('.tooltip-content')
        .hover(
          function (e) {
            e.stopPropagation();
            $('.tooltip-content').stop(!0);
          },
          function (e) {
            e.stopPropagation();
            $('.tooltip-content').hide();
            $('.tooltip-content').stop();
          }
        );
    },
    function (e) {
      e.stopPropagation();
      $('.tooltip-content').stop();
      $('.tooltip-content').hide();
    }
  );
  $('.spl1').click(function () {
    $('.tooltip-content').css('display', 'none');
  });
  const rtl_slide = $('.rtl_slide');
  if (rtl_slide.length) {
    rtl_slide.owlCarousel({ rtl: !1, items: 5, margin: 10, loop: !0, autoplay: !0, slideTransition: 'linear', autoplayTimeout: 2500, autoplaySpeed: 2500, autoplayHoverPause: !1, dots: !1, responsive: { 0: { items: 2 }, 600: { items: 3 }, 1000: { items: 5 } } }).trigger('play.owl.autoplay');
  }
  const inventory_owl = $('.inventory-owl');
  if (inventory_owl.length) {
    inventory_owl.owlCarousel({ rtl: !1, items: 1, margin: 0, loop: !0, autoplay: !0, autoplayTimeout: 7000, autoplaySpeed: 3000, autoplayHoverPause: !1, dots: !0, nav: !1, slideTransition: 'linear', animateOut: 'animate__zoomOut', animateIn: 'animate__fadeInDown', responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } }, vertical: !0, slideBy: 1, mouseDrag: !0, touchDrag: !0 });
    inventory_owl.trigger('play.owl.autoplay');
  }
  let items = [];
  let debounceTimer;
  let selectedIndex = -1;
  $.getJSON('/items.json', function (data) {
    items = data;
  }).fail(function () {
    console.error('Could not load items.json');
  });
  $('#searchInput').on('input', function () {
    clearTimeout(debounceTimer);
    const query = $(this).val();
    debounceTimer = setTimeout(function () {
      if (query.length > 0) {
        searchFunction(query, items);
      } else {
        clearResults();
      }
    }, 300);
  });
  $('#searchInput').on('keydown', function (e) {
    const results = $('#searchResults .item');
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % results.length;
      updateSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + results.length) % results.length;
      updateSelection(results);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex > -1) {
        window.location.href = $(results[selectedIndex]).find('a').attr('href');
      }
    }
  });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#searchContainer').length) {
      clearResults();
    }
  });
  function searchFunction(query, items) {
    const resultsContainer = $('#searchResults');
    const resultCountDiv = $('#resultCount');
    const fragment = $(document.createDocumentFragment());
    if (!query) return;
    const terms = query
      .toUpperCase()
      .split(' ')
      .filter((t) => t.length > 0);
    let count = 0;
    items.forEach(function (item) {
      const safeTitle = (item.title || '').toString();
      const safeDesc = (item.description || '').toString();
      const safeImage = (item.image || '').toString();
      const safeLink = (item.link || '#').toString();
      const titleUpper = safeTitle.toUpperCase();
      const descUpper = safeDesc.toUpperCase();
      const isMatch = terms.every((term) => titleUpper.includes(term) || descUpper.includes(term));
      if (isMatch) {
        const itemElement = $('<div>').addClass('row item search-item p-2 border-bottom');
        if (safeImage) {
          const imageElement = $('<img>').addClass('itemImg img-fluid col-3').attr('src', safeImage);
          itemElement.append(imageElement);
        }
        const textContainer = $('<div>').addClass('itemContent col-9');
        const titleHtml = highlightText(safeTitle, terms);
        const titleElement = $('<h6>').html(`<a href="${safeLink}" class="text-dark text-decoration-none">${titleHtml}</a>`);
        const descHtml = highlightText(safeDesc, terms);
        const descriptionElement = $('<p>').addClass('small text-muted mb-0').html(descHtml);
        textContainer.append(titleElement, descriptionElement);
        itemElement.append(textContainer);
        fragment.append(itemElement);
        count++;
      }
    });
    resultsContainer.empty();
    if (count === 0) {
      resultCountDiv.text('No results found.');
      resultsContainer.hide();
    } else {
      resultCountDiv.text(count + ' result(s) found.');
      resultsContainer.append(fragment).show();
    }
    window.selectedIndex = -1;
  }
  function highlightText(text, terms) {
    let highlighted = text;
    terms.sort((a, b) => b.length - a.length);
    terms.forEach((term) => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="highlight">$1</span>');
    });
    return highlighted;
  }
  function updateSelection(results) {
    results.removeClass('active');
    const selected = $(results[window.selectedIndex]);
    if (selected.length) {
      selected.addClass('active');
      selected[0].scrollIntoView({ block: 'nearest' });
    }
  }
  function clearResults() {
    $('#searchResults').empty().hide();
    $('#resultCount').text('');
    window.selectedIndex = -1;
  }
  var currentPageUrl = encodeURIComponent(window.location.href);
  var twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentPageUrl}`;
  var linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentPageUrl}`;
  var shareContainer = $('#socialShareContainer');
  var socialButtons = [
    { name: 'Twitter', url: twitterShareUrl, class: 'btn-twitter', icon: 'bi-twitter' },
    { name: 'LinkedIn', url: linkedinShareUrl, class: 'btn-linkedin', icon: 'bi-linkedin' },
  ];
  socialButtons.forEach(function (button) {
    var buttonElement = $('<a>').addClass(`btn ${button.class} me-2 d-flex align-items-center`).attr('href', button.url).attr('target', '_blank').html(`<i class="bi ${button.icon} me-2"></i> Share on ${button.name}`);
    shareContainer.append(buttonElement);
  });
  $('#productList').on('change', function () {
    $(this).removeClass('is-invalid');
    $('.error').remove();
  });
  $('#contactForm').submit(function (event) {
    event.preventDefault();
    let isValid = !0;
    $('.error').remove();
    const $submitBtn = $('#contactForm button[type=submit]');
    $submitBtn.prop('disabled', !0).css('opacity', '0.6').text('Submitting...');
    const nameRegex = /^[A-Za-z\s\-']+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const textRegex = /^[A-Za-z0-9\s\-'.&()]+$/;
    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let phone = $('#phone').val().trim();
    let company = $('#company').val().trim();
    let product = $('#productList').val();
    let message = $('#message').val().trim();
    let emailValid = emailRegex.test(email);
    let phoneValid = phoneRegex.test(phone);
    if (!name || !nameRegex.test(name)) {
      $('#name').after('<span class="error text-danger">Please enter a valid Name.</span>');
      isValid = !1;
    }
    if (!email) {
      $('#email').after('<span class="error text-danger">Email is required.</span>');
      isValid = !1;
    } else if (!emailValid) {
      $('#email').after('<span class="error text-danger">Please enter a valid Email.</span>');
      isValid = !1;
    }
    if (!phone) {
      $('#phone').after('<span class="error text-danger">Phone Number is required.</span>');
      isValid = !1;
    } else if (!phoneValid) {
      $('#phone').after('<span class="error text-danger">Phone Number must be 10 digits.</span>');
      isValid = !1;
    }
    if (!company || !textRegex.test(company)) {
      $('#company').after('<span class="error text-danger">Please enter a valid Company name.</span>');
      isValid = !1;
    }
    if (!product) {
      $('#productList').after('<span class="error text-danger">Please select a Product.</span>');
      isValid = !1;
    }
    if (!message) {
      $('#message').after('<span class="error text-danger">Message is required.</span>');
      isValid = !1;
    }
    if (!isValid) {
      $submitBtn.prop('disabled', !1).css('opacity', '1').text('Submit Now');
      return;
    }
    function getReferral() {
      const params = new URLSearchParams(window.location.search);
      if (params.get('src')) return params.get('src');
      if (params.get('utm_source')) return params.get('utm_source');
      const ref = document.referrer;
      if (ref) {
        const organicDomains = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'ask.', 'aol.'];
        if (organicDomains.some((domain) => ref.includes(domain))) return 'Organic Search';
        try {
          return new URL(ref).hostname;
        } catch (e) {}
      }
      return 'Direct Traffic';
    }
    let emailRef = getReferral();
    let emailBody = `
      <div style="font-family: Arial; color: #333; line-height: 1.6; margin: 40px auto; max-width: 500px;">
      <div style="text-align:center;">
      <img src="https://roadmapit.com/assets/img/icon/roadmap-logo_web-New.png" style="max-width: 180px;" alt="RoadmapIT Solutions ERP">
      </div>
      <h2 style="text-align:center; font-size:20px;">Product Enquiry from Roadmap Website</h2>
      <h3 style="background:#ff9103; color:#fff; padding:8px; font-size:18px; text-align:center;">Register Details</h3>
      <table style="width:100%; border-collapse:collapse; border:1px solid #ddd;">
      <tr style="background:#ffebd1;"><td style="padding:8px; border:1px solid #ddd;"><strong>Name</strong></td><td style="padding:8px; border:1px solid #ddd;">${name}</td></tr>
      <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px; border:1px solid #ddd;">${email}</td></tr>
      <tr style="background:#ffebd1;"><td style="padding:8px; border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px; border:1px solid #ddd;">${phone}</td></tr>
      <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Company</strong></td><td style="padding:8px; border:1px solid #ddd;">${company}</td></tr>
      <tr style="background:#ffebd1;"><td style="padding:8px; border:1px solid #ddd;"><strong>Product</strong></td><td style="padding:8px; border:1px solid #ddd;">${product}</td></tr>
      <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Message</strong></td><td style="padding:8px; border:1px solid #ddd;">${message}</td></tr>
      <tr style="background:#ffebd1;"><td style="padding:8px; border:1px solid #ddd;"><strong>Referral</strong></td><td style="padding:8px; border:1px solid #ddd;">${emailRef}</td></tr>
      </table>
      </div>
    `;
    let postData = { mail_sub: `${name} - Contact Form Inquiry`, mail_body: emailBody };
    $.ajax({
      url: 'https://webappqc.roadmaperp.com:8765/ords/rmqc27/web_email/contact',
      type: 'POST',
      data: JSON.stringify(postData),
      contentType: 'application/json',
      success: function () {
        Swal.fire({ icon: 'success', title: 'Submitted Successfully!', text: 'We will contact you soon.', confirmButtonColor: '#ff9e22' }).then(() => {
          $('#contactForm')[0].reset();
          $submitBtn.prop('disabled', !1).css('opacity', '1').text('Submit Now');
        });
      },
      error: function () {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!', confirmButtonColor: '#ff9e22' });
        $submitBtn.prop('disabled', !1).css('opacity', '1').text('Submit Now');
      },
    });
  });
  if ($('.trailCardsList')) {
    let trailCardData = [
      { imgSrc: '/assets/img/all-products/erp-icon.svg', imgAlt: 'Enterprise Resource Planning', title: 'Enterprise Resource Planning', link: '/signup/erp-signup.html' },
      { imgSrc: '/assets/img/all-products/erp-all-icon.svg', imgAlt: 'University/ College/ School ERP', title: 'University/ College/ School ERP', link: '/signup/eduErp-signup.html' },
      { imgSrc: '/assets/img/all-products/core-hr-icon.svg', imgAlt: 'CORE HR(Payroll+ESS)', title: 'CORE HR(Payroll+ESS)', link: '/signup/coreHr-signup.html' },
      { imgSrc: '/assets/img/all-products/crm-icon.svg', imgAlt: 'Customer Relationship Management', title: 'Customer Relationship Management', link: '/signup/crm-signup.html' },
      { imgSrc: '/assets/img/all-products/project-icon.svg', imgAlt: 'Project Management', title: 'Project Management', link: '/signup/project-signup.html' },
      { imgSrc: '/assets/img/all-products/fixed-asset-icon.svg', imgAlt: 'Fixed Asset', title: 'Fixed Asset', link: '/signup/fixedAsset-signup.html' },
      { imgSrc: '/assets/img/all-products/pos-icon.svg', imgAlt: 'POS/Billing', title: 'POS/Billing', link: '/signup/posBilling-signup.html' },
      { imgSrc: '/assets/img/all-products/restaurant-icon.svg', imgAlt: 'Restaurant Management', title: 'Restaurant Management', link: '/signup/restaurant-signup.html' },
      { imgSrc: '/assets/img/all-products/hotel-icon.svg', imgAlt: 'Hotel Management', title: 'Hotel Management', link: '/signup/hotel-signup.html' },
      { imgSrc: '/assets/img/all-products/Visitors-icon.svg', imgAlt: 'Visitor Management', title: 'Visitor Management', link: '/signup/visitors-signup.html' },
      { imgSrc: '/assets/img/all-products/event-icon.png', imgAlt: 'Event Management', title: 'Event Management', link: '/signup/event-signup.html' },
      { imgSrc: '/assets/img/all-products/facility-icon.svg', imgAlt: 'Facility Management', title: 'Facility Management', link: '/signup/facility-signup.html' },
      { imgSrc: '/assets/img/all-products/clinic-icon.svg', imgAlt: 'Clinic Management', title: 'Clinic Management', link: '/signup/clinic-signup.html' },
      { imgSrc: '/assets/img/all-products/warranty-icon.svg', imgAlt: 'Warranty Management', title: 'Warranty Management', link: '/signup/warranty-signup.html' },
      { imgSrc: '/assets/img/all-products/ticket-icon.png', imgAlt: 'Tickets Management', title: 'Tickets Management', link: '/signup/ticket-signup.html' },
      { imgSrc: '/assets/img/all-products/expenses-icon.svg', imgAlt: 'Expense Management', title: 'Expense Management', link: '/signup/expense-signup.html' },
      { imgSrc: '/assets/img/all-products/bookofKnowledge-icon.svg', imgAlt: 'Book of Knowledge', title: 'Book of Knowledge', link: '/signup/book-knowledge-signup.html' },
      { imgSrc: '/assets/img/all-products/learning-icon.svg', imgAlt: 'Learning Management', title: 'Learning Management', link: '/signup/learning-signup.html' },
      { imgSrc: '/assets/img/all-products/warehouse-icon.svg', imgAlt: 'Warehouse Management', title: 'Warehouse Management', link: '/signup/warehouse-signup.html' },
      { imgSrc: '/assets/img/all-products/distributor-icon.svg', imgAlt: 'Distributor Management', title: 'Distributor Management', link: '/signup/distributor-signup.html' },
      { imgSrc: '/assets/img/all-products/workshop-icon.svg', imgAlt: 'Workshop Management', title: 'Workshop Management', link: '/signup/workshop-signup.html' },
      { imgSrc: '/assets/img/all-products/plant-icon.svg', imgAlt: 'Plant Maintenance', title: 'Plant Maintenance', link: '/signup/plantMainten-signup.html' },
      { imgSrc: '/assets/img/all-products/supplier-icon.svg', imgAlt: 'Supplier Portal', title: 'Supplier Portal', link: '/signup/supplier-signup.html' },
      { imgSrc: '/assets/img/all-products/subContract-icon.svg', imgAlt: 'Subcontract Portal', title: 'Subcontract Portal', link: '/signup/subcontract-signup.html' },
      { imgSrc: '/assets/img/all-products/travel-icon.svg', imgAlt: 'Travel Management', title: 'Travel Management', link: '/signup/travel-signup.html' },
    ];
    let container = $('.trailCardsList');
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
  }
  $('.indus_link').on('shown.bs.tab', function (event) {
    event.target.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  });
  $.validator.addMethod(
    'pattern',
    function (value, element, param) {
      return this.optional(element) || param.test(value);
    },
    'Invalid format.'
  );
  $.validator.addMethod(
    'pattern',
    function (value, element, param) {
      return this.optional(element) || param.test(value);
    },
    'Invalid format.'
  );
  $('.cta-form').each(function () {
    $(this).validate({
      rules: {
        name: { required: true, minlength: 2 },
        email: { required: true, email: true },
        phone: { required: true, pattern: /^[0-9+\-\(\) ]{7,15}$/ },
        terms: { required: true },
      },
      messages: {
        name: { required: 'Please enter your name', minlength: 'At least 2 characters' },
        email: { required: 'Please enter your email', email: 'Enter a valid email' },
        phone: { required: 'Please enter your phone', pattern: 'Enter a valid phone number' },
        terms: { required: 'You must agree to the terms' },
      },
      errorPlacement: function (error, element) {
        error.addClass('text-danger');
        if (element.attr('name') === 'terms') {
          error.appendTo(element.closest('.form-check'));
        } else {
          error.insertAfter(element);
        }
      },
    });
  });
  $(document).on('submit', '.cta-form', function (e) {
    e.preventDefault();
    const form = $(this);
    if (form.data('submitting')) return;
    if (!form.valid()) return;
    form.data('submitting', true);
    const submitBtn = form.find('button[type="submit"]');
    const originalText = submitBtn.html();
    submitBtn.prop('disabled', true).html('Sending...');
    let name = form.find("[name='name']").val();
    let email = form.find("[name='email']").val();
    let phone = form.find("[name='phone']").val();
    let emailBody = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 100px auto; max-width: 500px;">
      <div style="text-align: center;">
        <img src="https://5.imimg.com/data5/SELLER/Default/2023/8/336830897/KS/AX/RB/18506272/roadmap-erp-on-cloud-system-500x500.png" style="max-width: 180px;">
      </div>
      <h2 style="text-align:center;">Product Enquiry from Roadmap Website</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td><b>Name</b></td><td>${name}</td></tr>
        <tr><td><b>Email</b></td><td>${email}</td></tr>
        <tr><td><b>Phone</b></td><td>${phone}</td></tr>
      </table>
    </div>
  `;
    $.ajax({
      url: 'https://webappqc.roadmaperp.com:8765/ords/rmqc27/web_email/contact',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        mail_sub: `${name} - Vendor Inquiries from Roadmap Website`,
        mail_body: emailBody,
      }),
      success: function () {
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          text: 'Your enquiry has been sent successfully.',
          confirmButtonColor: '#ff9e22',
        }).then(() => {
          form[0].reset();
          form.data('submitting', false);
          submitBtn.prop('disabled', false).html(originalText);
        });
      },
      error: function (xhr, status, error) {
        let errorMessage = 'Something went wrong. Please try again later.';
        if (xhr.responseJSON?.message) {
          errorMessage = xhr.responseJSON.message;
        } else if (xhr.responseText) {
          errorMessage = xhr.responseText;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonColor: '#ff9e22',
        });
        form.data('submitting', false);
        submitBtn.prop('disabled', false).html(originalText);
      },
    });
  });
  if ($('.Indus-buss-swiper').length) {
    var swiper = new Swiper('.Indus-buss-swiper', { observer: !1, observeParents: !1, resizeObserver: !1, slidesPerView: 1, spaceBetween: 10, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, breakpoints: { 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 4, spaceBetween: 40 } } });
  }
  var cookieHTML = `
      <!-- cookie policy start -->
      <div id="cookie-popup" class="cookie-popup">
        <div class="container-fluid cookie-popup-content">
          <div class="row justify-content-between align-items-center">
            <div class="col-md-8 col-12">
              <span>
                We use cookies to improve your experience. By using our site, you agree to our
                <a href="/privacy-policy.html" target="_blank" class="cookie-link">Cookie Policy</a>.
              </span>
            </div>
            <div class="col-md-4 col-12">
              <div class="d-flex justify-content-center">
                <div id="cookie-reject" class="border-btn-wrapper ms-2 mb-3 mb-md-0">
                  <a class="border-btn text-white" href="javascript:void(0)">No Thanks</a>
                </div>
                <div id="cookie-accept" class="bg-btn-wrapper ms-4 mb-3 mb-md-0">
                  <a class="bg-btn text-white" href="javascript:void(0)">Accept</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- cookie policy end -->
    `;
  $('body').append(cookieHTML);
  var popup = document.getElementById('cookie-popup');
  var btn = document.getElementById('cookie-accept');
  var btnReject = document.getElementById('cookie-reject');
  if (!localStorage.getItem('cookieAccepted')) {
    setTimeout(function () {
      popup.classList.add('show');
    }, 1200);
  }
  btn.addEventListener('click', function () {
    localStorage.setItem('cookieAccepted', 'yes');
    popup.classList.remove('show');
  });
  btnReject.addEventListener('click', function () {
    localStorage.setItem('cookieAccepted', 'no');
    popup.classList.remove('show');
  });
  if ($('.compliance-img1').length) {
    $('.compliance-img1').imageZoom({ zoom: 300 });
    $('.compliance-img2').imageZoom({ zoom: 300 });
    $('.compliance-img3').imageZoom({ zoom: 300 });
    $('.compliance-img4').imageZoom({ zoom: 300 });
  }
  if ($('.clients .clientList').length) {
    let visibleCount = 11;
    $('.clients .clientList').slice(visibleCount).hide();
    $('#toggleImages').click(function () {
      let $hidden = $('.clients .clientList:hidden');
      let isShowingAll = $hidden.length === 0;
      if (isShowingAll) {
        $('.clients .clientList').slice(visibleCount).slideUp();
        $(this).text('Show More');
      } else {
        $('.clients .clientList').slideDown();
        $(this).text('Show Less');
      }
    });
  }
  (function () {
    var gtmID = 'GTM-MGP8VLN';
    var gtmLoaded = !1;
    function loadGTM() {
      if (gtmLoaded) return;
      gtmLoaded = !0;
      var script = document.createElement('script');
      script.async = !0;
      script.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" + "new Date().getTime(),event:'gtm.js'});" + 'var f=d.getElementsByTagName(s)[0],' + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';" + "j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;" + 'f.parentNode.insertBefore(j,f);' + "})(window,document,'script','dataLayer','" + gtmID + "');";
      document.head.appendChild(script);
      var gtmCheck = setInterval(function () {
        if (window.dataLayer && window.dataLayer.push && window.google_tag_manager && window.google_tag_manager[gtmID]) {
          window.dataLayer.push({ event: 'gtmLazyLoaded' });
          dataLayer.push({ event: 'lead_generated', method: localStorage.getItem('lead_name'), source: localStorage.getItem('lead_source'), page_path: localStorage.getItem('lead_path') });
          clearInterval(gtmCheck);
        }
      }, 50);
      var noscript = document.createElement('noscript');
      noscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=' + gtmID + '" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
      if (document.body) {
        document.body.prepend(noscript);
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          document.body.prepend(noscript);
        });
      }
    }
    ['scroll', 'mousemove', 'touchstart', 'click'].forEach(function (event) {
      window.addEventListener(event, loadGTM, { once: !0 });
    });
  })();
  if (!window.gtagInitialized) {
    window.gtagInitialized = !0;
    const gtagScript = document.createElement('script');
    gtagScript.async = !0;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-0FSVLE0472';
    document.head.appendChild(gtagScript);
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-0FSVLE0472');
    `;
    document.head.appendChild(inlineScript);
  }
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', 'v593p3vlym');
  (function () {
    const urlParams = new URLSearchParams(window.location.search);
    const leadSource = urlParams.get('src') || 'direct';
    const leadPathLocation = window.location.pathname;
    window.trackLeadEvent = function (methodName) {
      try {
        localStorage.setItem('lead_name', methodName);
        localStorage.setItem('lead_source', leadSource);
        localStorage.setItem('lead_path', leadPathLocation);
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', { method: methodName, source: leadSource, page_path: leadPathLocation });
        } else {
          console.warn('gtag not initialized yet');
        }
      } catch (e) {
        console.error('Lead tracking error:', e);
      }
    };
    window.addEventListener('load', function () {
      const savedName = localStorage.getItem('lead_name') || 'unknown';
      const savedSource = localStorage.getItem('lead_source') || 'direct';
      const savedPath = localStorage.getItem('lead_path') || window.location.pathname;
    });
  })();
  var params = new URLSearchParams(window.location.search);
  var selectedProduct = params.get('product');
  if (selectedProduct) {
    selectedProduct = decodeURIComponent(selectedProduct).trim().toLowerCase();
    var $productList = $('#productList');
    var found = !1;
    $productList.find('option').each(function () {
      if ($(this).val().toLowerCase() === selectedProduct) {
        $(this).prop('selected', !0);
        found = !0;
        return !1;
      }
    });
    if (!found) {
      $productList.prop('selectedIndex', 0);
    }
  }
  if ($('.architectureZoom').length) {
    $('.architectureZoom').imageZoom({ zoom: 300 });
  }
  const API_KEY = 'AIzaSyBeFuPVFQkTtv2YbO4iJQ_nTtpwY6l9ATM';
  function parseDuration(iso) {
    const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    return { hours: match[1] ? parseInt(match[1]) : 0, minutes: match[2] ? parseInt(match[2]) : 0, seconds: match[3] ? parseInt(match[3]) : 0 };
  }
  function setImageAspectRatio($card, selector, thumb) {
    const img = new Image();
    img.src = thumb;
    img.onload = function () {
      const aspectRatio = img.height / img.width;
      $card.find(selector).css('height', `${$card.width() * aspectRatio}px`);
    };
  }
  function updateDuration(totals) {
    totals.minutes += Math.floor(totals.seconds / 60);
    totals.seconds %= 60;
    totals.hours += Math.floor(totals.minutes / 60);
    totals.minutes %= 60;
    return totals;
  }
  function isCacheEnabled() {
    return !1;
  }
  if (document.getElementById('playlistContainer') && !document.getElementById('videoPlayer')) {
    const playlistCustomData = { 'PL62P-8WHKrWajvXaiUkSSV9EAtKg8KIWs': { title: 'Setup', thumb: '/assets/img/video-thumbnail/1.jpg' }, 'PL62P-8WHKrWaeqTUoREhlDjxw8-nrrSLb': { title: 'Financials', thumb: '/assets/img/video-thumbnail/4.jpg' }, 'PL62P-8WHKrWa3WxCt5uxGBF87LCXXMOSx': { title: 'CRM', thumb: '/assets/img/video-thumbnail/2.jpg' }, 'PL62P-8WHKrWatK6t4gvwLspH3vZqZyg4z': { title: 'Purchase', thumb: '/assets/img/video-thumbnail/5.jpg' }, 'PL62P-8WHKrWb1JTuXxCi50P_gi31MiiSo': { title: 'Subcontracting', thumb: '/assets/img/video-thumbnail/3.jpg' }, 'PL62P-8WHKrWatJKLBV1-RuPJeOEgm7fEt': { title: 'Inventory Control', thumb: '/assets/img/video-thumbnail/6.jpg' }, 'PL62P-8WHKrWb9kJRmUcnelU9kGyQV4wJ0': { title: 'Sales', thumb: '/assets/img/video-thumbnail/10.jpg' }, 'PL62P-8WHKrWbAO9wLFVhPpIs7Wv3oNp8k': { title: 'PP & Shopfloor', thumb: '/assets/img/video-thumbnail/9.jpg' }, 'PL62P-8WHKrWYlkYeD9l596ALhFaz7kOaI': { title: 'Plant Maintenance', thumb: '/assets/img/video-thumbnail/7.jpg' }, 'PL62P-8WHKrWbWQncRsMCp8vLGcURgdsH5': { title: 'Payroll', thumb: '/assets/img/video-thumbnail/8.jpg' } };
    const playlistLinks = [
      { id: 'PL62P-8WHKrWajvXaiUkSSV9EAtKg8KIWs', link: '/tutorial/setup.html', category: 'setup' },
      { id: 'PL62P-8WHKrWaeqTUoREhlDjxw8-nrrSLb', link: '/tutorial/financials.html', category: 'financial' },
      { id: 'PL62P-8WHKrWa3WxCt5uxGBF87LCXXMOSx', link: '/tutorial/crm.html', category: 'crm' },
      { id: 'PL62P-8WHKrWatK6t4gvwLspH3vZqZyg4z', link: '/tutorial/purchase.html', category: 'purchasing' },
      { id: 'PL62P-8WHKrWb1JTuXxCi50P_gi31MiiSo', link: '/tutorial/subcontracting.html', category: 'subcontracting' },
      { id: 'PL62P-8WHKrWatJKLBV1-RuPJeOEgm7fEt', link: '/tutorial/inventory.html', category: 'inventory' },
      { id: 'PL62P-8WHKrWb9kJRmUcnelU9kGyQV4wJ0', link: '/tutorial/sales.html', category: 'sales' },
      { id: 'PL62P-8WHKrWbAO9wLFVhPpIs7Wv3oNp8k', link: '/tutorial/pp-shopfloor.html', category: 'pp-shopfloor' },
      { id: 'PL62P-8WHKrWYlkYeD9l596ALhFaz7kOaI', link: '/tutorial/plant-maintenance.html', category: 'plant-maintenance' },
      { id: 'PL62P-8WHKrWbWQncRsMCp8vLGcURgdsH5', link: '/tutorial/payroll.html', category: 'payroll' },
    ];
    const CACHE_KEY = 'erp_tutorial_data_v1';
    const CACHE_DURATION = 1000 * 60 * 60 * 1;
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    const now = Date.now();
    if (isCacheEnabled() && cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      renderPlaylists(cachedData.playlists);
    } else {
      fetchAllPlaylists().then((fetched) => {
        if (isCacheEnabled()) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, playlists: fetched }));
        }
      });
    }
    async function fetchAllPlaylists() {
      const result = [];
      for (const { id, link, category } of playlistLinks) {
        const data = await fetchPlaylist(id, link, category);
        if (data) result.push(data);
      }
      renderPlaylists(result);
      return result;
    }
    async function fetchPlaylist(playlistId, hrefLink, category) {
      const manual = playlistCustomData[playlistId];
      const title = manual?.title || 'Untitled Playlist';
      const thumb = manual?.thumb || '/assets/img/tutorials/default.jpg';
      const totals = await getPlaylistStats(playlistId);
      return { id: playlistId, link: hrefLink, category, title, thumb, videos: totals.videos, duration: `${totals.hours}hrs ${totals.minutes}min` };
    }
    async function getPlaylistStats(playlistId, pageToken = '', totals = { videos: 0, hours: 0, minutes: 0, seconds: 0 }) {
      const playlistData = await $.get('https://www.googleapis.com/youtube/v3/playlistItems', { part: 'contentDetails', maxResults: 50, playlistId, key: API_KEY, pageToken });
      totals.videos += playlistData.items.length;
      const videoIds = playlistData.items.map((item) => item.contentDetails.videoId).join(',');
      if (videoIds) {
        const videoData = await $.get('https://www.googleapis.com/youtube/v3/videos', { part: 'contentDetails', id: videoIds, key: API_KEY });
        videoData.items.forEach((video) => {
          const dur = parseDuration(video.contentDetails.duration);
          totals.hours += dur.hours;
          totals.minutes += dur.minutes;
          totals.seconds += dur.seconds;
        });
      }
      if (playlistData.nextPageToken) {
        return getPlaylistStats(playlistId, playlistData.nextPageToken, totals);
      }
      updateDuration(totals);
      return totals;
    }
    function renderPlaylists(list) {
      $('#playlistContainer').empty();
      list.forEach((item) => {
        const displayTitle = item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title;
        const $card = $(`
        <a onclick="trackLeadEvent('rerptutorial ${item.title}')" href="${item.link}" class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 px-2 product ${item.category}">
          <div class="card tutorialCard" data-playlist-id="${item.id}">
            <div class="imageCard" style="
              background-image: url('${item.thumb}');
              background-size: cover;
              background-position: center;
              border-radius: 8px;
              position: relative;
            "></div>
            <div class="card-footer">
              <span class="playlistCount">${item.videos} Videos</span>
              <span class="duration">${item.duration}</span>
            </div>
          </div>
        </a>
      `);
        $('#playlistContainer').append($card);
      });
    }
    $('.title-tab').click(function () {
      var value = $(this).attr('data-filter');
      $('.title-tab').removeClass('active');
      $(this).addClass('active');
      if (value === 'all') {
        $('.product').show();
      } else {
        $('.product')
          .not('.' + value)
          .hide();
        $('.product')
          .filter('.' + value)
          .show();
      }
    });
  }
  if (document.getElementById('playlistContainer') && document.getElementById('videoPlayer')) {
    const playlistMap = { 'setup.html': 'PL62P-8WHKrWajvXaiUkSSV9EAtKg8KIWs', 'financials.html': 'PL62P-8WHKrWaeqTUoREhlDjxw8-nrrSLb', 'subcontracting.html': 'PL62P-8WHKrWb1JTuXxCi50P_gi31MiiSo', 'inventory.html': 'PL62P-8WHKrWatJKLBV1-RuPJeOEgm7fEt', 'purchase.html': 'PL62P-8WHKrWatK6t4gvwLspH3vZqZyg4z', 'sales.html': 'PL62P-8WHKrWb9kJRmUcnelU9kGyQV4wJ0', 'crm.html': 'PL62P-8WHKrWa3WxCt5uxGBF87LCXXMOSx', 'pp-shopfloor.html': 'PL62P-8WHKrWbAO9wLFVhPpIs7Wv3oNp8k', 'plant-maintenance.html': 'PL62P-8WHKrWYlkYeD9l596ALhFaz7kOaI', 'payroll.html': 'PL62P-8WHKrWbWQncRsMCp8vLGcURgdsH5' };
    const currentPage = window.location.pathname.split('/').pop();
    const PLAYLIST_ID = playlistMap[currentPage] || playlistMap['setup.html'];
    const playlistContainer = document.getElementById('playlistContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    function playVideo(url, element) {
      videoPlayer.src = url;
      document.querySelectorAll('.video-item').forEach((el) => el.classList.remove('active'));
      element.classList.add('active');
    }
    async function loadPlaylist() {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        playlistContainer.innerHTML = '';
        data.items.forEach((item, index) => {
          const { videoId } = item.snippet.resourceId;
          const title = item.snippet.title;
          const thumbnail = item.snippet.thumbnails.medium.url;
          const videoItem = document.createElement('div');
          videoItem.className = 'video-item';
          videoItem.onclick = () => playVideo(`https://www.youtube.com/embed/${videoId}`, videoItem);
          if (index === 0) {
            videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
            videoItem.classList.add('active');
          }
          videoItem.innerHTML = `
          <img src="${thumbnail}" alt="${title}" />
          <div class="video-title">${title}</div>
        `;
          playlistContainer.appendChild(videoItem);
        });
      } catch (error) {
        playlistContainer.innerHTML = '<p>Error loading playlist.</p>';
        console.error('YouTube API Error:', error);
      }
    }
    loadPlaylist();
  }
  const verticalsPlaylists = [
    { id: 'PL62P-8WHKrWYYgv-7EiZ_6qVp-VD9jx5z', title: 'valves', link: '/verticals-videos/valves.html' },
    { id: 'PL62P-8WHKrWYk4xGuqXhWe-rSFd-S9obJ', title: 'Rubber Industry', link: '/verticals-videos/rubber-industry.html' },
  ];
  if (document.getElementById('verticalPlaylistContainer')) {
    verticalsPlaylists.forEach((pl) => {
      fetchVerticalPlaylist(pl.id, pl.title, pl.link);
    });
  }
  function fetchVerticalPlaylist(playlistId, listTitle, hrefLink) {
    return $.get('https://www.googleapis.com/youtube/v3/playlists', { part: 'snippet,contentDetails', id: playlistId, key: API_KEY }).then((data) => {
      if (!data.items.length) return;
      const info = data.items[0].snippet;
      const title = info.title;
      const thumb = info.thumbnails.medium.url;
      const displayTitle = title.length > 25 ? title.substring(0, 25) + '...' : title;
      const $card = $(`
      <a onclick="trackLeadEvent('rverticals ${listTitle}')" href="${hrefLink}" class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 px-2">
        <div class="card tutorialCard verticalTutorialCard" data-playlist-id="${playlistId}">
          <div class="imageCard verticalImageCard" style="background-image: url('${thumb}'); background-size: cover; background-position: center; border-radius: 8px; position: relative;"></div>
          <div class="card-footer">
            <span class="playlistCount verticalPlaylistCount">Loading...</span>
            <span class="duration verticalDuration">Loading...</span>
          </div>
        </div>
      </a>
    `);
      $('#verticalPlaylistContainer').append($card);
      setImageAspectRatio($card, '.verticalImageCard', thumb);
      return fetchVerticalPlaylistItems($card, playlistId);
    });
  }
  function fetchVerticalPlaylistItems($card, playlistId, pageToken = '', totals = { videos: 0, hours: 0, minutes: 0, seconds: 0 }) {
    return $.get('https://www.googleapis.com/youtube/v3/playlistItems', { part: 'contentDetails', maxResults: 50, playlistId, key: API_KEY, pageToken }).then((data) => {
      totals.videos += data.items.length;
      const videoIds = data.items.map((item) => item.contentDetails.videoId).join(',');
      if (!videoIds) return;
      return $.get('https://www.googleapis.com/youtube/v3/videos', { part: 'contentDetails', id: videoIds, key: API_KEY }).then((videoData) => {
        videoData.items.forEach((video) => {
          const dur = parseDuration(video.contentDetails.duration);
          totals.hours += dur.hours;
          totals.minutes += dur.minutes;
          totals.seconds += dur.seconds;
        });
        updateDuration(totals);
        $card.find('.verticalPlaylistCount').text(`${totals.videos} Videos`);
        $card.find('.verticalDuration').text(`${totals.hours}hrs ${totals.minutes}min`);
        if (data.nextPageToken) {
          return fetchVerticalPlaylistItems($card, playlistId, data.nextPageToken, totals);
        }
      });
    });
  }
  if (document.getElementById('verticalPlaylistContainer') && document.getElementById('verticalVideoPlayer')) {
    const playlistMap = { 'valves.html': 'PL62P-8WHKrWYYgv-7EiZ_6qVp-VD9jx5z', 'rubber-industry.html': 'PL62P-8WHKrWYk4xGuqXhWe-rSFd-S9obJ' };
    const currentPage = window.location.pathname.split('/').pop();
    const PLAYLIST_ID = playlistMap[currentPage] || playlistMap['valves.html'];
    const playlistContainer = document.getElementById('verticalPlaylistContainer');
    const videoPlayer = document.getElementById('verticalVideoPlayer');
    function playVideo(url, element) {
      videoPlayer.src = url;
      document.querySelectorAll('.video-item').forEach((el) => el.classList.remove('active'));
      element.classList.add('active');
    }
    async function loadPlaylist() {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        playlistContainer.innerHTML = '';
        data.items.forEach((item, index) => {
          const { videoId } = item.snippet.resourceId;
          const title = item.snippet.title;
          const thumbnail = item.snippet.thumbnails.medium.url;
          const videoItem = document.createElement('div');
          videoItem.className = 'video-item';
          videoItem.onclick = () => playVideo(`https://www.youtube.com/embed/${videoId}`, videoItem);
          if (index === 0) {
            videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
            videoItem.classList.add('active');
          }
          videoItem.innerHTML = `
          <img src="${thumbnail}" alt="${title}" />
          <div class="video-title">${title}</div>
        `;
          playlistContainer.appendChild(videoItem);
        });
      } catch (error) {
        playlistContainer.innerHTML = '<p>Error loading playlist.</p>';
        console.error('YouTube API Error:', error);
      }
    }
    loadPlaylist();
  }
  $.getJSON('/client-videos.json', function (videos) {
    $.each(videos, function (index, video) {
      const videoCard = `
        <div class="col-md-3 col-sm-6 col-12 mb-30">
          <a id="play-video" data-video="${video.url}" href="javascript:void(0)">
            <div class="video-list card border-0 shadow rounded-4">
              <div class="cardImg" style="aspect-ratio: 2 / 1.15;align-content: center;background: antiquewhite;">
                <h6 class="fw-bold text-uppercase text-center text-sb-orange px-2" style="font-size:0.80rem;">${video.title}</h6>
              </div>
              <div class="card-body">
                <p class="card-text text-sm video-txt">${video.title}</p>
              </div>
              <div class="border-btn-wrapper w-fit mx-3 mt-2 mb-3">
                <a class="border-btn text-sm py-2 px-3" id="play-video" data-video="${video.url}" href="javascript:void(0)">Watch Now!</a>
              </div>
            </div>
          </a>
        </div>
      `;
      $('#clientVideoContainer').append(videoCard);
    });
    initVideoModal();
  }).fail(function () {
    console.error('Error loading JSON file.');
  });
  function initVideoModal() {
    const playBtns = document.querySelectorAll('#play-video');
    playBtns.forEach((playBtn) => {
      playBtn.addEventListener('click', () => {
        if (document.getElementById('video-modal')) return;
        let videoUrl = playBtn.getAttribute('data-video');
        let vWrapper = document.createElement('div');
        vWrapper.classList.add('v-wrapper', 'v-modal');
        vWrapper.setAttribute('id', 'video-modal');
        vWrapper.innerHTML = `
        <button id="v-close" class="v-close-btn">X</button>
        <div class="v-player video-ratio">
          <iframe class="h-full w-full"
            src="${videoUrl}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe>
        </div>
      `;
        document.body.appendChild(vWrapper);
        const vCloseBtn = vWrapper.querySelector('.v-close-btn');
        vCloseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          vWrapper.remove();
        });
        vWrapper.addEventListener('dblclick', (e) => {
          if (e.target === vWrapper) {
            vWrapper.remove();
          }
        });
      });
    });
  }
  document.addEventListener('DOMContentLoaded', initVideoModal);
  const pdfGroups = [
    { group: 'CRM Docs', files: [{ name: 'CRM Brochure', url: '/assets/img/Brochures/Roadmap CRM Brochure.pdf' }] },
    {
      group: 'ERP Docs',
      files: [
        { name: 'ERP Brochure', url: '/assets/img/Brochures/Roadmap ERP - Brochure.pdf' },
        { name: 'ERP Pamphlet', url: '/assets/img/Brochures/Roadmap ERP - Phamlet.pdf' },
        { name: 'Roadmap ERP-USP', url: '/assets/img/Brochures/Roadmap ERP - USP.pdf' },
      ],
    },
    { group: 'FSM Docs', files: [{ name: 'Field Services', url: '/assets/img/Brochures/Roadmap Field Service Management - Brochure.pdf' }] },
    { group: 'Fixed Assets Docs', files: [{ name: 'Fixed Asset', url: '/assets/img/Brochures/Roadmap Fixed Asset Management Software - Brochure.pdf' }] },
  ];
  const accordionContainer = document.getElementById('accordionExample');
  const pdfFrame = document.getElementById('pdf-frame');
  if (accordionContainer && pdfFrame) {
    pdfGroups.forEach((group, groupIndex) => {
      const itemId = `collapse${groupIndex}`;
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      let pdfListHTML = '';
      group.files.forEach((file) => {
        pdfListHTML += `
              <li class="p-1">
                <button class="load-pdf" data-url="${file.url}">
                  ${file.name}
                </button>
              </li>`;
      });
      accordionItem.innerHTML = `
            <h2 class="accordion-header" id="heading${groupIndex}">
              <button class="accordion-button ${groupIndex !== 0 ? 'collapsed' : ''}"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#${itemId}"
                      aria-expanded="${groupIndex === 0 ? 'true' : 'false'}"
                      aria-controls="${itemId}">
                ${group.group}
              </button>
            </h2>
            <div id="${itemId}"
                 class="accordion-collapse collapse ${groupIndex === 0 ? 'show' : ''}"
                 aria-labelledby="heading${groupIndex}"
                 data-bs-parent="#accordionExample">
              <div class="accordion-body p-1">
                <ul class="list-group">
                  ${pdfListHTML}
                </ul>
              </div>
            </div>
          `;
      accordionContainer.appendChild(accordionItem);
    });
  }
  $(document).on('click', '.load-pdf', function () {
    const url = $(this).data('url');
    if (pdfFrame) {
      pdfFrame.src = url;
      $('.load-pdf').removeClass('pdf-active');
      $(this).addClass('pdf-active');
    } else {
      console.warn('PDF frame (iframe) not found!');
    }
  });
  if (pdfFrame && pdfGroups[0]?.files[0]) {
    pdfFrame.src = pdfGroups[0].files[0].url;
    const firstBtn = document.querySelector('.load-pdf');
    if (firstBtn) {
      firstBtn.classList.add('pdf-active');
    }
  }
  const itemsPerPage = 4;
  let currentPage = 1;
  let totalItems = 0;
  let totalPages = 0;
  let $items;
  function displayItems(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    $items.hide().slice(start, end).show();
    updatePagination();
  }
  function updatePagination() {
    const $pagination = $('#page-numbers');
    $pagination.empty();
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = $('<button>')
        .addClass('pagination-number')
        .text(i)
        .attr('data-page', i)
        .toggleClass('active', i === currentPage)
        .click(function () {
          currentPage = parseInt($(this).attr('data-page'));
          displayItems(currentPage);
        });
      $pagination.append(pageBtn);
    }
    $('#prev').prop('disabled', currentPage === 1);
    $('#next').prop('disabled', currentPage === totalPages);
  }
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
  function renderBlogs(blogs) {
    const $container = $('#blog-container');
    $container.empty();
    $.each(blogs, function (index, blog) {
      const blogCard = `
        <div data-aos="fade-up" class="col-md-5 rounded-[20px] overflow-hidden w-full border-x-2 border-b-2 border-[#F5F5F5] px-0 mb-80 blog-col">
          <div class="relative w-full">
            <img src="${blog.image}" alt="${blog.title}" class="w-full">
          </div>
          <div class="w-full px-3 py-3 sm:p-10">
            <div class="flex gap-3 flex-wrap">
              <div class="flex h-fit gap-1 items-center text-paragraph">
                <i class="bi bi-person-fill text-xs"></i>
                <p class="text-xs mb-0">Roadmap</p>
              </div>
              <div class="flex h-fit gap-1 items-center text-paragraph">
                <i class="bi bi-calendar-check-fill text-xs"></i>
                <p class="text-xs mb-0">${blog.date}</p>
              </div>
            </div>
            <h1 class="fs-4 fw-bold mt-30 text-capitalize">${blog.title}</h1>
            <div class="border-t border-[#F5F5F5] row pt-20">
              <div class="col-6 flex h-fit w-fit items-center">
                <div class="border-btn-wrapper rounded-[20px]">
                  <a class="border-btn flex h-fit items-center gap-2.5 px-3 py-2 rounded-[20px]" href="${blog.url}">
                    Read More
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6875 7.71484L8.6875 12.7148C8.5 12.9023 8.25 12.9961 8 12.9961C7.71875 12.9961 7.46875 12.9023 7.28125 12.7148C6.875 12.3398 6.875 11.6836 7.28125 11.3086L10.5625 7.99609H1C0.4375 7.99609 0 7.55859 0 6.99609C0 6.46484 0.4375 5.99609 1 5.99609H10.5625L7.28125 2.71484C6.875 2.33984 6.875 1.68359 7.28125 1.30859C7.65625 0.902344 8.3125 0.902344 8.6875 1.30859L13.6875 6.30859C14.0938 6.68359 14.0938 7.33984 13.6875 7.71484Z" fill="currentColor"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="col-6 flex gap-1 px-1">
                <a href="https://www.instagram.com/roadmapitofficial/" target="_blank" class="text-heading hover:text-white transition-all duration-300 border rounded-full w-[40px] h-[40px] flex justify-center items-center border-heading/20 hover:bg-sb-orange"><i class="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/roadmap-solutions/" target="_blank" class="text-heading hover:text-white transition-all duration-300 border rounded-full w-[40px] h-[40px] flex justify-center items-center border-heading/20 hover:bg-sb-orange"><i class="bi bi-linkedin"></i></a>
                <a href="https://twitter.com/Roadmaperp" target="_blank" class="text-heading hover:text-white transition-all duration-300 border rounded-full w-[40px] h-[40px] flex justify-center items-center border-heading/20 hover:bg-sb-orange"><i class="bi bi-twitter-x"></i></a>
                <a href="https://www.facebook.com/Roadmap-IT-Solutions-106340462238576" target="_blank" class="text-heading hover:text-white transition-all duration-300 border rounded-full w-[40px] h-[40px] flex justify-center items-center border-heading/20 hover:bg-sb-orange"><i class="bi bi-facebook fs-5"></i></a>
              </div>
            </div>
          </div>
        </div>`;
      $container.append(blogCard);
    });
    $items = $('.blog-row .blog-col');
    totalItems = $items.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    displayItems(currentPage);
  }
  $.getJSON('/blog-list.json', function (blogs) {
    const reversedBlogs = [...blogs].reverse();
    if ($('#blog-Mainpg').length) {
      renderBlogs(reversedBlogs.slice(0, 3));
    } else {
      renderBlogs(reversedBlogs);
    }
  });
});
