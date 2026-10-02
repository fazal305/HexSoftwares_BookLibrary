# HexSoftwares To-Do App

A responsive browser-based to-do list app built with HTML, CSS, and vanilla JavaScript for the HexSoftwares Frontend Development Internship.

The app focuses on practical task management with local persistence, clean state-driven rendering, completion tracking, and a mobile-friendly interface.

## Live Demo

https://fazal305.github.io/hexsoftwares-todo-app/

## Repository

https://github.com/fazal305/hexsoftwares-todo-app

## Features

- Add new tasks with a button or the Enter key
- Mark tasks as complete or incomplete
- Delete individual tasks
- Clear all completed tasks
- Live remaining-task counter
- Empty-state message
- Input validation for blank tasks
- Tasks saved in `localStorage`
- Responsive layout for desktop and mobile screens
- No framework or build step required

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`

## Project Structure

```text
hexsoftwares-todo-app/
|-- index.html
|-- styles.css
|-- script.js
|-- README.md
|-- LICENSE
`-- .gitignore
```

## How Persistence Works

```text
Task added or updated
        |
        v
Tasks array in JavaScript
        |
        v
JSON.stringify(tasks)
        |
        v
localStorage
        |
        v
JSON.parse(savedTasks)
        |
        v
Render tasks after refresh
```

## What I Practiced

- DOM selection and manipulation
- Event handling and event delegation
- State-driven UI rendering
- Array methods such as `unshift`, `filter`, and `find`
- Saving and restoring data with `localStorage`
- Accessible button labels
- Responsive interface design

## Run Locally

1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser.

No installation is needed.

## Internship Information

- Project: To-Do List App
- Internship: HexSoftwares Frontend Development Internship

## Author

Fazal Abbas

- GitHub: https://github.com/fazal305
- LinkedIn: https://www.linkedin.com/in/fazal-abbas-4653dg86

## License

This project is licensed under the MIT License.
