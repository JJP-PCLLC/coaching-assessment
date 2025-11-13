// Assessment Logic and UI Control

class ConflictCoachingAssessment {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.init();
    }

    init() {
        this.bindEventListeners();
        this.updateTotalQuestions();
    }

    bindEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startAssessment());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartAssessment());
    }

    updateTotalQuestions() {
        document.getElementById('total-questions').textContent = questions.length;
    }

    startAssessment() {
        this.showScreen('assessment-screen');
        this.renderQuestion();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    renderQuestion() {
        const question = questions[this.currentQuestion];
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <div class="question">
                <h3>${this.getCategoryLabel(question.category)}</h3>
                <p>${question.text}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option ${this.answers[question.id] === index ? 'selected' : ''}" 
                             onclick="assessment.selectOption(${question.id}, ${index})">
                            <input type="radio" 
                                   name="question-${question.id}" 
                                   id="option-${question.id}-${index}"
                                   ${this.answers[question.id] === index ? 'checked' : ''}>
                            <label for="option-${question.id}-${index}">${option.text}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.updateProgress();
        this.updateNavigationButtons();
    }

    getCategoryLabel(category) {
        const labels = {
            'personal': 'Personal Readiness - Growth Mindset',
            'professional': 'Organizational Context',
            'relational': 'Relational Readiness - Relationship Focus'
        };
        return labels[category] || category;
    }

    selectOption(questionId, optionIndex) {
        this.answers[questionId] = optionIndex;
        
        // Update UI
        const container = document.getElementById('question-container');
        container.querySelectorAll('.option').forEach((option, index) => {
            if (index === optionIndex) {
                option.classList.add('selected');
                option.querySelector('input').checked = true;
            } else {
                option.classList.remove('selected');
                option.querySelector('input').checked = false;
            }
        });

        this.updateNavigationButtons();
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // Previous button
        prevBtn.disabled = this.currentQuestion === 0;

        // Next button
        const currentQuestionAnswered = this.answers[questions[this.currentQuestion].id] !== undefined;
        nextBtn.disabled = !currentQuestionAnswered;

        // Update next button text for last question
        if (this.currentQuestion === questions.length - 1) {
            nextBtn.textContent = 'View Results';
        } else {
            nextBtn.textContent = 'Next';
        }
    }

    nextQuestion() {
        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        } else {
            this.showResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuestion();
        }
    }

    calculateScores() {
        const scores = {
            personal: { total: 0, max: 0, count: 0 },
            professional: { total: 0, max: 0, count: 0 },
            relational: { total: 0, max: 0, count: 0 }
        };

        const serviceTypes = { coaching: 0, intervention: 0, strategy: 0 };

        questions.forEach(question => {
            const answerIndex = this.answers[question.id];
            if (answerIndex !== undefined) {
                const selectedOption = question.options[answerIndex];
                const category = question.category;

                scores[category].total += selectedOption.score;
                scores[category].max += 5; // Max score per question is 5
                scores[category].count++;

                // Track professional category service type indicators
                if (category === 'professional' && selectedOption.type) {
                    serviceTypes[selectedOption.type]++;
                }
            }
        });

        // Calculate percentages
        Object.keys(scores).forEach(category => {
            scores[category].percentage = scores[category].max > 0 
                ? Math.round((scores[category].total / scores[category].max) * 100)
                : 0;
        });

        // Determine primary service type needed
        const primaryServiceType = Object.keys(serviceTypes).reduce((a, b) => 
            serviceTypes[a] > serviceTypes[b] ? a : b
        );

        return { scores, serviceTypes, primaryServiceType };
    }

    showResults() {
        const { scores, serviceTypes, primaryServiceType } = this.calculateScores();
        
        // Calculate overall coaching readiness
        // Personal and Relational are weighted more heavily (40% each)
        // Professional is weighted less (20%) as it indicates context not readiness
        const coachingReadiness = Math.round(
            (scores.personal.percentage * 0.4) +
            (scores.relational.percentage * 0.4) +
            (scores.professional.percentage * 0.2)
        );

        this.renderResults(scores, coachingReadiness, primaryServiceType, serviceTypes);
        this.showScreen('results-screen');
        window.scrollTo(0, 0);
    }

    renderResults(scores, coachingReadiness, primaryServiceType, serviceTypes) {
        const summaryDiv = document.getElementById('results-summary');
        const recommendationDiv = document.getElementById('recommendation');

        // Render score summary
        summaryDiv.innerHTML = `
            <div class="score-card">
                <h3>Your Coaching Readiness Score</h3>
                <div class="score">${coachingReadiness}%</div>
                <p>${this.getReadinessLabel(coachingReadiness)}</p>
            </div>
            <div class="category-scores">
                <div class="category-card">
                    <h4>Personal Readiness</h4>
                    <div class="score">${scores.personal.percentage}%</div>
                    <div class="label">Growth Mindset</div>
                </div>
                <div class="category-card">
                    <h4>Relational Readiness</h4>
                    <div class="score">${scores.relational.percentage}%</div>
                    <div class="label">Relationship Focus</div>
                </div>
                <div class="category-card">
                    <h4>Organizational Context</h4>
                    <div class="score">${scores.professional.percentage}%</div>
                    <div class="label">Complexity Level</div>
                </div>
            </div>
        `;

        // Render personalized recommendation
        recommendationDiv.innerHTML = this.getRecommendation(coachingReadiness, scores, primaryServiceType, serviceTypes);
    }

    getReadinessLabel(score) {
        if (score >= 80) return 'Excellent Coaching Readiness';
        if (score >= 60) return 'Strong Coaching Readiness';
        if (score >= 40) return 'Good Coaching Readiness';
        return 'Developing Coaching Readiness';
    }

    getRecommendation(coachingReadiness, scores, primaryServiceType, serviceTypes) {
        let recommendation = '<div class="recommendation">';
        
        // Overall readiness assessment
        recommendation += '<h3>Your Personalized Recommendation</h3>';
        
        if (coachingReadiness >= 60) {
            recommendation += `
                <p><strong>Great news!</strong> Your assessment indicates strong readiness for conflict coaching. Your openness to growth and value for relationships create an excellent foundation for coaching work.</p>
            `;
        } else {
            recommendation += `
                <p><strong>You're in the right place!</strong> Your assessment shows you're recognizing areas where you want to develop. This awareness is the first step toward growth, and coaching can help you build the skills and confidence you're seeking.</p>
            `;
        }

        // Service type recommendation based on professional context
        recommendation += '<div class="service-highlight">';
        
        if (primaryServiceType === 'intervention' && scores.professional.percentage >= 70) {
            recommendation += `
                <h4>🎯 Recommended Service: Conflict Intervention</h4>
                <p>Your organizational context indicates you're dealing with complex, multi-party conflicts that may benefit from direct intervention support such as:</p>
                <ul>
                    <li><strong>Mediation Services:</strong> Facilitating resolution between conflicting parties</li>
                    <li><strong>Team Interventions:</strong> Addressing systemic team conflicts</li>
                    <li><strong>Group Facilitation:</strong> Working with multiple stakeholders</li>
                </ul>
                <p><em>Consider combining intervention support with individual coaching to develop your own conflict leadership skills while addressing immediate organizational needs.</em></p>
            `;
        } else if (primaryServiceType === 'strategy' && scores.professional.percentage >= 60) {
            recommendation += `
                <h4>🎯 Recommended Service: Strategy Consultation</h4>
                <p>Your situation involves complex organizational dynamics that would benefit from strategic guidance:</p>
                <ul>
                    <li><strong>Strategic Planning:</strong> Developing comprehensive approaches to organizational conflict</li>
                    <li><strong>System Analysis:</strong> Understanding root causes and power dynamics</li>
                    <li><strong>Implementation Support:</strong> Creating actionable change strategies</li>
                </ul>
                <p><em>Individual coaching can complement strategy work by building your personal capabilities to lead change.</em></p>
            `;
        } else {
            recommendation += `
                <h4>🎯 Recommended Service: Individual Conflict Coaching</h4>
                <p>Based on your assessment, individual coaching is an excellent fit for your current needs. Coaching will help you:</p>
                <ul>
                    <li><strong>Build Confidence:</strong> Develop practical skills for handling difficult conversations</li>
                    <li><strong>Create Frameworks:</strong> Learn structured approaches to conflict resolution</li>
                    <li><strong>Practice & Reflect:</strong> Work through real situations with expert guidance</li>
                    <li><strong>Develop Your Style:</strong> Find authentic approaches that work for you</li>
                </ul>
            `;
        }
        
        recommendation += '</div>';

        // Specific insights based on category scores
        recommendation += '<h4>Key Insights from Your Assessment:</h4><ul>';

        if (scores.personal.percentage >= 70) {
            recommendation += '<li><strong>Strong Growth Mindset:</strong> Your openness to feedback and learning is a powerful asset. You\'re ready to engage deeply in the coaching process.</li>';
        } else if (scores.personal.percentage >= 40) {
            recommendation += '<li><strong>Developing Growth Mindset:</strong> You\'re building awareness of areas where you want to grow. Coaching can help you develop confidence and strategies for change.</li>';
        } else {
            recommendation += '<li><strong>Emerging Growth Mindset:</strong> You\'re beginning to recognize development opportunities. Coaching can help you build comfort with feedback and experimentation.</li>';
        }

        if (scores.relational.percentage >= 70) {
            recommendation += '<li><strong>Strong Relationship Focus:</strong> You deeply value relationships and collaboration. This will serve you well in developing productive conflict approaches.</li>';
        } else if (scores.relational.percentage >= 40) {
            recommendation += '<li><strong>Developing Relationship Focus:</strong> You recognize the importance of relationships and want tools to strengthen them. Coaching can help you build these skills.</li>';
        } else {
            recommendation += '<li><strong>Emerging Relationship Focus:</strong> You\'re starting to see how relationships impact outcomes. Coaching can help you develop collaborative approaches.</li>';
        }

        if (scores.professional.percentage >= 70) {
            recommendation += '<li><strong>Complex Organizational Context:</strong> You\'re navigating significant organizational challenges. This complexity suggests multiple support types may be valuable.</li>';
        } else if (scores.professional.percentage >= 40) {
            recommendation += '<li><strong>Moderate Complexity:</strong> Your organizational context has some challenges but is manageable with focused skill development.</li>';
        } else {
            recommendation += '<li><strong>Clear Context:</strong> Your organizational environment is relatively straightforward, allowing you to focus on building your personal conflict leadership skills.</li>';
        }

        recommendation += '</ul>';

        // Call to action
        recommendation += `
            <h4>What This Means for You:</h4>
            <p>Conflict coaching works best when you're committed to growth and willing to try new approaches. ${
                coachingReadiness >= 60 
                    ? 'Your assessment shows you\'re ready to engage in this transformative work.' 
                    : 'Your awareness that you need support is the crucial first step. Coaching can help you build the skills and confidence you\'re seeking.'
            }</p>
            <p><strong>Remember:</strong> Struggling with conflict doesn't mean you're not ready for coaching—it means coaching is exactly what you need. The most successful coaching clients are those who recognize where they want to grow and are willing to invest in their development.</p>
        `;

        recommendation += '</div>';

        return recommendation;
    }

    restartAssessment() {
        this.currentQuestion = 0;
        this.answers = {};
        this.showScreen('welcome-screen');
        window.scrollTo(0, 0);
    }
}

// Initialize assessment when page loads
let assessment;
document.addEventListener('DOMContentLoaded', () => {
    assessment = new ConflictCoachingAssessment();
});
