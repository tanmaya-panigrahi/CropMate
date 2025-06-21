# CropMate: AI-Powered Farming Assistant

CropMate is a comprehensive smart farming application that helps farmers identify crop diseases through image analysis, provides personalized agricultural advice, and offers a knowledge base of crops and their care requirements.



## 🌱 Features

- **Image-Based Disease Diagnosis**: Upload photos of crops to get instant disease identification
- **AI-Powered Explanations**: Detailed disease information, causes, and treatment recommendations
- **Intelligent Chatbot**: Ask farming questions and get real-time answers
- **Crop Database**: Comprehensive information on various crops, care instructions, and tips
- **Historical Analysis**: Track previous diagnoses to monitor crop health over time
- **User-Friendly Dashboard**: Easy-to-navigate interface with key statistics and insights

## 🔧 Technologies Used

### Frontend
- **React 18** with **Vite** for a fast, modern SPA
- **Tailwind CSS** for responsive styling
- **shadcn/ui** for consistent UI components
- **Firebase Authentication** for secure user management
- **Axios** for API communication
- **React Router** for navigation
- **React Hook Form** with **Zod** for form validation
- **date-fns** for date formatting

### Backend
- **Node.js** with **Express** for the REST API
- **MongoDB** with **Mongoose** for data storage
- **Firebase Admin SDK** for authentication
- **Cloudinary** for image storage and management
- **CORS** for secure cross-origin requests
- **dotenv** for environment variable management

### AI/ML Components
- **Hugging Face Inference API** for image classification
  - Model: `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification`
- **Google's Gemini API** (2.0 Flash) for:
  - Disease explanation generation
  - Conversational farming assistant

## 🏗️ Architecture Overview

CropMate follows a client-server architecture:

1. **Frontend (Vercel)**: React SPA handling UI and user interactions
2. **Backend (Render)**: Express API providing business logic and data access
3. **Database (MongoDB Atlas)**: Persistent storage for user data and diagnoses
4. **External Services**:
   - Cloudinary for image storage
   - Hugging Face for ML inference
   - Gemini API for natural language processing

## 📁 Project Structure

```
/CropMate
├── frontend/                # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layouts/         # Page layout components
│   │   ├── lib/             # Utility functions and configurations
│   │   ├── pages/           # Application pages
│   │   │   ├── dashboard/   # Dashboard views
│   │   │   └── ...
│   │   ├── state/           # State management
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── .env                 # Environment variables
│   └── vercel.json          # Vercel deployment configuration
│
└── backend/                 # Express server
    ├── src/
    │   ├── config/          # Configuration files
    │   ├── controllers/     # Request handlers
    │   ├── middlewares/     # Express middlewares
    │   ├── ml/              # Machine learning utilities
    │   ├── models/          # Mongoose data models
    │   ├── routes/          # API route definitions
    │   ├── scripts/         # Utility scripts
    │   ├── services/        # Business logic
    │   ├── utils/           # Helper functions
    │   ├── app.js           # Express app configuration
    │   └── server.js        # Server entry point
    └── .env                 # Environment variables
```

## 🤖 Machine Learning Model

CropMate uses the `linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification` model from Hugging Face for plant disease classification. This model:

- Is based on the MobileNetV2 architecture
- Is trained on plant disease datasets
- Can identify numerous crop diseases from leaf images
- Provides confidence scores for each prediction

The disease explanations are enhanced using Google's Gemini 2.0 Flash model, which provides detailed information about:
- Disease causes
- Treatment recommendations
- Recovery timelines
- Prevention strategies

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Cloudinary account
- Firebase project
- Hugging Face API token
- Gemini API key

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/cropmate.git
cd cropmate/frontend

# Install dependencies
npm install

# Create .env file with required variables (see below)

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Install dependencies
npm install

# Create .env file with required variables (see below)

# Start development server
npm run dev
```

## 🔑 Environment Variables

### Frontend (.env)
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=your_backend_url
```

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
HF_TOKEN=your_huggingface_token
CLIENT_ORIGIN=your_frontend_url
FIREBASE_PROJECT_ID=your_firebase_project_id
# Other Firebase configuration variables
```

## 🌐 Deployment

CropMate is deployed using:
- Frontend: [Vercel](https://vercel.com)
- Backend: [Render](https://render.com)

For Vercel deployment, the vercel.json file in the frontend directory handles route configurations to support client-side routing.

## 🔄 API Endpoints

- `GET /api/dashboard/summary` - Get user statistics
- `GET /api/dashboard/recent` - Get recent diagnoses
- `POST /api/diagnose` - Submit crop image for diagnosis
- `GET /api/history` - Get user's diagnosis history
- `GET /api/crops` - Get crop information
- `POST /api/chatbot` - Submit question to chatbot

## 🌟 Real-World Applications

CropMate can be valuable for:

1. **Small-Scale Farmers**: Quick access to expert-level plant disease diagnosis without requiring agricultural expertise
2. **Agricultural Extension Workers**: Tool to help farmers in remote areas identify crop issues
3. **Educational Institutions**: Teaching aid for agricultural students
4. **Home Gardeners**: Managing plant health in home gardens and small plots
5. **Agricultural Researchers**: Collecting data on disease prevalence and patterns

## 🔮 Future Improvements

- Offline functionality for areas with limited connectivity
- Multi-language support for global accessibility
- Integration with weather data for contextual recommendations
- Community features to connect farmers facing similar challenges
- Mobile application with native camera integration

## 👨‍💻 Contributors

- Tanmaya Panigrahi - Developer

## 📜 License

MIT License

---

*CropMate: Empowering farmers with AI-driven insights for healthier crops and sustainable yields.*