const container = document.querySelector(".container");
const colorPicker = document.querySelector(".color-picker");
const getBtn = document.querySelector(".get-btn");
const category = document.querySelector(".category");
const loading = document.querySelector(".loading");
const text = document.querySelector(".text");
const clickToCopyText = document.querySelector(".click-to-copy");
let colorValue = "000000";
let mode = "monochrome";
clickToCopyText.style.display = "none";

category.addEventListener("change", () => {
  mode = category.value;
});

const generateColorContainers = (colorsArray) => {
  let html = "";
  colorsArray.forEach((color) => {
    html += `
        <div class="color-container">
            <div class="color">
                
            </div>
            <div class="hex-value">
                ${color.hex.value}
            </div>
        
        </div>
        `;
  });
  return html;
};

colorPicker.addEventListener("change", () => {
  colorValue = colorPicker.value;
  colorValue = colorValue.slice(1, colorValue.length);

  //change button animation color with color picker color change
  document.styleSheets[1].addRule(
    "header a::after",
    `background-image: linear-gradient(90deg, #1F2937 0%, #${colorValue} 100%);`
  );
});

getBtn.addEventListener("click", () => {
  text.style.display = "none";
  loading.style.display = "block";

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${mode}&count=6`
  )
    .then((res) => res.json())
    .then((data) => {
      const colorsArray = data.colors;
      container.innerHTML = generateColorContainers(colorsArray);
      const colorDivs = Array.from(document.querySelectorAll(".color"));
      colorDivs.forEach((div, i) => {
        div.style.backgroundColor = colorsArray[i].hex.value;
        div.addEventListener("click", () => {
          // hexValueText.select()
          // hexValueText.setSelectionRange(0, 99999)
          navigator.clipboard.writeText(colorsArray[i].hex.value);
          clickToCopyText.textContent = `Copied ${colorsArray[i].hex.value}`;
        });
      });

      //done
      clickToCopyText.style.display = "block";
    });
});
