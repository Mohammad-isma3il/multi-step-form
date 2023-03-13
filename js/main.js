// todo :  fix the section 2 pricing that doesn't appear until u press the button 
//||  (done)

// todo :fix the duplication in section 4

// ! toggler functionality (yearly monthly "step-2")
// ! objects : monthly / yearly , this update dynamically the month or year plan chosen by the user
const toggler = document.querySelector(".toggler-btn");
const plans = document.querySelectorAll(".plans-btn");
const hidden = document.querySelectorAll(".hidden-price");
let MonOrYr = toggler.getAttribute("value");

const Monthly = {
  plans: {
    arcade: 9,
    advanced: 12,
    pro: 15,
  },
  adds: {
    onlineService: 1,
    largerStorage: 2,
    customizableProfile: 2,
  },
};
const Yearly = {
  plans: {
    arcade: 90,
    advanced: 120,
    pro: 150,
  },
  adds: {
    onlineService: 10,
    largerStorage: 20,
    customizableProfile: 20,
  },
};

const PlansPrice = document.querySelectorAll(".plansPriceJs");
const addOn = document.querySelectorAll(".addOnPrice");



const IntervalSync = setInterval(() => {
  if (stepsSections[1].classList.contains("active")) {
    PlansPrice[0].textContent = Monthly.plans.arcade;
    PlansPrice[1].textContent = Monthly.plans.advanced;
    PlansPrice[2].textContent = Monthly.plans.pro;

    addOn[0].textContent = Monthly.adds.onlineService;
    addOn[1].textContent = Monthly.adds.largerStorage;
    addOn[2].textContent = Monthly.adds.customizableProfile;

    clearInterval(IntervalSync);
  }
}, 10);

function togglerMove() {
  let value = toggler.getAttribute("value");

  if (value == "monthly") {
    toggler.style.transform = "translateX(185%)";
    toggler.setAttribute("value", "yearly");
    MonOrYr = "yearly";
    PlansPrice[0].textContent = Yearly.plans.arcade;
    PlansPrice[1].textContent = Yearly.plans.advanced;
    PlansPrice[2].textContent = Yearly.plans.pro;

    addOn[0].textContent = Yearly.adds.onlineService;
    addOn[1].textContent = Yearly.adds.largerStorage;
    addOn[2].textContent = Yearly.adds.customizableProfile;
  } else {
    toggler.style.transform = "translateX(0)";
    toggler.setAttribute("value", "monthly");
    MonOrYr = "monthly";
    PlansPrice[0].textContent = Monthly.plans.arcade;
    PlansPrice[1].textContent = Monthly.plans.advanced;
    PlansPrice[2].textContent = Monthly.plans.pro;

    addOn[0].textContent = Monthly.adds.onlineService;
    addOn[1].textContent = Monthly.adds.largerStorage;
    addOn[2].textContent = Monthly.adds.customizableProfile;
  }

  for (let i = 0; i < plans.length; i++) {
    if (value != plans[i].getAttribute("value")) {
      plans[i].classList.add("active");
    } else {
      plans[i].classList.remove("active");
    }
  }

  if (value != "yearly") {
    hidden.forEach((hiddenItem) => hiddenItem.classList.add("active"));
  } else {
    hidden.forEach((hiddenItem) => hiddenItem.classList.remove("active"));
  }
}

toggler.addEventListener("click", () => {
  togglerMove();
});

// ! toggler functionality (yearly monthly "step-2")
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// || prev / next / sideBar function
// ||--------------------------------------

const goBack = document.querySelectorAll(".go-back");
const sideBarNumbers = document.querySelectorAll(".num");
const nextStepBtn = document.querySelectorAll(".nxt-btn");
const stepsSections = document.querySelectorAll(".step-sec");
const boxes = document.querySelectorAll(".box");
let activeBoxName, activeBoxPrice;

// ! check form if they are empty or not (validator)

const requiredInputs = document.querySelectorAll("[required]");
let allValues = false;

let isFormFilled = new Array();
for (let i = 0; i < requiredInputs.length; i++) {
  isFormFilled.push(false);
}

function checkAllInputs(inputs) {
  let len = inputs.length;

  for (let i = 0; i < len; i++) {
    if (inputs[i].value.trim() == "") {
      isFormFilled[i] = false;
    } else {
      isFormFilled[i] = true;
    }
  }

  for (let k = 0; k < 1; k++) {
    if (
      isFormFilled[k] == true &&
      isFormFilled[k + 1] == true &&
      isFormFilled[k + 2] == true
    ) {
      allValues = true;
    } else {
      allValues = false;
    }
  }
}
// ! check form if they are empty or not (validator)

// !===============================================================||
// !===============================================================||
// ? functions : changeSection(arg1,arg2,..arg3) =>> this function take 2 necessary arguments :btn name and the current section
// ? and do all the necessary changes related to the name and the current section
// !===============================================================||
// !===============================================================||
let i;

function changeSection(btnName, currentSection, ...type) {
  if (btnName == "next") {
    for (i = 0; i < stepsSections.length - 1; i++) {
      if (stepsSections[i].classList.contains(currentSection)) {
        if (type == "INPUT") {
          checkAllInputs(requiredInputs);
          if (allValues) {
            stepsSections[i].classList.remove("active");
            stepsSections[i + 1].classList.add("active");
            if (
              sideBarNumbers[i].getAttribute("data-currentSection") ==
              stepsSections[i].className.split(" ")[0]
            ) {
              sideBarNumbers[i].classList.remove("active");
              sideBarNumbers[i + 1].classList.add("active");
            }
          }
        } else {
          stepsSections[i].classList.remove("active");
          stepsSections[i + 1].classList.add("active");
          if (
            sideBarNumbers[i].getAttribute("data-currentSection") ==
            stepsSections[i].className.split(" ")[0]
          ) {
            sideBarNumbers[i].classList.remove("active");
            sideBarNumbers[i + 1].classList.add("active");
          }
        }
      }
    }
  } else if (btnName == "pre") {
    for (let i = 0; i < stepsSections.length; i++) {
      if (stepsSections[i].classList.contains(currentSection)) {
        stepsSections[i].classList.remove("active");
        stepsSections[i - 1].classList.add("active");
        if (
          sideBarNumbers[i].getAttribute("data-currentSection") ==
          stepsSections[i].className.split(" ")[0]
        ) {
          sideBarNumbers[i].classList.remove("active");
          sideBarNumbers[i - 1].classList.add("active");
        }
      }
    }
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    boxes.forEach((activeBox) => activeBox.classList.remove("active"));

    box.classList.add("active");
  });
});

nextStepBtn.forEach((nxtBtn) => {
  nxtBtn.addEventListener("click", () => {
    if (nxtBtn.tagName == "INPUT") {
      changeSection(
        nxtBtn.getAttribute("name"),
        nxtBtn.getAttribute("data-currentSection"),
        nxtBtn.tagName
      );
    } else {
      changeSection(
        nxtBtn.getAttribute("name"),
        nxtBtn.getAttribute("data-currentSection")
      );
    }
  });
});

goBack.forEach((backBtn) => {
  backBtn.addEventListener("click", () => {
    changeSection(
      backBtn.getAttribute("name"),
      backBtn.getAttribute("data-currentSection")
    );
  });
});

// || prev / next / sideBar function
// ||--------------------------------------

// ? checkbox section ( add on )

const check = document.querySelectorAll("input[type=checkbox]");
const servBox = document.querySelectorAll(".serv");

servBox.forEach((servBtn) => {
  servBtn.addEventListener("click", () => {
    servBtn.classList.toggle("check");
    let servInfo = servBtn.querySelector(".serv-info");
    let checkBox = servInfo.querySelector(".check-box");
    const checkBtn = checkBox.querySelector(".checkbox");
    checkBtn.toggleAttribute("checked");
  });
});

// !=============================================================================||
// !=============================================================================||
// !!! total section where all the data user have chosen is here to be calculated
// !=============================================================================||
// !=============================================================================||
let checkBoxes;
const allAds = document.querySelectorAll(".serv");
let checkedElements = new Array();
let checkedElementsPrices = new Array();
let addNameAndPrice = new Array();
const chosenPlanName = document.getElementById("chosenPlan");
const chosenPlanPrice = document.getElementById("chosenPlanPrice");
const chosenAdd = document.querySelectorAll(".addOnNames");
const chosenAddPrice = document.querySelectorAll(".addOnPriceChecked");
let checkedAdds = new Array();
const total = document.querySelector(".totalPrice");
let totalNum = Number(total);
totalNum = 0;
let chosenPlanPriceForTotal = new Number();
chosenPlanPriceForTotal = 0;
const totalMoOrYr = document.querySelector(".totalMoOrYr");

// !===============================================================================================================||
// ? function 1 : Section2Validator(currentSection): take the  section of the user that is needed to fetch data from
// ? and return plan[name ||&|| price]
// !===============================================================================================================||

// !===============================================================================================================||
// ? function 2:  sec3Validator() : take no parameters and return the data collected from section 3 (checkboxes)
//? to add them in the total section it return 2 arrays in 1 array[[the add on name], [the add on price]]
// !===============================================================================================================||

// !===============================================================================================================||
// ? function 3:  validatorInterval() : take no parameters it runs an interval to keep all the updates of data
// ?and update them in the total section
// !===============================================================================================================||

function Section2Validator(currentSection) {
  if (currentSection == "second-step") {
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].classList.contains("active")) {
        activeBoxName = boxes[i].querySelector(".info h5").textContent;
        activeBoxPrice = boxes[i].querySelector(
          ".info .plansPriceJs"
        ).textContent;
      }
    }
  }

  return [activeBoxName, activeBoxPrice];
}
function sec3Validator() {
  allAds.forEach((ad) => {
    checkBoxes = ad.querySelectorAll('[type="checkbox"]');
    for (let i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].hasAttribute("checked")) {
        addNameAndPrice = [
          ad.querySelector(".serv-text p").textContent,
          ad.querySelector(".serv-price .addOnPrice").textContent,
        ];

        checkedElements.unshift(addNameAndPrice);
      }

    }
  });

  return checkedElements;
}
function validatorInterval() {
  let validatorInterval = setInterval(() => {
    if (stepsSections[3].classList.contains("active")) {
      let planName = Section2Validator("second-step");

      // !
      let moOrYr;
      if (MonOrYr == "monthly") {
        moOrYr = "mo";
      } else {
        moOrYr = "yr";
      }
      // !

      chosenPlanName.textContent = `${planName[0]}(${MonOrYr})`;
      chosenPlanPrice.textContent = `$${planName[1]}/${moOrYr}`;
      totalMoOrYr.textContent = `${MonOrYr}`;

      checkedAdds = sec3Validator();
      let checkedPrice = new Number();
      let chosenAddName;

      for (let i = 0; i < checkedAdds.length; i++) {
        chosenAdd[i].textContent = checkedAdds[i][0];
        checkedPrice = parseInt(checkedAdds[i][1]);
        chosenAddPrice[i].textContent = `$${checkedPrice}/${moOrYr}`;

        chosenAddName = chosenAdd[i].textContent;

        if (chosenAddName.toUpperCase() == " Online service".toUpperCase()) {
          if (MonOrYr == "monthly") {
            totalNum += Monthly.adds.onlineService;
          } else {
            totalNum += Yearly.adds.onlineService;
          }
        } else if (
          chosenAddName.toUpperCase() === "Larger storage".toUpperCase()
        ) {
          if (MonOrYr == "monthly") {
            totalNum += Monthly.adds.largerStorage;
          } else {
            totalNum += Yearly.adds.largerStorage;
          }
        } else if (
          chosenAddName.toUpperCase() === "Customizable Profile".toUpperCase()
        ) {
          if (MonOrYr == "monthly") {
            totalNum += Monthly.adds.customizableProfile;
          } else {
            totalNum += Yearly.adds.customizableProfile;
          }
        }
      }

      chosenPlanPriceForTotal += Number(planName[1]);
      totalNum += chosenPlanPriceForTotal;

      total.textContent = `${totalNum}/${moOrYr}`;

      clearInterval(validatorInterval);
    } else {
      let refresher = document.querySelectorAll(".refresh");


      
    }
  }, 100);
}

validatorInterval();

const changePlan = document.querySelector(".changePlan");

changePlan.addEventListener("click", () => {
  let pos = changePlan.getAttribute("data-currentSection");
  for (let i = 0; i < stepsSections.length; i++) {
    if (stepsSections[i].classList.contains(pos)) {
      stepsSections[i].classList.remove("active");
    }
  }
  for (let i of stepsSections) {
    if (i.classList.contains("second-step")) {
      i.classList.add("active");
    }
  }

  totalNum = 0;
  validatorInterval();

  
});
