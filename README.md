# Inventory Management System (React Native)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the Inventory Management System project! This React Native application is designed to help businesses manage their inventory efficiently. This initial phase of the project will focus on offline functionality using SQLite for local data storage.

## Features

- **Authentication System:**
  - User registration with name, email, phone, and password.
  - Login functionality with secure session management.

- **Dashboard:**
  - Visual representation of key statistics using charts.
  - Display of the number of categories, products, low-inventory products, and registered users.

- **Category Management:**
  - Create, edit, and delete categories with titles, descriptions, and images.

- **Product Management:**
  - Create, edit, and delete products with details such as title, description, SKU, category, quantity, weight, and dimensions.
  - Image management with a primary image and a group of additional images.

- **Image Management:**
  - Option to choose images from the gallery or capture new images.
  - Integration of a cropper for square aspect ratio.

- **Action History:**
  - Maintain a detailed history of user actions in the application.

- **Additional Features:**
  - User profile management.
  - Search functionality and filters for easy data navigation.
  - Responsive design for various devices.

## Requirements

Ensure you have the following installed:

- Node.js
- npm or yarn
- React Native CLI
- [Additional dependencies based on your project needs]

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/inventory-management-system.git
   cd inventory-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Connect to the local SQLite database for offline data access.

## Usage

Describe how to use your application in the offline mode. Include steps for authentication, navigating through features, and any specific usage guidelines.

## Project Structure

Explain the structure of your project, highlighting key directories and files.

```plaintext
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── utils/
│   ├── data/
│   │   └── sqlite/
│   │       └── ... (SQLite database files)
│   ├── App.js
│   └── ...
├── assets/
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Technologies Used

- React Native
- SQLite (Local Database)
- [Additional technologies based on your project needs]

## Contributing

Contributions are welcome! Fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
