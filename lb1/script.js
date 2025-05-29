


function fillSampleData() {
    document.getElementById('fullName').value = 'Іван Іваненко';
    document.getElementById('age').value = 30;
    document.getElementById('email').value = 'ivan@test.com';
    document.getElementById('phone').value = '+380501234567';
    document.getElementById('address').value = 'м. Київ, вул. Прикладна, 1';
    document.getElementById('skills').value = 'HTML, CSS, JavaScript';
    document.getElementById('languages').value = 'Українська, Англійська';
    document.getElementById('summary').value = 'Мотивований розробник із досвідом у фронтенді.';
    document.getElementById('hobbies').value = 'Читання, подорожі';

    const expForm = document.querySelector('#experienceContainer .dynamic-form');
    if (expForm) {
        expForm.querySelector('.exp-position').value = 'Frontend Developer';
        expForm.querySelector('.exp-company').value = 'SoftServe';
        expForm.querySelector('.exp-period').value = '2019-2022';
        expForm.querySelector('.exp-description').value = 'Розробка SPA додатків.';
    }

    const eduForm = document.querySelector('#educationContainer .dynamic-form');
    if (eduForm) {
        eduForm.querySelector('.edu-institution').value = 'Київський нац. університет';
        eduForm.querySelector('.edu-degree').value = 'Інформатика';
        eduForm.querySelector('.edu-years').value = '2015-2019';
        eduForm.querySelector('.edu-additional').value = 'Диплом з відзнакою';
    }
}

function clearAll() {
    document.querySelectorAll('input, textarea').forEach(el => el.value = '');
    document.getElementById('resumeDisplay').classList.add('hidden');
    document.getElementById('resumeDisplay').innerHTML = '';
}


function downloadResumeAsPDF() {
    const resumeElement = document.getElementById('resumeDisplay');
    if (!resumeElement || resumeElement.classList.contains('hidden')) {
        alert('Спочатку створіть резюме.');
        return;
    }

    const opt = {
        margin:       0.5,
        filename:     'my_resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(resumeElement).set(opt).save();
}



function generateResume() {
    const resumeDisplay = document.getElementById("resumeDisplay");
    const fullName = document.getElementById("fullName").value || "Ім'я Прізвище";
    const age = document.getElementById("age").value || "30";
    const email = document.getElementById("email").value || "email@example.com";
    const phone = document.getElementById("phone").value || "+380000000000";
    const address = document.getElementById("address").value || "";
    const summary = document.getElementById("summary").value || "";
    const hobbies = document.getElementById("hobbies").value || "";
    const skills = document.getElementById("skills").value || "";
    const languages = document.getElementById("languages").value || "";

    let resumeHTML = `
        <div class="resume-display">
            <div class="resume-header">
                <h1 class="resume-name">${fullName}</h1>
                <p><strong>Вік:</strong> ${age}</p>
                <p><strong>Email:</strong> ${email} | <strong>Телефон:</strong> ${phone}</p>
                ${address ? `<p><strong>Адреса:</strong> ${address}</p>` : ""}
            </div>
            ${summary ? `<div class="resume-section"><h3>📝 Про мене</h3><p>${summary}</p></div>` : ""}
            ${skills ? `<div class="resume-section"><h3>⚡ Навички</h3><div class="skills-list">${skills.split(',').map(s => `<span class='skill-tag'>${s.trim()}</span>`).join('')}</div></div>` : ""}
            ${languages ? `<div class="resume-section"><h3>🗣️ Мови</h3><p>${languages}</p></div>` : ""}
            ${hobbies ? `<div class="resume-section"><h3>🎯 Хобі та інтереси</h3><p>${hobbies}</p></div>` : ""}
            <div style="text-align: center; margin-top: 30px;">
            </div>
        </div>
    `;

    resumeDisplay.innerHTML = resumeHTML;
    resumeDisplay.classList.remove("hidden");
}

window.generateResume = generateResume;
window.fillSampleData = fillSampleData;
window.clearAll = clearAll;
