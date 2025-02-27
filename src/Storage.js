class Storage {
    static getCalorieLimit(defaultLimit = 2000) {
      let calorieLimit;
      if (localStorage.getItem("calorieLimit") === null) {
        calorieLimit = defaultLimit;
      } else {
        calorieLimit = +localStorage.getItem("calorieLimit");
      }
      return calorieLimit;
    }
  
    static setCalorieLimit(calorieLimit) {
      localStorage.setItem("calorieLimit", calorieLimit);
    }
  
    static getTotalCalories(defaultLimit = 0) {
      let totalCalories;
      if (localStorage.getItem("totalCalories") === null) {
        totalCalories = defaultLimit;
      } else {
        totalCalories = +localStorage.getItem("totalCalories");
      }
      return totalCalories;
    }
  
    static updateTotalCalories(calories) {
      localStorage.setItem("totalCalories", calories);
    }
  
    static getMeal() {
      let meals;
      if (localStorage.getItem("meals") === null) {
        meals = [];
      } else {
        meals = JSON.parse(localStorage.getItem("meals"));
      }
      return meals;
    }
  
    static saveMeal(meal) {
      const meals = Storage.getMeal();
      meals.push(meal);
      localStorage.setItem("meals", JSON.stringify(meals));
    }
  
    static removeMeal(id) {
      const meals = Storage.getMeal();
      meals.forEach((meal, index) => {
        if (meal.id === id) {
          meals.splice(index, 1);
        }
      });
  
      localStorage.setItem("meals", JSON.stringify(meals));
    }
  
    static getWorkout() {
      let workout;
      if (localStorage.getItem("workout") === null) {
        workout = [];
      } else {
        workout = JSON.parse(localStorage.getItem("workout"));
      }
      return workout;
    }
  
    static saveWorkout(workouts) {
      const workout = Storage.getWorkout();
      workout.push(workouts);
      localStorage.setItem("workout", JSON.stringify(workout));
    }
  
    static removeWorkout(id) {
      const workouts = Storage.getWorkout();
      workouts.forEach((workout, index) => {
        if (workout.id === id) {
          workouts.splice(index, 1);
        }
      });
  
      localStorage.setItem("workout", JSON.stringify(workouts));
    }
  
    static clearAll() {
      localStorage.removeItem('totalCalories');
      localStorage.removeItem('meals');
      localStorage.removeItem('workout');
    }
  }

  export default Storage;