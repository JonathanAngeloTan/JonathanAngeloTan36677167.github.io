const openBtn = document.getElementById("openBooking");
const modal = document.getElementById("bookingModal");
const closeBtn = document.getElementById("closeBooking");
const finishBtn = document.getElementById("finishBooking");

const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const backBtns = document.querySelectorAll(".back-btn");
const progress = document.getElementById("progressBar");
const summary = document.getElementById("summary");

let currentStep = 0;

// open / close
openBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  resetForm();
});

finishBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  resetForm();
});

// navigation
nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep()) {
      changeStep(1);
    }
  });
});

backBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    changeStep(-1);
  });
});

function changeStep(direction) {
  steps[currentStep].classList.remove("active");
  currentStep += direction;
  steps[currentStep].classList.add("active");
  updateProgress();

  if (currentStep === 3) {
    loadSummary();
  }
}

function updateProgress() {
  const percent = (currentStep / (steps.length - 2)) * 100;
  progress.style.width = percent + "%";
}

// validation
function validateStep() {
  let valid = true;

  const stepsInputs = steps[currentStep].querySelectorAll("input, select");

  stepsInputs.forEach(input => {
    const error = input.nextElementSibling;

    if (input.value.trim() === "") {
      error.style.display = "block";
      error.textContent = "This field is required";
      valid = false;
    } else {
      error.style.display = "none";
    }

    if (input.type === "email") {
      if (!input.value.includes("@") || !input.value.includes(".")) {
        error.style.display = "block";
        error.textContent = "Enter a valid email address";
        valid = false;
      }
    }
  });

  return valid;
}


// summary
function loadSummary() {
  summary.innerHTML = `
    <strong>Name:</strong> ${bName.value}<br>
    <strong>Email:</strong> ${bEmail.value}<br>
    <strong>Pest:</strong> ${bPest.value}<br>
    <strong>Urgency:</strong> ${bUrgency.value}<br>
    <strong>Address:</strong> ${bAddress.value}<br>
    <strong>Property:</strong> ${bProperty.value}<br>
    <strong>Size:</strong> ${bSize.value}<br>
    <strong>Extra details:</strong> ${bDetails.value || "None"}
  `;
}


// submit
document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  steps[currentStep].classList.remove("active");
  currentStep++;
  steps[currentStep].classList.add("active");
  progress.style.width = "100%";
});

// reset
function resetForm() {
  steps[currentStep].classList.remove("active");
  currentStep = 0;
  steps[currentStep].classList.add("active");
  document.getElementById("bookingForm").reset();
  progress.style.width = "0%";
}
