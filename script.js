// ============================================
// Portfolio Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  initSmoothScroll();

  // Intersection Observer for scroll animations
  initScrollAnimations();

  // Typing animation for hero text
  initTypingAnimation();

  // Parallax effect for hero section
  initParallaxEffect();

  // Snowfall effect
  initSnowfall();

  // Particle background
  initParticles();

  // Glowing cursor effect
  initGlowingCursor();
});

// ============================================
// Smooth Scroll Navigation
// ============================================
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.navbar-nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Scroll Animations with Intersection Observer
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// Typing Animation for Hero Subtitle
// ============================================
function initTypingAnimation() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const originalText = subtitle.textContent;
  const roles = originalText.split(' • ');
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting) {
      subtitle.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      if (currentCharIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause before deleting
        return;
      }
    } else {
      subtitle.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(type, 500); // Pause before typing next role
        return;
      }
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
  }

  // Uncomment to enable typing animation
  // setTimeout(type, 1000);
}

// ============================================
// Parallax Effect for Hero Section
// ============================================
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }

        ticking = false;
      });

      ticking = true;
    }
  });
}

// ============================================
// Navbar scroll effect
// ============================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(10, 14, 39, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});

// ============================================
// Dynamic skill card interactions
// ============================================
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    // Add a subtle scale effect
    card.style.transform = 'scale(1.02)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
  });
});

// ============================================
// Project card interactions
// ============================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    // Could open a modal or navigate to project details
    console.log('Project clicked:', card.querySelector('h3')?.textContent);
  });
});

// ============================================
// Cursor trail effect (optional)
// ============================================
function initCursorTrail() {
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll('.cursor-circle');

  circles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
  });

  window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      circle.style.left = x - 12 + 'px';
      circle.style.top = y - 12 + 'px';

      circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  // Uncomment to enable cursor trail
  // animateCircles();
}

// ============================================
// Console Easter Egg
// ============================================
console.log(
  '%c👋 Hey there, curious developer!',
  'color: #00D4FF; font-size: 20px; font-weight: bold;'
);
console.log(
  '%cLike what you see? Let\'s connect!',
  'color: #8B5CF6; font-size: 14px;'
);
console.log(
  '%c🚀 Built with vanilla HTML, CSS, and JavaScript',
  'color: #10B981; font-size: 12px;'
);

// ============================================
// Snowfall Effect
// ============================================
function initSnowfall() {
  const snowContainer = document.createElement('div');
  snowContainer.className = 'snow-container';
  document.body.appendChild(snowContainer);

  const snowflakeCount = 50;

  for (let i = 0; i < snowflakeCount; i++) {
    createSnowflake(snowContainer);
  }

  // Continuously create new snowflakes
  setInterval(() => {
    if (snowContainer.children.length < snowflakeCount) {
      createSnowflake(snowContainer);
    }
  }, 300);
}

function createSnowflake(container) {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.innerHTML = '❄';

  // Random properties
  const startPositionX = Math.random() * window.innerWidth;
  const duration = Math.random() * 3 + 5; // 5-8 seconds
  const size = Math.random() * 0.5 + 0.5; // 0.5-1em
  const opacity = Math.random() * 0.6 + 0.4; // 0.4-1
  const drift = Math.random() * 100 - 50; // -50 to 50px drift

  snowflake.style.left = startPositionX + 'px';
  snowflake.style.fontSize = size + 'em';
  snowflake.style.opacity = opacity;
  snowflake.style.animationDuration = duration + 's';
  snowflake.style.setProperty('--drift', drift + 'px');

  container.appendChild(snowflake);

  // Remove snowflake after animation
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

// ============================================
// Particle Background Effect
// ============================================
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.className = 'particle-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
      particle.update();
      particle.draw();

      // Draw connections
      particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ============================================
// Glowing Cursor Effect
// ============================================
function initGlowingCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.1;
    cursorY += dy * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .glass-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.3)';
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'rgba(0, 212, 255, 0.2)';
    });
  });
}
