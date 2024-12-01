export interface CalendarResource {
    id: number;
    name: string;
    eventColor: string;
}

export interface CalendarSessions {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    resourceId: string
}

export interface CalendarSessionRegistrations {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    resourceId: string
}