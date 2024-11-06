# MobileComputing
## Beschreibung
## Projektstruktur
thw-app/
├── backend/                 # Backend-Projektverzeichnis (Node.js und Express)
│   ├── src/
│   │   ├── config/          # Konfigurationsdateien, z.B. für die Datenbankverbindung
│   │   │   └── db.ts
│   │   ├── controllers/     # Controller für Business-Logik der API-Routen
│   │   │   ├── adminController.ts
│   │   │   ├── authController.ts
│   │   │   ├── gruppenleiterController.ts
│   │   │   └── userController.ts
│   │   ├── models/          # Datenbankmodelle (ORM-Definitionen)
│   │   │   ├── User.ts
│   │   │   ├── Schulung.ts
│   │   │   ├── Gruppe.ts
│   │   │   └── Zertifikat.ts
│   │   ├── routes/          # API-Routen
│   │   │   ├── adminRoutes.ts
│   │   │   ├── authRoutes.ts
│   │   │   ├── gruppenleiterRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── services/        # Services für die Geschäftslogik und Datenbankzugriffe
│   │   │   ├── adminService.ts
│   │   │   ├── authService.ts
│   │   │   ├── gruppenleiterService.ts
│   │   │   └── userService.ts
│   │   ├── app.ts           # Express-App-Setup
│   │   └── server.ts        # Startpunkt für das Backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Frontend-Projektverzeichnis (React und TypeScript)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # UI-Komponenten
│   │   │   ├── CalendarView.tsx
│   │   │   ├── EventForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SchulungsListe.tsx
│   │   │   └── ZertifikatView.tsx
│   │   ├── context/         # Kontext für globale Zustände (z.B. AuthContext)
│   │   │   └── AuthContext.tsx
│   │   ├── pages/           # Seitenkomponenten für die App-Routen
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── GruppenleiterDashboard.tsx
│   │   │   ├── HelferDashboard.tsx
│   │   │   └── LoginPage.tsx
│   │   ├── services/        # Services für API-Aufrufe
│   │   │   ├── api.ts       # API-Verbindungen (z.B. Axios für HTTP-Requests)
│   │   │   ├── authService.ts
│   │   │   └── schulungService.ts
│   │   ├── styles/          # Styling der App (z.B. CSS oder Styled Components)
│   │   │   └── App.css
│   │   ├── App.tsx          # Haupteinstiegspunkt der App
│   │   ├── index.tsx        # Einstiegspunkt, der React rendert
│   │   └── react-app-env.d.ts
│   ├── package.json
│   └── tsconfig.json
├── .env                     # Umgebungsvariablen (z.B. Datenbank-URL, Ports)
├── .gitignore
└── README.md

## Klassendiagramme
┌───────────────────┐      ┌─────────────────────┐      ┌────────────────────┐
│       User        │      │      Schulung       │      │       Gruppe       │
├───────────────────┤      ├─────────────────────┤      ├────────────────────┤
│ + id: number      │      │ + id: number        │      │ + id: number       │
│ + name: string    │      │ + title: string     │      │ + name: string     │
│ + email: string   │      │ + description: string │     │                    │
│ + role: UserRole  │      │ + date: Date        │      │                    │
├───────────────────┤      │ + location: string  │      ├────────────────────┤
│ + login()         │      │ + duration: number  │      │ + getGroupMembers()│
│ + logout()        │      │ + maxParticipants: int│    │ + addMember()      │
│ + registerForEvent()│    ├─────────────────────┤      │ + removeMember()   │
└───────────────────┘      │ + addParticipant()  │      └────────────────────┘
                           │ + getParticipants() │
                           │ + removeParticipant() │
                           └─────────────────────┘

┌───────────────────────┐       ┌───────────────────────────┐
│       Gruppenleiter   │       │        Admin              │
├───────────────────────┤       ├───────────────────────────┤
│ + confirmAttendance() │       │ + createEvent()           │
│ + generateReports()   │       │ + issueCertificate()      │
└───────────────────────┘       └───────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                          Zertifikat                                │
├────────────────────────────────────────────────────────────────────┤
│ + id: number                                                      │
│ + issuedDate: Date                                                │
│ + issuedTo: User                                                  │
│ + relatedSchulung: Schulung                                       │
└────────────────────────────────────────────────────────────────────┘

