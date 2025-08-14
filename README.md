# Student Data Manager

A React-based Student Management System built with **Material-UI (MUI)** for managing student records efficiently.  
This app allows you to **add, edit, delete, search, filter, and sort** student data with ease.

---

## 🚀 Features

- **Add Students** – Input roll number, name, department, year, and CGPA.
- **Edit Students** – Update existing student records.
- **Delete Students** – Remove records instantly.
- **Search** – Search by roll number or name (case-insensitive & fuzzy matching).
- **Filter** – Filter by department and year.
- **Sort** – Sort by name (A–Z/Z–A) or CGPA (High–Low/Low–High).
- **Validation** – Prevent duplicate roll numbers and enforce valid CGPA range.
- **Responsive Layout** – Works seamlessly across devices.
- **Unit Tests** – Built-in test runner for helper functions.

## 🛠 Tech Stack

- **Frontend**: React.js
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Styling**: CSS & MUI `sx` styling
- **Utilities**: Custom helper functions for normalization and fuzzy matching

 student-management-app/
│
├── src/
│ ├── components/
│ │ ├── Form.jsx
│ │ ├── StudentTable.jsx
│ │ ├── SearchAndSort.jsx
│ │ ├── TestRunner.jsx
│ │
│ ├── utils/
│ │ ├── helpers.js
│ │
│ ├── App.js
│ ├── App.css
│ └── index.js
│
├── package.json
└── README.md

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/student-management-app.git
   cd student-management-app

2. **Install dependencies**
  ```
  npm install
  ```
3. **Start the development server**
  ```
  npm start
  ```
