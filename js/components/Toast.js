/**
 * Panta2Plate - Notification Toast System
 */

export function initToastSystem(container) {
  window.addEventListener("panta:toast", (event) => {
    const { title, message } = event.detail;
    if (!title) return;

    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.innerHTML = `
      <div class="toast-header">${title}</div>
      <div class="toast-body">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  });
}
