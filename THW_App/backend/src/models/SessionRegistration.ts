// Anmeldung
export interface Registration {
    id: number;
    sessionId: number;
    userId: number;
    userName: string;
    userPrename: string;
    registrationDate: Date;
    attended: boolean;
}