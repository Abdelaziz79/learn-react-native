# Aora - Video Sharing App

Aora is a React Native mobile application built with Expo and Appwrite, designed for sharing and discovering videos.

## 📥 Download & Source Code

- 📱 **APK**: [Download here](https://drive.google.com/file/d/1PCcZAx2LiHRCmvwZYM3bC-EkfST9GpR6/view?usp=sharing)
- 💻 **Source Code**: [GitHub Repository](https://github.com/Abdelaziz79/learn-react-native)

## 🚀 Features

- 🔐 User Authentication (Sign Up / Sign In)
- 📱 Profile Management
- 🎥 Video Upload & Playback
- 🔍 Video Search Functionality
- 📌 Bookmark Favorite Videos
- 🔄 Pull to Refresh
- 🎨 Modern UI with Tailwind CSS
- 🎬 Video Thumbnails Generation
- 📂 Tab-based Navigation

## 🛠 Tech Stack

- [Expo](https://expo.dev/) - React Native development platform
- [React Native](https://reactnative.dev/) - Mobile app framework
- [Appwrite](https://appwrite.io/) - Backend as a Service
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based navigation
- [Expo AV](https://docs.expo.dev/versions/latest/sdk/av/) - Audio/Video playback

## 📖 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- An [Appwrite](https://appwrite.io/) instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdelaziz79/learn-react-native
   cd learn-react-native
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and add your Appwrite credentials:
   ```plaintext
   PACKAGE_NAME=com.your.app
   PROJECT_ID=your_project_id
   DATABASE_ID=your_database_id
   ```

4. **Start the development server:**
   ```bash
   npx expo start
   ```

### Running the App

- **For iOS simulator:** Press `i`
- **For Android emulator:** Press `a`
- **For Web:** Press `w`

## 📂 Project Structure

```
├── app/                 # Main application screens
│   ├── (auth)/         # Authentication screens
│   ├── (tabs)/         # Tab navigation screens
│   └── search/         # Search functionality
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable React components
├── constants/          # Application constants
├── context/            # React Context providers
├── lib/                # Utility functions and API calls
└── app.json            # Expo configuration
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📜 License

This project is licensed under the **MIT License**.

## 🙌 Acknowledgments

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Appwrite Documentation](https://appwrite.io/docs)
- [NativeWind Documentation](https://www.nativewind.dev/docs)

