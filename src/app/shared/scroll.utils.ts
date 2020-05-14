export function scrollToId(fragment: string) {
  const element = document.querySelector(`#${fragment}`);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
