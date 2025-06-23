document.addEventListener('DOMContentLoaded', () => {

  // Inicializa a biblioteca de Animações ao Rolar
  AOS.init({
      duration: 800, // Duração da animação em milissegundos
      once: true,    // Animação acontece apenas uma vez por elemento
  });

  // --- LÓGICA PARA O MENU HAMBÚRGUER ---
  const menuBtn = document.getElementById('menu-mobile-btn');
  const nav = document.getElementById('nav-principal');

  if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
          nav.classList.toggle('menu-aberto');
      });
      
      // Opcional: Fecha o menu ao clicar em um link
      nav.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              nav.classList.remove('menu-aberto');
          });
      });
  }

  // --- LÓGICA PARA O TEMA ESCURO/CLARO ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
          document.body.classList.toggle('dark-theme');
      });
  }


  // --- LÓGICA PARA A ROLAGEM SUAVE DO MENU ---
  const navLinks = document.querySelectorAll('#nav-principal a');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
              targetSection.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });


  // --- LÓGICA AVANÇADA PARA O FORMULÁRIO DE CONTATO (COM AJAX/FETCH E MENSAGEM TEMPORÁRIA) ---
  const contactForm = document.querySelector('#contato form');
  const formStatus = document.getElementById('form-status');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.innerHTML = "Obrigado! Sua mensagem foi enviada com sucesso.";
        formStatus.className = 'sucesso';
        form.reset();
        setTimeout(() => {
          formStatus.innerHTML = '';
          formStatus.className = '';
        }, 5000);
      } else {
        const responseData = await response.json();
        if (Object.hasOwn(responseData, 'errors')) {
          formStatus.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
        } else {
          formStatus.innerHTML = "Oops! Houve um problema ao enviar seu formulário.";
        }
        formStatus.className = 'erro';
      }
    } catch (error) {
      formStatus.innerHTML = "Oops! Houve um problema de conexão.";
      formStatus.className = 'erro';
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }

});