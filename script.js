// Declaring elements in the main "main divisions"
const form = document.getElementById("registrationForm");
const errorMessage = document.getElementById("error-message");
const studentTableBody = document.getElementById("studentTableBody");

// Declaring elements in the summary table
const totalStudents = document.getElementById("totalStudents");
const averagemarks = document.getElementById("averagemarks");
const passed = document.getElementById("passed");
const failed = document.getElementById("failed");

// array to store the registered students
const students = [];


// Listen for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
    errorMessage.textContent = ""; // Clear previous errors

    // 1. Collect input values
    const fullName = document.getElementById("fullname").value.trim();
    const ageInput = document.getElementById("Age").value.trim();
    const gender = document.getElementById("Gender").value;
    const course = document.getElementById("Course").value;
    const marksInput = document.getElementById("marks").value.trim();

    // 2. Validate required fields
    if (!fullName || !ageInput || !gender || !course || !marksInput) {
        errorMessage.textContent = "Error: Please fill in all required fields.";
        errorMessage.style.color = "red";
        return;
    }

    // 3. Validate Age is a valid number
    const age = Number(ageInput);
    if (isNaN(age) || age <= 0 || !Number.isInteger(age)) {
        errorMessage.textContent = "Error: Please enter a valid whole number for Age.";
        errorMessage.style.color = "red";
        return;
    }

    // 4. Validate Marks are between 0 and 100
    const marks = Number(marksInput);
    if (isNaN(marks) || marks < 0 || marks > 100) {
        errorMessage.textContent = "Error: Marks must be a number between 0 and 100.";
        errorMessage.style.color = "red";
        return;
    }

    // Determine Pass or Fail performance
    const performance = marks >= 50 ? "Pass" : "Fail";

    // Create student object and add to the array
    const newStudent = {
        fullName,
        age,
        gender,
        course,
        marks,
        performance
    };
    students.push(newStudent);

    // Update the table and summary statistics automatically
    displayStudents();
    updateSummary();

    // Reset the form for the next entry
    form.reset();
});

// Function 1 & 2: Display all registered students in the table
function displayStudents() {
    studentTableBody.innerHTML = ""; // Clear current table rows

    students.forEach(function (student) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(student.fullName)}</td>
            <td>${student.age}</td>
            <td>${escapeHTML(student.gender)}</td>
            <td>${escapeHTML(student.course)}</td>
            <td>${student.marks}</td>
            <td style="color: ${student.performance === 'Pass' ? 'green' : 'red'}; font-weight: bold;">
                ${student.performance}
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

// Function 3, 4 & 5: Update Total, Average, Passed, and Failed counts
function updateSummary() {
    const total = students.length;
    let totalMarks = 0;
    let passedCount = 0;
    let failedCount = 0;

    students.forEach(function (student) {
        totalMarks += student.marks;
        if (student.marks >= 50) {
            passedCount++;
        } else {
            failedCount++;
        }
    });

    // Calculate average (avoid division by zero)
    const average = total > 0 ? (totalMarks / total).toFixed(2) : 0;

    // Update the HTML spans
    totalStudentsEl.textContent = total;
    averageMarksEl.textContent = average;
    passedEl.textContent = passedCount;
    failedEl.textContent = failedCount;
}

// Helper function to prevent HTML injection in text fields
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}