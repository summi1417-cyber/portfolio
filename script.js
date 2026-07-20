document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const form = document.querySelector('.contact-form');
  const formStatus = document.querySelector('.form-status');

  window.setTimeout(() => {
    loader?.classList.add('is-hidden');
  }, 1200);

  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('i').className = 'fas fa-sun';
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
    themeToggle.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  });

  mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((nav) => nav.classList.toggle('active', nav.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const typed = document.getElementById('typed');
  if (typed && window.Typed) {
    new Typed('#typed', {
      strings: ['modern, responsive websites.', 'interactive web experiences.', 'beautiful interfaces with clean code.'],
      typeSpeed: 70,
      backSpeed: 35,
      backDelay: 1200,
      loop: true,
    });
  }

  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 120 });
  }

  if (window.gsap) {
    gsap.from('.hero-content > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out' });
    gsap.from('.hero-visual > *', { y: 30, opacity: 0, duration: 0.9, delay: 0.1, stagger: 0.2, ease: 'power3.out' });
  }

  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.18,
    });
  }

  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  const updateCursor = (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    outline.style.left = `${e.clientX}px`;
    outline.style.top = `${e.clientY}px`;
  };
  if (dot && outline && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('mousemove', updateCursor);
    document.querySelectorAll('a, button, input, textarea, .project-card, .service-card').forEach((el) => {
      el.addEventListener('mouseenter', () => outline.style.transform = 'translate(-50%, -50%) scale(1.2)');
      el.addEventListener('mouseleave', () => outline.style.transform = 'translate(-50%, -50%) scale(1)');
    });
  }

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('mousemove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  const counters = document.querySelectorAll('.counter-value');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.dataset.target);
          const duration = 1200;
          const startTime = performance.now();
          const step = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = target === 100 ? `${value}%` : `${value}${target === 2 ? '+' : '+'}`;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.8 }
  );
  counters.forEach((counter) => counterObserver.observe(counter));

  const progressRings = document.querySelectorAll('.progress-ring');
  const ringObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ring = entry.target;
          const value = ring.dataset.progress;
          ring.style.setProperty('--value', value);
          ringObserver.unobserve(ring);
        }
      });
    },
    { threshold: 0.65 }
  );
  progressRings.forEach((ring) => ringObserver.observe(ring));

  const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;

  const showSlide = (index) => {
    testimonials.forEach((card, cardIndex) => {
      card.classList.toggle('active', cardIndex === index);
    });
  };

  prevBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
  });

  nextBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  });

  window.setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }, 6000);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = 'Thanks for reaching out! I will reply shortly.';
    form.reset();
  });

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });

  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 1000 } },
        color: { value: ['#6c63ff', '#00d9ff', '#8b5cf6'] },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 160, color: '#6c63ff', opacity: 0.16, width: 1 },
        move: { enable: true, speed: 1.5, random: true }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 80, duration: 0.4 }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }
});
