(function () {
  let tooltipSpan = null;
  let shiftX = 8;
  let shiftY = 10;
  function updatePosition(event) {
    if (!tooltipSpan || !event) return;
    let left = event.clientX + shiftX;
    if (left + tooltipSpan.offsetWidth > document.documentElement.clientWidth) {
      left = Math.max(0, event.clientX - shiftX - tooltipSpan.offsetWidth);
    }
    tooltipSpan.style.left = left + 'px';
    let top = event.clientY + shiftY;
    if (top + tooltipSpan.offsetHeight > document.documentElement.clientHeight) {
      top = Math.max(0, event.clientY - shiftY - tooltipSpan.offsetHeight);
    }
    tooltipSpan.style.top = top + 'px';
  }
  function onOver(event) {
    const target = event.target;
    if (!target || !target.closest) return;
    if (target.tagName === 'A' && target.closest('.toolbar')) return;
    if (target.classList.contains('button')) return;
    tooltipSpan = document.createElement('span');
    tooltipSpan.className = 'link__type';
    if (target.getAttribute('data-tooltip')) {
      tooltipSpan.innerHTML = target.getAttribute('data-tooltip');
      tooltipSpan.setAttribute('data-tooltip', '1');
    } else {
      tooltipSpan.setAttribute('data-url', target.getAttribute('href') || '');
    }
    document.body.append(tooltipSpan);
    updatePosition(event);
    document.addEventListener('mousemove', updatePosition);
  }
  function onOut() {
    if (!tooltipSpan) return;
    document.removeEventListener('mousemove', updatePosition);
    tooltipSpan.remove();
    tooltipSpan = null;
  }
  // Check if hoverintent is available
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof hoverintent === 'function') {
      hoverintent(document.querySelectorAll('a,[data-tooltip]'), onOver, onOut);
    } else {
      console.error('hoverIntent not loaded');
    }
  });
})();