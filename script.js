// Scroll Progress Bar JavaScript
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Optional: Add particle effect on mouse click
document.addEventListener('click', (e) => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    document.body.appendChild(particle);

    // Remove particle after animation
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
});

// ฟังก์ชันเปลี่ยนภาษา
function switchLanguage(lang) {
    // เปลี่ยนข้อความในทุกองค์ประกอบที่มี data-lang-th และ data-lang-en
    document.querySelectorAll('[data-lang-th]').forEach(element => {
        element.textContent = element.getAttribute(`data-lang-${lang}`);
    });

    // เปลี่ยนข้อความในปุ่มเปลี่ยนภาษา
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.textContent = button.getAttribute(`data-lang-${lang}`);
    });
}

// เพิ่ม Event Listener ให้ปุ่มเปลี่ยนภาษา
document.getElementById('lang-th').addEventListener('click', () => switchLanguage('th'));
document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));

// Typewriter Effect for Dynamic Text
const typewriterText = document.getElementById('typewriter-text');
const words = ["Wongsakorn N.", "Photographer", "Student", "Programmer", "Graphic Designer"];
let wordIndex = 0;// ฟังก์ชันสุ่มตัวอักษรทีละตัว
function randomizeTextEffect(element, finalText, interval = 50) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let currentText = "";
    let index = 0;

    function randomize() {
        if (index < finalText.length) {
            currentText = finalText
                .split("")
                .map((char, i) => (i < index ? char : characters[Math.floor(Math.random() * characters.length)]))
                .join("");
            element.textContent = currentText;
            index++;
            setTimeout(randomize, interval);
        } else {
            element.textContent = finalText; // แสดงข้อความสุดท้าย
        }
    }

    randomize();
}

// เรียกใช้งานฟังก์ชันกับข้อความใน #hero h1
const heroHeading = document.querySelector("#hero h1");
randomizeTextEffect(heroHeading, "Welcome to My Portfolio", 100);
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        // ลบตัวอักษรทีละตัว
        charIndex--;
        typewriterText.textContent = currentWord.substring(0, charIndex);
    } else {
        // พิมพ์ตัวอักษรทีละตัว
        charIndex++;
        typewriterText.textContent = currentWord.substring(0, charIndex);
    }

    // กำหนดความเร็วในการพิมพ์และลบ
    let typingSpeed = isDeleting ? 50 : 100;

    // เมื่อพิมพ์หรือลบเสร็จ
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1000; // พักก่อนเริ่มลบ
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // เปลี่ยนไปคำถัดไป
        typingSpeed = 500; // พักก่อนเริ่มพิมพ์คำใหม่
    }

    setTimeout(typeEffect, typingSpeed);
}

// เริ่มต้นเอฟเฟกต์
typeEffect();
