// ===== MENU TOGGLE PARA MÓVILES =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMACIÓN DE ELEMENTOS AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas y elementos
document.querySelectorAll('.step-card, .gallery-item, .testimonial-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== FORMULARIO DE CONTACTO -> WHATSAPP =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validación básica
        if (!name || !phone || !message) {
            alert('Por favor completá todos los campos');
            return;
        }
        
        // Crear mensaje para WhatsApp
        const whatsappMessage = `Hola! Mi nombre es ${name}
        
📱 Mi teléfono: ${phone}

📝 Consulta:
${message}`;
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Número de WhatsApp (ajusta según tu número)
        const whatsappNumber = '5492657705569';
        
        // Crear URL de WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp en nueva pestaña
        window.open(whatsappURL, '_blank');
        
        // Limpiar formulario
        contactForm.reset();
        
        // Mensaje de confirmación
        alert('¡Gracias! Te estamos redirigiendo a WhatsApp para continuar la conversación.');
    });
}

// ===== BOTÓN FLOTANTE DE WHATSAPP - ANIMACIÓN =====
const whatsappFloat = document.getElementById('whatsappFloat');

if (whatsappFloat) {
    // Animación de pulso cada 5 segundos
    setInterval(() => {
        whatsappFloat.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            whatsappFloat.style.animation = '';
        }, 600);
    }, 5000);
}

// ===== CAMBIAR ESTILO DEL HEADER AL HACER SCROLL =====
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar/quitar clase cuando se hace scroll
    if (currentScroll > 100) {
        header.style.padding = '0.5rem 2rem';
    } else {
        header.style.padding = '1rem 2rem';
    }
    
    lastScroll = currentScroll;
});

// ===== LAZY LOADING PARA IMÁGENES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observar todas las imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== CONTADOR DE PRODUCTOS ENTREGADOS (opcional) =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = '+' + target;
            clearInterval(timer);
        } else {
            element.textContent = '+' + Math.floor(start);
        }
    }, 16);
}

// ===== DETECTAR SI ES MÓVIL =====
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Si es móvil, ajustar comportamiento del botón de WhatsApp
if (isMobile()) {
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    whatsappLinks.forEach(link => {
        // En móviles, WhatsApp se abre directamente en la app
        link.addEventListener('click', function(e) {
            // El comportamiento por defecto ya funciona bien en móviles
        });
    });
}

// ===== PREVENIR SPAM EN FORMULARIO =====
let formSubmitted = false;

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (formSubmitted) {
            e.preventDefault();
            alert('Ya enviaste una consulta. Por favor esperá un momento.');
            return false;
        }
        formSubmitted = true;
        
        // Resetear después de 30 segundos
        setTimeout(() => {
            formSubmitted = false;
        }, 30000);
    });
}

// ===== MOSTRAR/OCULTAR BOTÓN WHATSAPP SEGÚN SCROLL =====
window.addEventListener('scroll', () => {
    const whatsappBtn = document.getElementById('whatsappFloat');
    if (whatsappBtn) {
        // Mostrar solo después de scroll de 300px
        if (window.pageYOffset > 300) {
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.pointerEvents = 'auto';
        } else {
            whatsappBtn.style.opacity = '0.7';
        }
    }
});

// ===== ANALYTICS - RASTREAR CLICS EN WHATSAPP =====
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        // Aquí podrías enviar el evento a Google Analytics
        console.log('Click en WhatsApp desde:', this.textContent.trim() || 'Botón flotante');
        
        // Ejemplo con Google Analytics (descomentar si lo usas):
        // gtag('event', 'whatsapp_click', {
        //     'event_category': 'contact',
        //     'event_label': this.textContent.trim()
        // });
    });
});

// ===== PREVENIR CLIC DERECHO EN IMÁGENES (OPCIONAL) =====
// Descomenta si quieres proteger tus imágenes
/*
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
});
*/

// ===== MENSAJE DE BIENVENIDA EN CONSOLA =====
console.log('%c🎨 Ender 3D - Impresión de Calidad', 'color: #6B4C9A; font-size: 20px; font-weight: bold;');
console.log('%c¿Querés trabajar con nosotros? Escribinos a WhatsApp!', 'color: #25D366; font-size: 14px;');

// ===== CARGAR AUTOMÁTICAMENTE SI HAY HASH EN URL =====
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// ===== DETECTAR MODO OSCURO DEL SISTEMA (FUTURO) =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Ya estamos en modo oscuro por defecto
    console.log('Modo oscuro detectado y aplicado');
}

// ===== FIN DEL SCRIPT =====
console.log('✅ Script de Ender 3D cargado correctamente');