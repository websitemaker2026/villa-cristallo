 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
index eab4eb94d45d37aa2e05c1679c8f21a479276e72..efeb4e1bd8de853724b85bdcb443568c49f18730 100644
--- a/script.js
+++ b/script.js
@@ -1,28 +1,74 @@
-const navToggle = document.querySelector('.nav-toggle');
-const navLinks = document.querySelector('.nav-links');
+document.addEventListener('DOMContentLoaded', () => {
+  document.body.classList.add('page-ready');
 
-if (navToggle && navLinks) {
-  navToggle.addEventListener('click', () => {
-    navLinks.classList.toggle('open');
+  const reveals = document.querySelectorAll('.reveal');
+  const observer = new IntersectionObserver(
+    (entries) => {
+      entries.forEach((entry) => {
+        if (entry.isIntersecting) {
+          entry.target.classList.add('visible');
+          observer.unobserve(entry.target);
+        }
+      });
+    },
+    { threshold: 0.2 }
+  );
+
+  reveals.forEach((item) => observer.observe(item));
+
+  const parallaxItems = document.querySelectorAll('[data-parallax]');
+  window.addEventListener('scroll', () => {
+    const offset = window.pageYOffset;
+    parallaxItems.forEach((item) => {
+      const speed = Number(item.dataset.parallax) || 0.2;
+      item.style.backgroundPositionY = `${offset * speed}px`;
+    });
   });
-}
-
-const revealElements = document.querySelectorAll('.reveal');
-const observer = new IntersectionObserver(
-  (entries) => {
-    entries.forEach((entry) => {
-      if (entry.isIntersecting) {
-        entry.target.classList.add('visible');
-        observer.unobserve(entry.target);
-      }
+
+  const navLinks = document.querySelectorAll('.nav-links a');
+  navLinks.forEach((link) => {
+    link.addEventListener('click', (event) => {
+      const href = link.getAttribute('href');
+      if (!href || href.startsWith('#')) return;
+      event.preventDefault();
+      document.body.style.opacity = '0';
+      document.body.style.transform = 'translateY(10px)';
+      setTimeout(() => {
+        window.location.href = href;
+      }, 360);
     });
-  },
-  { threshold: 0.15 }
-);
+  });
+
+  const reservationForm = document.querySelector('#reservation-form');
+  if (reservationForm) {
+    reservationForm.addEventListener('submit', (event) => {
+      event.preventDefault();
 
-revealElements.forEach((el) => observer.observe(el));
+      const requiredFields = reservationForm.querySelectorAll('[required]');
+      let isValid = true;
 
-const year = document.getElementById('year');
-if (year) {
-  year.textContent = new Date().getFullYear();
-}
+      requiredFields.forEach((field) => {
+        if (!field.value.trim()) {
+          field.style.borderColor = '#c23b3b';
+          isValid = false;
+        } else {
+          field.style.borderColor = 'rgba(28, 36, 52, 0.2)';
+        }
+      });
+
+      const emailInput = reservationForm.querySelector('#email');
+      if (emailInput && !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
+        emailInput.style.borderColor = '#c23b3b';
+        isValid = false;
+      }
+
+      if (!isValid) {
+        alert('Per favore, completa correttamente tutti i campi obbligatori.');
+        return;
+      }
+
+      alert('Prenotazione confermata. Ti aspettiamo a Villa Cristallo.');
+      reservationForm.reset();
+    });
+  }
+});
 
EOF
)
