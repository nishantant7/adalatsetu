/** Opens WhatsApp (web or app) with a pre-filled message. */
export function shareOnWhatsApp(text) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
