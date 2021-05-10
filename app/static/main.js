const telopTextArea = document.getElementById('telop-textarea');
const inputText = document.getElementById('input-text');
const previewImageWrapper = document.getElementById('preview-image-wrapper');
const previewImage = document.getElementById('preview-image');
const colorPicker = document.getElementById('color');
const inputX = document.getElementById('input-x');
const inputY = document.getElementById('input-y');

window.onload = function() {
  $('.modal-area').hide();
};

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

function addTextInImage(didImageUploaded) {
  if (didImageUploaded) {
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
    displayText.style.left = marginX + 'px';
    displayText.style.top = marginY + 'px';
    // insert text in front of a preview image
    previewImageWrapper.insertBefore(displayText, previewImage);
    // clear text in textarea
    clearTextArea();
  } else {
    alert('Please upload an image!');
  }
}

function undoAddingTextInImage() {
  const childrenCount = previewImageWrapper.children.length;
  if (childrenCount > 1) {
    previewImageWrapper.removeChild(previewImageWrapper.children[childrenCount - 2]);
  }
}

function downloadImage(didImageUploaded) {
  if (didImageUploaded) {
    html2canvas(document.querySelector('#preview-image-wrapper'), {
      height: previewImage.height,
      windowHeight: previewImage.height
    }).then(canvas => {
      // download specified canvas
      const element = document.createElement('a');
      element.href = canvas.toDataURL();
      element.download = 'virtual_background.png';
      element.click();
    });
  } else {
    alert('Please upload an image!');
  }
}

$('.about-link').click(function() {
  $('.modal-area').fadeIn('slow');
});

$('.modal-close').click(function() {
  $('.modal-area').fadeOut('slow');
});