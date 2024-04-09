```markdown
# Note Manager

Note Manager is a simple note and task management web application built using Vanilla Js.
and it is still in progress the web app is in its initial phase.
## Features
- Create, edit, and delete notes and tasks with ease.
- Intuitive drag and drop interface for rearranging items.
- Responsive design for optimal user experience on desktop and mobile devices.
- For simplicity, local Storage is used i.e there is no server-side storage.

## Tech Stack
- JavaScript
- HTML
- CSS
- DaisyUI

## Prerequisites
A modern web browser (Chrome, Firefox, Safari, etc.)

## Getting Started
You can visit the website given in the about section or
To get a local copy up and running, follow these simple steps:
```
1. Clone the repository:
   ```bash
   git clone https://github.com/hemang111/To-Do
   ```
2. Navigate to the project directory:
   ```bash
   cd To-Do
   ```
3. Open `index.html` in your browser.

## Usage
```markdown
To create a new note or task, click the "+" button and enter a title.  
Drag and drop items to rearrange them.  
Click the "..." button to open the item menu.
```
# Code Explanations
### Drag and Drop Functionality
The drag and drop functionality is implemented using the JS drag events. Here's how it works:

1. Dragstart: Fired when the user starts dragging an element. Adds a "Drag" class to the element being dragged
```javascript
item.addEventListener('dragstart', function (e) {
  item.classList.add("Drag");
});
```
2. Dragend: Fired when the user stops dragging an element. Removes the "Drag" class from the element.
```javascript
item.addEventListener('dragend', function (e) {
  item.classList.remove("Drag");
});
```
3. Dragover: Fired when the user drags an element over another target element. Prevents the default behavior and allows dropping.
```javascript
target.addEventListener('dragover', function (e) {
  e.preventDefault();
  //an append logic 
});
```
4. Append Logic - I have used a simple approach to find where to insert the element, array method reduce is used for optimization.
```javascript
 function getoffsetclose(container, y) {
        const items = [...container.querySelectorAll(".draggable:not(.Drag)")];
        if (items.length === 0) return null;
        return Array.from(items).reduce((closest, child) => {
          const target = child.getBoundingClientRect();
          const offset = y - target.top - target.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element
      }
```

### Local Storage
The app uses local storage to save and load data. Here's how it's implemented:

```javascript
function savedata() {
  const menuElements = [...document.querySelectorAll(".menu:not(.main)")];
  const menuInnerHtmlArray = [];
  for (let i = 0; i < menuElements.length; i++) {
    menuInnerHtmlArray.push(menuElements[i].innerHTML);
  }
  const jsonData = JSON.stringify(menuInnerHtmlArray);
  localStorage.setItem("menuData", jsonData);
}

window.addEventListener("load", function () {
  const storedData = localStorage.getItem("menuData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    parsedData.forEach((data) => {
      const div = document.createElement('div');
      div.classList = "menu bg-base-200 rounded-box loaded";
      div.innerHTML = data;
      let nid = div.querySelector(".menu-title").innerText;
      div.id = nid;
      document.getElementById("main").appendChild(div);
    });
  } else {
    console.log("No menu data found in local storage.");
  }
  
});
```

## A small Demo Video Featuring current Active features

[![Watch the video](https://i.ibb.co/XFfRBxN/Screenshot-2024-04-04-142031.png)](https://vimeo.com/930574049?share=copy)


## Contributing
We welcome contributions! Before submitting a pull request, please open an issue to discuss your proposed changes.

## Contact
For any questions or comments, please contact [coehemang@gmail.com](mailto:coehemang@gmail.com).

