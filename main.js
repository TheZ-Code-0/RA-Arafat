document.addEventListener('DOMContentLoaded', function () {
  AOS.init({ duration: 800, once: true, offset: 80 });

  // Scroll active link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-3d');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (pageYOffset >= s.offsetTop - 150) current = s.getAttribute('id');
    });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') && l.getAttribute('href').includes(current)) l.classList.add('active');
    });
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nama  = document.getElementById('NamaOrangTua').value;
      const wa    = document.getElementById('nomorWhatsApp').value;
      const pesan = document.getElementById('pesan').value;
      const text  = `Halo Admin RA Assuryaniyah,%0A%0ASaya *${nama}* (${wa}) ingin bertanya:%0A%0A"${pesan}"`;
      window.open(`https://wa.me/6281281163844?text=${text}`, '_blank');
    });
  }

  // 3D tilt on hero card
  const heroCard = document.querySelector('.hero-card-3d');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const r = heroCard.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      heroCard.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = '';
    });
  }
});
