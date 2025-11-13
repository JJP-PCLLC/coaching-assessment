// Assessment Questions
// Categories: personal (growth mindset), professional (organizational context), relational (relationship focus)
// Scoring is designed to be inclusive - struggling is a positive indicator for coaching need

const questions = [
    // PERSONAL READINESS - Growth Mindset (10 questions)
    // These questions identify openness to learning and change, including those who recognize they need help
    {
        id: 1,
        category: 'personal',
        text: 'How do you feel about receiving feedback on your leadership approach?',
        options: [
            { text: 'I actively seek it out and use it to improve', score: 5 },
            { text: 'I\'m open to it and try to learn from it', score: 5 },
            { text: 'I accept it but sometimes find it hard to hear', score: 4 },
            { text: 'I tend to get defensive but want to change that', score: 4 },
            { text: 'I avoid it when possible', score: 2 }
        ]
    },
    {
        id: 2,
        category: 'personal',
        text: 'When you think about your conflict management skills, which statement resonates most?',
        options: [
            { text: 'I struggle with conflict and want to develop these skills', score: 5 },
            { text: 'I have some skills but want to get better', score: 5 },
            { text: 'I\'m comfortable but recognize room for growth', score: 4 },
            { text: 'I handle most situations well', score: 3 },
            { text: 'I feel confident in my current abilities', score: 2 }
        ]
    },
    {
        id: 3,
        category: 'personal',
        text: 'How willing are you to try new approaches to leadership challenges?',
        options: [
            { text: 'Very willing - I need new strategies', score: 5 },
            { text: 'Willing - I\'m open to learning different methods', score: 5 },
            { text: 'Somewhat willing - with the right guidance', score: 4 },
            { text: 'Cautiously willing - I prefer proven methods', score: 3 },
            { text: 'I prefer to stick with what I know', score: 1 }
        ]
    },
    {
        id: 4,
        category: 'personal',
        text: 'When you make a leadership mistake, how do you typically respond?',
        options: [
            { text: 'I reflect on it and actively seek ways to improve', score: 5 },
            { text: 'I acknowledge it and try to learn from it', score: 5 },
            { text: 'I feel bad about it but eventually move on', score: 3 },
            { text: 'I tend to dwell on it without clear next steps', score: 4 },
            { text: 'I try not to think about it', score: 2 }
        ]
    },
    {
        id: 5,
        category: 'personal',
        text: 'How do you view leadership development?',
        options: [
            { text: 'As an ongoing journey I\'m committed to', score: 5 },
            { text: 'As important and worth investing time in', score: 5 },
            { text: 'As helpful when I have time for it', score: 3 },
            { text: 'As something I should do but struggle to prioritize', score: 4 },
            { text: 'As less relevant to my current role', score: 1 }
        ]
    },
    {
        id: 6,
        category: 'personal',
        text: 'When facing a challenging interpersonal situation at work, what\'s your first instinct?',
        options: [
            { text: 'I want to address it but need help figuring out how', score: 5 },
            { text: 'I assess the situation and develop a strategy', score: 4 },
            { text: 'I try to address it with mixed success', score: 5 },
            { text: 'I hope it will resolve itself over time', score: 4 },
            { text: 'I avoid it until absolutely necessary', score: 4 }
        ]
    },
    {
        id: 7,
        category: 'personal',
        text: 'How comfortable are you acknowledging areas where you need support?',
        options: [
            { text: 'Very comfortable - I know I need help with conflict', score: 5 },
            { text: 'Comfortable - I can identify my development areas', score: 5 },
            { text: 'Somewhat comfortable - it depends on the situation', score: 4 },
            { text: 'Uncomfortable but I\'m working on it', score: 4 },
            { text: 'Very uncomfortable - I prefer to figure things out alone', score: 2 }
        ]
    },
    {
        id: 8,
        category: 'personal',
        text: 'What best describes your attitude toward difficult conversations?',
        options: [
            { text: 'I avoid them and want to change this pattern', score: 5 },
            { text: 'I struggle with them but I\'m committed to improving', score: 5 },
            { text: 'I can handle them but want more confidence', score: 5 },
            { text: 'I\'m fairly comfortable with most difficult conversations', score: 3 },
            { text: 'I handle them well and rarely have concerns', score: 2 }
        ]
    },
    {
        id: 9,
        category: 'personal',
        text: 'How do you respond when your initial approach to a problem doesn\'t work?',
        options: [
            { text: 'I actively seek new perspectives and strategies', score: 5 },
            { text: 'I reflect and adjust my approach', score: 5 },
            { text: 'I eventually try something different', score: 4 },
            { text: 'I keep trying the same approach hoping for different results', score: 3 },
            { text: 'I get stuck and frustrated', score: 4 }
        ]
    },
    {
        id: 10,
        category: 'personal',
        text: 'What motivates you to consider conflict coaching right now?',
        options: [
            { text: 'I\'m struggling and need concrete strategies', score: 5 },
            { text: 'I want to build confidence in handling conflict', score: 5 },
            { text: 'I\'m facing new challenges that require new skills', score: 5 },
            { text: 'I\'m curious about improving but not urgent', score: 3 },
            { text: 'Someone suggested it but I\'m unsure if I need it', score: 2 }
        ]
    },

    // RELATIONAL READINESS - Relationship Focus (10 questions)
    // These questions identify value for relationships and collaborative problem-solving
    {
        id: 11,
        category: 'relational',
        text: 'How important are strong working relationships to your leadership success?',
        options: [
            { text: 'Absolutely essential - they\'re central to everything I do', score: 5 },
            { text: 'Very important - I prioritize building connections', score: 5 },
            { text: 'Important - though I struggle to maintain them', score: 5 },
            { text: 'Somewhat important - task completion comes first', score: 3 },
            { text: 'Not a primary focus for me', score: 1 }
        ]
    },
    {
        id: 12,
        category: 'relational',
        text: 'When there\'s tension between team members, how invested are you in resolving it?',
        options: [
            { text: 'Very invested - I want to help but need better tools', score: 5 },
            { text: 'Very invested - I actively work to address it', score: 5 },
            { text: 'Invested when it affects productivity', score: 3 },
            { text: 'Somewhat invested - I hope they work it out', score: 2 },
            { text: 'Not very invested - not my role to intervene', score: 1 }
        ]
    },
    {
        id: 13,
        category: 'relational',
        text: 'How do you approach bringing together people with different perspectives?',
        options: [
            { text: 'I value it but struggle to facilitate effectively', score: 5 },
            { text: 'I actively create opportunities for collaboration', score: 5 },
            { text: 'I try to but find it challenging', score: 5 },
            { text: 'I do it when required', score: 3 },
            { text: 'I prefer to work with like-minded people', score: 1 }
        ]
    },
    {
        id: 14,
        category: 'relational',
        text: 'What\'s your view on conflict within teams?',
        options: [
            { text: 'It can be productive but I need help facilitating it', score: 5 },
            { text: 'It\'s a natural part of collaboration that can lead to innovation', score: 5 },
            { text: 'It\'s necessary sometimes but uncomfortable for me', score: 4 },
            { text: 'It\'s disruptive and should be minimized', score: 2 },
            { text: 'It should be avoided whenever possible', score: 1 }
        ]
    },
    {
        id: 15,
        category: 'relational',
        text: 'How would you describe your listening skills in tense situations?',
        options: [
            { text: 'I struggle to listen well and want to improve', score: 5 },
            { text: 'I try to listen but sometimes react too quickly', score: 4 },
            { text: 'I\'m working on staying present and curious', score: 5 },
            { text: 'I generally listen well', score: 3 },
            { text: 'I\'m a strong listener even under pressure', score: 3 }
        ]
    },
    {
        id: 16,
        category: 'relational',
        text: 'How interested are you in understanding underlying dynamics in conflicts?',
        options: [
            { text: 'Very interested - I want to understand what\'s really happening', score: 5 },
            { text: 'Interested - I know there\'s more beneath the surface', score: 5 },
            { text: 'Somewhat interested when I have time', score: 3 },
            { text: 'Not very interested - I focus on resolving the immediate issue', score: 2 },
            { text: 'Not interested - I want quick solutions', score: 1 }
        ]
    },
    {
        id: 17,
        category: 'relational',
        text: 'How do you feel about mediating between conflicting parties?',
        options: [
            { text: 'I want to help but lack confidence in my approach', score: 5 },
            { text: 'I\'m willing but need better frameworks', score: 5 },
            { text: 'I\'m comfortable and want to strengthen my skills', score: 4 },
            { text: 'I do it when necessary but prefer not to', score: 3 },
            { text: 'I avoid this role when possible', score: 2 }
        ]
    },
    {
        id: 18,
        category: 'relational',
        text: 'What\'s your belief about finding creative solutions to interpersonal problems?',
        options: [
            { text: 'I believe it\'s possible and want to learn how', score: 5 },
            { text: 'I actively look for win-win solutions', score: 5 },
            { text: 'I try but often settle for compromise', score: 4 },
            { text: 'I focus on practical solutions', score: 3 },
            { text: 'I think someone usually has to lose', score: 1 }
        ]
    },
    {
        id: 19,
        category: 'relational',
        text: 'How much do you value building trust within your team?',
        options: [
            { text: 'It\'s critical but I\'m not sure how to build it effectively', score: 5 },
            { text: 'It\'s a top priority that I actively work on', score: 5 },
            { text: 'It\'s important though sometimes deprioritized', score: 4 },
            { text: 'It\'s nice to have but not essential', score: 2 },
            { text: 'I focus more on results than relationships', score: 1 }
        ]
    },
    {
        id: 20,
        category: 'relational',
        text: 'How do you respond when you notice someone feeling excluded or unheard?',
        options: [
            { text: 'I want to help but struggle with how to intervene', score: 5 },
            { text: 'I actively work to include them', score: 5 },
            { text: 'I notice but don\'t always know what to do', score: 4 },
            { text: 'I address it if it becomes a problem', score: 3 },
            { text: 'I expect people to speak up for themselves', score: 1 }
        ]
    },

    // PROFESSIONAL READINESS - Organizational Context (10 questions)
    // Lower weight - identifies organizational conditions and type of support needed
    {
        id: 21,
        category: 'professional',
        text: 'How would you describe the current conflict level in your team or organization?',
        options: [
            { text: 'Minimal - occasional disagreements', score: 1, type: 'coaching' },
            { text: 'Moderate - regular tensions that need addressing', score: 3, type: 'coaching' },
            { text: 'Significant - multiple ongoing conflicts', score: 4, type: 'intervention' },
            { text: 'Severe - entrenched conflicts affecting operations', score: 5, type: 'intervention' },
            { text: 'Crisis - urgent systemic breakdown', score: 5, type: 'intervention' }
        ]
    },
    {
        id: 22,
        category: 'professional',
        text: 'Are you currently experiencing a leadership transition or organizational change?',
        options: [
            { text: 'Yes - major change happening now', score: 5, type: 'strategy' },
            { text: 'Yes - change coming in next 3-6 months', score: 4, type: 'coaching' },
            { text: 'Yes - recently moved into new leadership role', score: 4, type: 'coaching' },
            { text: 'Somewhat - minor adjustments', score: 2, type: 'coaching' },
            { text: 'No - stable environment', score: 1, type: 'coaching' }
        ]
    },
    {
        id: 23,
        category: 'professional',
        text: 'How many people are directly involved in the conflict(s) you\'re addressing?',
        options: [
            { text: 'Just me - working on my own skills', score: 1, type: 'coaching' },
            { text: '2-3 people including myself', score: 2, type: 'coaching' },
            { text: '4-7 people - a small team', score: 3, type: 'coaching' },
            { text: '8-15 people - multiple team members', score: 4, type: 'intervention' },
            { text: '16+ people - multiple teams or departments', score: 5, type: 'intervention' }
        ]
    },
    {
        id: 24,
        category: 'professional',
        text: 'What level of organizational support do you have for addressing conflict?',
        options: [
            { text: 'Strong support from leadership', score: 2, type: 'coaching' },
            { text: 'Moderate support - recognized as important', score: 3, type: 'coaching' },
            { text: 'Limited support - I\'m on my own', score: 3, type: 'coaching' },
            { text: 'No support - organizational resistance to change', score: 4, type: 'strategy' },
            { text: 'Unclear - navigating political dynamics', score: 4, type: 'strategy' }
        ]
    },
    {
        id: 25,
        category: 'professional',
        text: 'How urgent is the need to address the conflict situation(s) you\'re facing?',
        options: [
            { text: 'Not urgent - proactive development', score: 1, type: 'coaching' },
            { text: 'Somewhat urgent - should address in next few months', score: 2, type: 'coaching' },
            { text: 'Moderately urgent - needs attention in next few weeks', score: 3, type: 'coaching' },
            { text: 'Very urgent - needs immediate attention', score: 4, type: 'intervention' },
            { text: 'Critical - impacting business operations now', score: 5, type: 'intervention' }
        ]
    },
    {
        id: 26,
        category: 'professional',
        text: 'Are there systemic issues (policies, structures, processes) contributing to conflict?',
        options: [
            { text: 'No - conflicts are primarily interpersonal', score: 2, type: 'coaching' },
            { text: 'Possibly - unclear', score: 3, type: 'coaching' },
            { text: 'Yes - some structural factors at play', score: 4, type: 'strategy' },
            { text: 'Yes - significant organizational barriers', score: 5, type: 'strategy' },
            { text: 'Yes - fundamental organizational dysfunction', score: 5, type: 'intervention' }
        ]
    },
    {
        id: 27,
        category: 'professional',
        text: 'What\'s your decision-making authority in resolving conflicts?',
        options: [
            { text: 'Full authority - I can implement solutions', score: 2, type: 'coaching' },
            { text: 'Significant authority with some constraints', score: 3, type: 'coaching' },
            { text: 'Moderate authority - need buy-in from others', score: 3, type: 'strategy' },
            { text: 'Limited authority - must work through others', score: 4, type: 'strategy' },
            { text: 'No direct authority - influencing from the side', score: 4, type: 'strategy' }
        ]
    },
    {
        id: 28,
        category: 'professional',
        text: 'How would you characterize the power dynamics in your situation?',
        options: [
            { text: 'Clear and functional hierarchy', score: 2, type: 'coaching' },
            { text: 'Mostly clear with some informal dynamics', score: 3, type: 'coaching' },
            { text: 'Complex - multiple stakeholders with competing interests', score: 4, type: 'strategy' },
            { text: 'Very complex - unclear lines of authority', score: 5, type: 'strategy' },
            { text: 'Dysfunctional - toxic power dynamics', score: 5, type: 'intervention' }
        ]
    },
    {
        id: 29,
        category: 'professional',
        text: 'What\'s the history of conflict in your organization or team?',
        options: [
            { text: 'No significant history - new situation', score: 1, type: 'coaching' },
            { text: 'Some history - occasional unresolved issues', score: 3, type: 'coaching' },
            { text: 'Moderate history - recurring patterns', score: 4, type: 'strategy' },
            { text: 'Long history - entrenched conflicts', score: 5, type: 'intervention' },
            { text: 'Extensive history - multiple failed resolution attempts', score: 5, type: 'intervention' }
        ]
    },
    {
        id: 30,
        category: 'professional',
        text: 'What best describes your primary need right now?',
        options: [
            { text: 'Personal skill development in conflict leadership', score: 1, type: 'coaching' },
            { text: 'Help navigating a specific challenging situation', score: 2, type: 'coaching' },
            { text: 'Strategic guidance on organizational conflict dynamics', score: 4, type: 'strategy' },
            { text: 'Facilitating resolution between multiple parties', score: 5, type: 'intervention' },
            { text: 'Comprehensive organizational conflict assessment', score: 5, type: 'intervention' }
        ]
    }
];
