import { Category, Notes } from "../types";

export const notesCategories: Category[] = [
    {
        value: 'WORK_AND_STUDY',
        label: 'Work and study'
    },
    {
        value: 'LIFE',
        label: 'Life'
    },
    {
        value: 'HEALTH_AND_WELLNESS',
        label: 'Health and wellness'
    }
]

export const notes: Notes[] = [
    {
        id: '1c773402-e08c-427b-b814-74019a8922e0',
        notesContent: 'Overview now of basic computer networking knowledge that you should know',
        categoryKey: 'WORK_AND_STUDY',
        createdDateTime: '2024-02-20 11:50:23'
    },
    {
        id: 'aeb36a6f-a1ce-4892-b7ba-e7a3eef4290a',
        notesContent: 'How to learn calculate float multiplication and division in JavaScript?',
        categoryKey: 'WORK_AND_STUDY',
        createdDateTime: '2024-02-21 12:50:38'
    },
    {
        id: '1c773402-e08c-427b-b815-74019a8922e0',
        notesContent: 'Overview basic',
        categoryKey: 'WORK_AND_STUDY',
        createdDateTime: '2024-02-23 11:50:23'
    },
    {
        id: 'aeb36a6f-a1ce-4892-b7ba-e7a3eef4280a',
        notesContent: 'How to calculate float multiplication and division in JavaScript?',
        categoryKey: 'WORK_AND_STUDY',
        createdDateTime: '2024-02-20 12:50:38'
    },
    {
        id: '2b98aee9-a90d-48f1-8c97-c824b3fe9143',
        notesContent: 'Pan-fried chicken breast with vegetable salad',
        categoryKey: 'LIFE',
        createdDateTime: '2024-02-19 18:50:23'
    },
    {
        id: 'd37f7e57-0796-43ca-bc53-7503c18344c3',
        notesContent: 'Maintain sufficient daily water intake',
        categoryKey: 'HEALTH_AND_WELLNESS',
        createdDateTime: '2024-02-22 10:50:23'
    },
]