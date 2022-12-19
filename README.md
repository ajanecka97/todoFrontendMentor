# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Todo app solution](#frontend-mentor---todo-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshots](#screenshots)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshots

Dark mode
![Dark mode](./screenshots/dark_mode.png)

Light mode
![Light mode](./screenshots/light_mode.png)

### Links

- [Live site](https://sj-todo-frontend-mentor.netlify.app)

## My process

### Built with

- HTML
- SCSS
- Angular

### What I learned

I started doing this project to reinforce my knowledge on Angular. I created few components and services to handle the logic of the app. I also created a directive to handle the theme switching. I'm not sure if it was optimal way to handle that task, because it requires us to use a directive on each element that we want to be able to style. Furthermore we are able to put it not only on root elements but on any HTML element which can lead to a messy solutions in CSS. But that was a best idea I could come up with for a moment and most online tutorials I could find were regarding material angular themes.

I'm particularly happy with `TodoService`. I have 2 subjects in there. 1 for todo list, and the other for current filter. Then I create an observable that combines them together and returns already filtered list of Todos.

```ts
this.todos$ = combineLatest([this.todosSubject, this.filterSubject]).pipe(
  map(([todos, filter]) => {
    switch (filter) {
      case TodoFilter.Active:
        return todos.filter((todo) => !todo.isCompleted);
      case TodoFilter.Completed:
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  })
);
```

### Continued development

I plan to conitinue expanding my knowledge on Angular. I would like to create a project that will contain multiple modules. I would also like to learn about unit testing in Angular. I didn't do any in this project, but I may revisit it later to add some.

### Useful resources

- [Material Angular](https://material.angular.io/) - Component library compliant with material design. It also contains useful directives that will work with any component and allow for functionalities like drag and drop that I have used in this project.

## Author

- Frontend Mentor - [@szjanecki](https://www.frontendmentor.io/profile/szjanecki)
- Twitter - [@szymon_janecki](https://twitter.com/szymon_janecki)
