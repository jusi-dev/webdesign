const fadeInAni = document.querySelectorAll(".fadeInAni");

const animationObserver = new IntersectionObserver((entries) => {
    // Check if element is intersecting with the viewport
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__fadeInUp');
        entry.target.style.visibility = 'visible';
      }
    }
  }, {
    rootMargin: '-5%'
  });

fadeInAni.forEach(element => animationObserver.observe(element));