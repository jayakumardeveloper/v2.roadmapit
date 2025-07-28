let vWrapper = document.createElement("div");

vWrapper.classList.add("v-wrapper");
vWrapper.classList.add("v-modal");
vWrapper.setAttribute("id", "video-modal");
vWrapper.innerHTML = ` <button id="v-close" class="v-close-btn">X</button> <div class="v-player video-ratio"> <iframe class="h-full w-full" src="https://www.youtube.com/embed/fzWzPXEhPvA?si=2wd3NcmWduVMlgB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen > </iframe> </div>`;

const playBtns = document.querySelectorAll("#play-video");

playBtns.forEach(playBtn => {
  playBtn.addEventListener("click", () => {
    document.body.appendChild(vWrapper);
    const videoModal = document.getElementById("video-modal");
    document.getElementById("v-close").addEventListener("click", () => {
      videoModal.remove();
    });
    videoModal.addEventListener("click", () => {
      videoModal.remove();
    });
  });
});

// parallax

function mouseMoveParallax(selectorId) {
  let scene = document.getElementById(`${selectorId}`);
  if (scene) {
    let parallaxInstance = new Parallax(scene);
  }
}

mouseMoveParallax("parallax-mouse");

// dynamic height for vertical swiper

const h2VerticalSwiper = document.querySelector("#h2-vertical-swiper");
if (h2VerticalSwiper) {
  h2VerticalSwiper.style.height =
    h2VerticalSwiper.firstElementChild.firstElementChild.clientHeight + "px";
}

// toggle options

const optionInput = document.getElementById("option");

if (optionInput) {
  optionInput.addEventListener("focus", (e) => {
    e.target.nextElementSibling.classList.remove("hidden");
  });
  optionInput.addEventListener("blur", (e) => {
    e.target.nextElementSibling.classList.add("hidden");
  });
}

// Dropdown hover
document.addEventListener('DOMContentLoaded', function () {
  // Select all child elements that follow a .nav-link.group_item
  const childElements = document.querySelectorAll('.nav-link.group_item + div');
  const childElements_mobs = document.querySelectorAll('.relative.group .group-h-auto, .relative.sub-group .sub-group-h-auto');

  childElements.forEach(child => {
    // Add mouseenter event listener to each child element
    child.addEventListener('mouseenter', function () {
      // Find the closest parent with class 'group' and add the 'group-hover' class
      const parentElement = this.closest('.group'); // .group is the closest parent
      if (parentElement) {
        // Find the .nav-link.group_item within this parent and add 'group-hover' class
        const navLink = parentElement.querySelector('.nav-link.group_item');
        if (navLink) {
          navLink.classList.add('groupItem');
          navLink.classList.add('groupItem', 'beforeAction');
        }
      }
    });

    // Add mouseleave event listener to each child element
    child.addEventListener('mouseleave', function () {
      // Find the closest parent with class 'group' and remove the 'group-hover' class
      const parentElement = this.closest('.group'); // .group is the closest parent
      if (parentElement) {
        // Find the .nav-link.group_item within this parent and remove 'group-hover' class
        const navLink = parentElement.querySelector('.nav-link.group_item');
        if (navLink) {
          navLink.classList.remove('groupItem');
          navLink.classList.remove('groupItem', 'beforeAction');
        }
      }
    });
  });
  childElements_mobs.forEach(child => {
    // Add mouseenter event listener to each child element
    child.addEventListener('mouseenter', function () {
      // Find the closest parent with class 'group' and add the 'group-hover' class
      const parentElement = this.closest('.group'); // .group is the closest parent
      if (parentElement) {
        // Find the .nav-link.group_item within this parent and add 'group-hover' class
        const navLink = parentElement.querySelector('.nav-link.group_item');
        if (navLink) {
          navLink.classList.add('groupItem');
          navLink.classList.add('groupItem', 'beforeAction');
        }
      }
    });

    // Add mouseleave event listener to each child element
    child.addEventListener('mouseleave', function () {
      // Find the closest parent with class 'group' and remove the 'group-hover' class
      const parentElement = this.closest('.group'); // .group is the closest parent
      if (parentElement) {
        // Find the .nav-link.group_item within this parent and remove 'group-hover' class
        const navLink = parentElement.querySelector('.nav-link.group_item');
        if (navLink) {
          navLink.classList.remove('groupItem');
          navLink.classList.remove('groupItem', 'beforeAction');
        }
      }
    });
  });
  // BS tooltip
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: 'hover',
      container: 'body'
    });
  });
});