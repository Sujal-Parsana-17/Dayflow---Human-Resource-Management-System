import "./style.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div class="space-y-8">
    <div class="flex justify-center gap-8">
      <a href="https://vite.dev" target="_blank" class="transition-transform hover:scale-110">
        <img src="/vite.svg" class="logo w-32" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" class="transition-transform hover:scale-110">
        <img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/logo.png" class="logo w-32" alt="JavaScript logo" />
      </a>
    </div>
    <h1 class="text-5xl font-bold">Hello Tailwind CSS!</h1>
    <p class="text-xl text-gray-300">HRMS Frontend Application</p>
    <div class="card bg-gray-800 rounded-lg inline-block">
      <button id="counter" type="button" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition-colors"></button>
    </div>
    <p class="read-the-docs">
      Click on the counter button to test
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
