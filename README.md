# grocery-case-counts

Web app for overnight grocery managers to log and view shift case counts for stockers. Built using:

- React + Tailwind (frontend)
- Spring Boot (backend)
- AWS Amplify & Cognito (hosting & auth)
- DynamoDB or RDS (data storage)

## Features
- Editable shift table for aisles 6–31
- Save progress during shift
- Submit and lock completed shifts
- View historical case data

## Dev Setup
- `/frontend`: React + Tailwind UI
- `/backend`: Spring Boot API

## ROADMAP
🔧 Phase 1: Planning & Setup
✅ Goals:
Get your idea on paper

Set up the initial codebase and AWS services

Tasks:
Define MVP features

Login/signup

View/edit shift table

Submit finalized shift

View past shifts

Draw wireframes

Dashboard layout

Shift entry table

History view

Create GitHub repo

Initialize frontend and backend folders

Setup .gitignore, README, etc.

Set up AWS Amplify

Create Amplify project

Enable hosting

Add Cognito Auth (amplify auth add)

Deploy initial React app (amplify push)

🖥️ Phase 2: Frontend Development (React + Tailwind)
✅ Goals:
Build the UI/UX

Hook up forms and state

Tasks:
Login / Signup page

Use AWS Amplify Auth or custom Cognito flow

Dashboard page

Buttons for "Current Shift", "View History"

Current Shift Table UI

Static table with aisles, input fields

State for employee, case count, time in/out, lunch toggle

Live shift state

Store shift data in local state or temp backend

Add "Submit Shift" button (calls API)

Past Shifts Page

Display list of submitted shifts

View shift details in read-only mode

🧠 Phase 3: Backend Development (Spring Boot)
✅ Goals:
Build REST API

Handle shift data (create, update, fetch)

Tasks:
Set up Spring Boot project

REST controller, service, models

Connect to either DynamoDB (via AWS SDK) or RDS (via JPA)

Implement endpoints

POST /shift/current

PUT /shift/current

POST /shift/submit

GET /shifts/history

GET /shift/:id

Add basic validation and error handling

Check for required fields

Return useful messages

Configure CORS

Allow requests from frontend URL (Amplify or localhost)

Deploy backend

Use AWS Elastic Beanstalk or EC2 instance

Store API base URL to use in frontend

🧪 Phase 4: API Integration & Testing
✅ Goals:
Connect frontend to backend

Make sure everything works together

Tasks:
Integrate APIs into React

Use fetch or Axios to connect

On submit → call backend API

On load → fetch saved/current data

Use Postman to test endpoints

Test JWT auth headers (Cognito)

Validate data flow: save, update, retrieve

Add feedback & error UI

Toasts, modals, etc.

☁️ Phase 5: Deployment & Polish
✅ Goals:
Deploy full stack

Make it polished and user-friendly

Tasks:
Deploy frontend to Amplify

Connect GitHub for CI/CD

Add environment variables (e.g., API base URL)

Deploy backend to EC2 or Elastic Beanstalk

Test public API with Postman

Test everything live

Full login → shift entry → submit → view history

Final polish

Mobile responsive styles (Tailwind)

Loading indicators, validation messages

README + demo instructions for GitHub