// Anmeldung
export interface Registration {
    id: number;
    session_id: number;
    user_id: number;
    userName: string;
    userPrename: string;
    registrationDate: Date;
    attended: boolean;
}