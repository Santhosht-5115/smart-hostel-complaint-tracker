\# 🏨 Smart Hostel / Campus Complaint \& Resolution Tracker



A full-stack web application designed to streamline hostel and campus complaint management using automated complaint assignment, priority scoring, escalation, and status tracking.



\## 📌 Project Overview



The Smart Hostel Complaint \& Resolution Tracker provides a centralized platform for students to report hostel and campus issues such as water supply, electricity, Wi-Fi, plumbing, and cleaning.



The system helps administrators manage complaints efficiently through automated staff assignment, priority calculation, complaint tracking, and escalation of unresolved issues.



\## ✨ Features



\- 🔐 User registration and authentication

\- 👨‍🎓 Student complaint submission

\- 📋 Complaint status tracking

\- ⚡ Automated priority scoring

\- 👨‍🔧 Category-based staff assignment

\- ⚖️ Staff assignment based on workload

\- ⏰ Automatic complaint escalation

\- 📊 Admin dashboard with statistics

\- 👥 Staff account management

\- 🔎 Complaint search and filtering

\- 🔒 Role-based access control



\## 👥 User Roles



\### Student

\- Register and log in

\- Submit new complaints

\- View submitted complaints

\- Track complaint status and priority



\### Admin

\- View complaint statistics

\- Monitor all complaints

\- Manage staff accounts

\- View escalated complaints

\- Monitor complaint statuses



\### Staff

\- Receive complaints assigned according to category and workload



\## 🛠️ Tech Stack



| Technology | Purpose |

|---|---|

| Java 21 | Backend programming |

| Spring Boot | Backend framework |

| Spring Security | Authentication and authorization |

| Spring Data JPA | Database operations |

| Hibernate | ORM |

| MySQL 8 | Database |

| React.js | Frontend |

| Vite | Frontend development and build |

| JavaScript | Frontend programming |

| Bootstrap | UI styling |

| Axios | API communication |

| Maven | Backend build management |

| Postman | API testing |

| Git \& GitHub | Version control |



\## ⚙️ Core Functionalities



\### Automated Complaint Assignment

Complaints are assigned to staff members based on complaint category and workload, helping distribute work efficiently.



\### Priority Scoring

The system calculates complaint priority automatically to help identify complaints requiring attention.



\### Complaint Escalation

Unresolved complaints are automatically escalated based on predefined severity-related time thresholds.



\### Complaint Status Tracking



Complaints are managed through the following statuses:



\- `RAISED`

\- `IN\_PROGRESS`

\- `RESOLVED`



\### Admin Dashboard

Provides an overview of complaints, resolution statistics, and escalated complaints.



\## 🏗️ System Architecture



```text

React Frontend

&nbsp;     |

&nbsp;     | REST API (Axios)

&nbsp;     |

Spring Boot Backend

&nbsp;     |

&nbsp;     | Spring Security

&nbsp;     | Spring Data JPA

&nbsp;     | Hibernate

&nbsp;     |

MySQL Database

```



\## 📂 Project Structure



```text

smart-hostel-complaint-tracker/

│

├── campus-complaint-frontend/     # React + Vite frontend

│

├── campus-complaint-tracker/      # Spring Boot backend

│   ├── src/

│   ├── pom.xml

│   └── ...

│

├── screenshots/                   # Application screenshots

├── .gitignore

└── README.md

```



\## 🚀 Setup and Installation



\### Prerequisites



\- Java JDK 21

\- MySQL 8

\- Node.js and npm

\- Maven

\- Git



\### 1. Clone the Repository



```bash

git clone https://github.com/Santhosht-5115/smart-hostel-complaint-tracker.git

```



\### 2. Backend Setup



Configure your MySQL database and update the backend database configuration.



Run the Spring Boot application using your IDE or Maven.



\### 3. Frontend Setup



Navigate to the frontend folder:



```bash

cd campus-complaint-frontend

```



Install dependencies:



```bash

npm install

```



Start the development server:



```bash

npm run dev

```



\### 4. Access the Application



Open the local URL provided by Vite in your browser.



\## 📸 Screenshots



Screenshots of the application will be added here.



\## ☁️ Deployment



The application is being prepared for cloud deployment, including:



\- Frontend deployment

\- Spring Boot backend deployment

\- Cloud MySQL database configuration



Deployment details and live application links will be added after deployment is completed.



\## 🔮 Future Enhancements



\- Email notifications for complaint updates

\- Complaint image attachments

\- Real-time complaint updates

\- Advanced analytics and reports

\- Enhanced mobile responsiveness



\## 👨‍💻 Developer



\*\*Santhosh T.\*\*



B.Tech – Computer Science and Engineering



---



⭐ If you find this project interesting, feel free to explore the repository!



