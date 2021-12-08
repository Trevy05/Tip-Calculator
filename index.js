const percentButtons = document.querySelectorAll(".percent");
const peopleInput = document.querySelector("#people");
const billInput = document.querySelector("#bill");
const tip = document.getElementById("tip");
const tipTotal = document.getElementById("tip-total");
const reset = document.getElementById("reset");

let persons = 0;
let percentage = 0;
let bill = 0;

// Event listener to set percentage using each button
percentButtons.forEach((ele) => {
  ele.addEventListener("click", () => {
    percentage = parseFloat(ele.innerHTML.slice(0, ele.innerHTML.length - 1));
    percentButtons.forEach((ele2) => {
      ele2.classList.remove("selected");
      ele2.classList.add("percent");
    });
    ele.classList.remove("percent");
    ele.classList.add("selected");
    if (bill && persons && percentage) {
      tip.innerHTML = `$${tipCalculation().toFixed(2)}`;
      tipTotal.innerHTML = `$${totalCalculation().toFixed(2)}`;
    }
  });
});

// Calculating tip amount
tipCalculation = () => {
  if (billInput.value != 0) {
    let tip = bill * (percentage / 100);

    return tip / persons;
  } else {
    return 0;
  }
};

// Calculating total amount
totalCalculation = () => {
  if (billInput.value != 0) {
    return (bill + bill * (percentage / 100)) / persons;
  } else {
    return 0;
  }
};

// Resetting
reset.addEventListener("click", () => {
  percentage = 0;
  tip.innerHTML = "$0.00";
  tipTotal.innerHTML = "$0.00";
  reset.style.backgroundColor = "hsl(183, 98%, 21%)";
  document.querySelectorAll("input").forEach((ele) => {
    ele.value = 0;
  });
});

// Complete calculations when input changes
document.querySelectorAll("input").forEach((ele) => {
  ele.addEventListener("change", () => {
    if (ele.id == "bill") {
      bill = parseFloat(billInput.value);
    }
    if (ele.id == "custom-percentage") {
      percentage = ele.value;
    }

    if (ele.id == "people") {
      persons = parseInt(ele.value);
    }

    if (bill && persons && percentage) {
      tip.innerHTML = `$${tipCalculation().toFixed(2)}`;
      tipTotal.innerHTML = `$${totalCalculation().toFixed(2)}`;
    }
    reset.style.backgroundColor = "hsl(172, 67%, 45%)";
  });
});

document.querySelectorAll("input").forEach((ele) => {
  ele.addEventListener("focus", () => {
    ele.style.color = "hsl(183, 100%, 15%)";
  });
});
