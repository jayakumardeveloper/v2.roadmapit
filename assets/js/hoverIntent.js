document.addEventListener('DOMContentLoaded', function () {
    let tooltipSpan = null;
    let shiftX = 8;
    let shiftY = 10;
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
    function showTooltip(e) {
        const target = e.target.closest('a');
        if (!target) return;
        // Exclude buttons or toolbar links
        if (target.classList.contains('button') || target.closest('.toolbar')) return;
        tooltipSpan = document.createElement('span');
        tooltipSpan.className = 'link__type';
        const tooltipText = target.getAttribute('data-tooltip') || target.getAttribute('href');
        tooltipSpan.textContent = tooltipText;
        document.body.appendChild(tooltipSpan);
        updatePosition(e);
        document.addEventListener('mousemove', updatePosition);
    }
    function hideTooltip() {
        if (tooltipSpan) {
            tooltipSpan.remove();
            tooltipSpan = null;
            document.removeEventListener('mousemove', updatePosition);
        }
    }
    // Attach event listeners to all links and tooltip elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a')) showTooltip(e);
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a')) hideTooltip();
    });
});