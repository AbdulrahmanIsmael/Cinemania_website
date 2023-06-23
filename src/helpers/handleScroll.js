export function handleScrollLeft(parent, item) {
  parent.scrollBy({
    left: -item,
    behavior: 'smooth',
  });
}

export function handleScrollRight(parent, item) {
  parent.scrollBy({
    left: item,
    behavior: 'smooth',
  });
}
