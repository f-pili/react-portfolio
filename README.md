# Portfolio & Service Management Application

A modern, full-featured portfolio and service management platform built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for showcasing services, managing client requests, and maintaining a professional online presence.

## 🚀 Project Overview

This is a comprehensive portfolio and service management application that serves both as a professional showcase and a business management tool. The platform features a beautiful, responsive design with both client-facing pages and administrative functionality.

### Key Purposes:
- **Portfolio Showcase**: Display services, blog posts, and company information
- **Service Management**: Handle client inquiries and service requests
- **Content Management**: Admin interface for managing services and requests
- **User Management**: Authentication system with role-based access control

## ✨ Features

### 🎨 Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Complete theme switching with persistent preferences
- **Modern UI/UX**: Professional design with smooth animations and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### 🔐 Authentication & Authorization
- **User Registration/Login**: Secure authentication system
- **Role-Based Access**: Admin and client user roles
- **Protected Routes**: Route guards for authenticated and admin-only pages
- **Profile Management**: Users can update their personal information

### 📱 Client-Facing Pages
- **Homepage**: Hero section, featured services, and company stats
- **Services Page**: Filterable service catalog with search functionality
- **Service Details**: Comprehensive service information with contact forms
- **Blog**: Article listing with search, filtering, and pagination
- **Blog Posts**: Full article view with sharing capabilities
- **Contact Page**: Multi-channel contact information and inquiry forms

### 🛠 Administrative Features
- **Admin Dashboard**: Overview of key metrics and recent activities
- **Service Management**: CRUD operations for services with rich forms
- **Request Management**: View and manage client service requests
- **User Management**: Monitor user accounts and activities
- **Content Management**: Blog post management (structure ready)

### 🔧 Technical Features
- **State Management**: Redux Toolkit for predictable state management
- **API Integration**: RESTful API communication with JSON Server
- **Form Handling**: Formik with Yup validation for robust forms
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Elegant loading spinners and skeleton screens
- **Pagination**: Efficient data pagination for large datasets

## 🛠 Technologies Used

### Core Technologies
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development with enhanced IDE support
- **Vite 5.4.2** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **PostCSS 8.4.35** - CSS processing with autoprefixer

### State Management & Data
- **Redux Toolkit 2.0.1** - Modern Redux with simplified patterns
- **React Redux 9.0.4** - React bindings for Redux
- **Axios 1.6.2** - HTTP client for API requests

### Forms & Validation
- **Formik 2.4.5** - Build forms without tears
- **Yup 1.4.0** - Schema validation for forms

### Routing
- **React Router DOM 6.20.1** - Declarative routing for React

### Development Tools
- **ESLint 9.9.1** - Code linting and quality enforcement
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting rules
- **JSON Server 0.17.4** - Mock REST API for development

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-service-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development servers**
   
   **Terminal 1 - Frontend Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   **Terminal 2 - JSON Server (API):**
   ```bash
   npm run server
   # or
   yarn server
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - API Server: `http://localhost:3001`

### Demo Accounts
- **Admin**: `admin@fpili.me` / `admin123`
- **Client**: `client@fpili.me` / `client123`

## 📁 Project Structure

```
react-portfolio/
├── src/                       # Source code
│   ├── components/            # Reusable components
│   │   ├── Admin/             # Admin-specific components
│   │   │   └── RequestDetailsModal.tsx
│   │   ├── Auth/              # Authentication components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── Forms/             # Form components
│   │   │   └── ContactForm.tsx
│   │   ├── Layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── Services/          # Service-related components
│   │   │   └── ServiceCard.tsx
│   │   └── UI/                # Generic UI components
│   │       ├── LoadingSpinner.tsx
│   │       └── Pagination.tsx
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.tsx   # Dark/light theme management
│   ├── hooks/                 # Custom React hooks
│   │   └── useAuth.ts         # Authentication hook
│   ├── images/                # Static images and icons
│   │   ├── hero.webp          # Hero section image
│   │   └── favicon/           # Icons and manifest files
│   │       ├── apple-touch-icon.png
│   │       ├── favicon-96x96.png
│   │       ├── favicon.ico
│   │       ├── favicon.svg
│   │       ├── site.webmanifest
│   │       ├── web-app-manifest-192x192.png
│   │       ├── web-app-manifest-512x512.png
│   ├── pages/                 # Page components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminServiceForm.tsx
│   │   ├── AdminServiceManagement.tsx
│   │   ├── BlogPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ServiceDetailPage.tsx
│   │   └── ServicesPage.tsx
│   ├── store/                 # Redux store configuration
│   │   ├── slices/            # Redux slices
│   │   │   ├── adminSlice.ts
│   │   │   ├── authSlice.ts
│   │   │   ├── blogSlice.ts
│   │   │   └── servicesSlice.ts
│   │   └── index.ts           # Store configuration
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   └── api.ts             # API configuration
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── .gitignore                 # Git ignored files
├── db.json                    # JSON Server mock database
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package-lock.json          # Lock file for package dependencies
├── package.json               # Project metadata, scripts and dependencies
├── postcss.config.js          # PostCSS configuration
├── README.md                  # Project documentation
├── tailwind.config.js         # Tailwind CSS custom settings
├── tsconfig.app.json          # TypeScript config specific to the app
├── tsconfig.json              # Base TypeScript configuration
├── tsconfig.node.json         # TypeScript config for Node files
└── vite.config.ts             # Vite configuration file
```

## 📜 Available Scripts

### Development Scripts
- **`npm run dev`** - Start the Vite development server
- **`npm run server`** - Start the JSON Server for API simulation
- **`npm run build`** - Build the application for production
- **`npm run preview`** - Preview the production build locally

### Code Quality Scripts
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run lint:fix`** - Run ESLint and automatically fix issues

### Recommended Development Workflow
```bash
# Terminal 1: Start the frontend development server
npm run dev

# Terminal 2: Start the JSON Server
npm run server

# Terminal 3: Run linting (optional)
npm run lint
```

## 🌐 API Endpoints

The application uses JSON Server to simulate a REST API with the following endpoints:

### Services
- `GET /services` - Get all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Create new service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user profile

### Blog Posts
- `GET /posts` - Get all blog posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Service Requests
- `GET /requests` - Get all service requests
- `POST /requests` - Create new request
- `PATCH /requests/:id` - Update request status

### Testimonials
- `GET /testimonials` - Get all testimonials

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options

#### 1. Static Hosting (Netlify, Vercel, GitHub Pages)
The application builds to static files and can be deployed to any static hosting service:

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

#### 2. Node.js Hosting
For full functionality including the API, deploy to a Node.js hosting service:

1. Build the application
2. Set up JSON Server or replace with a real database
3. Configure environment variables
4. Deploy to services like Heroku, Railway, or DigitalOcean

#### 3. Docker Deployment
Create a `Dockerfile` for containerized deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173 3001
CMD ["npm", "run", "preview"]
```

### Environment Variables
For production deployment, consider these environment variables:

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_TITLE=Portfolio & Service Management
```

## 🔧 Configuration

### Tailwind CSS
The application uses a custom Tailwind configuration with:
- Dark mode support
- Custom color palette
- Extended animations
- Responsive breakpoints

### TypeScript
Strict TypeScript configuration with:
- Strict type checking
- Path mapping for clean imports
- Modern ES2020 target
- React JSX support

### Vite
Optimized Vite configuration with:
- React plugin
- Fast refresh
- Optimized dependencies
- Production build optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add proper error handling
- Include loading states for async operations
- Ensure responsive design
- Test on both light and dark themes

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**