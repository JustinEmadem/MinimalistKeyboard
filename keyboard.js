let shiftActive = false;

const shiftButtons = document.querySelectorAll('.shift-left, .shift-right');
const dualCharButtons = document.querySelectorAll('[data-normal][data-shift]');

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

// Handle clicking dual-character buttons
dualCharButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const char = shiftActive ? btn.dataset.shift : btn.dataset.normal;
    console.log('Typed:', char);
    
    // If shift was active, turn it off after typing
    if (shiftActive) {
      shiftActive = false;
      shiftButtons.forEach(b => b.classList.remove('shift-active'));
      updateButtonDisplay();
    }
  });
});

// Update button text based on shift state
function updateButtonDisplay() {
  dualCharButtons.forEach(btn => {
    btn.textContent = shiftActive ? btn.dataset.shift : btn.dataset.normal;
  });
}

const capslockBtn = document.querySelector('.capslock');
const capsLight = document.getElementById('caps-light');

let capslockActive = false;

capslockBtn.addEventListener('click', () => {
    capslockActive = !capslockActive;
    capslockBtn.classList.toggle('shift-active', capslockActive);
    capsLight.classList.toggle('light-on', capslockActive);
});

const numlockBtn = document.querySelector('.numlk'); 
const numLight = document.getElementById('num-light');
let numlockActive = true; 

numlockBtn.addEventListener('click', () => {
    numlockActive = !numlockActive;
    numLight.classList.toggle('light-on', numlockActive);
});

const winBtn = document.querySelectorAll('.btn-cwa.green')[1]; 
const winLight = document.getElementById('win-light');

winBtn.addEventListener('click', () => {
    winLight.classList.add('light-on');
    setTimeout(() => {
        winLight.classList.remove('light-on');
    }, 500);
});