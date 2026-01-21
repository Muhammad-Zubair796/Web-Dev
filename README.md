# 📸 Simultaneous Image Loader (Async/Await)

A high-performance image gallery that demonstrates handling multiple asynchronous network requests in parallel.

## 🚀 Technical Implementation

* **Asynchronous Flow**: Uses `async` and `await` to manage non-blocking operations.
* **Parallel Fetching**: Implements `Promise.all` to execute multiple network requests simultaneously, significantly reducing total wait time compared to sequential loading.
* **Error Handling**: Wrapped in a `try...catch` block to manage network failures gracefully and provide user feedback.
* **Dynamic DOM Manipulation**: Uses `document.createElement` and `appendChild` to render images only after all data has been successfully retrieved.

## 🛠️ Built With
* **HTML5**
* **CSS3** (Flexbox for responsive layout)
* **Vanilla JavaScript** (ES6+)

## 📂 Project Structure
* `index.html` - The UI structure.
* `index.css` - The layout and visual styling.
* `index.js` - The logic for fetching and rendering data.
