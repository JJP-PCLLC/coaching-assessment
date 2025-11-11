// Assessment Questions Database
const assessmentQuestions = {
    personal: [
        {
            id: 'p1',
            dimension: 'personal',
            text: 'I\'m open to receiving feedback about my leadership approach, even if it might be challenging to hear.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p2',
            dimension: 'personal',
            text: 'When something doesn\'t go as planned in my leadership, I want to understand what happened rather than blame myself or others.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p3',
            dimension: 'personal',
            text: 'I\'m interested in exploring how I might be contributing to workplace dynamics, even if it\'s uncomfortable.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p4',
            dimension: 'personal',
            text: 'I recognize that conflict management is a learnable skill, not just an innate talent.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p5',
            dimension: 'personal',
            text: 'I\'m willing to invest time in developing new leadership approaches (recognizing this takes consistent effort).',
            type: 'likert',
            points: 5
        },
        {
            id: 'p6',
            dimension: 'personal',
            text: 'I\'m willing to discuss my leadership struggles with someone who can help, even though it feels vulnerable.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p7',
            dimension: 'personal',
            text: 'I want to develop lasting skills rather than just get through my current challenges.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p8',
            dimension: 'personal',
            text: 'I\'m open to trying new leadership approaches, even if they feel different from what I\'ve done before.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p9',
            dimension: 'personal',
            text: 'I see investing in my professional development as my responsibility (even if I wish my organization would provide more support).',
            type: 'likert',
            points: 5
        },
        {
            id: 'p10',
            dimension: 'personal',
            text: 'Even when workplace dynamics feel overwhelming, I believe there are things I can influence or change.',
            type: 'likert',
            points: 5
        }
    ],
    
    professional: [
        {
            id: 'pr1',
            dimension: 'professional',
            text: 'Which of the following describes your current situation? (Select all that apply - even one is a good reason for coaching)',
            type: 'checkbox',
            options: [
                'Recently promoted or anticipating promotion within 6-12 months',
                'Transitioning to a role with broader scope or influence',
                'Managing managers for the first time',
                'Leading through organizational change (merger, restructuring, transformation)',
                'Taking on increased responsibility without formal authority change',
                'Moving from technical/specialist role to leadership role',
                'New to executive or senior leadership level',
                'None of these apply right now'
            ],
            pointsPerOption: 2
        },
        {
            id: 'pr2',
            dimension: 'professional',
            text: 'I\'m currently experiencing these challenges: (Select all that apply - even one is enough)',
            type: 'checkbox',
            options: [
                'Recurring team conflicts that I\'m not sure how to address',
                'Difficulty navigating complex stakeholder relationships',
                'Resistance to my initiatives or decisions',
                'Communication breakdowns across departments or teams',
                'Avoiding crucial conversations I know I need to have',
                'Managing competing priorities and resource constraints',
                'Building credibility in a new leadership role',
                'I tend to avoid conflict and want to get better at addressing it',
                'None of these - I\'m being proactive before issues arise'
            ],
            pointsPerOption: 2
        },
        {
            id: 'pr3',
            dimension: 'professional',
            text: 'My organization is experiencing: (Select all that apply - or none if you\'re focused on personal development)',
            type: 'checkbox',
            options: [
                'Significant change or transformation',
                'Low employee engagement or retention issues',
                'Silos or interdepartmental tensions',
                'Unclear decision-making processes',
                'Power dynamics that impact effectiveness',
                'Need for more innovative problem-solving approaches',
                'Leadership gaps at my level',
                'None of these - my organization is relatively stable'
            ],
            pointsPerOption: 1
        },
        {
            id: 'pr4',
            dimension: 'professional',
            text: 'Even if I\'m currently struggling with conflict, I want to develop skills to handle it better in the future.',
            type: 'likert',
            points: 5
        },
        {
            id: 'pr5',
            dimension: 'professional',
            text: 'There\'s at least one specific situation or relationship where I\'d like to be more effective.',
            type: 'likert',
            points: 5
        },
        {
            id: 'pr6',
            dimension: 'professional',
            text: 'I have a sense of what I want to work on, even if I can\'t articulate it perfectly yet.',
            type: 'likert',
            points: 5
        },
        {
            id: 'pr7',
            dimension: 'professional',
            text: 'I can realistically commit time over the next several months to work on my development (understanding it\'s an investment).',
            type: 'likert',
            points: 5
        }
    ],
    
    relational: [
        {
            id: 'r1',
            dimension: 'relational',
            text: 'I value building strong working relationships, even if I sometimes struggle to balance that with results.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r2',
            dimension: 'relational',
            text: 'I want to learn to address conflict in ways that strengthen teams (even if I currently avoid conflict).',
            type: 'likert',
            points: 5
        },
        {
            id: 'r3',
            dimension: 'relational',
            text: 'I want to get better at understanding different perspectives, especially when I disagree.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r4',
            dimension: 'relational',
            text: 'I aspire to create environments where people bring their best thinking to complex challenges.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r5',
            dimension: 'relational',
            text: 'When conflicts arise, I want to focus on understanding root causes rather than just finding who\'s at fault.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r6',
            dimension: 'relational',
            text: 'I\'m open to the idea that conflicts might contain opportunities, even if I don\'t always see them yet.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r7',
            dimension: 'relational',
            text: 'I\'m interested in understanding how power dynamics and organizational structures influence team interactions.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r8',
            dimension: 'relational',
            text: 'I value collaborative solutions, even when they feel harder or take longer than just making a decision.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r9',
            dimension: 'relational',
            text: 'I want to include diverse voices in decision-making, even if I\'m still figuring out how to do that well.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r10',
            dimension: 'relational',
            text: 'I see value in helping others develop their conflict leadership skills, not just developing my own.',
            type: 'likert',
            points: 5
        }
    ]
};

// Flatten all questions into a single array for easier iteration
const allQuestions = [
    ...assessmentQuestions.personal,
    ...assessmentQuestions.professional,
    ...assessmentQuestions.relational
];
