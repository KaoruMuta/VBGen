const telopTextArea = document.getElementById('telop-textarea');
const inputText = document.getElementById('input-text');
const previewWrapper = document.getElementById('preview-wrapper');
const previewImage = document.getElementById('preview-image');
const colorPicker = document.getElementById('color');

function updateTelopText(value) {
  inputText.value = value;
}

function clearTextArea() {
  telopTextArea.value = "";
}

function changeColor() {
  console.log(colorPicker);
  telopTextArea.style.color = colorPicker.value;
}

function addTextInImage() {
  const x = window.pageXOffset + previewImage.getBoundingClientRect().left;
  const y = window.pageYOffset + previewImage.getBoundingClientRect().top;
  let displayText = document.createElement('div');
  displayText.innerHTML = inputText.value;
  displayText.style.position = 'absolute';
  displayText.style.color = colorPicker.value;
  displayText.style.left = x;
  displayText.style.top = y;
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