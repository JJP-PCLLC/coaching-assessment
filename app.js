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
            document.getElementById('professional-fill').style.width = `${(this.scores.professional / 30) * 100}%`;
            document.getElementById('relational-fill').style.width = `${(this.scores.relational / 50) * 100}%`;
        }, 100);
        
        // Display overall assessment
        const overallText = this.getOverallAssessment();
        document.getElementById('overall-assessment').textContent = overallText;
    },

    getOverallAssessment() {
        // Focus on personal + relational (100 points possible)
        const personalRelationalScore = this.scores.personal + this.scores.relational;
        const professionalScore = this.scores.professional;
        
        if (personalRelationalScore >= 80) {
            if (professionalScore >= 25) {
                return 'Excellent Fit - Coaching + Intervention';
            } else {
                return 'Excellent Coaching Fit';
            }
        } else if (personalRelationalScore >= 60) {
            if (professionalScore >= 25) {
                return 'Good Fit - Complex Context';
            } else {
                return 'Good Coaching Fit';
            }
        } else if (personalRelationalScore >= 40) {
            return 'Moderate Fit - Exploratory Discussion Recommended';
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
        const personalRelationalScore = this.scores.personal + this.scores.relational;
        const professionalScore = this.scores.professional;
        
        // Primary readiness comes from personal + relational (100 points possible)
        // Professional indicates complexity/service type (lower weight in overall fit)
        
        if (personalRelationalScore >= 80) {
            if (professionalScore >= 25) {
                return "You have strong coaching readiness and are dealing with significant organizational complexity. You're an excellent candidate for individual coaching, and your situation may also benefit from organizational interventions (mediation, team facilitation, or strategy consultation). Individual coaching will build your personal conflict leadership capacity while we can discuss intervention options to address the broader organizational dynamics.";
            } else {
                return "You're an excellent candidate for individual conflict leadership coaching. You have the openness, aspiration, and values alignment that enable coaching to deliver significant impact. You're likely to fully engage with the process and achieve meaningful, sustainable results in developing your conflict leadership skills.";
            }
        } else if (personalRelationalScore >= 60) {
            if (professionalScore >= 25) {
                return "You have good coaching readiness and are facing complex organizational challenges. Individual coaching can help you develop conflict leadership skills while addressing your specific context. Your situation's complexity may benefit from exploring organizational intervention options alongside coaching. Together we can design the right combination of support.";
            } else {
                return "You're well-positioned for coaching with strong readiness in some areas. Individual coaching will help you develop conflict leadership capacity while working on the dimensions where you have more room for growth. The focused individual context of your challenges is well-suited to coaching work.";
            }
        } else if (personalRelationalScore >= 40) {
            return "Coaching could be valuable, but exploring what's creating hesitation in your personal or relational readiness will be important. You might benefit from starting with an exploratory consultation to discuss whether coaching is the right approach at this time, or whether other development approaches might serve you better right now. Your readiness may grow with time and reflection.";
        } else {
            return "Based on your current readiness profile, approaches other than intensive coaching might serve you better at this time. This doesn't mean coaching won't be valuable in the future—readiness evolves. Consider exploring other development resources, and reassess your coaching readiness in several months as your perspective and situation evolve.";
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
        
        // Professional score now indicates organizational complexity/scope, not individual readiness
        if (score >= 25) {
            return "Your situation involves significant organizational complexity with multiple stakeholders or systemic challenges. You may benefit from a combination of individual coaching and organizational interventions (mediation, team facilitation, or strategy consultation) to address both your leadership development and the broader organizational dynamics. Consider discussing intervention options alongside coaching.";
        } else if (score >= 15) {
            return "Your situation has moderate organizational complexity. Individual coaching focused on your conflict leadership skills will likely address your needs effectively, though some situations may benefit from targeted team or stakeholder interventions. We can discuss the right combination of support during your consultation.";
        } else if (score >= 8) {
            return "Your focus is primarily on individual skill development with manageable organizational context. Individual coaching is well-suited to help you build your conflict leadership capacity and address the specific challenges you're facing. This is an ideal scenario for focused coaching work.";
        } else {
            return "You're in an excellent position for proactive skill development. Individual coaching will help you build conflict leadership capabilities before you face complex challenges, giving you tools and confidence to navigate future situations more effectively.";
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
        const personalRelationalScore = this.scores.personal + this.scores.relational;
        const professionalScore = this.scores.professional;
        
        if (personalRelationalScore >= 80) {
            if (professionalScore >= 25) {
                return [
                    "Schedule a consultation to discuss both individual coaching and potential organizational interventions (mediation, team facilitation, or strategy support)",
                    "Prepare for the consultation by mapping out the key stakeholders and organizational dynamics involved in your situation",
                    "Consider whether addressing your leadership development alone will be sufficient, or if organizational-level intervention would accelerate progress",
                    "Be prepared to discuss timeline, budget, and decision-making authority for both individual and organizational support"
                ];
            } else {
                return [
                    "Schedule a complimentary consultation to discuss your coaching goals and design an engagement that fits your context",
                    "Identify 1-2 specific situations where you'd like to be more effective with conflict",
                    "Consider your availability for coaching sessions and between-session practice over the next 3-6 months"
                ];
            }
        } else if (personalRelationalScore >= 60) {
            if (professionalScore >= 25) {
                return [
                    "Schedule a consultation to explore how individual coaching and/or organizational intervention could support your situation",
                    "Reflect on your readiness for the personal development work coaching requires alongside addressing organizational dynamics",
                    "Come prepared to discuss both your individual growth edges and the broader organizational challenges you're navigating"
                ];
            } else {
                return [
                    "Schedule a consultation to discuss your readiness profile and explore whether coaching is the right next step",
                    "Review your dimension scores to identify areas where building additional readiness would be valuable",
                    "Consider what would make this the optimal time to invest in developing your conflict leadership skills"
                ];
            }
        } else if (personalRelationalScore >= 40) {
            return [
                "Consider scheduling an exploratory conversation to discuss your development goals and explore the best approach",
                "Reflect on what might be creating hesitation about coaching—is it timing, clarity about goals, or something else?",
                "Explore resources on conflict leadership to strengthen your foundation and build clarity about what you want to develop",
                "Revisit this assessment in 3-6 months as your readiness evolves"
            ];
        } else {
            return [
                "Focus on exploring what would increase your openness to conflict leadership development",
                "Consider other learning formats (workshops, reading, peer discussion) that might feel more accessible right now",
                "Stay connected to resources and development opportunities",
                "Reassess your coaching readiness in 6-12 months as your perspective and situation evolve"
            ];
        }
    },

    scheduleConsultation() {
        // Replace with your actual scheduling link
        window.open('https://calendly.com/your-scheduling-link', '_blank');
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
        return `PRODUCTIVE CONFLICT COACHING READINESS ASSESSMENT RESULTS
================================================================

Overall Score: ${this.scores.total} / 130
Assessment: ${this.getOverallAssessment()}

DIMENSION SCORES:
-----------------
Personal Readiness: ${this.scores.personal} / 50
Organizational Context: ${this.scores.professional} / 30
Relational Readiness: ${this.scores.relational} / 50

INTERPRETATIONS:
----------------

Overall Assessment:
${this.getOverallInterpretation()}

Personal Readiness:
${this.getPersonalInterpretation()}

Organizational Context:
${this.getProfessionalInterpretation()}

Relational Readiness:
${this.getRelationalInterpretation()}

NEXT STEPS:
-----------
${this.getNextSteps().map((step, i) => `${i + 1}. ${step}`).join('\n')}

================================================================
This assessment is designed to help you evaluate your readiness 
for coaching. It's a starting point for conversation, not a 
definitive judgment.

© 2025 Productive Conflict LLC
https://productiveconflict.us/
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
