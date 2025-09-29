// script.js
const navToggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.nav')
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open')
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  })
}
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

const grid = document.getElementById('project-grid')
const search = document.getElementById('search')
if (grid && search) {
  const cards = Array.from(grid.querySelectorAll('.project'))
  const chips = Array.from(document.querySelectorAll('.filter-chips .chip'))
  let active = 'all'
  const run = () => {
    const q = search.value.trim().toLowerCase()
    cards.forEach(card => {
      const tags = card.getAttribute('data-tags') || ''
      const hay = (card.textContent + ' ' + tags).toLowerCase()
      const matchTag = active === 'all' || tags.split(' ').includes(active)
      const matchText = q === '' || hay.includes(q)
      card.style.display = matchTag && matchText ? '' : 'none'
    })
  }
  chips.forEach(c => {
    c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'))
      c.classList.add('active')
      active = c.dataset.filter
      run()
    })
  })
  search.addEventListener('input', run)
}

const pubList = document.getElementById('pub-list')
const pubSearch = document.getElementById('pub-search')
if (pubList && pubSearch) {
  const pubs = Array.from(pubList.querySelectorAll('.pub'))
  const chips = Array.from(document.querySelectorAll('.filter-chips .chip'))
  let year = 'all'
  const run = () => {
    const q = pubSearch.value.trim().toLowerCase()
    pubs.forEach(p => {
      const y = p.getAttribute('data-year')
      const hay = p.textContent.toLowerCase()
      const okYear = year === 'all' || y === year
      const okText = q === '' || hay.includes(q)
      p.style.display = okYear && okText ? '' : 'none'
    })
  }
  chips.forEach(c => {
    if (!c.dataset.year) return
    c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'))
      c.classList.add('active')
      year = c.dataset.year
      run()
    })
  })
  pubSearch.addEventListener('input', run)
}

document.querySelectorAll('[data-bib]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.bib
    const box = document.getElementById(`bib-${id}`)
    const open = box.style.display === 'block'
    document.querySelectorAll('.bibtex').forEach(x => x.style.display = 'none')
    box.style.display = open ? 'none' : 'block'
  })
})
