# Arogya Saathi - Healthcare Management System

A comprehensive healthcare platform for rural Punjab, providing accessible healthcare through a multi-role platform.

## Features

- Multi-role platform (Patients, Staff, Doctors)
- Appointment management system
- Medicine inventory & ordering
- Medical records management
- Telemedicine capabilities
- Multi-language support (English, Punjabi, Hindi)
- Accessibility features

## Technology Stack

- **Frontend:** Next.js 15.5.2 with TypeScript, Tailwind CSS
- **Backend:** Node.js with Express and TypeScript
- **Database:** SQLite (development), PostgreSQL (production)
- **Authentication:** JWT with bcrypt

## Getting Started

1. Clone the repository
2. Run setup script: `.\setup-env.ps1`
3. Start backend: `cd arogya-saathi-backend && npm run dev`
4. Start frontend: `cd arogya-saathi-app && npm run dev`
5. Open http://localhost:3000

## Demo Credentials

- Patient: patient@arogyasaathi.com / password
- Staff: staff@arogyasaathi.com / password  
- Doctor: doctor@arogyasaathi.com / password

## Deployment Scripts

- `.\setup-env.ps1` - Setup development environment
- `.\build.ps1` - Build the application
- `.\deploy-to-github.ps1` - Prepare for GitHub
- `.\deploy-production.ps1` - Deploy to production

## License

This project is licensed under the MIT License.
