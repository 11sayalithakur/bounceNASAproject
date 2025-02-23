# bounceNASAproject
Explore space-related data using NASA's Open APIs.

# NASA Data Explorer 🚀
![NASA Data Explorer Screenshot1](https://github.com/user-attachments/assets/65de2008-ca84-4363-9a30-d54a3a9ec9f6)
![NASA Data Explorer Screenshot2](https://github.com/user-attachments/assets/ba25a8ae-ee4a-4d21-8d40-ebb516a6e503)

**NASA Data Explorer** is a web application that allows users to explore NASA's Astronomy Picture of the Day (APOD) and Mars Rover Photos using NASA's public APIs. The app provides a sleek, modern interface with interactive visualizations and a responsive design.

---

## Features 🌟

- **Astronomy Picture of the Day (APOD):**
  - View the daily image or video from NASA's APOD API.
  - Display metadata such as media type, HD availability, and copyright information.
  - Link to the high-definition version of the image.

- **Mars Rover Photos:**
  - Browse photos taken by NASA's Curiosity rover on Mars.
  - Filter photos by Earth date using a date picker.
  - View photos in a responsive grid layout with hover effects.

- **Modern UI:**
  - Dark theme with space-inspired aesthetics.
  - Clean and professional design.
  - Responsive layout for desktop and mobile devices.

---

## Technologies Used 💻

- **Frontend:**
  - React.js
  - Axios for API requests
  - CSS for styling

- **Backend:**
  - Node.js with Express.js
  - CORS for handling cross-origin requests
  - Axios for fetching data from NASA APIs

- **APIs:**
  - [NASA APOD API](https://api.nasa.gov/)
  - [NASA Mars Rover Photos API](https://api.nasa.gov/)

---

## Setup Instructions 🛠️

### Prerequisites
- Node.js and npm installed on your machine.
- A NASA API key (get it from [NASA API Portal](https://api.nasa.gov/)).

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nasa-data-explorer.git
   cd nasa-data-explorer/backend
