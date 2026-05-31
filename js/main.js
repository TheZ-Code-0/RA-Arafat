/* ============================================================
   RA Assuryaniyah Arafat — interaksi & animasi
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Navbar scroll state ---------- */
    const nav = document.querySelector('.nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();

    /* ---------- Mobile menu toggle ---------- */
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => links.classList.remove('open'))
    );

    /* ---------- Active link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 160) current = s.id;
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });

    /* ---------- Reveal on scroll ---------- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* ---------- 3D tilt for hero card (mouse) ---------- */
    const heroCard = document.querySelector('.hero-card');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroCard && heroVisual && window.matchMedia('(pointer:fine)').matches) {
        heroVisual.addEventListener('mousemove', (e) => {
            const r = heroVisual.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            heroCard.style.transform =
                `rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(0)`;
        });
        heroVisual.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'rotateY(0) rotateX(0)';
        });
    }

    /* ---------- 3D tilt for program cards ---------- */
    if (window.matchMedia('(pointer:fine)').matches) {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform =
                    `translateY(-14px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    /* ---------- Count-up stats ---------- */
    const counters = document.querySelectorAll('[data-count]');
    const cio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = +el.dataset.count;
            const suffix = el.dataset.suffix || '';
            let n = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const tick = () => {
                n = Math.min(target, n + step);
                el.textContent = n + suffix;
                if (n < target) requestAnimationFrame(tick);
            };
            tick();
            cio.unobserve(el);
        });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));

    /* ---------- Lightbox gallery ---------- */
    const lb = document.querySelector('.lightbox');
    const lbImg = lb.querySelector('img');
    document.querySelectorAll('.g-item img').forEach(img => {
        img.parentElement.addEventListener('click', () => {
            lbImg.src = img.src;
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
    const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    lb.addEventListener('click', (e) => { if (e.target !== lbImg) closeLb(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });

    /* ---------- Parallax blobs ---------- */
    const blobs = document.querySelectorAll('.blob');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        blobs.forEach((b, i) => {
            b.style.transform = `translateY(${y * (0.04 + i * 0.02)}px)`;
        });
    }, { passive: true });

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        const a = item.querySelector('.faq-a');
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // tutup semua dulu (single-open accordion)
            document.querySelectorAll('.faq-item.open').forEach(o => {
                o.classList.remove('open');
                o.querySelector('.faq-a').style.maxHeight = null;
            });
            if (!isOpen) {
                item.classList.add('open');
                a.style.maxHeight = a.scrollHeight + 'px';
            }
        });
    });

    /* ---------- Contact form -> WhatsApp ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = document.getElementById('NamaOrangTua').value;
            const wa = document.getElementById('nomorWhatsApp').value;
            const pesan = document.getElementById('pesan').value;
            const admin = '6281281163844';
            const text = `Halo Admin RA Assuryaniyah,%0A%0ASaya *${nama}* (${wa}) ingin bertanya:%0A%0A"${pesan}"`;
            window.open(`https://wa.me/${admin}?text=${text}`, '_blank');
        });
    }
});
