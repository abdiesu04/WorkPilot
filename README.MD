# WorkPilot Documentation

## Introduction
WorkPilot is a job portal application that allows users to create job listings, register, login, and search for jobs. The application is containerized using Docker and built with JavaScript.

## Features
- **Create Job Listings**: Users can create job listings with detailed descriptions.
- **User Registration**: New users can register to create an account.
- **User Login**: Registered users can log in to access their account.
- **Search Jobs**: Users can search for job listings based on various criteria.

## Prerequisites
- Docker installed on your machine.
- Node.js and npm installed.

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/abdiesu04/workpilot.git
    cd workpilot
    ```

2. **Build Docker Image**
    ```bash
    docker build -t workpilot .
    ```

3. **Run Docker Container**
    ```bash
    docker run -p 3000:3000 workpilot
    ```

4. **Access the Application**
    Open your browser and navigate to `http://localhost:3000`.


## Technologies Used
- **Frontend**: JavaScript, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact [abdiesayasbayisa@gmail.com].
