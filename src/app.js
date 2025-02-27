import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';
import Storage from './Storage';
import './css/bootstrap.css';
import './css/style.css';


  
  class App {
    constructor() {
      this._tracker = new CalorieTracker();
      this._eventLoadListiners();
    }
  
    _eventLoadListiners() {
      document
        .getElementById("meal-form")
        .addEventListener("submit", this._newItem.bind(this, "meal"));
      document
        .getElementById("workout-form")
        .addEventListener("submit", this._newItem.bind(this, "workout"));
      document
        .getElementById("meal-items")
        .addEventListener("click", this._removeItem.bind(this, "meal"));
      document
        .getElementById("workout-items")
        .addEventListener("click", this._removeItem.bind(this, "workout"));
      document
        .getElementById("filter-meals")
        .addEventListener("keyup", this._filterItem.bind(this, "meal"));
      document
        .getElementById("filter-workouts")
        .addEventListener("keyup", this._filterItem.bind(this, "workout"));
      document
        .getElementById("reset")
        .addEventListener("click", this._reset.bind(this));
      document
        .getElementById("limit-form")
        .addEventListener("submit", this._setLimit.bind(this));
      
      this._tracker.loadItems();
    }
    _newItem(type, e) {
      e.preventDefault();
  
      const item = document.getElementById(`${type}-name`);
      const calories = document.getElementById(`${type}-calories`);
  
      if (item.value === "" || calories.value === "") {
        alert("Please enter a value!");
        return;
      }
  
      if (type === "meal") {
        const addMeal = new Meal(item.value, +calories.value);
        this._tracker.addMeal(addMeal);
      } else {
        const addWorkout = new Workout(item.value, +calories.value);
        this._tracker.addWorkout(addWorkout);
      }
  
      item.value = "";
      calories.value = "";
  
      const collapseItem = document.getElementById(`collapse-${type}`);
      const newCollapse = new Collapse(collapseItem, {
        toggle: true,
      });
    }
  
    _removeItem(type, e) {
      if (
        e.target.classList.contains("delete") ||
        e.target.classList.contains("fa-xmark")
      ) {
        if (confirm("Are you sure?")) {
          const id = e.target.closest(".card").getAttribute("data-id");
  
          type === "meal"
            ? this._tracker.removeMeal(id)
            : this._tracker.removeWorkout(id);
  
          e.target.closest(".card").remove();
        }
      }
    }
    _filterItem(type, e) {
      const text = e.target.value.toLowerCase();
      let matchFound = false;
      const message = document.getElementById(`${type}-message`); // Message specific to type
  
      document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
        const name = item.firstElementChild.firstElementChild.textContent;
  
        if (name.toLowerCase().indexOf(text) !== -1) {
          item.style.display = "block";
          matchFound = true;
        } else {
          item.style.display = "none";
        }
      });
  
      // Handle the message visibility AFTER looping through all items
      if (message) {
        message.style.display = matchFound ? "none" : "block";
      }
      document.body.addEventListener("click", () => {
        message.style.display = "none";
      });
    }
    _reset() {
      this._tracker.reset();
      document.getElementById("meal-items").innerHTML = "";
      document.getElementById("workout-items").innerHTML = "";
      document.getElementById("filter-meals").value = "";
      document.getElementById("filter-workouts").value = "";
    }
    _setLimit(e) {
      e.preventDefault();
  
      const limit = document.getElementById("limit");
  
      if (limit.value === "") {
        alert("Please add a limit");
        return;
      }
  
      this._tracker.setLimit(+limit.value);
      limit.value = "";
  
      const modalEl = document.getElementById("limit-modal");
      const modal = Modal.getInstance(modalEl);
      modal.hide();
    }
  }
  
  const app = new App();
  