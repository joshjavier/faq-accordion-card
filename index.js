const accordions = document.querySelectorAll('.accordion')
const toggleButtons = document.querySelectorAll('.accordion-header-button')

// Boolean to allow multiple accordions to be expanded at the same time
let isMultiselectable = false

function togglePanel() {
  const panelId = this.getAttribute('aria-controls')
  const panel = document.getElementById(panelId)

  // Toggle the controlled panel's hidden attribute
  panel.hidden = !panel.hidden
  // Toggle aria-expanded to reflect the current state
  if (panel.hidden) {
    this.setAttribute('aria-expanded', 'false')
  } else {
    this.setAttribute('aria-expanded', 'true')
  }
}

/**
 * Collapsing accordion panels requires two steps:
 * 1. setting the panel to hidden
 * 2. updating the control's aria-expanded to "false"
 */
function collapse(accordion) {
  accordion.querySelector('.accordion-panel').hidden = true
  accordion
    .querySelector('.accordion-header-button')
    .setAttribute('aria-expanded', 'false')
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
