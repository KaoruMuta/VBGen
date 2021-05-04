const telopTextArea = document.getElementById('telop-textarea');
const inputText = document.getElementById('input-text');
const previewWrapper = document.getElementById('preview-wrapper');
const previewImage = document.getElementById('preview-image');
const colorPicker = document.getElementById('color');
const inputX = document.getElementById('input-x');
const inputY = document.getElementById('input-y');

function updateTelopText(value) {
  inputText.value = value;
}

function clearTextArea() {
  telopTextArea.value = "";
}

function changeColor() {
  telopTextArea.style.color = colorPicker.value;
}

function outputPoint(element) {
  const point = element.value;
  if (!point) {
    return element.placeholder;
  } else {
    const validatedPoint = validateInputNumber(point);
    if (!validatedPoint) {
      return null;
    }
    return point;
  }
}

// TODO: add unittest
function validateInputNumber(input) {
  const re = /^([1-9]\d*|0)$/;
  const result = input.match(re);
  return result;
}

function addTextInImage() {
  const x = window.pageXOffset + previewImage.getBoundingClientRect().left;
  const y = window.pageYOffset + previewImage.getBoundingClientRect().top;
  const marginX = outputPoint(inputX);
  const marginY = outputPoint(inputY);
  if (!marginX || !marginY) {
    alert('Please input the valid number');
    return;
  }
  
  const displayText = document.createElement('div');
  displayText.innerHTML = inputText.value;
  displayText.style.position = 'absolute';
  displayText.style.color = colorPicker.value;
  displayText.style.left = String(x + parseInt(marginX, 10)) + 'px';
  displayText.style.top = String(y + parseInt(marginY, 10)) + 'px';
  // insert text in front of a preview image
  previewWrapper.insertBefore(displayText, previewImage);
  // clear text in textarea
  clearTextArea();
}

function undoAddingTextInImage() {
  const childrenCount = previewWrapper.children.length;
  if (childrenCount > 4) {
    previewWrapper.removeChild(previewWrapper.children[childrenCount - 5]);
  }
}