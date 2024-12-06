// Schulungstermin
export interface TrainingSession {
    id: number;
    training_id: number;
    startDate: Date;
    endDate: Date;
    location: string;
    maxParticipants: number;
}