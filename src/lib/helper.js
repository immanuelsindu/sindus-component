export function clickOutside(node) {
  const handleClick = (e) => {
    if (!node.contains(e.target)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  }

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  };
}

export function clickContenxtMenuOutside(node) {
  const handleClick = (e) => {
    if (!node.contains(e.target)) {
      node.dispatchEvent(new CustomEvent('outcontextmenu'));
    }
  }

  document.addEventListener("contextmenu", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("contextmenu", handleClick, true);
    }
  };
}

