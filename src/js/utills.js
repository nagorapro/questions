export function isValid(value) {
  return value.length >= 10
}

export function createModal(title, content) {
  const $modal = document.createElement('div')
  const $html = `
    <h3 class="tt-upp">${title}</h3>
    <div class="mt-20">${content}</div>
  `
  $modal.classList.add('modal')
  $modal.insertAdjacentHTML('afterbegin', $html)

  // eslint-disable-next-line no-undef
  mui.overlay('on', $modal)
}