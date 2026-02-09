document.addEventListener('DOMContentLoaded', function () {
    // 1. Inisialisasi AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 2. Efek Scroll pada Navbar
    const nav = document.querySelector('.glass-navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Auto-Active Navigation Link (Modern Way)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Deteksi jika section berada di area pandang (offset 150px)
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
// Letakkan kode ini di dalam atau di bawah document.addEventListener('DOMContentLoaded', ...)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Mengambil data berdasarkan ID yang kamu buat
        const nama = document.getElementById('NamaOrangTua').value;
        const wa = document.getElementById('nomorWhatsApp').value;
        const pesan = document.getElementById('pesan').value;

        // Nomor WhatsApp tujuan
        const adminNumber = "6281281163844";

        // Susun format pesan
        const text = `Halo Admin RA Assuryaniyah,%0A%0ASaya *${nama}* (${wa}) ingin bertanya:%0A%0A"${pesan}"`;

        // Buka link WhatsApp
        window.open(`https://wa.me/${adminNumber}?text=${text}`, '_blank');
    });
}