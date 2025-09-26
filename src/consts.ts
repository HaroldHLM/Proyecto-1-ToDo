export const TODO_FILTERS = {
    All: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const

export const FOOTERFILTERS_BUTTONS = {
    [TODO_FILTERS.All]: {
        literal: 'Todos',
        href: `/?filter=${TODO_FILTERS.All}`
    },
    [TODO_FILTERS.ACTIVE]: {
        literal: 'Activos',
        href: `/?filter=${TODO_FILTERS.ACTIVE}`
    },
    [TODO_FILTERS.COMPLETED]: {
        literal: 'Completados',
        href: `/?filter=${TODO_FILTERS.COMPLETED}`
    }
} as const