/* ============================================
   PORTFOLIO — MAIN JAVASCRIPT
   This script controls all dynamic interactions:
   - Interactive Particle Canvas Simulation
   - Animated Typewriter Title Text
   - IntersectionObserver Scroll Reveal Animations
   - Sticky Navbar & Dynamic Active Navigation Links
   - Smooth Page Scrolling
   - Skill Progress Bar Animations
   - Animated Stat Metric Counters
   - Contact Form Input Validation & Submission State
   ============================================ */

// Wait for the DOM HTML content to fully load before initializing scripts
document.addEventListener('DOMContentLoaded', () => {
  initParticles();       // Starts the HTML5 canvas interactive particle background
  initTypingEffect();    // Starts the typewriter text cycling animation in hero section
  initScrollReveal();    // Initializes intersection observers for scroll animations
  initNavbar();          // Configures sticky nav state and scroll active link detection
  initSmoothScroll();    // Adds smooth scrolling behavior to all internal anchor links
  initSkillBars();       // Animates skill progress bars when visible on screen
  initCounterAnimation();// Animates statistics numbers (e.g., years of experience)
  initContactForm();     // Enables real-time contact form validation and submission
});

/* ============================================
   PARTICLE SYSTEM (HTML5 Canvas 2D Physics)
   ============================================ */
function initParticles() {
  // Retrieve canvas element from the DOM
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, particles, mouse;

  // Particle configuration parameters
  const config = {
    particleCount: 80,                                              // Total number of floating particles
    maxDistance: 150,                                               // Max distance threshold to draw connecting lines
    colors: ['#6C63FF', '#00D4AA', '#FF6B9D', '#FFA63E'],           // Color palette for random particle assignment
    minSize: 1,                                                     // Minimum radius of a particle
    maxSize: 3,                                                     // Maximum radius of a particle
    speed: 0.4,                                                     // Movement speed coefficient
  };

  // Mouse tracking position and influence radius
  mouse = { x: null, y: null, radius: 150 };

  // Resizes canvas dimensions to match container width & height dynamically
  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  // Particle Class representing individual floating points
  class Particle {
    constructor() {
      // Spawn particle at random (x, y) coordinates inside canvas
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
      this.baseSize = this.size;
      // Velocity vectors (vx, vy) for random direction movement
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.alpha = Math.random() * 0.5 + 0.3; // Opacity value
    }

    // Updates particle position & handles boundary bouncing + mouse interaction
    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off horizontal and vertical canvas borders
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse proximity interaction (pushes particles away gently & expands size)
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
          this.size = this.baseSize + force * 2;
        } else {
          this.size = this.baseSize;
        }
      }
    }

    // Renders the particle circle onto the 2D canvas context
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Populate particles array with instances of Particle class
  function createParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Calculates distance between pairs of particles and draws connecting lines if close
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If distance is less than threshold, draw translucent connecting line
        if (dist < config.maxDistance) {
          const alpha = (1 - dist / config.maxDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // Animation frame loop clearing canvas and redrawing particles continuously
  function animate() {
    ctx.clearRect(0, 0, width, height); // Clear previous frame
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawLines();
    requestAnimationFrame(animate); // Schedule next frame draw
  }

  // Track cursor position inside hero canvas area
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  // Reset cursor coordinates when mouse leaves canvas
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Handle browser window resize events
  window.addEventListener('resize', () => {
    resize();
  });

  // Initialize canvas size, create initial particles, and launch animation loop
  resize();
  createParticles();
  animate();
}


/* ============================================
   TYPING EFFECT (Dynamic Title Animation)
   ============================================ */
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  // Array of titles to cycle through dynamically
  const phrases = [
    'Software Developer',
    'Problem Solver',
    'Full-Stack Creator',
    'Open Source Enthusiast',
    'UI/UX Thinker',
  ];

  let phraseIndex = 0;  // Index of active phrase
  let charIndex = 0;    // Character cursor position
  let isDeleting = false;// State indicating typing or erasing backspaces
  let speed = 80;       // Speed in milliseconds per character typing step

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Remove one character
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      speed = 40; // Erase faster than typing
    } else {
      // Add one character
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      speed = 80; // Normal typing speed
    }

    // State transitions: paused at full phrase length or completely erased
    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2000; // Pause at end of word before starting erasure
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Advance to next phrase index
      speed = 400; // Pause before typing next word
    }

    // Recursively call type after calculated delay
    setTimeout(type, speed);
  }

  // Start the typing loop
  type();
}


/* ============================================
   SCROLL REVEAL (Intersection Observer API)
   ============================================ */
function initScrollReveal() {
  // Query all DOM elements configured for scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  if (!revealElements.length) return;

  // Create an IntersectionObserver instance to trigger visibility when scrolled into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add 'visible' class to activate CSS transition transform/opacity
          entry.target.classList.add('visible');
          
          // Unobserve single reveal elements after animating to prevent redundant observer checks
          if (!entry.target.classList.contains('stagger-children')) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.15,                     // Element must be 15% visible before triggering
      rootMargin: '0px 0px -60px 0px',     // Trigger 60px before hitting bottom threshold
    }
  );

  // Attach observer to each reveal target element
  revealElements.forEach((el) => observer.observe(el));
}


/* ============================================
   NAVBAR (Sticky Header & Active Link Highlighter)
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  if (!navbar) return;

  // Scroll listener: toggles '.scrolled' class on navbar to enable glass background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger menu button click handler
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');  // Transforms hamburger bars into 'X'
      navLinks.classList.toggle('open');   // Slides down mobile menu dropdown
    });

    // Close mobile dropdown menu when any navigation link is tapped
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active section link highlighting based on current scroll depth
  const sections = document.querySelectorAll('section[id]');
  const activateLink = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      // Check if current scroll position falls within section boundaries
      if (scrollY >= top && scrollY < top + height) {
        links.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', activateLink);
  activateLink(); // Run on initial page load
}


/* ============================================
   SMOOTH SCROLL (Native Smooth Anchor Navigation)
   ============================================ */
function initSmoothScroll() {
  // Intercept clicks on all hash navigation links (e.g. href="#about")
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        // Smoothly scroll target element into viewport view
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


/* ============================================
   SKILL BARS ANIMATION (IntersectionObserver)
   ============================================ */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  // IntersectionObserver to animate skill meter widths when scrolled into viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach((bar) => {
            // Read target percentage level from custom HTML attribute 'data-level'
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%'; // Expand CSS width property
          });
          observer.unobserve(entry.target); // Animate once per page load
        }
      });
    },
    { threshold: 0.3 }
  );

  // Observe each skill card container
  document.querySelectorAll('.skill-card').forEach((card) => {
    observer.observe(card);
  });
}


/* ============================================
   COUNTER ANIMATION (Numerical Metric Increments)
   ============================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  // IntersectionObserver to trigger countup animation when stats section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
          animateCounter(entry.target, target, suffix);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// Incrementally animates number text content from 0 to target over 1.5 seconds
function animateCounter(element, target, suffix) {
  let current = 0;
  const increment = target / 60; // 60 animation steps
  const duration = 1500;         // 1500ms total duration
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer); // Stop timer once target number is reached
    }
    element.textContent = Math.floor(current) + suffix;
  }, stepTime);
}


/* ============================================
   CONTACT FORM (Client-side Validation & States)
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Attach submit listener to capture form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default page refresh action

    // Clear existing error states from previous attempts
    form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('error'));

    let hasError = false;

    // 1. Validate Name input field (must not be empty string)
    const name = form.querySelector('#form-name');
    if (!name.value.trim()) {
      name.closest('.form-group').classList.add('error');
      hasError = true;
    }

    // 2. Validate Email input field (must match email regex pattern)
    const email = form.querySelector('#form-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.closest('.form-group').classList.add('error');
      hasError = true;
    }

    // 3. Validate Message input field (must be at least 10 characters long)
    const message = form.querySelector('#form-message');
    if (!message.value.trim() || message.value.trim().length < 10) {
      message.closest('.form-group').classList.add('error');
      hasError = true;
    }

    // Halt submission process if any validation check fails
    if (hasError) return;

    // Show success confirmation card and temporarily hide input form
    form.style.display = 'none';
    document.getElementById('form-success').classList.add('show');

    // Automatically reset and bring back form after 4 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      document.getElementById('form-success').classList.remove('show');
    }, 4000);
  });
}
