# Quizo

## Overview
Quizo is a live polling system designed for educational environments, allowing teachers to create polls and questions while students can participate in real-time. The application facilitates interactive learning by enabling students to submit answers and view results instantly. It also includes a chat feature for communication between students and teachers.

## Functionalities
- **User Roles**: Supports two user roles - Students and Teachers.
- **Real-time Polling**: Teachers can create polls and questions, and students can submit their answers in real-time.
- **Poll Results**: Students can view the results of polls after submission.
- **Chat Feature**: A chat interface for communication between students and teachers.
- **Poll History**: Teachers can view the history of previous polls conducted.
- **Kickout participant**: Teachers can kick any participant from the quiz.

## Tech Stack
- **Frontend**: 
  - React.js
  - Socket.io (for real-time communication)
  - Tailwind CSS (for styling)
- **Backend**: 
  - Node.js
  - Express.js
  - Socket.io (for real-time communication)

## Screenshots
![Home Page](Client/public/images/home.png)
![Student Page](Client/public/images/student.png)
![Teacher Page](Client/public/images/teacher1.png)
![Student Page with question](Client/public/images/student2.png)
![Student Page waiting for new question](Client/public/images/waiting.png)
![Chat Interface](Client/public/images/chat.png)
![Chat Interface - participants](Client/public/images/participants.png)
![Student Kick Interface](Client/public/images/kicked.png)
![Poll Results](Client/public/images/pollhist.png)
![Poll Results students view](Client/public/images/student3.png)

## How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/codeforme1234/quizo.git
   cd quizo
   ```

2. **Install Dependencies**:
   Navigate to both the client and server directories and install the required packages.

   For the client:
   ```bash
   cd Client
   npm install
   ```

   For the server (if applicable):
   ```bash
   cd Server
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the server directory and add your environment variables (e.g., database connection string, port).

4. **Run the Application**:
   Start the server and client applications.

   For the server:
   ```bash
   cd Server
   npm start
   ```

   For the client:
   ```bash
   cd Client
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173` to access the application.