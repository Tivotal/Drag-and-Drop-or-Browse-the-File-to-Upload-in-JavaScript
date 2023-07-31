/* Created by Tivotal */

let dragArea = document.querySelector(".drag-area");
let dragText = document.querySelector("header");
let button = document.querySelector("button");
let input = document.querySelector("input");

let file;

button.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", function () {
  //getting user selected file
  file = this.files[0];

  //adding active class to drag area
  dragArea.classList.add("active");

  //calling showImage function
  showImage();
});

dragArea.addEventListener("dragover", (event) => {
  //preventing default behaviour
  event.preventDefault();

  //adding active class to drag area
  dragArea.classList.add("active");

  //changing text content
  dragText.textContent = "Release to Upload File";
});

dragArea.addEventListener("dragleave", (event) => {
  //removing active class from drag area
  dragArea.classList.remove("active");

  //changing text content
  dragText.textContent = "Drag & Drop to Upload File";
});

dragArea.addEventListener("drop", (event) => {
  //preventing default behaviour
  event.preventDefault();

  //getting user selected first file
  file = event.dataTransfer.files[0];

  //calling showImage function
  showImage();
});

function showImage() {
  //getting file type
  let fileType = file.type;

  //array of some common image extensions
  let validArry = ["image/jpeg", "image/jpg", "image/png"];

  //checking selected file is image or not
  if (validArry.includes(fileType)) {
    //creating new file reader object
    let fileReader = new FileReader();

    //once the file is loaded
    fileReader.onload = () => {
      //passing file source to fileUrl variable
      let fileUrl = fileReader.result;

      //creating new img tag
      let imgTag = `<img src="${fileUrl}" alt="image">`;

      //adding created img tag into drag area
      dragArea.innerHTML = imgTag;
    };

    //passing file to file Reader
    fileReader.readAsDataURL(file);
  } else {
    alert("Selected file is not Image");

    //removing active class from drag area
    dragArea.classList.remove("active");

    //changing text content
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
