let shiftActive = false;
let capslockActive = false;

const shiftButtons = document.querySelectorAll('.shift-left, .shift-right');
const dualCharButtons = document.querySelectorAll('[data-normal][data-shift]');
const buttons = document.querySelectorAll('.keyboard-backpanel button');
const capslockBtn = document.querySelector('.capslock');
const capsLight = document.getElementById('caps-light');
const display = document.getElementById('display');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const value = btn.textContent.trim();
        const action = btn.dataset.action;

        if (action) {
            if (action === 'backspace') {
                display.value = display.value.slice(0, -1);
            }
            return;
        }
        if (value === 'Esc') {
            display.value = '';
        } else if (value) {
            display.value += value + ' ';
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.key === 'Shift') {
        shiftButtons.forEach(btn => btn.click());
        return;
    }

    if (e.key === 'CapsLock') {
        capslockBtn.click();
        return;
    }

    if (e.key === 'Backspace') {
        const backspaceBtn = document.querySelector('[data-action="backspace"]');
        if (backspaceBtn) backspaceBtn.click();
        return;
    }

    if (e.key === 'Escape') {
        const escBtn = [...buttons].find(b => b.textContent.trim() === 'Esc');
        if (escBtn) escBtn.click();
        return;
    }

    const key = e.key.length === 1 ? e.key : null;
    if (!key) return;

    const button = document.querySelector(
        `[data-normal="${key.toLowerCase()}"], [data-shift="${key}"]`
    );

    if (button) {
        button.classList.add('active');
        button.click();
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.length === 1 ? e.key : null;
    if (!key) return;

    const button = document.querySelector(
        `[data-normal="${key.toLowerCase()}"], [data-shift="${key}"]`
    );

    if (button) {
        button.classList.remove('active');
    }
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