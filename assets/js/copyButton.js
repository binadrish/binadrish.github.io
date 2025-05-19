  document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los bloques <pre><code>
    document.querySelectorAll(".post-site-content pre").forEach(pre => {
      // Crea el botón
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copiar";

      // Cuando haga click, copia el texto
      btn.addEventListener("click", () => {
        const code = pre.querySelector("code");
        if (!code) return;
        const text = code.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "¡Copiado!";
          setTimeout(() => btn.textContent = "Copiar", 1500);
        });
      });

      // Inserta el botón dentro de <pre>
      pre.insertBefore(btn, pre.firstChild);
    });
  });
