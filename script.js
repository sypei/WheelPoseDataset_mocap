const figures = [];
const answers = {};
const lines = [];

// Fetch the file content using the fetch API (Fetch is blocked by CORS if tested locally)
const descriptionPath = `dataset_mocap/prompts.txt`;

// fetch(descriptionPath)
//   .then(response => response.text())
//   .then(text => {
//     // Split the text content into lines
//     lines = text.split('\n');

//   });


const form = document.getElementById("surveyForm");
const prevButton = document.getElementById("prevButton");
const saveButton = document.getElementById("saveButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");

const responses = {}; // Store responses in this object

let currentIndex = 0;

function showFigure(index) {
    form.innerHTML = ""; // Clear the container

    const content = document.createElement("div");
    content.className = "content";

    const figureDiv = document.createElement("div");
    figureDiv.className = "figure";

    const figureNumber = document.createElement("h2");
    // figureNumber.textContent = `Figure ${index}  `+lines[index];
    figureNumber.textContent = `Figure ${index}  `;

    const figureImage = document.createElement("img");
    figureImage.src = `dataset_mocap/${index}.gif`; // Adjust the image path
    figureImage.alt = `Figure ${index}`;

    figureDiv.appendChild(figureNumber);
    figureDiv.appendChild(figureImage);


    // 7 point likert scale

    const scoreDiv = document.createElement("div");
    scoreDiv.className = "likert-scale";
    // difficulty
    const difficultylabel = document.createElement("label");
    difficultylabel.textContent = `Q1: How difficult is it for you to do this motion?`;
    const difficultyDiv = document.createElement("div");
    const difficultyDescription = [
        "Cannot perform the sequence at all.",
        "Can barely perform the sequence.",
        "With considerable difficulty.",
        "Neither easy nor difficult to perform.",
        "With some difficulty.",
        "With very minor difficulty.",
        "Without any difficulty."]
    
    for (let i = 1; i <= 7; i++) {
        const Input = document.createElement("input");
        Input.type = "radio";
        Input.name = `difficulty-${index}`;
        Input.value = `${i}`;
        Input.required = true;
        const radioItem = document.createElement("div");
        radioItem.className = "radio-item"
        radioItem.appendChild(Input);
        radioItem.appendChild(document.createTextNode(difficultyDescription[i-1]));
        difficultyDiv.appendChild(radioItem);
    }
    
    
    // freqency
    const frequencylabel = document.createElement("label");
    frequencylabel.textContent = `Q2: How often do you do this motion?`;
    const frequencyDiv = document.createElement("div");
    const frequencyDescription = [
        "Never",
        "Rarely (once a month or less)",
        "Occasionally (a few times a month)",
        "Sometimes (once a week or so)",
        "Often (several times a week)",
        "Very Often (almost every day)",
        "Every day"
    ]

    for (let i = 1; i <= 7; i++) {
        const Input = document.createElement("input");
        Input.type = "radio";
        Input.name = `frequency-${index}`;
        Input.value = `${i}`;
        Input.required = true;
        const radioItem = document.createElement("div");
        radioItem.className = "radio-item"
        radioItem.appendChild(Input);
        radioItem.appendChild(document.createTextNode(frequencyDescription[i-1]));
        frequencyDiv.appendChild(radioItem);       
    }
    
    
    // indirect experience
    const IElabel = document.createElement("label");
    IElabel.textContent = `Q3: Have you seen or do you know of other wheelchair users who perform this motion?`;
    const IEDiv = document.createElement("div");

    const yesInput = document.createElement("input");
    yesInput.type = "radio";
    yesInput.name = `IE-${index}`;
    yesInput.value = `yes`;
    yesInput.required = true;
    IEDiv.appendChild(yesInput);
    IEDiv.appendChild(document.createTextNode("Yes"));

    const noInput = document.createElement("input");
    noInput.type = "radio";
    noInput.name = `IE-${index}`;
    noInput.value = `no`;
    noInput.required = true;
    IEDiv.appendChild(noInput);
    IEDiv.appendChild(document.createTextNode("No"));

    scoreDiv.appendChild(difficultylabel);
    scoreDiv.appendChild(difficultyDiv);
    
    scoreDiv.appendChild(frequencylabel);
    scoreDiv.appendChild(frequencyDiv);

    scoreDiv.appendChild(IElabel);
    scoreDiv.appendChild(IEDiv);

    content.appendChild(figureDiv);
    content.appendChild(scoreDiv);
    form.appendChild(content);
    
    
}

prevButton.addEventListener("click", () => {
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    const IERadio = document.querySelector(`input[name="IE-${currentIndex}"]:checked`);
    const IEAns = IERadio?IERadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;
    answers[`i-${currentIndex}`] = IEAns;
    if (currentIndex > 0) {
        currentIndex--;
        showFigure(currentIndex);
    }
});

nextButton.addEventListener("click", () => {
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    const IERadio = document.querySelector(`input[name="IE-${currentIndex}"]:checked`);
    const IEAns = IERadio?IERadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;
    answers[`i-${currentIndex}`] = IEAns;
    if (currentIndex < figures.length - 1) {
        currentIndex++;
        showFigure(currentIndex);
    }
});

// Initialize the first figure
showFigure(currentIndex);

saveButton.addEventListener("click", () => {
    saveAnswers();
});

function saveAnswers() {
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    const IERadio = document.querySelector(`input[name="IE-${currentIndex}"]:checked`);
    const IEAns = IERadio?IERadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;
    answers[`i-${currentIndex}`] = IEAns;
    // Display saved answers in the console
    console.log("Answers:", answers);
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    // record the current page
    const difficultyRadio = document.querySelector(`input[name="difficulty-${currentIndex}"]:checked`);
    const difficultyAns = difficultyRadio?difficultyRadio.value:0;
    const frequencyRadio = document.querySelector(`input[name="frequency-${currentIndex}"]:checked`);
    const frequencyAns = frequencyRadio?frequencyRadio.value:0;
    const IERadio = document.querySelector(`input[name="IE-${currentIndex}"]:checked`);
    const IEAns = IERadio?IERadio.value:0;
    answers[`d-${currentIndex}`] = difficultyAns;
    answers[`f-${currentIndex}`] = frequencyAns;
    answers[`i-${currentIndex}`] = IEAns;

    // Convert responses to CSV format
    const csvData = Object.entries(answers).map(([figure, response]) => `${figure},${response}`).join("\n");

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a download link for the CSV file
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "survey_responses_mocap.csv";
    downloadLink.click();
});

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        // Left arrow key: Simulate click on "Prev" button
        prevButton.click();
    } else if (event.key === "ArrowRight" || event.key === "Enter" ) {
        // Right arrow key: Simulate click on "Next" button
        nextButton.click();
    }
});
