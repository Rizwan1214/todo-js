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
    employeeName: "safeer",
    employeeDesignation: "Full stack developer",
    employeeEmail: "safeer@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 3,
    employeeName: "salman",
    employeeDesignation: "java",
    employeeEmail: "salman@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 4,
    employeeName: "hassaan",
    employeeDesignation: "drupal developer",
    employeeEmail: "hassaan@gmiail.com",
    employeeCity: "multan",
  },
  {
    employeeId: 5,
    employeeName: "husnain",
    employeeDesignation: "java",
    employeeEmail: "husnain@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 6,
    employeeName: "adnan",
    employeeDesignation: "backend developer",
    employeeEmail: "adnan@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 7,
    employeeName: "akif",
    employeeDesignation: "frontend",
    employeeEmail: "akif@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 8,
    employeeName: "hamaz",
    employeeDesignation: "java developer",
    employeeEmail: "hamaz@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 9,
    employeeName: "hunfa",
    employeeDesignation: "Mern stack developer",
    employeeEmail: "hunfa@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 10,
    employeeName: "Nabeel",
    employeeDesignation: "Mern stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 11,
    employeeName: "farhan",
    employeeDesignation: "Mern stack developer",
    employeeEmail: "farhan@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 12,
    employeeName: "zuhaib",
    employeeDesignation: "product manager",
    employeeEmail: "zuhaib@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 13,
    employeeName: "faisal",
    employeeDesignation: "backend developer",
    employeeEmail: "faisal@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 14,
    employeeName: "fahad",
    employeeDesignation: "react developer",
    employeeEmail: "fahad@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 15,
    employeeName: "hamza",
    employeeDesignation: "react native",
    employeeEmail: "hamza@text.com",
    employeeCity: "jhanag",
  },
  {
    employeeId: 16,
    employeeName: "usman",
    employeeDesignation: "Designer",
    employeeEmail: "usman@gmiail.com",
    employeeCity: "jhanag",
  },
  {
    employeeId: 17,
    employeeName: "fawad",
    employeeDesignation: "react native",
    employeeEmail: "fawad@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 18,
    employeeName: "bilal",
    employeeDesignation: "Business developer",
    employeeEmail: "bilal@gmiail.com",
    employeeCity: "Gujjaranwala",
  },
  {
    employeeId: 19,
    employeeName: "faris",
    employeeDesignation: "Okara",
    employeeEmail: "faris@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 20,
    employeeName: "talha",
    employeeDesignation: "Full stack developer",
    employeeEmail: "talha@gmiail.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 21,
    employeeName: "taha",
    employeeDesignation: "frontend",
    employeeEmail: "taha@text.com",
    employeeCity: "Lahore",
  },
  {
    employeeId: 22,
    employeeName: "shehzad",
    employeeDesignation: "Full stack developer",
    employeeEmail: "nabeelmuzaffar0348@gmiail.com",
    employeeCity: "Lahore",
  },
];
let page = 1;
let pageCount = 6;
let totalPages = Math.ceil(customArray.length / pageCount);
let startIndex = 0;
let endIndex = pageCount;
let displayEmployeeArray = customArray.slice(startIndex, endIndex);
const customEmployeeArr = () => {
  const customData = displayEmployeeArray.map((elem, index) => {
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
};

for (let i = 1; i <= totalPages; i++) {
  document.getElementById(
    "page-btn"
  ).innerHTML += `<button onclick="pageBtn(${i})">${i}</button>`;
}
function pageBtn(elem) {
  page = elem;
  startIndex = (elem - 1) * pageCount;
  endIndex = elem * pageCount;
  displayEmployeeArray = customArray.slice(startIndex, endIndex);
  customEmployeeArr();
}
document.getElementById("prev-btn").addEventListener("click", function () {
  if (page > 1) {
    page--;
    startIndex = (page - 1) * pageCount;
    endIndex = page * pageCount;
    displayEmployeeArray = customArray.slice(startIndex, endIndex);
    customEmployeeArr();
  }
});

document.getElementById("next-btn").addEventListener("click", function () {
  if (page < totalPages) {
    page++;
    startIndex = (page - 1) * pageCount;
    endIndex = page * pageCount;
    displayEmployeeArray = customArray.slice(startIndex, endIndex);
    customEmployeeArr();
  }
});
customEmployeeArr();
