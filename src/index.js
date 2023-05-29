const accordions = document.querySelectorAll('.accordion')
const toggleButtons = document.querySelectorAll('.accordion-header-button')

// Boolean to allow multiple accordions to be expanded at the same time
let isMultiselectable = false

function togglePanel() {
  const panelId = this.getAttribute('aria-controls')
  const panel = document.getElementById(panelId)

  // Toggle aria-expanded on button and aria-hidden on panel
  if (panel.getAttribute('aria-hidden') === 'true') {
    panel.setAttribute('aria-hidden', 'false')
    this.setAttribute('aria-expanded', 'true')
  } else {
    panel.setAttribute('aria-hidden', 'true')
    this.setAttribute('aria-expanded', 'false')
  }
}

/**
 * Collapsing accordion panels requires two steps:
 * 1. setting the panel's aria-hidden to "true"
 * 2. updating the control's aria-expanded to "false"
 */
function collapse(accordion) {
  const panel = accordion.querySelector('.accordion-panel')
  const button = accordion.querySelector('.accordion-header-button')

  panel.setAttribute('aria-hidden', 'true')
  button.setAttribute('aria-expanded', 'false')
}

function collapseAll(accordions) {
  accordions.forEach(collapse)
}

// Accordion headers should toggle visibility of accordion panels
toggleButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const panelId = e.target.getAttribute('aria-controls')
    if (!isMultiselectable) {
      collapseAll(
        [...accordions].filter(
          (accordion) => accordion.lastElementChild.id !== panelId
        )
      )
    }
    togglePanel.call(e.target)
  })
})

/**
 * Accordion panels are initially collapsed when JavaScript is enabled.
 * Otherwise, they will not be hidden for users without JavaScript.
 * Leave the 2nd accordion initially expanded as shown in the design.
 */
collapseAll([...accordions].filter((_, index) => index !== 1))
