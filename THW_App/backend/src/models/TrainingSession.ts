// Schulungstermin
export interface TrainingSession {
    id: number;
    trainingsId: number;
    startDate: Date;
    endDate: Date;
    location: string;
    maxParticipants: number;
}