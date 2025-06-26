// Load goals from local storage or initialize empty
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// Add a new goal
function addGoal() {
  const goalText = document.getElementById("goalInput").value.trim();
  const category = document.getElementById("category").value;

  if (goalText === "") {
    alert("Please enter a goal!");
    return;
  }

  const newGoal = {
    text: goalText,
    category: category,
    done: false
  };

  goals.push(newGoal);
  saveGoals();
  renderGoals();

  document.getElementById("goalInput").value = "";
}

// Render the list of goals
function renderGoals() {
  const goalList = document.getElementById("goalList");
  goalList.innerHTML = "";

  let completed = 0;

  goals.forEach((goal, index) => {
    const li = document.createElement("li");

    // Display goal text
    li.textContent = goal.text;

    // Add category label
    const label = document.createElement("span");
    label.textContent = `[${goal.category}]`;
    li.appendChild(label);

    // Apply "done" class if completed
    if (goal.done) {
      li.classList.add("done");
      completed++;
    }

    // Toggle complete on click
    li.onclick = () => toggleGoal(index);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteGoal(index);
    };

    li.appendChild(delBtn);
    goalList.appendChild(li);
  });

  // ✅ Update progress display
  const progressDiv = document.getElementById("progressDisplay");
  progressDiv.textContent = `✅ ${completed} of ${goals.length} completed`;
}

// Toggle goal status
function toggleGoal(index) {
  goals[index].done = !goals[index].done;
  saveGoals();
  renderGoals();
}

// Delete goal
function deleteGoal(index) {
  goals.splice(index, 1);
  saveGoals();
  renderGoals();
}

// Save to localStorage
function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

// Initial render
renderGoals();

