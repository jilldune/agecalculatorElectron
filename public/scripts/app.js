function init() {
    // Get all elements
    let day = document.getElementById('day');
    let month = document.getElementById('month');
    let year = document.getElementById('year');
    let outputScreen = document.getElementById('outputScreen');
    let calcButton = document.getElementById('calcButton');
    let resetButton = document.getElementById('resetButton');

    // helper functions
    function addListener(node,type,fn) {
        if(node !== null | undefined && typeof fn === 'function' ) {
            type = type || 'click';
            node.addEventListener(type,(e)=>{fn(e)});
        }
    }
    function checkNumber(target){
        let status = true;
        let value = target.value;
        if(isNaN(value)) {
            target.value = value.substr(0,(value.length - 1));
            return !status;
        }
        return status;
    }
    function limiter(target,length){
        let status = true;
        let value = target.value;
        if(typeof value === "string" && !isNaN(length)) {
            target.value = value.length <= length? value : value.slice(1,value.length);
            return !status;
        }
        return status;
    }

    // validator
    const validator = {
        day: function (target) {
            let value = target.value;
            if(checkNumber(target)) {
                limiter(target,2);
            }
        },
        month: function (target) {
            let value = target.value;
            if(checkNumber(target)) {
                limiter(target,2);                
            }
        },
        year: function (target) {
            let value = target.value;
            if(checkNumber(target)) {
                limiter(target,4);                
            }           
        }
    }

    // validate inputs
    function validateInput(target,type) { validator[type](target); }

    // add listeners / Validators to all the date inputs
    addListener(day,'input',({target})=>{ validateInput(target,'day'); })
    addListener(month,'input',({target})=>{ validateInput(target,'month'); })
    addListener(year,'input',({target})=>{ validateInput(target,'year'); })

    // calculate the age
    function calulateAge() {
        // get the various values
        let dayVal,monthVal,yearVal;
        dayVal = day.value.trim();
        monthVal = month.value.trim();
        yearVal = year.value.trim();

        // check if any of the required input is empty
        if(dayVal && monthVal && yearVal) {
            let today = new Date();
            let dob = new Date([yearVal,monthVal,dayVal].join('/'))
            
            if (dob > today) {
                // output the calculated age
                outputScreen.innerHTML = `<span class="error">Invalid date. Please try again</span>`;
            } else {
                // calculate age difference till today
                let ageMilliDiff = today.valueOf() - dob.valueOf();
                
                // get theday from the millisec value
                let age = Math.floor(ageMilliDiff / 31536000000);
                
                // get the number of days
                let days = Math.floor( (ageMilliDiff % 31536000000) / 86400000 );
                
                // get the nummber of months
                let months = Math.floor( days/ 30 );
                
                // check if ts a birth day
                if( (today.getMonth() === dob.getMonth()) && (today.getDate() === dob.getDate())) {
                    // output the calculated age
                    outputScreen.innerHTML = `<span class="valid">Happy Birthday<br/>You are ${age} year${age > 1? 's':''}, ${months} month${months > 1? 's':''} and ${days} day${days > 1? 's':''} old</span>`;
                } else {
                    if(age && months && days) {
                        // output the calculated age
                        outputScreen.innerHTML = `<span class="valid">You are ${age} year${age > 1? 's':''}, ${months} month${months > 1? 's':''} and ${days} day${days > 1? 's':''} old</span>`;
                    } else {
                        outputScreen.innerHTML ='<span class="error">Please enter a valid date</span>';
                    }
                }
            }
        } else {
            outputScreen.innerHTML ='<span class="error">Please enter a valid date</span>';
        }
    }
    addListener(calcButton,'click', calulateAge);

    // reset button
    addListener(resetButton,'click',()=>{
        day.value = month.value = year.value = null;
        outputScreen.innerHTML = 'Please enter your Date of Birth';
    });
}
window.addEventListener('load',init);