const birthDate = document.querySelector("#birthdate");
const checkButton = document.querySelector("#check-button");
const outputBox = document.querySelector("#output-box");

checkButton.addEventListener("click", clickHandler);

function clickHandler() {
    let input = birthDate.value.split("-"); 
  
  let date = {
    day: parseInt(input[2]),
    month: parseInt(input[1]),
    year: parseInt(input[0]),
  };

  let flag = checkPalindrome(date);
  displayMessage(flag, date);
}

function convertToDateFormat(date) {
  let dateString = numberToString(date);
  let mmddyyyy = dateString.day + dateString.month + dateString.year; // fORMAT-MM/DD/YYYY
  return mmddyyyy;
}

function reverseDate(date) {
  let reverseInput = date.reverse();
  let reverseDate = reverseInput.join("");
  return reverseDate;
}

function numberToString(mydate) {
  dateString = { day: "", month: "", year: "" };
  if (mydate.day < 10) {
    dateString.day = "0" + mydate.day.toString();
  } else {
    dateString.day = mydate.day.toString();
  }
  if (mydate.month < 10) {
    dateString.month = "0" + mydate.month.toString();
  } else {
    dateString.month = mydate.month.toString();
  }

  dateString.year = mydate.year.toString();

  return dateString;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}


function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let leap = isLeapYear(year);
  if (month == 2) {
    //leap year
    if (leap) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      //not a leap year
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      //month=3 but in array index it is 2
      month = month + 1;
      day = 1;
    }
  }

  if (month > 12) {
    year++;
    month = 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(date){
  let counter = 0;
  let nextDate = getNextDate(date);

  while(1)
  {
    counter++;
    let isPalindrome=checkPalindrome(nextDate);
    if(isPalindrome)
    {
      break;
    }
    nextDate=getNextDate(nextDate);
    
  }
   return [counter,nextDate]
  
}

function checkPalindrome(date){
  let formatedDate = convertToDateFormat(date);
  let flag = false;
  let reverseInputDate = reverseDate(formatedDate.split(""));
  if (formatedDate === reverseInputDate) {
    flag = true;
  }

  return flag;
}

function displayMessage(flag, date){
    if (flag) {
      outputBox.style.display = "block";
      outputBox.style.backgroundColor = "#8ee4af";
      outputBox.style.color = "#05386b";
      outputBox.style.fontWeight = "bold";
      outputBox.innerText = "Yoo, Your birthday is palindrome 🥳";
    } else {
        
      let [counter, nextDate] = nextPalindromeDate(date);
      console.log(counter,nextDate)
      outputBox.style.display = "block";
      outputBox.style.backgroundColor = "#8ee4af";
      outputBox.style.color = "#05386b";
      outputBox.style.fontWeight = "bold";
      outputBox.innerText = `Oops, You missed it by ${counter} days.Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} 😥`;
    }
  }