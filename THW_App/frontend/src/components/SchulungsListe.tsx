import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Schulung {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
}

const SchulungsListe: React.FC = () => {
    const [schulungen, setSchulungen] = useState<Schulung[]>([]);

    useEffect(() => {
        const fetchSchulungen = async () => {
            const response = await api.get('/schulungen');
            setSchulungen(response.data);
        };
        fetchSchulungen();
    }, []);

    return (
        <div>
            <h1>Verfügbare Schulungen</h1>
            <ul>
                {schulungen.map((schulung) => (
                    <li key={schulung.id}>
                        <h2>{schulung.title}</h2>
                        <p>{schulung.description}</p>
                        <p>Datum: {schulung.date}</p>
                        <p>Ort: {schulung.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SchulungsListe;
