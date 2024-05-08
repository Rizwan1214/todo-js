const employeeFormWrapper = document.getElementsByClassName(
  "employeeFormWrapper"
)[0];

const employeeForm = document.getElementById("formInputData");
const employeeList = document.getElementById("employee-list");
const submitButton = document.getElementById("submit-btn");
const searchFilter = document.getElementById("search-filter");
const employeeData = [];
let employeeListDataId = 1;
let employeeDataIndex = 0;

document.getElementById("addEmployee").addEventListener("click", function () {
  employeeFormWrapper.classList.add("show");
});

employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitButton.textContent === "Submit" ? employeeSubmit() : employeeUpdate();
});

function mapListData() {
  const mapData = employeeData.map((elem, index) => {
    return `
              <tr>
                  <td>${elem.employeeId}</td>
                  <td>${elem.employeeName}</td>
                  <td>${elem.employeeDesignation}</td>
                  <td>${elem.employeeEmail}</td>
                  <td>${elem.employeeCity}</td>
                  <td>
                    <div class="list-btn-wrapper">
                        <button onclick="editList(${index})">✎</button>
                        <button onclick="deleteList(${index})">🗑</button>
                    </div>
                  </td>
              </tr>
      `;
  });
  employeeList.innerHTML = mapData.join(" ");
}

function validateInput(inputElement, regex, errorMessage) {
  const inputValue = inputElement.value;
  const errorElement = inputElement.parentElement.querySelector(".nameError");

  if (!regex.test(inputValue)) {
    if (!errorElement) {
      const nameError = document.createElement("p");
      nameError.innerHTML = errorMessage;
      nameError.className = "nameError";
      inputElement.parentElement.appendChild(nameError);
    }
  } else {
    if (errorElement) {
      errorElement.remove();
    }
  }
}

employeeForm.employeeName.addEventListener("input", function () {
  validateInput(
    this,
    /^[a-zA-Z ]{0,20}$/,
    "The length of the character is not valid."
  );
});

employeeForm.employeeDesignation.addEventListener("input", function () {
  validateInput(
    this,
    /^[a-zA-Z ]{0,20}$/,
    "The length of the character is not valid."
  );
});

employeeForm.employeeEmail.addEventListener("input", function () {
  validateInput(
    this,
    /^[a-zA-Z0-9]{0,30}@[a-zA-Z]{0,10}\.[a-zA-Z]{0,3}$/,
    "Your email is not valid."
  );
});

employeeForm.employeeCity.addEventListener("input", function () {
  validateInput(
    this,
    /^[a-zA-Z ]{0,20}$/,
    "The length of the character is not valid."
  );
});

function validateField(field) {
  if (field.value === "") {
    field.parentElement.classList.add("error");
    field.parentElement.classList.remove("input-filled");
  } else {
    field.parentElement.classList.remove("error");
    field.parentElement.classList.add("input-filled");
  }
}

function removeError(field) {
  field.parentElement.classList.remove("error");
  field.parentElement.classList.remove("input-filled");
}

function removeErrorIn() {
  removeError(employeeForm.employeeName);
  removeError(employeeForm.employeeDesignation);
  removeError(employeeForm.employeeEmail);
  removeError(employeeForm.employeeCity);
}

function employeeSubmit() {
  if (
    employeeForm.employeeName.value === "" ||
    employeeForm.employeeDesignation.value === "" ||
    employeeForm.employeeEmail.value === "" ||
    employeeForm.employeeCity.value === ""
  ) {
    validateField(employeeForm.employeeName);
    validateField(employeeForm.employeeDesignation);
    validateField(employeeForm.employeeEmail);
    validateField(employeeForm.employeeCity);
  } else {
    employeeData.push({
      employeeId: employeeListDataId++,
      employeeName: employeeForm.employeeName.value,
      employeeDesignation: employeeForm.employeeDesignation.value,
      employeeEmail: employeeForm.employeeEmail.value,
      employeeCity: employeeForm.employeeCity.value,
    });
    mapListData();
    employeeForm.reset();
    employeeFormWrapper.classList.remove("show");
    removeErrorIn();
    console.log(employeeData);
  }
}

function employeeUpdate() {
  submitButton.textContent = "Submit";
  employeeData[employeeDataIndex] = {
    employeeId: employeeData[employeeDataIndex].employeeId,
    employeeName: employeeForm.employeeName.value,
    employeeDesignation: employeeForm.employeeDesignation.value,
    employeeEmail: employeeForm.employeeEmail.value,
    employeeCity: employeeForm.employeeCity.value,
  };
  mapListData();
  employeeForm.reset();
  employeeFormWrapper.classList.remove("show");
}

function editList(elem) {
  console.log(employeeData[elem]);
  employeeDataIndex = elem;
  employeeForm.employeeName.value = employeeData[elem].employeeName;
  employeeForm.employeeDesignation.value =
    employeeData[elem].employeeDesignation;
  employeeForm.employeeEmail.value = employeeData[elem].employeeEmail;
  employeeForm.employeeCity.value = employeeData[elem].employeeCity;

  submitButton.textContent = "Update";
  employeeFormWrapper.classList.add("show");
}

function deleteList(elem) {
  employeeData.splice(elem, 1);
  mapListData();
  employeeForm.reset();
  submitButton.textContent = "Submit";
}

searchFilter.addEventListener("input", function () {
  const filteredEmployeeData = employeeData.filter((elem) =>
    elem.employeeName.includes(searchFilter.value)
  );
  const mapData = filteredEmployeeData.map((elem, index) => {
    return `
              <tr>
                  <td>${elem.employeeId}</td>
                  <td>${elem.employeeName}</td>
                  <td>${elem.employeeDesignation}</td>
                  <td>${elem.employeeEmail}</td>
                  <td>${elem.employeeCity}</td>
                  <td>
                    <div class="list-btn-wrapper">
                        <button onclick="editList(${index})">✎</button>
                        <button onclick="deleteList(${index})">🗑</button>
                    </div>
                  </td>
              </tr>
      `;
  });
  employeeList.innerHTML = mapData.join(" ");
  console.log(filteredEmployeeData);
});

const customArray = [
  {
    employeeId: 1,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 2,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 3,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 4,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 5,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 6,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 7,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 8,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 9,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 10,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 11,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 12,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 13,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 14,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 15,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 16,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 17,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 18,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 19,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 20,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 21,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 22,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 23,
    employeeName: "rizwan",
    employeeDesignation: "frontend",
    employeeEmail: "rizwan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 24,
    employeeName: "Nabeel Muzaffar",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
];
const customData = customArray.map((elem, index) => {
  return `
  <tr>
      <td>${elem.employeeId}</td>
      <td>${elem.employeeName}</td>
      <td>${elem.employeeDesignation}</td>
      <td>${elem.employeeEmail}</td>
      <td>${elem.employeeCity}</td>
      <td>
        <div class="list-btn-wrapper">
            <button onclick="editList(${index})">✎</button>
            <button onclick="deleteList(${index})">🗑</button>
        </div>
      </td>
  </tr>
`;
});
employeeList.innerHTML = customData.join(" ");

let pageCount = 6;
let totalPages = Math.ceil(customArray.length / pageCount);

for (let i = 1; i <= totalPages; i++) {
  document.getElementById(
    "page-btn"
  ).innerHTML += `<button onclick="console.log(${i})">${i}</button>`;
}
document.getElementById("prev-btn").addEventListener("click", function () {
  console.log("Previous");
  if (totalPages > 1) {
    totalPages--;
    console.log(totalPages);
  }
});

document.getElementById("next-btn").addEventListener("click", function () {
  console.log("Next");
  if (totalPages < Math.ceil(customArray.length / pageCount)) {
    totalPages++;
    console.log(totalPages);
  }
});
