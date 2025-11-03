// tokenomics.js - Interactive features for tokenomics page

document.addEventListener('DOMContentLoaded', () => {
  initTokenomicsInteractivity();
});

/**
 * Initialize all interactive features for the tokenomics page
 */
function initTokenomicsInteractivity() {
  initChartInteractivity();
  initTableHighlighting();
  initRoadmapInteractivity();
  initSmoothScroll();
}

/**
 * Add interactivity to the distribution chart segments
 */
function initChartInteractivity() {
  const chartSegments = document.querySelectorAll('.chart-segment');
  const tableRows = document.querySelectorAll('[data-category]');

  // Highlight chart segment and table row on hover
  chartSegments.forEach((segment) => {
    const category = segment.getAttribute('data-category');
    const correspondingRow = document.querySelector(
      `tr[data-category="${category}"]`
    );

    segment.addEventListener('mouseenter', () => {
      segment.style.opacity = '1';
      segment.style.strokeWidth = '7';
      if (correspondingRow) {
        correspondingRow.style.backgroundColor = '#fef2f2';
      }
    });

    segment.addEventListener('mouseleave', () => {
      segment.style.opacity = '';
      segment.style.strokeWidth = '';
      if (correspondingRow) {
        correspondingRow.style.backgroundColor = '';
      }
    });
  });

  // Highlight chart segment when hovering over table row
  tableRows.forEach((row) => {
    const category = row.getAttribute('data-category');
    const correspondingSegment = document.querySelector(
      `.chart-segment[data-category="${category}"]`
    );

    row.addEventListener('mouseenter', () => {
      row.style.backgroundColor = '#fef2f2';
      if (correspondingSegment) {
        correspondingSegment.style.opacity = '1';
        correspondingSegment.style.strokeWidth = '7';
      }
    });

    row.addEventListener('mouseleave', () => {
      row.style.backgroundColor = '';
      if (correspondingSegment) {
        correspondingSegment.style.opacity = '';
        correspondingSegment.style.strokeWidth = '';
      }
    });
  });
}

/**
 * Add hover effects to table rows
 */
function initTableHighlighting() {
  const tableRows = document.querySelectorAll('.table-row');

  tableRows.forEach((row) => {
    row.addEventListener('mouseenter', function () {
      this.style.transition = 'background-color 0.2s ease';
    });
  });
}

/**
 * Add interactivity to roadmap timeline
 */
function initRoadmapInteractivity() {
  const roadmapCircles = document.querySelectorAll('.roadmap-circle');

  roadmapCircles.forEach((circle) => {
    const year = circle.getAttribute('data-year');

    circle.addEventListener('click', () => {
      // Highlight the clicked circle
      roadmapCircles.forEach((c) => {
        c.setAttribute('stroke-width', '3');
        c.setAttribute('r', '7');
      });
      circle.setAttribute('stroke-width', '4');
      circle.setAttribute('r', '9');

      // Scroll to top to show the roadmap section
      const roadmapSection = document.getElementById('roadmap');
      if (roadmapSection) {
        roadmapSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Show a brief tooltip or animation
      showRoadmapTooltip(year);
    });

    circle.addEventListener('mouseenter', () => {
      circle.style.cursor = 'pointer';
    });
  });
}

/**
 * Show a brief tooltip for roadmap year
 */
function showRoadmapTooltip(year) {
  // Remove existing tooltip if any
  const existingTooltip = document.querySelector('.roadmap-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.className =
    'roadmap-tooltip fixed bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 pointer-events-none';
  tooltip.textContent = `Année ${year} - Cliquez pour voir les détails`;
  tooltip.style.top = '20px';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translateX(-50%)';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 0.3s ease';

  document.body.appendChild(tooltip);

  // Animate in
  setTimeout(() => {
    tooltip.style.opacity = '1';
  }, 10);

  // Remove after 2 seconds
  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      tooltip.remove();
    }, 300);
  }, 2000);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  // Smooth scroll is already handled by main.js, but we can add custom behavior here if needed
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 100; // Account for fixed header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Add a brief highlight animation to the target section
        target.style.transition = 'background-color 0.5s ease';
        target.style.backgroundColor = '#fef2f2';
        setTimeout(() => {
          target.style.backgroundColor = '';
        }, 1000);
      }
    });
  });
}

/**
 * Add number counting animation to KPI cards
 */
function animateKPINumbers() {
  const kpiValues = document.querySelectorAll('.kpi .v');

  kpiValues.forEach((element) => {
    const text = element.textContent.trim();
    // Only animate if it's a number
    if (text.match(/^\d+[\s,.]*\d*$/)) {
      const finalValue = parseInt(text.replace(/\s/g, ''), 10);
      if (!isNaN(finalValue)) {
        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            element.textContent = finalValue.toLocaleString('fr-CH');
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(currentValue).toLocaleString('fr-CH');
          }
        }, stepTime);
      }
    }
  });
}

// Initialize number animation when KPIs come into view
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateKPINumbers();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const kpiSection = document.querySelector('[aria-label="Synthèse"]');
  if (kpiSection) {
    observer.observe(kpiSection);
  }
}

