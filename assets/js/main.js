// Inisialisasi AOS (Animation On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000, // durasi animasi
        once: true,     // animasi hanya sekali saat scroll
        offset: 100     // offset trigger
    });

    // Script untuk Navbar aktif otomatis
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add("active");
        }
    }
});