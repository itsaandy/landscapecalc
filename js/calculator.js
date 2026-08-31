/**
 * LandscapeCalc.com.au - Calculator Engine
 * Landscape materials calculator for Australian homeowners and landscapers
 */

// =============================================================================
// Material Data
// =============================================================================

const MATERIALS = {
  mulch: {
    name: 'Mulch',
    subtypes: [
      { id: 'wood-chip', name: 'Wood Chip Mulch', density: 0.4 },
      { id: 'bark', name: 'Bark Mulch', density: 0.35 },
      { id: 'pine-bark', name: 'Pine Bark', density: 0.3 },
      { id: 'cypress', name: 'Cypress Mulch', density: 0.45 },
      { id: 'eucalyptus', name: 'Eucalyptus Mulch', density: 0.4 },
      { id: 'hardwood', name: 'Hardwood Mulch', density: 0.5 },
      { id: 'sugar-cane', name: 'Sugar Cane Mulch', density: 0.2 }
    ],
    presets: [50, 75, 100],
    defaultDepth: 75,
    hint: 'Recommended depth: 50-100mm for garden beds'
  },
  soil: {
    name: 'Soil',
    subtypes: [
      { id: 'topsoil', name: 'Topsoil', density: 1.1 },
      { id: 'garden-mix', name: 'Garden Mix', density: 1.0 },
      { id: 'veggie-mix', name: 'Veggie Mix', density: 0.9 },
      { id: 'turf-underlay', name: 'Turf Underlay', density: 1.2 },
      { id: 'sandy-loam', name: 'Sandy Loam', density: 1.3 },
      { id: 'clay-soil', name: 'Clay Soil', density: 1.5 },
      { id: 'potting-mix', name: 'Potting Mix', density: 0.6 }
    ],
    presets: [100, 150, 200],
    defaultDepth: 100,
    hint: 'Recommended depth: 100-200mm for new garden beds'
  },
  gravel: {
    name: 'Gravel',
    subtypes: [
      { id: 'blue-metal', name: 'Blue Metal (Bluestone)', density: 1.5 },
      { id: 'crushed-granite', name: 'Crushed Granite', density: 1.4 },
      { id: 'river-pebbles', name: 'River Pebbles', density: 1.6 },
      { id: 'sandstone', name: 'Crushed Sandstone', density: 1.4 },
      { id: 'limestone', name: 'Crushed Limestone', density: 1.5 },
      { id: 'recycled', name: 'Recycled Aggregate', density: 1.4 },
      { id: 'decorative', name: 'Decorative Pebbles', density: 1.5 }
    ],
    presets: [50, 75, 100],
    defaultDepth: 50,
    hint: 'Recommended depth: 50-100mm for pathways and driveways'
  },
  sand: {
    name: 'Sand',
    subtypes: [
      { id: 'washed', name: 'Washed Sand', density: 1.5 },
      { id: 'brickies', name: 'Brickies Sand', density: 1.5 },
      { id: 'plastering', name: 'Plastering Sand', density: 1.5 },
      { id: 'paving', name: 'Paving Sand', density: 1.6 },
      { id: 'white', name: 'White Sand', density: 1.5 },
      { id: 'yellow', name: 'Yellow Sand', density: 1.5 },
      { id: 'sandpit', name: 'Sandpit Sand', density: 1.5 }
    ],
    presets: [30, 50, 75],
    defaultDepth: 30,
    hint: 'Recommended depth: 30-50mm for paving bedding'
  },
  roadbase: {
    name: 'Road Base',
    subtypes: [
      { id: 'dgb20', name: 'DGB20 (20mm Road Base)', density: 1.8 },
      { id: 'dgb10', name: 'DGB10 (10mm Road Base)', density: 1.8 },
      { id: 'fcr', name: 'FCR (Fine Crushed Rock)', density: 1.7 },
      { id: 'recycled-roadbase', name: 'Recycled Road Base', density: 1.6 },
      { id: 'quarry-rubble', name: 'Quarry Rubble', density: 1.8 },
      { id: 'crusher-dust', name: 'Crusher Dust', density: 1.6 }
    ],
    presets: [100, 150, 200],
    defaultDepth: 150,
    hint: 'Recommended depth: 100-200mm for driveways and paths'
  }
};

// Bag and bulka bag sizes
const BAG_WEIGHT_KG = 20; // Standard 20kg bag
const BULKA_BAG_SIZE = 1.0; // 1 m³

// =============================================================================
// State
// =============================================================================

let state = {
  material: 'mulch',
  subtype: 'wood-chip',
  shape: 'rectangle',
  length: '',
  width: '',
  radius: '',
  base: '',
  height: '',
  depth: '',
  result: null
};

// =============================================================================
// DOM Elements
// =============================================================================

const elements = {};

function initElements() {
  elements.materialTabs = document.querySelectorAll('.material-tab');
  elements.shapeBtns = document.querySelectorAll('.shape-toggle__btn');
  elements.subtypeSelect = document.getElementById('subtype');
  elements.depthInput = document.getElementById('depth');
  elements.depthChips = document.querySelectorAll('.depth-chip');
  elements.depthHint = document.getElementById('depth-hint');
  elements.calculateBtn = document.getElementById('calculate-btn');
  elements.resetBtn = document.getElementById('reset-btn');
  elements.resultCard = document.getElementById('result-card');
  elements.copyBtn = document.getElementById('copy-btn');
  elements.shareBtn = document.getElementById('share-btn');
  elements.collapsibleTrigger = document.querySelector('.collapsible__trigger');
  elements.collapsibleContent = document.querySelector('.collapsible__content');

  // Shape-specific input groups
  elements.rectangleInputs = document.getElementById('rectangle-inputs');
  elements.circleInputs = document.getElementById('circle-inputs');
  elements.triangleInputs = document.getElementById('triangle-inputs');

  // Dimension inputs
  elements.lengthInput = document.getElementById('length');
  elements.widthInput = document.getElementById('width');
  elements.radiusInput = document.getElementById('radius');
  elements.baseInput = document.getElementById('base');
  elements.heightInput = document.getElementById('height');

  // Result elements
  elements.resultVolume = document.getElementById('result-volume');
  elements.resultTonnes = document.getElementById('result-tonnes');
  elements.resultBags = document.getElementById('result-bags');
  elements.resultBulka = document.getElementById('result-bulka');

  if (elements.resultCard) {
    elements.resultCard.setAttribute('aria-live', 'polite');
  }
  if (elements.collapsibleTrigger) {
    elements.collapsibleTrigger.setAttribute('aria-expanded', 'false');
  }
}

// =============================================================================
// Calculations
// =============================================================================

function calculateArea(shape, dimensions) {
  switch (shape) {
    case 'rectangle':
      return dimensions.length * dimensions.width;
    case 'circle':
      return Math.PI * Math.pow(dimensions.radius, 2);
    case 'triangle':
      return 0.5 * dimensions.base * dimensions.height;
    default:
      return 0;
  }
}

function calculateVolume(area, depthMm) {
  // Convert depth from mm to m
  const depthM = depthMm / 1000;
  return area * depthM;
}

function calculateWeight(volumeM3, density) {
  return volumeM3 * density;
}

function calculateBags(weightTonnes) {
  // 20kg bags = weight in tonnes × 1000 ÷ 20
  // Normalise floating-point noise before rounding up to a whole bag.
  const exactBags = weightTonnes * 1000 / BAG_WEIGHT_KG;
  return Math.ceil(Number(exactBags.toFixed(10)));
}

function calculateBulkaBags(volumeM3) {
  return Math.ceil(volumeM3 / BULKA_BAG_SIZE);
}

function performCalculation() {
  const material = MATERIALS[state.material];
  const subtype = material.subtypes.find(s => s.id === state.subtype);
  const density = subtype ? subtype.density : material.subtypes[0].density;

  let dimensions = {};
  switch (state.shape) {
    case 'rectangle':
      dimensions = {
        length: parseFloat(state.length),
        width: parseFloat(state.width)
      };
      break;
    case 'circle':
      dimensions = {
        radius: parseFloat(state.radius)
      };
      break;
    case 'triangle':
      dimensions = {
        base: parseFloat(state.base),
        height: parseFloat(state.height)
      };
      break;
  }

  const depth = parseFloat(state.depth);
  const area = calculateArea(state.shape, dimensions);
  const volume = calculateVolume(area, depth);
  const weight = calculateWeight(volume, density);
  const bags = calculateBags(weight);
  const bulkaBags = calculateBulkaBags(volume);

  return {
    volume: volume,
    weight: weight,
    bags: bags,
    bulkaBags: bulkaBags
  };
}

// =============================================================================
// Validation
// =============================================================================

function validateInput(input) {
  const value = parseFloat(input.value);
  const isValid = !isNaN(value) && value > 0;

  if (input.value === '') {
    input.classList.remove('is-error');
    return null; // Empty is not an error, just incomplete
  }

  if (!isValid) {
    input.classList.add('is-error');
    return false;
  }

  input.classList.remove('is-error');
  return true;
}

function validateAllInputs() {
  let allValid = true;
  const requiredInputs = getRequiredInputs();

  requiredInputs.forEach(input => {
    const result = validateInput(input);
    if (result !== true) {
      allValid = false;
    }
  });

  return allValid;
}

function getRequiredInputs() {
  const inputs = [elements.depthInput];

  switch (state.shape) {
    case 'rectangle':
      inputs.push(elements.lengthInput, elements.widthInput);
      break;
    case 'circle':
      inputs.push(elements.radiusInput);
      break;
    case 'triangle':
      inputs.push(elements.baseInput, elements.heightInput);
      break;
  }

  return inputs.filter(Boolean);
}

// =============================================================================
// UI Updates
// =============================================================================

function updateMaterialUI() {
  const material = MATERIALS[state.material];

  // Update tabs
  elements.materialTabs.forEach(tab => {
    const tabMaterial = tab.dataset.material;
    tab.classList.toggle('is-active', tabMaterial === state.material);
    tab.setAttribute('aria-pressed', String(tabMaterial === state.material));
  });

  // Update subtypes
  if (elements.subtypeSelect) {
    elements.subtypeSelect.innerHTML = material.subtypes
      .map(s => `<option value="${s.id}">${s.name}</option>`)
      .join('');
    elements.subtypeSelect.value = state.subtype;
  }

  // Update depth presets
  if (elements.depthChips) {
    elements.depthChips.forEach((chip, index) => {
      if (material.presets[index] !== undefined) {
        chip.textContent = `${material.presets[index]}mm`;
        chip.dataset.depth = material.presets[index];
        chip.style.display = '';
      } else {
        chip.style.display = 'none';
      }
    });
  }

  // Update hint
  if (elements.depthHint) {
    elements.depthHint.textContent = material.hint;
  }

  // Update default depth if empty
  if (!state.depth && elements.depthInput) {
    state.depth = material.defaultDepth;
    elements.depthInput.value = material.defaultDepth;
    updateDepthChips();
  }
}

function updateShapeUI() {
  // Update shape buttons
  elements.shapeBtns.forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.shape === state.shape);
    btn.setAttribute('aria-pressed', String(btn.dataset.shape === state.shape));
  });

  // Show/hide input groups
  if (elements.rectangleInputs) {
    elements.rectangleInputs.style.display = state.shape === 'rectangle' ? '' : 'none';
  }
  if (elements.circleInputs) {
    elements.circleInputs.style.display = state.shape === 'circle' ? '' : 'none';
  }
  if (elements.triangleInputs) {
    elements.triangleInputs.style.display = state.shape === 'triangle' ? '' : 'none';
  }
}

function updateDepthChips() {
  if (!elements.depthChips) return;

  elements.depthChips.forEach(chip => {
    const chipDepth = parseInt(chip.dataset.depth, 10);
    chip.classList.toggle('is-active', chipDepth === parseInt(state.depth, 10));
  });
}

function updateResultDisplay() {
  if (!state.result || !elements.resultCard) return;

  elements.resultCard.classList.add('is-visible');

  if (elements.resultVolume) {
    elements.resultVolume.textContent = state.result.volume.toFixed(2);
  }
  if (elements.resultTonnes) {
    elements.resultTonnes.textContent = state.result.weight.toFixed(2);
  }
  if (elements.resultBags) {
    elements.resultBags.textContent = state.result.bags;
  }
  if (elements.resultBulka) {
    elements.resultBulka.textContent = state.result.bulkaBags;
  }
}

function hideResult() {
  if (elements.resultCard) {
    elements.resultCard.classList.remove('is-visible');
  }
  state.result = null;
}

// =============================================================================
// Event Handlers
// =============================================================================

function handleMaterialChange(material) {
  state.material = material;
  state.subtype = MATERIALS[material].subtypes[0].id;
  state.depth = MATERIALS[material].defaultDepth;

  if (elements.depthInput) {
    elements.depthInput.value = state.depth;
  }

  updateMaterialUI();
  updateDepthChips();
  hideResult();
}

function handleShapeChange(shape) {
  state.shape = shape;
  updateShapeUI();
  hideResult();
}

function handleSubtypeChange(subtype) {
  state.subtype = subtype;
  hideResult();
}

function handleDepthPreset(depth) {
  state.depth = depth;
  if (elements.depthInput) {
    elements.depthInput.value = depth;
    elements.depthInput.classList.remove('is-error');
  }
  updateDepthChips();
  hideResult();
}

function handleCalculate() {
  if (!validateAllInputs()) {
    hideResult();
    return;
  }

  state.result = performCalculation();
  updateResultDisplay();
}

function handleReset() {
  // Reset state
  state.length = '';
  state.width = '';
  state.radius = '';
  state.base = '';
  state.height = '';
  state.depth = MATERIALS[state.material].defaultDepth;
  state.result = null;

  // Reset inputs
  const inputs = [
    elements.lengthInput,
    elements.widthInput,
    elements.radiusInput,
    elements.baseInput,
    elements.heightInput
  ];

  inputs.forEach(input => {
    if (input) {
      input.value = '';
      input.classList.remove('is-error');
    }
  });

  if (elements.depthInput) {
    elements.depthInput.value = state.depth;
    elements.depthInput.classList.remove('is-error');
  }

  updateDepthChips();
  hideResult();
}

function handleCopyResult() {
  if (!state.result) return;

  const material = MATERIALS[state.material];
  const subtype = material.subtypes.find(s => s.id === state.subtype);
  const subtypeName = subtype ? subtype.name : material.name;

  const text = `${subtypeName} Calculator Result
Volume: ${state.result.volume.toFixed(2)} m³
Weight: ${state.result.weight.toFixed(2)} tonnes
20kg Bags: ${state.result.bags}
Bulka Bags: ${state.result.bulkaBags}
Calculated at LandscapeCalc.com.au`;

  navigator.clipboard.writeText(text).then(() => {
    showButtonFeedback(elements.copyBtn, 'Copied!');
  }).catch(() => {
    showToast('Failed to copy result');
  });
}

function handleShareLink() {
  const params = new URLSearchParams();

  params.set('m', state.material);
  params.set('s', state.shape);
  params.set('st', state.subtype);
  params.set('d', state.depth);

  switch (state.shape) {
    case 'rectangle':
      if (state.length) params.set('l', state.length);
      if (state.width) params.set('w', state.width);
      break;
    case 'circle':
      if (state.radius) params.set('r', state.radius);
      break;
    case 'triangle':
      if (state.base) params.set('b', state.base);
      if (state.height) params.set('h', state.height);
      break;
  }

  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  navigator.clipboard.writeText(url).then(() => {
    showButtonFeedback(elements.shareBtn, 'Link Copied!');
  }).catch(() => {
    showToast('Failed to copy link');
  });
}

function handleCollapsibleToggle() {
  if (!elements.collapsibleTrigger || !elements.collapsibleContent) return;

  const isOpen = elements.collapsibleContent.classList.contains('is-open');

  elements.collapsibleTrigger.classList.toggle('is-open', !isOpen);
  elements.collapsibleContent.classList.toggle('is-open', !isOpen);
  elements.collapsibleTrigger.setAttribute('aria-expanded', String(!isOpen));
}

// =============================================================================
// URL Parsing
// =============================================================================

function parseShareLink() {
  const params = new URLSearchParams(window.location.search);

  if (params.has('m') && MATERIALS[params.get('m')]) {
    state.material = params.get('m');
  }

  if (params.has('s') && ['rectangle', 'circle', 'triangle'].includes(params.get('s'))) {
    state.shape = params.get('s');
  }

  if (params.has('st')) {
    const material = MATERIALS[state.material];
    const subtypeExists = material.subtypes.some(s => s.id === params.get('st'));
    if (subtypeExists) {
      state.subtype = params.get('st');
    }
  }

  if (params.has('d')) {
    const depth = parseFloat(params.get('d'));
    if (!isNaN(depth) && depth > 0) {
      state.depth = depth;
    }
  }

  // Dimension params
  if (params.has('l')) {
    state.length = params.get('l');
  }
  if (params.has('w')) {
    state.width = params.get('w');
  }
  if (params.has('r')) {
    state.radius = params.get('r');
  }
  if (params.has('b')) {
    state.base = params.get('b');
  }
  if (params.has('h')) {
    state.height = params.get('h');
  }

  return params.toString().length > 0;
}

function applyParsedState() {
  // Apply material
  updateMaterialUI();

  // Apply shape
  updateShapeUI();

  // Apply depth
  if (elements.depthInput) {
    elements.depthInput.value = state.depth;
  }
  updateDepthChips();

  // Apply dimensions
  if (elements.lengthInput && state.length) {
    elements.lengthInput.value = state.length;
  }
  if (elements.widthInput && state.width) {
    elements.widthInput.value = state.width;
  }
  if (elements.radiusInput && state.radius) {
    elements.radiusInput.value = state.radius;
  }
  if (elements.baseInput && state.base) {
    elements.baseInput.value = state.base;
  }
  if (elements.heightInput && state.height) {
    elements.heightInput.value = state.height;
  }

  // Auto-calculate if we have all required inputs
  if (validateAllInputs()) {
    handleCalculate();
  }
}

// =============================================================================
// Toast Notification
// =============================================================================

function showToast(message) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Show toast
  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  // Hide and remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// =============================================================================
// Button Feedback
// =============================================================================

function showButtonFeedback(button, message) {
  if (!button) return;

  // Store original content
  const originalHTML = button.innerHTML;

  // Update button with success state
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    ${message}
  `;
  button.classList.add('is-success');

  // Revert after 2 seconds
  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.classList.remove('is-success');
  }, 2000);
}

// =============================================================================
// FAQ Toggles
// =============================================================================

function initFaqToggles() {
  const faqQuestions = document.querySelectorAll('.faq-item__question');

  faqQuestions.forEach((question, index) => {
    const answer = question.nextElementSibling;
    const answerId = answer.id || `faq-answer-${index + 1}`;
    answer.id = answerId;
    question.setAttribute('aria-controls', answerId);
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', () => {
      const isOpen = answer.classList.contains('is-open');

      // Close all others
      document.querySelectorAll('.faq-item__answer.is-open').forEach(a => {
        a.classList.remove('is-open');
        a.previousElementSibling.classList.remove('is-open');
        a.previousElementSibling.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        question.classList.add('is-open');
        answer.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// =============================================================================
// Mobile Nav
// =============================================================================

function initMobileNav() {
  const toggle = document.querySelector('.header__mobile-toggle');
  const nav = document.querySelector('.mobile-nav');

  if (toggle && nav) {
    const navId = nav.id || 'mobile-navigation';
    nav.id = navId;
    toggle.setAttribute('aria-controls', navId);
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
}

// =============================================================================
// Feedback Form
// =============================================================================

function initFeedbackForm() {
  const triggerLinks = document.querySelectorAll('a[href*="1FAIpQLScxyUrVePNMWdyJCDl1hrzjDwCQ-Joa4It31sBDZK63A17-kw"]');
  if (!triggerLinks.length) return;

  const responderUrl = new URL(triggerLinks[0].href);
  const sourceWebsite = responderUrl.searchParams.get('entry.364081786');
  if (!sourceWebsite) return;
  const sourcePage = document.querySelector('link[rel="canonical"]')?.href || `${window.location.origin}${window.location.pathname}`;

  const formAction = new URL(responderUrl.href);
  formAction.pathname = formAction.pathname.replace(/\/viewform$/, '/formResponse');
  formAction.search = '';

  const backdrop = document.createElement('div');
  backdrop.className = 'feedback-dialog-backdrop';
  backdrop.hidden = true;
  backdrop.innerHTML = `
    <section id="feedback-dialog" class="feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-dialog-title" aria-describedby="feedback-dialog-description" tabindex="-1">
      <div class="feedback-dialog__header">
        <div>
          <h2 id="feedback-dialog-title">Send feedback</h2>
          <p id="feedback-dialog-description">Tell us what worked or what we could improve.</p>
        </div>
        <button class="feedback-dialog__close" type="button" aria-label="Close feedback form">&times;</button>
      </div>
      <form class="feedback-form">
        <input type="hidden" name="entry.364081786">
        <div class="feedback-form__field">
          <label for="feedback-email">Email</label>
          <input id="feedback-email" name="entry.1318552341" type="email" autocomplete="email" inputmode="email" aria-describedby="feedback-email-validation" required>
          <p id="feedback-email-validation" class="feedback-form__validation" aria-live="polite"></p>
        </div>
        <div class="feedback-form__field">
          <label for="feedback-message">Feedback</label>
          <textarea id="feedback-message" name="entry.170703208" rows="5" maxlength="3000" required></textarea>
        </div>
        <p class="feedback-form__status" role="status" aria-live="polite"></p>
        <a class="feedback-form__fallback" href="${responderUrl.href}" target="_blank" rel="noopener noreferrer" hidden>Open the Google Form instead</a>
        <button class="feedback-form__submit" type="submit">Send feedback</button>
      </form>
      <div class="feedback-form__success" hidden>
        <h3>Thanks for your feedback</h3>
        <p>Your response has been sent.</p>
        <button class="feedback-form__done" type="button">Done</button>
      </div>
    </section>`;

  document.body.appendChild(backdrop);

  const dialog = backdrop.querySelector('.feedback-dialog');
  const form = backdrop.querySelector('.feedback-form');
  const sourceInput = form.querySelector('input[name="entry.364081786"]');
  const emailInput = form.querySelector('#feedback-email');
  const emailValidation = form.querySelector('#feedback-email-validation');
  const closeButton = backdrop.querySelector('.feedback-dialog__close');
  const submitButton = form.querySelector('.feedback-form__submit');
  const status = form.querySelector('.feedback-form__status');
  const fallback = form.querySelector('.feedback-form__fallback');
  const success = backdrop.querySelector('.feedback-form__success');
  const doneButton = success.querySelector('.feedback-form__done');
  let lastTrigger = null;
  let completed = false;

  sourceInput.value = sourcePage;

  const clearEmailValidation = () => {
    emailInput.classList.remove('is-valid', 'is-invalid');
    emailValidation.classList.remove('is-valid', 'is-invalid');
    emailValidation.textContent = '';
  };

  const validateEmail = (showEmpty = false) => {
    const value = emailInput.value.trim();
    clearEmailValidation();

    if (!value) {
      if (showEmpty) {
        emailInput.classList.add('is-invalid');
        emailValidation.classList.add('is-invalid');
        emailValidation.textContent = 'Enter your email address.';
      }
      return false;
    }

    if (!emailInput.validity.valid) {
      emailInput.classList.add('is-invalid');
      emailValidation.classList.add('is-invalid');
      emailValidation.textContent = 'Enter a valid email address, like name@example.com.';
      return false;
    }

    emailInput.classList.add('is-valid');
    emailValidation.classList.add('is-valid');
    emailValidation.textContent = 'Email looks good.';
    return true;
  };

  emailInput.addEventListener('input', () => validateEmail(false));
  emailInput.addEventListener('blur', () => validateEmail(true));

  const focusableElements = () => Array.from(dialog.querySelectorAll(
    'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), a[href]:not([hidden])'
  )).filter(element => element.offsetParent !== null);

  const openDialog = (trigger) => {
    lastTrigger = trigger;
    if (completed) {
      form.reset();
      clearEmailValidation();
      sourceInput.value = sourcePage;
      form.hidden = false;
      success.hidden = true;
      completed = false;
    }
    status.textContent = '';
    status.classList.remove('is-error');
    fallback.hidden = true;
    backdrop.hidden = false;
    document.body.classList.add('feedback-dialog-open');
    void backdrop.offsetWidth;
    backdrop.classList.add('is-open');
    dialog.focus({ preventScroll: true });
  };

  const closeDialog = () => {
    backdrop.classList.remove('is-open');
    document.body.classList.remove('feedback-dialog-open');
    setTimeout(() => {
      backdrop.hidden = true;
      if (lastTrigger) lastTrigger.focus();
    }, 180);
  };

  triggerLinks.forEach(trigger => {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'feedback-dialog');
    trigger.addEventListener('click', event => {
      event.preventDefault();
      openDialog(trigger);
    });
  });

  closeButton.addEventListener('click', closeDialog);
  doneButton.addEventListener('click', closeDialog);
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeDialog();
  });

  document.addEventListener('keydown', event => {
    if (backdrop.hidden) return;
    if (event.key === 'Escape') {
      closeDialog();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = focusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!dialog.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    validateEmail(true);
    if (!form.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.textContent = '';
    status.classList.remove('is-error');
    fallback.hidden = true;

    const payload = new FormData(form);
    payload.append('fvv', '1');
    payload.append('pageHistory', '0');
    payload.append('submit', 'Submit');

    try {
      await fetch(formAction.href, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
        referrerPolicy: 'no-referrer'
      });
      form.hidden = true;
      success.hidden = false;
      completed = true;
      doneButton.focus();
    } catch (error) {
      status.textContent = 'We couldn\'t send your feedback. Please try again.';
      status.classList.add('is-error');
      fallback.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send feedback';
    }
  });
}

// =============================================================================
// Initialize from page preset
// =============================================================================

function initFromPagePreset() {
  const body = document.body.dataset;

  // Check for page-level material preset (set in HTML)
  if (body.material && MATERIALS[body.material]) {
    state.material = body.material;
    state.subtype = MATERIALS[body.material].subtypes[0].id;
    state.depth = MATERIALS[body.material].defaultDepth;
  }

  // Check for subtype preset
  if (body.subtype) {
    const material = MATERIALS[state.material];
    const subtypeExists = material.subtypes.some(s => s.id === body.subtype);
    if (subtypeExists) {
      state.subtype = body.subtype;
    }
  }

  // Check for shape preset
  if (body.shape && ['rectangle', 'circle', 'triangle'].includes(body.shape)) {
    state.shape = body.shape;
  }

  // Check for dimension presets
  if (body.length) state.length = body.length;
  if (body.width) state.width = body.width;
  if (body.radius) state.radius = body.radius;
  if (body.base) state.base = body.base;
  if (body.height) state.height = body.height;
  if (body.depth) state.depth = body.depth;
}

// =============================================================================
// Initialize
// =============================================================================

function initCopyrightYear() {
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function hasPagePresets() {
  const body = document.body.dataset;
  return body.length || body.width || body.radius || body.base || body.height;
}

function applyPresetsToInputs() {
  // Apply dimension values to input fields
  if (elements.lengthInput && state.length) {
    elements.lengthInput.value = state.length;
  }
  if (elements.widthInput && state.width) {
    elements.widthInput.value = state.width;
  }
  if (elements.radiusInput && state.radius) {
    elements.radiusInput.value = state.radius;
  }
  if (elements.baseInput && state.base) {
    elements.baseInput.value = state.base;
  }
  if (elements.heightInput && state.height) {
    elements.heightInput.value = state.height;
  }
  if (elements.depthInput && state.depth) {
    elements.depthInput.value = state.depth;
  }
}

function init() {
  initElements();
  initMobileNav();
  initFaqToggles();
  initCopyrightYear();
  initFeedbackForm();

  // Check for page preset first (data attributes on body)
  initFromPagePreset();

  // Then check for URL params (overrides page preset)
  const hasShareParams = parseShareLink();

  // Set up initial UI
  updateMaterialUI();
  updateShapeUI();
  updateDepthChips();

  // Apply presets to input fields
  applyPresetsToInputs();

  // Apply URL params if present (overrides data attributes)
  if (hasShareParams) {
    applyParsedState();
  } else if (hasPagePresets()) {
    // Auto-calculate if page has pre-filled values
    if (validateAllInputs()) {
      handleCalculate();
    }
  }

  // Bind events
  if (elements.materialTabs) {
    elements.materialTabs.forEach(tab => {
      tab.addEventListener('click', () => handleMaterialChange(tab.dataset.material));
    });
  }

  if (elements.shapeBtns) {
    elements.shapeBtns.forEach(btn => {
      btn.addEventListener('click', () => handleShapeChange(btn.dataset.shape));
    });
  }

  if (elements.subtypeSelect) {
    elements.subtypeSelect.addEventListener('change', e => {
      handleSubtypeChange(e.target.value);
    });
  }

  if (elements.depthChips) {
    elements.depthChips.forEach(chip => {
      chip.addEventListener('click', () => {
        handleDepthPreset(parseInt(chip.dataset.depth, 10));
      });
    });
  }

  // Dimension input listeners
  const dimensionInputs = [
    { el: elements.lengthInput, key: 'length' },
    { el: elements.widthInput, key: 'width' },
    { el: elements.radiusInput, key: 'radius' },
    { el: elements.baseInput, key: 'base' },
    { el: elements.heightInput, key: 'height' },
    { el: elements.depthInput, key: 'depth' }
  ];

  dimensionInputs.forEach(({ el, key }) => {
    if (el) {
      el.addEventListener('input', e => {
        state[key] = e.target.value;
        validateInput(el);
        if (key === 'depth') {
          updateDepthChips();
        }
        hideResult();
      });
    }
  });

  if (elements.calculateBtn) {
    elements.calculateBtn.addEventListener('click', handleCalculate);
  }

  if (elements.resetBtn) {
    elements.resetBtn.addEventListener('click', handleReset);
  }

  if (elements.copyBtn) {
    elements.copyBtn.addEventListener('click', handleCopyResult);
  }

  if (elements.shareBtn) {
    elements.shareBtn.addEventListener('click', handleShareLink);
  }

  if (elements.collapsibleTrigger) {
    elements.collapsibleTrigger.addEventListener('click', handleCollapsibleToggle);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MATERIALS,
    calculateArea,
    calculateVolume,
    calculateWeight,
    calculateBags,
    calculateBulkaBags
  };
}
