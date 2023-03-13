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

// Flex Wrap : Flexbox
let flexWrappers = Array.from(document.querySelectorAll(".flexWrappers"));

// Flexbox Gaps
let gaps = Array.from(document.querySelectorAll('.gaps'));
let gapForboth = document.querySelector(".gapForBoth");
let gapForrow = document.querySelector(".gapForRow");
let gapForcol = document.querySelector(".gapForCol");

// Alerts
let alertBox = document.querySelector(".stickyAlertBox");
let closeAlert = document.querySelector(".closeTheAlert");
let alertMessage = document.querySelector(".alertMessage");


// CSS Codeblocks
let cssCode = document.querySelector(".language-css");


function getCheckedOne(iterable) {
    let needed = iterable.find(inside => inside.checked);
    return needed;
}

function makingCssCodeBlock() {
    
    let checkedFlexDirection = getCheckedOne(flexDirections);
    let {property: flexDirProperty, happen: flexDirHappen} = checkedFlexDirection.dataset;

    let checkedJustifyContent = getCheckedOne(checkJustify);
    let {property: justifyContentProperty, happen: justifyContentHappen} = checkedJustifyContent.dataset;

    let alignItemsChecked = getCheckedOne(alignItems);
    let {property: alignItemsProperty, happen: alignItemsHappen} = alignItemsChecked.dataset;
    
    let checkedFlexWrapper = getCheckedOne(flexWrappers);
    let {property: flexWrapperProperty, happen: flexWrapperHappen} = checkedFlexWrapper.dataset;

    let gapsRanged = gaps.find((gap) => gap.value > 0);
    
    let rangedGapProperty, rangedGapHappen;
    
    if (gapsRanged) {
        rangedGapProperty = gapsRanged.dataset.property;
        rangedGapHappen  = gapsRanged.dataset.happen; 
    }

    let codeBe;

    if (flexDirProperty || flexDirHappen) {
        codeBe = `
.flexbox{
    display : flex;
    ${flexDirProperty} : ${flexDirHappen};
}`
    }

    if (flexDirProperty || flexDirHappen || justifyContentProperty || justifyContentHappen) {
        codeBe = `
.flexbox{
    display : flex;
    ${flexDirProperty} : ${flexDirHappen};
    ${justifyContentProperty} : ${justifyContentHappen};
}`;
    }

    if (flexDirProperty || flexDirHappen || justifyContentProperty || justifyContentHappen || alignItemsProperty || alignItemsHappen) {
        codeBe = `
.flexbox{
    display : flex;
    ${flexDirProperty} : ${flexDirHappen};
    ${justifyContentProperty} : ${justifyContentHappen};
    ${alignItemsProperty} : ${alignItemsHappen};
}`;
    }

    if (flexDirProperty || flexDirHappen || justifyContentProperty || justifyContentHappen || alignItemsProperty || alignItemsHappen || flexWrapperProperty || flexWrapperHappen || rangedGapProperty || rangedGapHappen) {
        codeBe = `
.flexbox{
    display : flex;
    ${flexDirProperty} : ${flexDirHappen};
    ${justifyContentProperty} : ${justifyContentHappen};
    ${alignItemsProperty} : ${alignItemsHappen};
    ${flexWrapperProperty} : ${flexWrapperHappen};
}`;
    }

    if (
      flexDirProperty &&
      flexDirHappen &&
      justifyContentProperty &&
      justifyContentHappen &&
      alignItemsProperty &&
      alignItemsHappen &&
      flexWrapperProperty &&
      flexWrapperHappen &&
      rangedGapProperty &&
      rangedGapHappen
    ) {
      codeBe = `
.flexbox{
    display : flex;
    ${flexDirProperty} : ${flexDirHappen};
    ${justifyContentProperty} : ${justifyContentHappen};
    ${alignItemsProperty} : ${alignItemsHappen};
    ${flexWrapperProperty} : ${flexWrapperHappen};
    ${rangedGapProperty} : ${rangedGapHappen};
}`;
    }

cssCode.innerHTML = codeBe;

}


// Alert Functionality
function makeAnAlert(message) {
    if (message) {
        alertBox.classList.add('showTheAlert');
        alertMessage.innerHTML = message;
        // setTimeout(function () {
        //     alertBox.classList.remove('showTheAlert');
        //     alertMessage.innerHTML = 'Shows Alert Message.';
        // }, 4000)
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
        flexWrappers[0].checked = true;
        makingCssCodeBlock();
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
        flexWrappers.forEach((flex) => {
            flex.checked = false;
            flexbox.classList.remove(`makeFlexWrap${flex.dataset.wrap}`);
        })

        // CSS Code block
        let dummyCode = `
/* CSS - Flexbox */
/* Make Changes to see CODE. */`

        cssCode.innerHTML = dummyCode;
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
                flexbox.style.height = '150vh';
            }
            else {
                flexbox.style.height = '100%';
            }
        })

        makingCssCodeBlock();
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

        makingCssCodeBlock();
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

      makingCssCodeBlock();

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
        this.dataset.happen = `${this.value}px`;
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

        makingCssCodeBlock();
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

// Handle Flex Wrap
function handleFlexWrap() {

    let token = this.dataset.wrap;
    
    if (convertFlex.checked) {
        flexWrappers.forEach((flex) => {
            
            if (flex.dataset.wrap === this.dataset.wrap) {
              flex.checked = true;
            } else {
              flex.checked = false;
            }

            if (flex.checked) {
                flexbox.classList.add(`makeFlexWrap${flex.dataset.wrap}`);
            }
            else {
                flexbox.classList.remove(`makeFlexWrap${flex.dataset.wrap}`);
            }

        })

        makingCssCodeBlock();
    }
    
    else {
        makeAnAlert('Cannot use Flex Wrap outside Flexbox!');
        flexWrappers.forEach((flex) => {
            flex.checked = false;
        })
    }
}


convertFlex.addEventListener('click', makeFlex);
flexDirections.forEach((direction) => {direction.addEventListener('click', handleFlexDirection)})
checkJustify.forEach((justify) => {justify.addEventListener('click', handleJustifyContent)})
alignItems.forEach((align) => {align.addEventListener('click', handleAlignItems)});
gaps.forEach((anygap) => {
    anygap.addEventListener('change', handleFlexBoxGapChanges);
    // anygap.addEventListener('mousemove', handleFlexBoxGapChanges);
})
flexWrappers.forEach((flexWrap) => {flexWrap.addEventListener('click', handleFlexWrap)})