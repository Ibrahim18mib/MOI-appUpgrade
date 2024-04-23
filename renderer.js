console.log("Renderer Module");

// Make sure this code is running in your renderer process (e.g., your HTML file or script loaded in the renderer)

// Wait for the DOM to be fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {
  const setButton = document.getElementById("btn");
  const titleInput = document.getElementById("title");

  // Add event listener to the button
  setButton.addEventListener("click", () => {
    // Get the value of the title input field
    const title = titleInput.value;

    // Check if window.electronAPI is defined before using it
    if (
      window.electronAPI &&
      typeof window.electronAPI.setTitle === "function"
    ) {
      // Call the setTitle function from the Electron API
      window.electronAPI.setTitle(title);
    } else {
      console.error("Electron API or setTitle function is not available.");
    }
  });

  console.log("Into the file fetch");
  const setButton1 = document.getElementById("btn1");
  const filePathElement = document.getElementById("filePath");
  // Add event listener to the button
  setButton1.addEventListener("click", async () => {
    // Fetch the file path from the user || send the selected path
    const filePath = await window.electronAPI.openFile();
    filePathElement.innerText = filePath;
  });
});


