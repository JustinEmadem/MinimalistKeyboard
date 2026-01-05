let shiftActive = false;
let capslockActive = false;

const shiftButtons = document.querySelectorAll('.shift-left, .shift-right');
const dualCharButtons = document.querySelectorAll('[data-normal][data-shift]');
const buttons = document.querySelectorAll('.keyboard-backpanel button');
const capslockBtn = document.querySelector('.capslock');
const capsLight = document.getElementById('caps-light');
const display = document.getElementById('display');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if (value === 'Del') {
            display.value = display.value.slice(0, -1);
        } else if (value === 'Esc') {
            display.value = '';
        } else {
            display.value += value + ' ';
        }
    });
});

// Toggle shift state
shiftButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    shiftActive = !shiftActive;
    
    // Update shift button appearance
    shiftButtons.forEach(b => b.classList.toggle('shift-active', shiftActive));
    
    // Update all dual-character buttons
    updateButtonDisplay();
  });
});

// Toggle capslock state
capslockBtn.addEventListener('click', () => {
    capslockActive = !capslockActive;
    capslockBtn.classList.toggle('shift-active', capslockActive);
    capsLight.classList.toggle('light-on', capslockActive);
    
    // Update button display when capslock changes
    updateButtonDisplay();
});

// Handle clicking dual-character buttons
dualCharButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Check if caps lock OR shift is active
    const shouldCapitalize = capslockActive || shiftActive;
    const char = shouldCapitalize ? btn.dataset.shift : btn.dataset.normal;
    console.log('Typed:', char);
    
    // If shift was active (NOT capslock), turn it off after typing
    if (shiftActive) {
      shiftActive = false;
      shiftButtons.forEach(b => b.classList.remove('shift-active'));
      updateButtonDisplay();
    }
    // Capslock stays on until toggled again
  });
});

// Update button text based on shift OR capslock state
function updateButtonDisplay() {
  dualCharButtons.forEach(btn => {
    // Show shifted character if EITHER shift OR capslock is active
    const shouldCapitalize = capslockActive || shiftActive;
    btn.textContent = shouldCapitalize ? btn.dataset.shift : btn.dataset.normal;
  });
}

// Numlock
const numlockBtn = document.querySelector('.numlk'); 
const numLight = document.getElementById('num-light');
let numlockActive = true;

numLight.classList.add('light-on'); // Initialize as on

numlockBtn.addEventListener('click', () => {
    numlockActive = !numlockActive;
    numLight.classList.toggle('light-on', numlockActive);
});

// Win key
const winBtn = document.querySelectorAll('.btn-cwa.green')[1]; 
const winLight = document.getElementById('win-light');

winBtn.addEventListener('click', () => {
    winLight.classList.add('light-on');
    setTimeout(() => {
        winLight.classList.remove('light-on');
    }, 500);
});