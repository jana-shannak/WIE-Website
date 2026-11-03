document.addEventListener('DOMContentLoaded', () => {
  // 1. SMOOTH FAQ ACCORDION ANIMATION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    if (!summary) return;
    
    summary.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = item.hasAttribute('open');
      
      if (isOpen) {
        // Animate closing
        const startHeight = item.getBoundingClientRect().height;
        item.style.height = startHeight + 'px';
        item.style.overflow = 'hidden';
        item.style.transition = 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
          item.style.height = summary.getBoundingClientRect().height + 'px';
        });
        
        setTimeout(() => {
          item.removeAttribute('open');
          item.style.height = '';
          item.style.overflow = '';
          item.style.transition = '';
        }, 350);
      } else {
        // Animate opening
        item.setAttribute('open', '');
        const startHeight = summary.getBoundingClientRect().height;
        const endHeight = item.getBoundingClientRect().height;
        
        item.style.height = startHeight + 'px';
        item.style.overflow = 'hidden';
        item.style.transition = 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
          item.style.height = endHeight + 'px';
        });
        
        setTimeout(() => {
          item.style.height = '';
          item.style.overflow = '';
          item.style.transition = '';
        }, 350);
      }
    });
  });

  // 2. SCROLL REVEAL ANIMATION (Fade in elements as they scroll into view)
  const revealElements = document.querySelectorAll('.cards, .member, .leader, .third_row_cards');
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));

  // 3. DRAGGABLE MOUSE SLIDER FOR ACTIVITIES
  const slider = document.querySelector('.slider');
  if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      slider.scrollLeft = scrollLeft - walk;
    });
    slider.style.cursor = 'grab';
  }

  // 4. FLOATING BACK-TO-TOP BUTTON
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  Object.assign(backToTopBtn.style, {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#c260fe',
    color: 'white',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
    zIndex: '1000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
  });

  backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
  });
});


