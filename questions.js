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
            text: 'My current leadership role: (Select the one that best fits)',
            type: 'checkbox',
            options: [
                'Individual contributor or team lead',
                'First-time manager of people',
                'Managing managers or leading at mid-level',
                'Senior leader or executive',
                'In transition between roles or organizations',
                'Not currently in formal leadership but lead through influence'
            ],
            pointsPerOption: 0
        },
        {
            id: 'pr2',
            dimension: 'professional',
            text: 'The primary conflict or challenge I want to address involves: (Select all that apply)',
            type: 'checkbox',
            options: [
                'My own conflict avoidance or discomfort with difficult conversations',
                'A specific challenging relationship with a colleague, boss, or direct report',
                'Navigating power dynamics or organizational politics',
                'My leadership style or approach in tense situations',
                'Building my confidence in addressing conflicts',
                'Team dynamics or tensions I\'m responsible for addressing',
                'Cross-departmental or stakeholder conflicts',
                'I\'m being proactive - no specific conflict right now'
            ],
            pointsPerOption: 0
        },
        {
            id: 'pr3',
            dimension: 'professional',
            text: 'What level of conflict or tension are you experiencing?',
            type: 'checkbox',
            options: [
                'Experiencing the limits of own skills, confidence, or approach to conflict',
                'One or two specific relationships that need attention',
                'Team-level issues affecting a group I lead or am part of',
                'Multiple teams or departments experiencing conflict',
                'Organization-wide tensions or systemic issues',
                'No active conflict - I want to build skills proactively'
            ],
            pointsPerOption: 2
        },
        {
            id: 'pr4',
            dimension: 'professional',
            text: 'How complex is the organizational context around your challenges?',
            type: 'likert',
            points: 3,
            labels: {
                1: 'Simple - mostly about my skills',
                2: 'Somewhat complex',
                3: 'Moderately complex',
                4: 'Very complex',
                5: 'Highly complex - multiple stakeholders/systems'
            }
        },
        {
            id: 'pr5',
            dimension: 'professional',
            text: 'How many people are directly affected by the conflict or tension?',
            type: 'likert',
            points: 3,
            labels: {
                1: 'Just me (personal development)',
                2: '2-3 people',
                3: '4-10 people (team level)',
                4: '11-30 people (multiple teams)',
                5: '30+ people (organizational level)'
            }
        },
        {
            id: 'pr6',
            dimension: 'professional',
            text: 'How urgent does this feel to address?',
            type: 'likert',
            points: 2,
            labels: {
                1: 'Not urgent - building capacity',
                2: 'Somewhat pressing',
                3: 'Moderately urgent',
                4: 'Very urgent',
                5: 'Crisis level - needs immediate attention'
            }
        },
        {
            id: 'pr7',
            dimension: 'professional',
            text: 'Do you have the authority to address this conflict directly, or does it require organizational intervention?',
            type: 'likert',
            points: 2,
            labels: {
                1: 'Full authority - it\'s within my control',
                2: 'Mostly my authority',
                3: 'Shared authority',
                4: 'Limited authority',
                5: 'Little authority - requires org intervention'
            }
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
