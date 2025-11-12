// Main Application Logic
const app = {
    currentQuestionIndex: 0,
    answers: {},
    scores: {
        personal: 0,
        professional: 0,
        relational: 0,
        total: 0
    },

    init() {
        this.updateTotalQuestions();
        this.loadSavedProgress();
    },

    updateTotalQuestions() {
        document.getElementById('total-questions').textContent = allQuestions.length;
    },

    startAssessment() {
        this.showScreen('assessment-screen');
        this.renderQuestion();
    },

    renderQuestion() {
        const question = allQuestions[this.currentQuestionIndex];
        const container = document.getElementById('question-container');
        
        // Update progress
        this.updateProgress();
        
        // Update dimension indicator
        this.updateDimensionIndicator(question.dimension);
        
        // Clear container
        container.innerHTML = '';
        
        // Create question element
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = question.text;
        questionDiv.appendChild(questionText);
        
        // Render answer options based on type
        if (question.type === 'likert') {
            questionDiv.appendChild(this.createLikertScale(question));
        } else if (question.type === 'checkbox') {
            questionDiv.appendChild(this.createCheckboxGroup(question));
        }
        
        container.appendChild(questionDiv);
        
        // Update navigation buttons
        this.updateNavButtons();
        
        // Add animation
        container.classList.add('fade-in');
        setTimeout(() => container.classList.remove('fade-in'), 300);
    },

    createLikertScale(question) {
        const scale = document.createElement('div');
        scale.className = 'likert-scale';
        
        const labels = [
            'Strongly Disagree',
            'Disagree',
            'Neutral',
            'Agree',
            'Strongly Agree'
        ];
        
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('div');
            option.className = 'likert-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = question.id;
            radio.value = i;
            radio.id = `${question.id}-${i}`;
            
            // Check if already answered
            if (this.answers[question.id] === i) {
                radio.checked = true;
            }
            
            radio.addEventListener('change', () => {
                this.answers[question.id] = i;
                this.saveProgress();
                this.updateNavButtons();
            });
            
            const label = document.createElement('label');
            label.htmlFor = `${question.id}-${i}`;
            label.innerHTML = `
                <span class="radio-circle"></span>
                <span class="radio-label">${i}</span>
                <span class="radio-text">${labels[i - 1]}</span>
            `;
            
            option.appendChild(radio);
            option.appendChild(label);
            scale.appendChild(option);
        }
        
        return scale;
    },

    createCheckboxGroup(question) {
        const group = document.createElement('div');
        group.className = 'checkbox-group';
        
        // Initialize answer array if not exists
        if (!this.answers[question.id]) {
            this.answers[question.id] = [];
        }
        
        question.options.forEach((optionText, index) => {
            const option = document.createElement('div');
            option.className = 'checkbox-option';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${question.id}-${index}`;
            checkbox.value = optionText;
            
            // Check if already answered
            if (this.answers[question.id].includes(optionText)) {
                checkbox.checked = true;
            }
            
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.answers[question.id].push(optionText);
                } else {
                    const idx = this.answers[question.id].indexOf(optionText);
                    if (idx > -1) {
                        this.answers[question.id].splice(idx, 1);
                    }
                }
                this.saveProgress();
                this.updateNavButtons();
            });
            
            const label = document.createElement('label');
            label.htmlFor = `${question.id}-${index}`;
            label.innerHTML = `
                <span class="checkbox-box"></span>
                <span class="checkbox-text">${optionText}</span>
            `;
            
            option.appendChild(checkbox);
            option.appendChild(label);
            group.appendChild(option);
        });
        
        return group;
    },

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / allQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
    },

    updateDimensionIndicator(dimension) {
        const dimensionNames = {
            personal: 'Personal Readiness',
            professional: 'Professional Readiness',
            relational: 'Relational Readiness'
        };
        document.getElementById('current-dimension').textContent = dimensionNames[dimension];
    },

    updateNavButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const question = allQuestions[this.currentQuestionIndex];
        
        // Enable/disable previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Check if current question is answered
        const isAnswered = this.isQuestionAnswered(question);
        
        // Update next button
        if (this.currentQuestionIndex === allQuestions.length - 1) {
            nextBtn.textContent = 'View Results';
            nextBtn.disabled = !isAnswered;
        } else {
            nextBtn.textContent = 'Next';
            nextBtn.disabled = !isAnswered;
        }
    },

    isQuestionAnswered(question) {
        if (question.type === 'likert') {
            return this.answers[question.id] !== undefined;
        } else if (question.type === 'checkbox') {
            // For checkbox, at least one option must be selected
            return this.answers[question.id] && this.answers[question.id].length > 0;
        }
        return false;
    },

    nextQuestion() {
        if (this.currentQuestionIndex < allQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        } else {
            this.calculateScores();
            this.showResults();
        }
    },

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    },

    calculateScores() {
        this.scores = {
            personal: 0,
            professional: 0,
            relational: 0,
            total: 0
        };
        
        allQuestions.forEach(question => {
            if (question.type === 'likert') {
                const answer = this.answers[question.id];
                if (answer) {
                    this.scores[question.dimension] += answer;
                }
            } else if (question.type === 'checkbox') {
                const answers = this.answers[question.id] || [];
                this.scores[question.dimension] += answers.length * question.pointsPerOption;
            }
        });
        
        this.scores.total = this.scores.personal + this.scores.professional + this.scores.relational;
    },

    showResults() {
        this.showScreen('results-screen');
        this.displayScores();
        this.displayInterpretations();
        this.displayNextSteps();
        
        // Scroll to top
        window.scrollTo(0, 0);
    },

    displayScores() {
        // Display total score
        document.getElementById('total-score').textContent = this.scores.total;
        
        // Display dimension scores
        document.getElementById('personal-score').textContent = this.scores.personal;
        document.getElementById('professional-score').textContent = this.scores.professional;
        document.getElementById('relational-score').textContent = this.scores.relational;
        
        // Animate score bars
        setTimeout(() => {
            document.getElementById('personal-fill').style.width = `${(this.scores.personal / 50) * 100}%`;
            document.getElementById('professional-fill').style.width = `${(this.scores.professional / 50) * 100}%`;
            document.getElementById('relational-fill').style.width = `${(this.scores.relational / 50) * 100}%`;
        }, 100);
        
        // Display overall assessment
        const overallText = this.getOverallAssessment();
        document.getElementById('overall-assessment').textContent = overallText;
    },

    getOverallAssessment() {
        if (this.scores.total >= 120) {
            return 'Excellent Coaching Fit';
        } else if (this.scores.total >= 90) {
            return 'Good Coaching Fit';
        } else if (this.scores.total >= 60) {
            return 'Moderate Fit - Exploration Recommended';
        } else {
            return 'Alternative Approaches Recommended';
        }
    },

    displayInterpretations() {
        const container = document.getElementById('interpretations');
        container.innerHTML = '';
        
        // Overall interpretation
        const overallDiv = this.createInterpretationSection(
            'Overall Assessment',
            this.getOverallInterpretation()
        );
        container.appendChild(overallDiv);
        
        // Personal readiness interpretation
        const personalDiv = this.createInterpretationSection(
            'Personal Readiness',
            this.getPersonalInterpretation()
        );
        container.appendChild(personalDiv);
        
        // Professional readiness interpretation
        const professionalDiv = this.createInterpretationSection(
            'Professional Readiness',
            this.getProfessionalInterpretation()
        );
        container.appendChild(professionalDiv);
        
        // Relational readiness interpretation
        const relationalDiv = this.createInterpretationSection(
            'Relational Readiness',
            this.getRelationalInterpretation()
        );
        container.appendChild(relationalDiv);
    },

    createInterpretationSection(title, content) {
        const section = document.createElement('div');
        section.className = 'interpretation-section';
        
        const heading = document.createElement('h4');
        heading.textContent = title;
        section.appendChild(heading);
        
        const text = document.createElement('p');
        text.textContent = content;
        section.appendChild(text);
        
        return section;
    },

    getOverallInterpretation() {
        const score = this.scores.total;
        
        if (score >= 120) {
            return "You're an ideal candidate for conflict leadership coaching. You have the growth mindset, professional context, and relational values that enable coaching to deliver significant impact. You're likely to fully engage with the process and achieve meaningful, sustainable results.";
        } else if (score >= 90) {
            return "You're well-positioned for coaching with some dimensions stronger than others. Review your individual dimension scores to understand where you're most ready and where additional clarity or development might enhance coaching effectiveness.";
        } else if (score >= 60) {
            return "Coaching could be valuable, but the timing or fit may not be optimal. You might benefit from exploring what's creating lower scores in specific dimensions. Alternative or preparatory approaches might deliver better value at this stage.";
        } else {
            return "Based on your current readiness profile, approaches other than intensive coaching might serve you better at this time. This doesn't mean coaching won't be valuable in the future—timing and readiness significantly impact coaching effectiveness.";
        }
    },

    getPersonalInterpretation() {
        const score = this.scores.personal;
        
        if (score >= 40) {
            return "You demonstrate strong self-awareness, openness to feedback, and commitment to development. You're mentally and emotionally prepared for the vulnerability and challenge that coaching requires.";
        } else if (score >= 30) {
            return "You show good openness to development with some reservations. You may benefit from exploring any hesitations about feedback or change before engaging in intensive coaching.";
        } else if (score >= 20) {
            return "You may be in a transition period regarding your approach to personal development. Coaching could be valuable, but you might benefit from starting with shorter-term engagements or focusing on building comfort with feedback first.";
        } else {
            return "Coaching works best when there's a foundation of openness to feedback and willingness to try new approaches. You might benefit from exploring what's creating resistance to development work.";
        }
    },

    getProfessionalInterpretation() {
        const score = this.scores.professional;
        
        if (score >= 40) {
            return "You're at a critical inflection point in your leadership journey. You face specific, tangible challenges that coaching can address. The timing is right for intensive development work.";
        } else if (score >= 30) {
            return "You have good reasons to pursue coaching and face real leadership challenges. Clarifying your specific goals and ensuring you can commit adequate time will enhance coaching effectiveness.";
        } else if (score >= 20) {
            return "While you may benefit from coaching, you might get more value by first clarifying your specific development goals or waiting until you face more concrete challenges where coaching can have immediate application.";
        } else {
            return "The professional context may not yet warrant intensive coaching investment. You might benefit more from other development approaches until you face challenges that require deeper, sustained support.";
        }
    },

    getRelationalInterpretation() {
        const score = this.scores.relational;
        
        if (score >= 40) {
            return "You deeply value relationships and see conflict as an opportunity for growth and innovation. This orientation will enable you to apply conflict leadership skills in ways that transform team dynamics.";
        } else if (score >= 30) {
            return "You value relationships while balancing other priorities. Coaching can help you develop more sophisticated approaches to managing the relationship aspects of leadership while maintaining focus on results.";
        } else if (score >= 20) {
            return "You may be more task-focused than relationship-focused in your leadership approach. Coaching can still be valuable, but you might benefit from exploring how relationship dynamics impact business outcomes.";
        } else {
            return "Conflict leadership coaching emphasizes collaborative, relationship-centered approaches. If this isn't aligned with your values or interests, you might benefit more from other leadership development approaches.";
        }
    },

    displayNextSteps() {
        const container = document.getElementById('next-steps-content');
        container.innerHTML = '';
        
        const steps = this.getNextSteps();
        
        const list = document.createElement('ul');
        list.className = 'next-steps-list';
        
        steps.forEach(step => {
            const item = document.createElement('li');
            item.textContent = step;
            list.appendChild(item);
        });
        
        container.appendChild(list);
    },

    getNextSteps() {
        const score = this.scores.total;
        
        if (score >= 120) {
            return [
                "Schedule a complimentary consultation to discuss your assessment results and specific coaching goals",
                "Prepare for the consultation by identifying 2-3 specific challenges where you'd like to see improvement",
                "Consider your constraints around timing, budget, and time commitment to ensure coaching fits your current reality"
            ];
        } else if (score >= 90) {
            return [
                "Schedule a consultation to discuss your readiness profile and determine if coaching is the right next step",
                "Review your dimension scores to identify areas where additional preparation might be valuable",
                "Consider what would make this the optimal time to begin intensive coaching work"
            ];
        } else if (score >= 60) {
            return [
                "Review resources on conflict leadership skills to strengthen your foundation",
                "Identify one small experiment you could try this week to practice approaching conflict differently",
                "Consider scheduling an exploratory conversation to discuss alternative development approaches",
                "Revisit this assessment in 3-6 months as your situation evolves"
            ];
        } else {
            return [
                "Explore alternative development options that match your current readiness and context",
                IF Personal + Relational ≥ 80:
    IF Organizational ≥ 25:
        → Steps for coaching + intervention (map stakeholders, discuss scope)
    ELSE:
        → Steps for individual coaching (schedule, identify situations)
        
ELSE IF Personal + Relational ≥ 60:
    IF Organizational ≥ 25:
        → Exploratory steps for blended approach
    ELSE:
        → Standard consultation steps
        
ELSE IF Personal + Relational ≥ 40:
    → Exploratory conversation, resources, reassess later
    
ELSE:
    → Alternative learning formats, reassess in 6-12 months

    scheduleConsultation() {
        // Replace with your actual scheduling link
        window.open('https://calendly.com/jjonespatulli/30-minute-call');
    },

    downloadResults() {
        // Generate simple results summary
        const resultsText = this.generateResultsText();
        const blob = new Blob([resultsText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'coaching-readiness-results.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    generateResultsText() {
        return `COACHING READINESS ASSESSMENT RESULTS
========================================

Overall Score: ${this.scores.total} / 150
Assessment: ${this.getOverallAssessment()}

DIMENSION SCORES:
-----------------
Personal Readiness: ${this.scores.personal} / 50
Professional Readiness: ${this.scores.professional} / 50
Relational Readiness: ${this.scores.relational} / 50

INTERPRETATIONS:
----------------

Overall Assessment:
${this.getOverallInterpretation()}

Personal Readiness:
${this.getPersonalInterpretation()}

Professional Readiness:
${this.getProfessionalInterpretation()}

Relational Readiness:
${this.getRelationalInterpretation()}

NEXT STEPS:
-----------
${this.getNextSteps().map((step, i) => `${i + 1}. ${step}`).join('\n')}

This assessment is designed to help you evaluate your readiness for coaching.
It's a starting point for conversation, not a definitive judgment.
`;
    },

    restartAssessment() {
        if (confirm('Are you sure you want to restart the assessment? Your current answers will be lost.')) {
            this.currentQuestionIndex = 0;
            this.answers = {};
            this.scores = {
                personal: 0,
                professional: 0,
                relational: 0,
                total: 0
            };
            localStorage.removeItem('assessmentProgress');
            this.startAssessment();
        }
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    },

    saveProgress() {
        const progress = {
            currentQuestionIndex: this.currentQuestionIndex,
            answers: this.answers
        };
        localStorage.setItem('assessmentProgress', JSON.stringify(progress));
    },

    loadSavedProgress() {
        const saved = localStorage.getItem('assessmentProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                this.currentQuestionIndex = progress.currentQuestionIndex || 0;
                this.answers = progress.answers || {};
            } catch (e) {
                console.error('Error loading saved progress:', e);
            }
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
