# Arogya Saathi API Documentation

## Authentication Endpoints
- POST \/api/auth/login\ - User login
- POST \/api/auth/logout\ - User logout
- GET \/api/auth/verify\ - Verify token

## Patient Endpoints
- GET \/api/patients\ - Get all patients (staff/doctor only)
- GET \/api/patients/:id\ - Get patient by ID
- POST \/api/patients\ - Create new patient
- PUT \/api/patients/:id\ - Update patient

## Appointment Endpoints
- GET \/api/appointments\ - Get appointments with filtering
- POST \/api/appointments\ - Create new appointment
- PATCH \/api/appointments/:id\ - Update appointment status
- GET \/api/appointments/availability\ - Get available time slots

## Medicine Endpoints
- GET \/api/medicines\ - Get medicines with filtering
- POST \/api/medicines/order\ - Create medicine order
- GET \/api/medicines/inventory\ - Get inventory (staff only)
- PATCH \/api/medicines/inventory/:id\ - Update inventory (staff only)

## Medical Records Endpoints
- GET \/api/records/:patientId\ - Get patient medical records
- POST \/api/records\ - Create medical record (doctor only)

## Health Check
- GET \/health\ - Server health check
