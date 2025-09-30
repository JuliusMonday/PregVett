# PregVett - Maternal Health Platform

A comprehensive maternal health platform designed specifically for Nigerian pregnant women, built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and TailwindCSS v3.

## Features

### Core Features
- **User Authentication & Onboarding**: Multi-step wizard with progress bar
- **Dashboard**: Pregnancy week tracker, nutrition scorecard, appointments widget
- **Smart Nutrition Coach**: 500+ Nigerian foods database with safety ratings
- **Birth Defect Prevention**: Interactive timeline and prevention tips
- **Symptom-to-Action Intelligence**: AI-powered symptom severity assessment
- **Appointment & Reminder System**: Smart reminders for ANC visits and supplements
- **Emergency Support**: One-tap emergency button with facility finder
- **Community Features**: Support groups, recipe sharing, Q&A forum
- **Educational Content**: Weekly guides, video library, cultural practices
- **Health Tracking**: Weight, blood pressure, glucose monitoring

### Additional Features
- **Multi-language Support**: English, Hausa, Yoruba, Igbo, Pidgin
- **Mobile-first Design**: Responsive design with PWA capabilities
- **Doctor Dashboard**: For healthcare providers
- **Admin Dashboard**: Analytics and content management
- **Offline Functionality**: Critical features work offline

## Technology Stack

### Frontend
- **React.js** with functional components and hooks
- **React Router** for navigation
- **TailwindCSS v3** for styling
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for email notifications

### Color Palette
- Primary: #7AC2D5 (Soft Aqua Blue)
- Secondary: #BEE7C4 (Mint Green)
- Accent1: #F4A497 (Warm Coral)
- Accent2: #F5F5F5 (Light Gray/Cream)
- Text: #2C3E50 (Navy Blue)
- Muted: #888888 (Gray)

## Project Structure

```
pregvett/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # Reusable components
│       ├── context/       # React context
│       ├── hooks/         # Custom hooks
│       ├── pages/         # Page components
│       ├── utils/         # Utility functions
│       ├── App.js         # Main app component
│       └── index.js       # Entry point
├── server/                # Express backend
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── uploads/          # File uploads
│   └── index.js          # Server entry point
└── package.json          # Root package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pregvett
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   ```
   Edit the `.env` file with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:2709/pregvett
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   PORT=5000
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud MongoDB service.

5. **Run the application**
   ```bash
   npm run dev
   ```
   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000).

### Separate Development

To run the frontend and backend separately:

**Frontend only:**
```bash
cd client
npm start
```

**Backend only:**
```bash
cd server
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/complete-onboarding` - Complete onboarding

### Pregnancy
- `GET /api/pregnancies` - Get user pregnancies
- `POST /api/pregnancies` - Create new pregnancy
- `GET /api/pregnancies/:id` - Get pregnancy details
- `PUT /api/pregnancies/:id` - Update pregnancy

### Nutrition
- `GET /api/foods` - Get foods database
- `GET /api/foods/:id` - Get food details
- `POST /api/foods/meal-plan` - Create meal plan

### Symptoms
- `GET /api/symptoms` - Get user symptoms
- `POST /api/symptoms` - Log new symptom
- `PUT /api/symptoms/:id` - Update symptom

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment

### Emergency
- `POST /api/emergency/alert` - Send emergency alert
- `GET /api/emergency/facilities` - Get nearby facilities

### Community
- `GET /api/community/posts` - Get community posts
- `POST /api/community/posts` - Create post

### Education
- `GET /api/education/content` - Get educational content
- `GET /api/education/tips` - Get daily tips

### Health
- `GET /api/health/metrics` - Get health metrics
- `POST /api/health/metrics` - Log health metric

## Database Schema

### Users
- Profile information (name, email, phone, role)
- Medical history and obstetric history
- Emergency contacts
- Language preferences
- Onboarding status

### Pregnancies
- LMP and due date
- Current week and risk level
- Milestones and appointments
- Health metrics and symptoms
- Nutrition tracking

### Foods
- Nigerian foods database
- Nutritional content
- Pregnancy safety ratings
- Trimester-specific recommendations

### Symptoms
- Symptom type and severity
- AI assessment and recommendations
- Action taken and resolution status

### Appointments
- Appointment details and scheduling
- Reminders and notifications
- Status tracking

### Health Metrics
- Weight, blood pressure, glucose tracking
- Movement counting
- Mood tracking

## Deployment

### Frontend Deployment
```bash
cd client
npm run build
```
Deploy the `build` folder to your hosting service.

### Backend Deployment
1. Set up production environment variables
2. Deploy to your preferred hosting service (Heroku, AWS, etc.)
3. Ensure MongoDB is properly configured

### Environment Variables for Production
```
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
PORT=5000
EMAIL_HOST=your-email-host
EMAIL_PORT=587
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions:
- Email: support@pregvett.com
- Website: www.pregvett.com

## Acknowledgments

- Designed for Nigerian mothers and healthcare providers
- Built with love for maternal health
- Special thanks to all contributors and supporters