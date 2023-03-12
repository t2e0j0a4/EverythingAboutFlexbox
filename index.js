// Flexbox
let flexbox = document.querySelector(".flexbox");

/* Checkboxes to make Flexbox */

// Convert to Flexbox
let convertFlex = document.querySelector(".convertFlex");

// Directions : Row, Column
let flexDirections = Array.from(document.querySelectorAll(".checkDir"));

// Justify Content : Flexbox
let checkJustify = Array.from(document.querySelectorAll('.checkJustify'));

// Align Items : Flexbox
let alignItems = Array.from(document.querySelectorAll(".checkAlign"));

// Flexbox Gaps
let gaps = Array.from(document.querySelectorAll('.gaps'));
let gapForboth = document.querySelector(".gapForBoth");
let gapForrow = document.querySelector(".gapForRow");
let gapForcol = document.querySelector(".gapForCol");

// Alerts
let alertBox = document.querySelector(".stickyAlertBox");
let closeAlert = document.querySelector(".closeTheAlert");
let alertMessage = document.querySelector(".alertMessage");


// Alert Functionality
function makeAnAlert(message) {
    if (message) {
        alertBox.classList.add('showTheAlert');
        alertMessage.innerHTML = message;
        setTimeout(function () {
            alertBox.classList.remove('showTheAlert');
            alertMessage.innerHTML = 'Shows Alert Message.';
        }, 4000)
    }
}

// Close alert using button
closeAlert.addEventListener('click', function() {
    if (alertBox.classList.contains('showTheAlert')) {
        alertBox.classList.remove('showTheAlert');
    }
})


// makeFlex Functionality
function makeFlex(e) {
    if (this.checked) {
        flexbox.classList.add('makeFlexbox');
        flexDirections[0].checked = true;
        checkJustify[0].checked = true;
        alignItems[0].checked = true;
    }
    else if (!this.checked) {
        flexbox.classList.remove("makeFlexbox");
        flexbox.style.height = "100%";
        flexDirections[0].checked = false;
        flexDirections.forEach((direction) => {
            flexbox.classList.remove(`makeFlexbox${direction.dataset.dir}`);
            direction.checked = false;
        })
        checkJustify.forEach((justify) => {
            flexbox.classList.remove(`makeJustify${justify.dataset.justify}`);
            justify.checked = false;
        })
        alignItems.forEach((align) => {
            flexbox.classList.remove(`makeAlign${align.dataset.align}`);
            align.checked = false;
        })
        gaps.forEach((gap) => {
            gap.value = 0;
            gapForboth.innerHTML = '(0px)';
            gapForrow.innerHTML = '(0px)';
            gapForcol.innerHTML = '(0px)';
        })
    }
}

// Handle Flex Direction Functionality
// Default : Row
function handleFlexDirection() {
    if (convertFlex.checked) {
        flexDirections.forEach((direction) => {
            direction.dataset.dir === this.dataset.dir ? direction.checked = true : direction.checked = false;
            direction.checked === true ? flexbox.classList.add(`makeFlexbox${direction.dataset.dir}`) : flexbox.classList.remove(`makeFlexbox${direction.dataset.dir}`)

            if (this.dataset.dir === 'col' || this.dataset.dir === 'colre') {
                console.log('column')
                flexbox.style.height = '150vh';
            }
            else {
                flexbox.style.height = '100%';
            }
        })
    }

    else {
        makeAnAlert('Check Flexbox for using Flex Directions.');
        flexDirections.forEach((direction) => {
            direction.checked = false;
        })
    }
}

// Handle Justify Content Functionality
// Ḍefault : flex-start (flexstart : data-justify)
function handleJustifyContent() {
    if (convertFlex.checked) {
        checkJustify.forEach((justify) => {
            justify.dataset.justify === this.dataset.justify ? justify.checked = true : justify.checked = false;

            justify.checked === true ? flexbox.classList.add(`makeJustify${justify.dataset.justify}`) : flexbox.classList.remove(`makeJustify${justify.dataset.justify}`)
        })
    }

    else {
        makeAnAlert('Alignments can be done on Flexbox only!');
        checkJustify.forEach((justify) => {
            justify.checked = false;
        })
    }
}

// Handle Align Items Functionality
// Default : flex-start (flexstart : data-align)
function handleAlignItems() {
    if (convertFlex.checked) {
      alignItems.forEach((align) => {
        align.dataset.align === this.dataset.align
          ? (align.checked = true)
          : (align.checked = false);

        align.checked === true
          ? flexbox.classList.add(`makeAlign${align.dataset.align}`)
          : flexbox.classList.remove(`makeAlign${align.dataset.align}`);
      });
    } else {
      makeAnAlert("Alignments can be done on Flexbox only!");
      alignItems.forEach((align) => {
        align.checked = false;
      });
    }
}

// Gaps Functionality
// Initially 0px (Max : 10px)
function handleFlexBoxGapChanges(e) {
    let token = this.dataset.gap;
    
    if (convertFlex.checked) {

        if (token === 'both') {
            gaps[1].value = 0;
            gaps[2].value = 0;
            gapForrow.innerHTML = '(0px)';
            gapForcol.innerHTML = '(0px)';
        }

        else if (token === 'row') {
            gaps[0].value = 0;
            gaps[2].value = 0;
            gapForboth.innerHTML = "(0px)";
            gapForcol.innerHTML = "(0px)";
        }

        else {
            gaps[0].value = 0;
            gaps[1].value = 0;
            gapForrow.innerHTML = "(0px)";
            gapForboth.innerHTML = "(0px)";
        }

        token === 'both' ? flexbox.style.gap = `${this.value}px` : token === 'row' ? flexbox.style.rowGap = `${this.value}px` : flexbox.style.columnGap = `${this.value}px`;

        token === 'both' ? gapForboth.innerHTML = `(${this.value}px)` : token === 'row' ? gapForrow.innerHTML = `(${this.value}px)` : token === 'col' ? gapForcol.innerHTML = `(${this.value}px)` : ''

        
    }

    else {
        if (e.type !== 'mousemove'){
            makeAnAlert('Gaps can be used in Flexbox only!');
        }
        gaps.forEach((gap) => {
            gap.value = 0;
        })
    }
}

convertFlex.addEventListener('click', makeFlex);
flexDirections.forEach((direction) => {direction.addEventListener('click', handleFlexDirection)})
checkJustify.forEach((justify) => {justify.addEventListener('click', handleJustifyContent)})
alignItems.forEach((align) => {align.addEventListener('click', handleAlignItems)});
gaps.forEach((anygap) => {
    anygap.addEventListener('change', handleFlexBoxGapChanges);
    anygap.addEventListener('mousemove', handleFlexBoxGapChanges);
})