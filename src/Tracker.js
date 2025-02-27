
import Storage from "./Storage";



class CalorieTracker {
    constructor() {
      this._calorieLimit = Storage.getCalorieLimit();
      this._totalCalories = Storage.getTotalCalories(0);
      this._meals = Storage.getMeal();
      this._workouts = Storage.getWorkout();
  
      //display data
      this._showCalorieTotal();
      this._showCalorieLimit();
      this._calorieConsumed();
      this._calorieBurned();
      this._calorieRemaining();
      this._displayCalorieProgress();
    }
  
    //public methods
  
    addMeal(meal) {
      this._meals.push(meal);
      this._totalCalories += meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.saveMeal(meal)
      this._displayMeals(meal);
      this._render();
    }
    addWorkout(workout) {
      this._workouts.push(workout);
      this._totalCalories -= workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.saveWorkout(workout)
      this._displayWorkout(workout);
      this._render();
    }
    removeMeal(id) {
      const index = this._meals.findIndex((meal) => meal.id === id);
  
      if (index !== -1) {
        const meal = this._meals[index];
        this._totalCalories -= meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        Storage.removeMeal(id)
        this._meals.splice(index, 1);
        this._render();
      }
    }
    removeWorkout(id) {
      const index = this._workouts.findIndex((workout) => workout.id === id);
  
      if (index !== -1) {
        const workout = this._workouts[index];
        this._totalCalories += workout.calories;
         Storage.updateTotalCalories(this._totalCalories);
         Storage.removeWorkout(id);
        this._workouts.splice(index, 1);
        this._render();
      }
    }
  
    reset() {
      this._totalCalories = 0;
      this._meals = [];
      this._workouts = [];
      Storage.clearAll();
      this._render();
    }
    setLimit(calorieLimit) {
      this._calorieLimit = calorieLimit;
      Storage.setCalorieLimit(calorieLimit);
      this._showCalorieLimit();
      this._render();
    }
  
    loadItems() {
      this._meals.forEach(meal => this._displayMeals(meal));
      this._workouts.forEach(workout => this._displayWorkout(workout));
    }
  
    //private methods
    _showCalorieTotal() {
      const caloryTotal = document.getElementById("calories-total");
      caloryTotal.innerText = this._totalCalories;
    }
    _showCalorieLimit() {
      const caloryLimit = document.getElementById("calories-limit");
      caloryLimit.innerText = this._calorieLimit;
    }
    _calorieConsumed() {
      const calorieConsumed = document.getElementById("calories-consumed");
      const calorieConsumedData = this._meals.reduce(
        (total, meal) => total + meal.calories,
        0
      );
      calorieConsumed.innerText = calorieConsumedData;
    }
    _calorieBurned() {
      const calorieBurned = document.getElementById("calories-burned");
      const calorieBurnedData = this._workouts.reduce(
        (total, workout) => total + workout.calories,
        0
      );
      calorieBurned.innerText = calorieBurnedData;
    }
    _calorieRemaining() {
      const calorieRemains = document.getElementById("calories-remaining");
      const progEl = document.getElementById("calorie-progress");
      const remaining = this._calorieLimit - this._totalCalories;
  
      calorieRemains.innerText = remaining;
  
      if (remaining <= 0) {
        calorieRemains.parentElement.parentElement.classList.remove("bg-light");
        calorieRemains.parentElement.parentElement.classList.add("bg-danger");
        progEl.classList.remove("bg-success");
        progEl.classList.add("bg-danger");
      } else {
        calorieRemains.parentElement.parentElement.classList.remove("bg-danger");
        calorieRemains.parentElement.parentElement.classList.add("bg-light");
        progEl.classList.add("bg-success");
        progEl.classList.remove("bg-danger");
      }
    }
    _displayCalorieProgress() {
      const progEl = document.getElementById("calorie-progress");
      const progress = (this._totalCalories / this._calorieLimit) * 100;
      const width = Math.min(progress);
  
      progEl.style.width = `${width}%`;
    }
    _displayMeals(meal) {
      const mealEl = document.getElementById("meal-items");
      const newMeal = document.createElement("div");
      newMeal.classList.add("card", "my-2");
      newMeal.setAttribute("data-id", meal.id);
      newMeal.innerHTML = `
        <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${meal.name}</h4>
                    <div
                      class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                    >
                      ${meal.calories}
                    </div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
      `;
      mealEl.appendChild(newMeal);
    }
    _displayWorkout(workout) {
      const workoutEl = document.getElementById("workout-items");
      const newworkout = document.createElement("div");
      newworkout.classList.add("card", "my-2");
      newworkout.setAttribute("data-id", workout.id);
      newworkout.innerHTML = `
        <div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${workout.name}</h4>
                    <div
                      class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                    >
                      ${workout.calories}
                    </div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
      `;
      workoutEl.appendChild(newworkout);
    }
    _render() {
      this._showCalorieTotal();
      this._calorieConsumed();
      this._calorieBurned();
      this._calorieRemaining();
      this._displayCalorieProgress();
    }
  }

  export default CalorieTracker;