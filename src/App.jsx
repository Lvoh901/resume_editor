import './app.css';
import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Accordion from "./Accordion";

// Action verbs for resume writing
const actionVerbs = [
  'Orchestrated', 'Engineered', 'Spearheaded', 'Developed', 'Managed', 'Led', 'Implemented', 'Architected', 'Optimized', 'Revamped'
];

// --- Resume Template Components ---

// Default Template
function DefaultTemplate({ resume, accentColor }) {
  return (
    <div className="p-10 bg-white shadow-md h-full">
      <header className="text-center mb-8">
        {resume.photo && <img src={resume.photo} alt="Resume" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />}
        <h1 className="text-4xl font-bold text-gray-800">{resume.name}</h1>
        <p className="text-gray-600">{resume.email} | {resume.phone}</p>
      </header>

      <section className="mb-6">
        <h2 style={{ borderColor: accentColor }} className="text-2xl font-bold border-b-2 pb-2 mb-4">Profile</h2>
        <p className="text-gray-700 italic">{resume.profile}</p>
      </section>

      <section className="mb-6">
        <h2 style={{ borderColor: accentColor }} className="text-2xl font-bold border-b-2 pb-2 mb-4">Experience</h2>
        {resume.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{exp.role} at {exp.company}</h3>
            <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 style={{ borderColor: accentColor }} className="text-2xl font-bold border-b-2 pb-2 mb-4">Projects</h2>
        {resume.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{project.title} - {project.role} ({project.year})</h3>
            <h4 className="font-semibold mt-2">Features:</h4>
            <ul className="list-disc list-inside text-gray-700">{project.features.map(f => <li key={f}>{f}</li>)}</ul>
            <h4 className="font-semibold mt-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2 my-2">
              {project.technologies.map(t => <span key={t} style={{ backgroundColor: accentColor }} className="text-white py-1 px-3 rounded-md text-sm">{t}</span>)}
            </div>
            <h4 className="font-semibold mt-2">Achievements:</h4>
            <p className="text-gray-700">{project.achievements}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 style={{ borderColor: accentColor }} className="text-2xl font-bold border-b-2 pb-2 mb-4">Education</h2>
        {resume.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{edu.degree} at {edu.school}</h3>
            <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 style={{ borderColor: accentColor }} className="text-2xl font-bold border-b-2 pb-2 mb-4">Certifications</h2>
        {resume.certifications.map((cert, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{cert.name}</h3>
            <p className="text-gray-600">{cert.issuer} - {cert.date}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ borderColor: accentColor }} className="text-2xl font-bold border-b-2 pb-2 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
            <span key={index} style={{ backgroundColor: accentColor }} className="text-white py-1 px-3 rounded-md text-sm">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

// Modern Template
function ModernTemplate({ resume, accentColor }) {
  return (
    <div className="p-0 bg-white shadow-md h-full flex">
      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-800 text-white p-8 flex flex-col items-center rounded-l-lg">
        {resume.photo && <img src={resume.photo} alt="Resume" className="w-28 h-28 rounded-full mb-6 object-cover border-4 border-white" />}
        <h1 className="text-3xl font-bold mb-2">{resume.name}</h1>
        <p className="text-gray-300 mb-2">{resume.email}</p>
        <p className="text-gray-300 mb-6">{resume.phone}</p>

        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} style={{ backgroundColor: accentColor }} className="text-white py-1 px-3 rounded-full text-xs">{skill}</span>
            ))}
          </div>
        </div>

        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>Certifications</h2>
          {resume.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="font-semibold">{cert.name}</div>
              <div className="text-xs text-gray-300">{cert.issuer} - {cert.date}</div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2" style={{ color: accentColor }}>Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="font-semibold">{edu.degree}</div>
              <div className="text-xs text-gray-300">{edu.school}</div>
              <div className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-10">
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: accentColor }}>Profile</h2>
          <p className="text-gray-700 italic">{resume.profile}</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: accentColor }}>Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{exp.company}</div>
              <div className="text-gray-700">{exp.description}</div>
            </div>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: accentColor }}>Projects</h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className="text-xs text-gray-500">{project.year}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{project.role}</div>
              <div className="mb-1">
                <span className="font-semibold">Features: </span>
                <span className="text-gray-700">{project.features.join(", ")}</span>
              </div>
              <div className="mb-1">
                <span className="font-semibold">Technologies: </span>
                <span className="text-gray-700">{project.technologies.join(", ")}</span>
              </div>
              <div>
                <span className="font-semibold">Achievements: </span>
                <span className="text-gray-700">{project.achievements}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

// Classic Template
function ClassicTemplate({ resume, accentColor }) {
  return (
    <div className="p-12 bg-white shadow-md h-full font-serif border border-gray-300 rounded">
      <header className="mb-8 border-b-2 pb-4 border-gray-400">
        <div className="flex items-center mb-2">
          {resume.photo && <img src={resume.photo} alt="Resume" className="w-20 h-20 rounded mr-6 object-cover border border-gray-400" />}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide">{resume.name}</h1>
            <p className="text-gray-700">{resume.email} | {resume.phone}</p>
          </div>
        </div>
        <div className="mt-2 italic text-gray-600">{resume.profile}</div>
      </header>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest" style={{ color: accentColor }}>Experience</h2>
        <ul className="list-none pl-0">
          {resume.experience.map((exp, index) => (
            <li key={index} className="mb-3">
              <div className="flex justify-between">
                <span className="font-semibold">{exp.role}, {exp.company}</span>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-gray-700 ml-2">{exp.description}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest" style={{ color: accentColor }}>Projects</h2>
        <ul className="list-none pl-0">
          {resume.projects.map((project, index) => (
            <li key={index} className="mb-3">
              <div className="flex justify-between">
                <span className="font-semibold">{project.title} ({project.year})</span>
                <span className="text-sm text-gray-500">{project.role}</span>
              </div>
              <div className="ml-2">
                <div><span className="font-semibold">Features:</span> {project.features.join(", ")}</div>
                <div><span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}</div>
                <div><span className="font-semibold">Achievements:</span> {project.achievements}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest" style={{ color: accentColor }}>Education</h2>
        <ul className="list-none pl-0">
          {resume.education.map((edu, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{edu.degree}</span> at <span>{edu.school}</span>
              <span className="text-sm text-gray-500 ml-2">{edu.startDate} - {edu.endDate}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest" style={{ color: accentColor }}>Certifications</h2>
        <ul className="list-none pl-0">
          {resume.certifications.map((cert, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{cert.name}</span> - <span>{cert.issuer}</span> <span className="text-sm text-gray-500">({cert.date})</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest" style={{ color: accentColor }}>Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
            <span key={index} className="border border-gray-400 px-2 py-1 rounded text-sm">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- Main App ---

const App = () => {
  const [resume, setResume] = useState({
    name: "Your Name",
    email: "your.email@example.com",
    phone: "123-456-7890",
    photo: "",
    profile: "A brief summary about your professional self.",
    experience: [
      {
        company: "Company Name",
        role: "Your Role",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Describe your responsibilities.",
      },
    ],
    education: [
      {
        school: "University Name",
        degree: "Your Degree",
        startDate: "Aug 2018",
        endDate: "May 2022",
      },
    ],
    skills: ["React", "JavaScript", "CSS"],
    certifications: [
      {
        name: "Certification Name",
        issuer: "Issuing Organization",
        date: "Jan 2023",
      },
    ],
    projects: [
      {
        title: "Project Title",
        features: ["Feature 1", "Feature 2"],
        achievements: "Key achievements in the project.",
        technologies: ["React", "Node.js"],
        role: "Your Role",
        year: "2023",
      },
    ],
  });

  const [template, setTemplate] = useState('default');
  const [accentColor, setAccentColor] = useState('#007bff');

  // --- Handlers for form fields (unchanged) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResume((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperience = [...resume.experience];
    newExperience[index][name] = value;
    setResume((prev) => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    const newExperience = [...resume.experience];
    newExperience.splice(index, 1);
    setResume((prev) => ({ ...prev, experience: newExperience }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...resume.education];
    newEducation[index][name] = value;
    setResume((prev) => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    const newEducation = [...resume.education];
    newEducation.splice(index, 1);
    setResume((prev) => ({ ...prev, education: newEducation }));
  };

  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;
    const newCertifications = [...resume.certifications];
    newCertifications[index][name] = value;
    setResume((prev) => ({ ...prev, certifications: newCertifications }));
  };

  const addCertification = () => {
    setResume((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          date: "",
        },
      ],
    }));
  };

  const removeCertification = (index) => {
    const newCertifications = [...resume.certifications];
    newCertifications.splice(index, 1);
    setResume((prev) => ({ ...prev, certifications: newCertifications }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...resume.projects];
    if (name === "features" || name === "technologies") {
      newProjects[index][name] = value.split(",").map(item => item.trim());
    } else {
      newProjects[index][name] = value;
    }
    setResume((prev) => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          features: [],
          achievements: "",
          technologies: [],
          role: "",
          year: "",
        },
      ],
    }));
  };

  const removeProject = (index) => {
    const newProjects = [...resume.projects];
    newProjects.splice(index, 1);
    setResume((prev) => ({ ...prev, projects: newProjects }));
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setResume((prev) => ({ ...prev, skills: value.split(",").map(skill => skill.trim()) }));
  };

  const handlePrint = () => {
    const input = document.getElementById("resume-preview");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    });
  };

  const inputClasses = "w-full p-2 mb-2 border border-gray-300 rounded-md";
  const formGroupClasses = "p-4 mb-4 bg-white border border-gray-200 rounded-lg";

  // --- Template selection logic ---
  let ResumeTemplate;
  if (template === "modern") {
    ResumeTemplate = ModernTemplate;
  } else if (template === "classic") {
    ResumeTemplate = ClassicTemplate;
  } else {
    ResumeTemplate = DefaultTemplate;
  }

  return (
    <div className="bg-gray-100 font-sans">
      <div className="flex max-w-screen-xl mx-auto my-5 bg-white shadow-lg rounded-lg">
        <div className="w-2/5 p-8 bg-gray-50 border-r border-gray-200">
          <div className='flex flex-col'>
            <img src="/logo.png" alt="resume-logo" className='w-16 h-16' />
            <h2 className="font-bold mb-6 uppercase underline underline_offset-4">Resume Editor</h2>
          </div>

          <Accordion title="Settings">
            <div className={formGroupClasses}>
              <label className="block mb-2 font-semibold">Template</label>
              <select onChange={(e) => setTemplate(e.target.value)} value={template} className={inputClasses}>
                <option value="default">Default</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
              </select>
            </div>
            <div className={formGroupClasses}>
              <label className="block mb-2 font-semibold">Accent Color</label>
              <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full" />
            </div>
          </Accordion>

          <Accordion title="Personal Information">
            <div className={formGroupClasses}>
              <input type="text" name="name" value={resume.name} onChange={handleChange} placeholder="Name" className={inputClasses} />
              <input type="email" name="email" value={resume.email} onChange={handleChange} placeholder="Email" className={inputClasses} />
              <input type="tel" name="phone" value={resume.phone} onChange={handleChange} placeholder="Phone" className={inputClasses} />
              <div>
                <label className="block mb-2 font-semibold">Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className={inputClasses} />
              </div>
            </div>
          </Accordion>

          <Accordion title="Personal Profile">
            <div className={formGroupClasses}>
              <textarea name="profile" value={resume.profile} onChange={handleChange} placeholder="Personal Profile" className={`${inputClasses} h-32`}></textarea>
            </div>
          </Accordion>

          <Accordion title="Experience">
            <div className="space-y-4">
              {resume.experience.map((exp, index) => (
                <div key={index} className={formGroupClasses}>
                  <input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="Company" className={inputClasses} />
                  <input type="text" name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} placeholder="Role" className={inputClasses} />
                  <input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="Start Date" className={inputClasses} />
                  <input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="End Date" className={inputClasses} />
                  <textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} placeholder="Description" className={`${inputClasses} h-24`}></textarea>
                  <button onClick={() => removeExperience(index)} className="w-full bg-red-500 text-white p-2 rounded-md">Remove</button>
                </div>
              ))}
              <button onClick={addExperience} className="w-full bg-green-500 text-white p-2 rounded-md">Add Experience</button>
            </div>
          </Accordion>

          <Accordion title="Action Verbs">
            <div className="flex flex-wrap gap-2 p-4">
              {actionVerbs.map(verb => <span key={verb} className="bg-gray-200 py-1 px-2 rounded-md text-sm cursor-pointer">{verb}</span>)}
            </div>
          </Accordion>

          <Accordion title="Education">
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index} className={formGroupClasses}>
                  <input type="text" name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} placeholder="School" className={inputClasses} />
                  <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="Degree" className={inputClasses} />
                  <input type="text" name="startDate" value={edu.startDate} onChange={(e) => handleEducationChange(index, e)} placeholder="Start Date" className={inputClasses} />
                  <input type="text" name="endDate" value={edu.endDate} onChange={(e) => handleEducationChange(index, e)} placeholder="End Date" className={inputClasses} />
                  <button onClick={() => removeEducation(index)} className="w-full bg-red-500 text-white p-2 rounded-md">Remove</button>
                </div>
              ))}
              <button onClick={addEducation} className="w-full bg-green-500 text-white p-2 rounded-md">Add Education</button>
            </div>
          </Accordion>

          <Accordion title="Certifications">
            <div className="space-y-4">
              {resume.certifications.map((cert, index) => (
                <div key={index} className={formGroupClasses}>
                  <input type="text" name="name" value={cert.name} onChange={(e) => handleCertificationChange(index, e)} placeholder="Certification Name" className={inputClasses} />
                  <input type="text" name="issuer" value={cert.issuer} onChange={(e) => handleCertificationChange(index, e)} placeholder="Issuer" className={inputClasses} />
                  <input type="text" name="date" value={cert.date} onChange={(e) => handleCertificationChange(index, e)} placeholder="Date" className={inputClasses} />
                  <button onClick={() => removeCertification(index)} className="w-full bg-red-500 text-white p-2 rounded-md">Remove</button>
                </div>
              ))}
              <button onClick={addCertification} className="w-full bg-green-500 text-white p-2 rounded-md">Add Certification</button>
            </div>
          </Accordion>

          <Accordion title="Projects">
            <div className="space-y-4">
              {resume.projects.map((project, index) => (
                <div key={index} className={formGroupClasses}>
                  <input type="text" name="title" value={project.title} onChange={(e) => handleProjectChange(index, e)} placeholder="Project Title" className={inputClasses} />
                  <input type="text" name="role" value={project.role} onChange={(e) => handleProjectChange(index, e)} placeholder="Your Role" className={inputClasses} />
                  <input type="text" name="year" value={project.year} onChange={(e) => handleProjectChange(index, e)} placeholder="Year" className={inputClasses} />
                  <textarea name="features" value={project.features.join(", ")} onChange={(e) => handleProjectChange(index, e)} placeholder="Features (comma-separated)" className={`${inputClasses} h-24`}></textarea>
                  <textarea name="technologies" value={project.technologies.join(", ")} onChange={(e) => handleProjectChange(index, e)} placeholder="Technologies (comma-separated)" className={`${inputClasses} h-24`}></textarea>
                  <textarea name="achievements" value={project.achievements} onChange={(e) => handleProjectChange(index, e)} placeholder="Achievements" className={`${inputClasses} h-24`}></textarea>
                  <button onClick={() => removeProject(index)} className="w-full bg-red-500 text-white p-2 rounded-md">Remove</button>
                </div>
              ))}
              <button onClick={addProject} className="w-full bg-green-500 text-white p-2 rounded-md">Add Project</button>
            </div>
          </Accordion>

          <Accordion title="Skills">
            <div className={formGroupClasses}>
              <input type="text" value={resume.skills.join(", ")} onChange={handleSkillsChange} placeholder="Skills (comma-separated)" className={inputClasses} />
            </div>
          </Accordion>

          <button onClick={handlePrint} style={{ backgroundColor: accentColor }} className="w-full text-white p-4 rounded-md text-lg font-bold mt-6">Download as PDF</button>
        </div>

        <div className="w-3/5 p-8">
          <div id="resume-preview">
            <ResumeTemplate resume={resume} accentColor={accentColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
