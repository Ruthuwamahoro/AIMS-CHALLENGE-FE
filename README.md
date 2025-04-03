# User Management Dashboard

A React-based user management system with role-based access control, built for AIMS

![Dashboard Preview](./preview.png)

## 🚀 Features

- 🔐 User Authentication (Login/Register/Logout)
- 👥 Role-Based Access Control
  - Admin: Full user management capabilities
  - User: Profile view and management
- 📱 Responsive Design with Tailwind CSS
- ⚡ Fast development with Vite
- 🔄 Real-time feedback and error handling
- 🐳 Containerized with Docker
- 🔄 Automated CI/CD with GitHub Actions

## 🛠️ Tech Stack

- React.js with Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios for API calls
- Docker
- GitHub Actions
- Vercel for deployment

## 🏃‍♂️ Running Locally

1. Clone the repository:

```bash
git clone https://github.com/Ruthuwamahoro/AIMS-CHALLENGE-FE.git
cd AIMS-CHALLENGE-FE
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 🐋 Docker Support

Build the image:

```bash
docker build -t ruth02/aims-challenge .
```

Run the container:

```bash
docker run -p 80:80 ruth02/aims-challenge
```

## 🚀 Deployment

The application is automatically deployed using:

- GitHub Actions for Docker image builds
- Vercel for web hosting

### Live Demo

- Application: [https://aims-challenge.vercel.app](https://aims-challenge.vercel.app)
- Docker Image: [https://hub.docker.com/r/ruth02/aims-challenge](https://hub.docker.com/r/ruth02/aims-challenge)

## 📁 Project Structure

```
Challenge-AIMS/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   └── UserTable.tsx
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── LoadingSpinner.tsx
│   │       └── showToast.tsx
|   |       ├── ErrorMessage.tsx
│   │       └── Input.tsx
|   |       ├── Button.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── AdminPage.tsx
|   |   └── ProgilePage.tsx
│   ├── services/
│   │   └── user.ts
│   └── types/
│       └── auth.ts

|
├── .github/             # GitHub Actions workflows
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── Dockerfile          # Docker build configuration
└── README.md           # Project documentation
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_URL=https://aims-challenge-be.onrender.com 

# For local development
VITE_API_URL=http://localhost:8000/api 
```

Make sure to add the appropriate API URL before running the application.

> Note: When deploying to Vercel, add the `VITE_API_URL` environment variable in Vercel project settings.

## 📝 Conclusion

This project successfully implements:

### Core Requirements ✅

- Modern React application with Vite and TypeScript
- Complete authentication system with role-based access
- Responsive UI with Tailwind CSS
- Docker containerization
- CI/CD with GitHub Actions

### Key Achievements 🏆

- Secure role-based authorization
- Optimized Docker build process
- Automated deployments
- Clean, maintainable code structure
- Type-safe implementation

### Live Deployments 🌐

- Web App: [aims-challenge.vercel.app](https://aims-challenge.vercel.app)
- Docker Image: [ruth02/aims-challenge](https://hub.docker.com/r/ruth02/aims-challenge)

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Ruthuwamahoro">
        <img src="https://github.com/Ruthuwamahoro.png" width="100px;" alt="Ruth Uwamahoro"/>
        <br />
        <sub><b>Ruth Uwamahoro</b></sub>
      </a>
      <br />
      <sub>Full Stack Developer</sub>
    </td>
  </tr>
</table>

### Connect with me:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ruth-uwamahoro)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ruthuwamahoro)
