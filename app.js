```javascript
console.log("app.js loaded");

function SimpleComponent() {
    return React.createElement('div', null, 'Hello from React!');
}

console.log("About to render SimpleComponent");
ReactDOM.render(React.createElement(SimpleComponent), document.getElementById('root'));
console.log("Finished rendering SimpleComponent");
```