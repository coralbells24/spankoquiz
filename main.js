document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quiz-form");
    const resultContainer = document.getElementById("result-container");

    const categoryScores = {
        dominant: 0,
        submissive: 0,
        masochist: 0,
        sadist: 0,
    };

    // Define questions and their associated categories
    const questions = [
        {
            text: "I enjoy taking control in intimate situations.",
            category: "dominant",
        },
        {
            text: "I prefer my partner(s) to take control in intimate situations.",
            category: "submissive",
        },
        {
            text: "I enjoy receiving pain or discomfort during intimacy.",
            category: "masochist",
        },
        {
            text: "I enjoy inflicting pain or discomfort during intimacy.",
            category: "sadist",
        },
        // Add more questions and categories as needed
    ];

    // Generate questions and radio buttons
    const questionsContainer = document.getElementById("questions-container");
    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionLabel = document.createElement("label");
        questionLabel.innerText = `Question ${index + 1}: ${question.text}`;

        const radioOptionsContainer = document.createElement("div");
        radioOptionsContainer.classList.add("radio-options");

        for (let i = 1; i <= 7; i++) {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = `q${index + 1}`;
            radioInput.value = i;

            const radioLabel = document.createElement("label");
            radioLabel.innerText = ` ${i}`;

            const radioWrapper = document.createElement("div");
            radioWrapper.classList.add("radio-wrapper");

            radioWrapper.appendChild(radioInput);
            radioWrapper.appendChild(radioLabel);

            radioOptionsContainer.appendChild(radioWrapper);
        }

        questionDiv.appendChild(questionLabel);
        questionDiv.appendChild(radioOptionsContainer);
        questionsContainer.appendChild(questionDiv);
    });

    // Add event listener for form submission
    quizForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Calculate scores based on user's responses
        questions.forEach((question, index) => {
            const selectedValue = parseInt(
                document.querySelector(
                    `input[name="q${index + 1}"]:checked`
                ).value
            );
            categoryScores[question.category] += selectedValue;
        });

        // Calculate percentages for each category
        const totalPossibleScore = questions.length * 7;
        for (const category in categoryScores) {
            categoryScores[category] =
                (categoryScores[category] / totalPossibleScore) * 100;
        }

        // Display the scores
        displayScores(categoryScores);
    });

    function displayScores(scores) {
        resultContainer.innerHTML = "<h2>Results</h2>";
        for (const category in scores) {
            resultContainer.innerHTML += `<p>${category}: ${scores[category].toFixed(2)}%</p>`;
        }
    }
});
