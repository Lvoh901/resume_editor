# Resume Builder

This is a web application that allows users to create, customize, and download professional resumes. It provides multiple templates, color customization, and a user-friendly interface to input resume data. The final resume can be downloaded as a PDF.

## Technologies Used

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **PDF Generation:** html2canvas, jsPDF

## Functionality

- Create and edit resume sections: Personal Information, Profile, Experience, Education, Skills, Certifications, Projects.
- Choose from multiple resume templates (Default, Modern, Classic).
- Customize the accent color of the resume.
- Upload a personal photo.
- Add and remove entries for experience, education, certifications, and projects.
- A list of action verbs is provided to help with resume writing.
- Download the final resume as a PDF.

## Setup and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/resume-builder.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open your browser and navigate to `http://localhost:5173` to use the application.

## Potential Areas for Improvement

- **More Templates:** Add a wider variety of resume templates.
- **Drag-and-Drop Reordering:** Allow users to reorder sections and items within sections (e.g., experience, education) using drag-and-drop.
- **AI-Powered Suggestions:** Integrate a language model to provide suggestions for improving resume content (e.g., rephrasing bullet points, suggesting skills).
- **User Accounts and Storage:** Implement user authentication to allow users to save their resumes and access them from different devices.
- **Export to Other Formats:** Add options to export the resume to other formats like DOCX or TXT.
- **Accessibility Improvements:** Ensure the application is fully accessible to users with disabilities.
- **Testing:** Implement a testing suite with unit and integration tests to improve code quality and prevent regressions.
