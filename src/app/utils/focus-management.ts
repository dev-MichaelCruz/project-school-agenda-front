export function trapTabKey(event: KeyboardEvent, container: HTMLElement): void {
  if (event.key !== 'Tab') return;
  const controls = Array.from(container.querySelectorAll<HTMLElement>(
    'a[href], button, input, select, textarea, [tabindex]',
  )).filter((element) => element.tabIndex >= 0
    && !element.matches(':disabled')
    && element.getClientRects().length > 0
    && getComputedStyle(element).visibility !== 'hidden');
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first) {
    event.preventDefault();
    container.tabIndex = -1;
    container.focus();
  } else if (event.shiftKey && (document.activeElement === first || document.activeElement === container)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function focusElement(selector: string): void {
  requestAnimationFrame(() => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element && !element.closest('[inert]') && element.getClientRects().length) {
      element.focus();
    }
  });
}

export function focusMainHeading(): void {
  requestAnimationFrame(() => {
    if (document.querySelector('.modal.show, .sidebar-open')) return;
    const heading = document.querySelector<HTMLElement>('#main-content h2');
    const name = heading?.textContent?.trim().replace(/\s+/g, ' ');
    if (name) document.title = `${name} | Agenda Virtual Escola Municipal Juriti `;
    const target = heading ?? document.getElementById('main-content');
    if (target) {
      target.tabIndex = -1;
      target.focus();
    }
  });
}
