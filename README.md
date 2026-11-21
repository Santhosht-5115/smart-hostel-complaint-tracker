\# ResolveX – Smart Hostel Complaint \& Resolution Tracker



A web-based complaint management system that helps students report hostel and campus issues, enables staff to manage complaints, and allows administrators to monitor complaint resolution.



🌐 \*\*Live Application:\*\* https://smart-hostel-complaint-tracker.vercel.app/



💻 \*\*GitHub Repository:\*\* https://github.com/Santhosht-5115/smart-hostel-complaint-tracker



🚀 \*\*Backend API:\*\* https://campus-complaint-tracker-api-ckts.onrender.com



---



\## 📌 Project Overview



ResolveX is a full-stack web application developed to simplify hostel and campus complaint management.



Students can submit complaints and track their progress. Staff members can view assigned complaints and update their status. Administrators can monitor complaints, manage staff accounts, and track escalated issues through a centralized dashboard.



The application provides a structured complaint resolution process with automatic priority calculation, category-based staff assignment, and severity-based escalation.



\## 🎯 Key Features



\- \*\*User Authentication:\*\* Secure login and registration with role-based access.

\- \*\*Complaint Management:\*\* Students can submit complaints and monitor their status.

\- \*\*Automatic Priority Calculation:\*\* Complaints receive priority scores based on the application's priority logic.

\- \*\*Staff Assignment:\*\* Complaints are assigned to staff based on category and workload.

\- \*\*Complaint Status Tracking:\*\* Track complaints through RAISED, IN\_PROGRESS, and RESOLVED.

\- \*\*Automatic Escalation:\*\* Unresolved complaints are escalated based on their severity and configured time limits.

\- \*\*Student Dashboard:\*\* View submitted complaints and their current status.

\- \*\*Staff Dashboard:\*\* View assigned complaints and update their status.

\- \*\*Admin Dashboard:\*\* Monitor complaint statistics and overall complaint activity.

\- \*\*Staff Account Management:\*\* Administrators can manage staff accounts.

\- \*\*Escalated Complaints:\*\* View complaints that have crossed their escalation thresholds.



\## 👥 User Roles



\### 🎓 Student

\- Register and log in.

\- Submit hostel and campus complaints.

\- View submitted complaints.

\- Track complaint status.



\### 🛠️ Staff

\- Log in to the staff dashboard.

\- View assigned complaints.

\- Update complaint status.

\- Manage assigned complaint resolution.



\### 👨‍💼 Administrator

\- Monitor overall complaint statistics.

\- View complaint activities.

\- Manage staff accounts.

\- Monitor escalated complaints.



\## ⚙️ How It Works



1\. A student registers and logs in.

2\. The student submits a complaint by selecting its category and severity.

3\. The system calculates the complaint priority.

4\. The complaint is assigned to an appropriate staff member.

5\. Staff members update the complaint status.

6\. Students can track the latest status.

7\. Unresolved complaints are automatically escalated according to their severity and configured thresholds.

8\. Administrators monitor the complete complaint management process.



\## ⏰ Automatic Complaint Escalation



ResolveX automatically escalates unresolved complaints according to their severity.



| Severity | Escalation Threshold |

|---|---:|

| CRITICAL | 1 Day |

| HIGH | 2 Days |

| MEDIUM | 3 Days |

| LOW | 5 Days |



This helps ensure that higher-severity complaints receive attention sooner.



\## 📸 Application Screenshots



\### 🔐 Login Page

!\[Login Page](screenshots/login.png)



\### 🎓 Student Dashboard – My Complaints

!\[Student Dashboard](screenshots/student-dashboard.png)



\### 📝 Submit Complaint

!\[Submit Complaint](screenshots/submit-complaint.png)



\### 🛠️ Staff Dashboard

!\[Staff Dashboard](screenshots/staff-dashboard.png)



\### 📊 Admin Dashboard

!\[Admin Dashboard](screenshots/admin-dashboard.png)



\### 👥 Staff Account Management

!\[Staff Account Management](screenshots/staff-management.png)



\### ⏰ Escalated Complaints

!\[Escalated Complaints](screenshots/escalated-complaints.png)



\## 🛠️ Technology Stack



\### Backend

\- Java 21

\- Spring Boot

\- Spring Security

\- Spring Data JPA

\- Hibernate

\- Maven

\- REST APIs



\### Frontend

\- React.js

\- JavaScript

\- Vite

\- Bootstrap

\- Bootstrap Icons

\- Axios

\- HTML5

\- CSS3



\### Database

\- MySQL

\- TiDB Cloud (Production Database)



\### Tools \& Deployment

\- Eclipse IDE

\- Visual Studio Code

\- MySQL Workbench

\- Postman

\- Git

\- GitHub

\- Render – Backend Deployment

\- Vercel – Frontend Deployment



\## 🏗️ Application Architecture





&nbsp;             STUDENT / STAFF / ADMIN

&nbsp;                        |

&nbsp;                        v

&nbsp;               REACT FRONTEND

&nbsp;                   (Vercel)

&nbsp;                        |

&nbsp;                        v

&nbsp;                 AXIOS / REST API

&nbsp;                        |

&nbsp;                        v

&nbsp;               SPRING BOOT BACKEND

&nbsp;                   (Render)

&nbsp;                        |

&nbsp;            +-----------+-----------+

&nbsp;            |           |           |

&nbsp;            v           v           v

&nbsp;         SECURITY    SERVICES    SCHEDULER

&nbsp;            |           |           |

&nbsp;            +-----------+-----------+

&nbsp;                        |

&nbsp;                        v

&nbsp;                  SPRING DATA JPA

&nbsp;                        |

&nbsp;                        v

&nbsp;                   TIDB CLOUD

&nbsp;                 (MySQL Compatible)



\## 📂 Project Structure




smart-hostel-complaint-tracker/

│

├── campus-complaint-frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── api/

│   │   ├── App.jsx

│   │   └── main.jsx

│   ├── package.json

│   └── vite.config.js

│

├── campus-complaint-tracker/

│   ├── src/

│   │   └── main/

│   │       ├── java/

│   │       │   └── com/campuscomplaint/tracker/

│   │       │       ├── config/

│   │       │       ├── controller/

│   │       │       ├── dto/

│   │       │       ├── entity/

│   │       │       ├── repository/

│   │       │       ├── scheduler/

│   │       │       └── service/

│   │       └── resources/

│   └── pom.xml

│

├── screenshots/

│   ├── login.png

│   ├── student-dashboard.png

│   ├── submit-complaint.png

│   ├── staff-dashboard.png

│   ├── admin-dashboard.png

│   ├── staff-management.png

│   └── escalated-complaints.png

│

├── README.md

└── .gitignore





\## 🔌 API Overview



The backend provides REST APIs for authentication, complaint management, staff operations, and administration.



| Method | Endpoint | Purpose |

|---|---|---|

| POST | `/api/auth/register` | Register a student |

| POST | `/api/auth/login` | Authenticate a user |

| POST | `/api/auth/logout` | Log out |

| GET | `/api/complaints/my` | Retrieve the logged-in student's complaints |

| Other complaint APIs | `/api/complaints/\*\*` | Complaint-related operations |



\## 🚀 Local Setup



\### Prerequisites



Install the following:



\- Java 21

\- Node.js and npm

\- MySQL

\- Maven

\- Git



\### 1. Clone the Repository



git clone https://github.com/Santhosht-5115/smart-hostel-complaint-tracker.git



cd smart-hostel-complaint-tracker



\### 2. Configure the Backend



Open the backend folder:



cd campus-complaint-tracker





Configure the required database connection and application environment variables.



\### 3. Run the Backend



mvn spring-boot:run



Backend runs locally at:



`http://localhost:8080`



\### 4. Run the Frontend



Open another terminal:



cd campus-complaint-frontend



Install dependencies:



npm install



Configure the frontend API base URL:



VITE\_API\_BASE\_URL=http://localhost:8080



Start the development server:



npm run dev



Frontend runs locally at:



`http://localhost:5173`



\## ☁️ Deployment



ResolveX is deployed using the following services:



| Component | Platform |

|---|---|

| Frontend | Vercel |

| Backend | Render |

| Production Database | TiDB Cloud |

| Source Code | GitHub |



\*\*Live Application:\*\* https://smart-hostel-complaint-tracker.vercel.app/



\## ✅ Tested Functionalities



\- Student registration and login.

\- Existing complaint retrieval.

\- New complaint submission.

\- Automatic staff assignment.

\- Staff complaint status updates.

\- Student-side status tracking.

\- Admin dashboard complaint monitoring.

\- Staff account management.

\- Automatic complaint escalation.

\- Escalated complaints monitoring.



\## 🔮 Future Enhancements



\- Email notifications for complaint updates.

\- Real-time complaint status notifications.

\- Complaint analytics and reporting.

\- Mobile application support.



\## 👨‍💻 Developer



\*\*Santhosh T\*\*



B.Tech – Computer Science and Engineering



GitHub: https://github.com/Santhosht-5115



Project Repository: https://github.com/Santhosht-5115/smart-hostel-complaint-tracker



---



⭐ If you find this project interesting, consider giving the repository a star!

