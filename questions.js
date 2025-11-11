// Assessment Questions Database
const assessmentQuestions = {
    personal: [
        {
            id: 'p1',
            dimension: 'personal',
            text: 'I actively seek feedback about my leadership approach, even when it might be uncomfortable to hear.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p2',
            dimension: 'personal',
            text: 'When a leadership strategy doesn\'t work, I see it as useful information rather than a personal failure.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p3',
            dimension: 'personal',
            text: 'I\'m willing to examine how my own behavior might contribute to workplace conflicts or tensions.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p4',
            dimension: 'personal',
            text: 'I believe my conflict management skills can improve significantly with practice and guidance.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p5',
            dimension: 'personal',
            text: 'I\'m prepared to invest time regularly (outside of coaching sessions) to develop new leadership skills.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p6',
            dimension: 'personal',
            text: 'I\'m comfortable being vulnerable about my leadership challenges with a trusted advisor.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p7',
            dimension: 'personal',
            text: 'I\'m more interested in sustainable growth than quick fixes to my current challenges.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p8',
            dimension: 'personal',
            text: 'I\'m ready to challenge assumptions I\'ve held about how leadership "should" work.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p9',
            dimension: 'personal',
            text: 'I take responsibility for my professional development rather than waiting for my organization to provide it.',
            type: 'likert',
            points: 5
        },
        {
            id: 'p10',
            dimension: 'personal',
            text: 'I believe I have agency to change difficult workplace dynamics, even when they feel systemic.',
            type: 'likert',
            points: 5
        }
    ],
    
    professional: [
        {
            id: 'pr1',
            dimension: 'professional',
            text: 'Which of the following best describes your current situation? (Select all that apply)',
            type: 'checkbox',
            options: [
                'Recently promoted or anticipating promotion within 6-12 months',
                'Transitioning to a role with broader scope or influence',
                'Managing managers for the first time',
                'Leading through organizational change (merger, restructuring, transformation)',
                'Taking on increased responsibility without formal authority change',
                'Moving from technical/specialist role to leadership role',
                'New to executive or senior leadership level'
            ],
            pointsPerOption: 2
        },
        {
            id: 'pr2',
            dimension: 'professional',
            text: 'I\'m currently facing these specific challenges: (Select all that apply)',
            type: 'checkbox',
            options: [
                'Recurring team conflicts that don\'t seem to resolve',
                'Difficulty navigating complex stakeholder relationships',
                'Resistance to my initiatives or decisions',
                'Communication breakdowns across departments or teams',
                'Struggling to have crucial conversations I keep postponing',
                'Managing competing priorities and resource constraints',
                'Building credibility in a new leadership role'
            ],
            pointsPerOption: 2
        },
        {
            id: 'pr3',
            dimension: 'professional',
            text: 'My organization is experiencing: (Select all that apply)',
            type: 'checkbox',
            options: [
                'Significant change or transformation',
                'Low employee engagement or retention issues',
                'Silos or interdepartmental tensions',
                'Unclear decision-making processes',
                'Power dynamics that impact effectiveness',
                'Need for more innovative problem-solving approaches',
                'Leadership gaps at my level'
            ],
            pointsPerOption: 1
        },
        {
            id: 'pr4',
            dimension: 'professional',
            text: 'I want to be proactive rather than wait for a crisis.',
            type: 'likert',
            points: 5
        },
        {
            id: 'pr5',
            dimension: 'professional',
            text: 'I\'m facing specific conflicts or tensions that need addressing.',
            type: 'likert',
            points: 5
        },
        {
            id: 'pr6',
            dimension: 'professional',
            text: 'I have specific, measurable goals for what I want to achieve through coaching.',
            type: 'likert',
            points: 5
        },
        {
            id: 'pr7',
            dimension: 'professional',
            text: 'I can commit to coaching for at least 3-6 months to see meaningful results.',
            type: 'likert',
            points: 5
        }
    ],
    
    relational: [
        {
            id: 'r1',
            dimension: 'relational',
            text: 'Building strong working relationships is as important to me as achieving business results.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r2',
            dimension: 'relational',
            text: 'I believe that addressing conflict skillfully can strengthen teams rather than just resolve problems.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r3',
            dimension: 'relational',
            text: 'I\'m interested in understanding different perspectives, even when I disagree with them.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r4',
            dimension: 'relational',
            text: 'I want to create environments where people bring their best thinking to complex challenges.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r5',
            dimension: 'relational',
            text: 'When conflicts arise, I\'m more interested in understanding root causes than assigning blame.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r6',
            dimension: 'relational',
            text: 'I believe most conflicts contain opportunities for creative problem-solving and innovation.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r7',
            dimension: 'relational',
            text: 'I\'m willing to explore how power dynamics and organizational structures influence team interactions.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r8',
            dimension: 'relational',
            text: 'I prefer collaborative solutions over win-lose outcomes, even when it takes more time initially.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r9',
            dimension: 'relational',
            text: 'I actively work to include diverse voices in decision-making processes.',
            type: 'likert',
            points: 5
        },
        {
            id: 'r10',
            dimension: 'relational',
            text: 'I see developing others\' conflict leadership skills as part of my leadership responsibility.',
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
