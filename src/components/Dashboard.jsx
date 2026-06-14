import React, { useState } from 'react';
import { 
  UploadCloud, Briefcase, TrendingUp, Award, Link2, 
  FileText, CheckCircle2, AlertCircle, RefreshCw, DollarSign, MapPin
} from 'lucide-react';

export default function Dashboard({ profile, setProfile }) {
  const [parsing, setParsing] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [certInput, setCertInput] = useState('');

  const loadSample = () => {
    setParsing(true);
    setTimeout(() => {
      setProfile({
        name: "Mohammed Zaharan",
        currentRole: "IT Operations Engineer",
        targetRole: "DevOps Engineer",
        readiness: 72,
        skills: ["Linux", "Networking", "AWS", "Python", "Bash", "Docker"],
        missingSkills: ["Kubernetes", "Terraform", "CI/CD Pipelines", "Ansible"],
        education: "B.Sc. in Computer Systems & Networking, SLIIT",
        experience: "3 Years as IT Operations Specialist at TechSys Lanka",
        certifications: ["AWS Certified Solutions Architect", "CCNA"],
        linkedin: "linkedin.com/in/zaharan-ops",
        portfolio: "zaharan.dev"
      });
      setParsing(false);
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setParsing(true);
    setTimeout(() => {
      // Mock extract based on filename or random defaults
      setProfile({
        name: file.name.split('.')[0].replace(/[-_]/g, ' '),
        currentRole: "Software Engineer",
        targetRole: "Senior Software Engineer",
        readiness: 80,
        skills: ["JavaScript", "React", "Node.js", "Git", "SQL"],
        missingSkills: ["System Design", "Kubernetes", "GraphQL", "TypeScript"],
        education: "Self-taught & Certifications",
        experience: "2 Years in Full-Stack Development",
        certifications: ["Vite Developer Associate"],
        linkedin: "linkedin.com/in/applicant",
        portfolio: "github.com/applicant"
      });
      setParsing(false);
    }, 1500);
  };

  const resetProfile = () => {
    setProfile(null);
  };

  if (parsing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '20px' }}>
        <RefreshCw className="autopilot-pulse" style={{ width: '48px', height: '48px', color: 'var(--color-primary)' }} />
        <h3 style={{ fontFamily: 'var(--font-mono)' }}>AI Extracting Profile...</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Parsing CV structure, skills, and experience details...</p>
      </div>
    );
  }

  return (
    <div className="panel-body">
      {!profile ? (
        // Step 1: Create Profile View
        <div className="glass-card" style={{ maxWidth: '650px', margin: '20px auto', width: '100%' }}>
          <div className="glass-card-title">
            <UploadCloud style={{ color: 'var(--color-primary)' }} />
            <span>Step 1: Create Your Career Profile</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
            Upload your credentials to initialize JobSphere's AI Career Assistant. The AI will extract your expertise, suggest roadmaps, and auto-match relevant jobs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <label className="upload-box">
              <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
              <UploadCloud style={{ width: '48px', height: '48px', color: 'var(--text-secondary)', marginBottom: '12px' }} />
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Upload CV (PDF, DOCX)</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Drag & drop or browse your local files</div>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-group">
                <span className="input-label">LinkedIn URL</span>
                <input 
                  type="text" 
                  className="text-input" 
                  placeholder="https://linkedin.com/in/..." 
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
              <div className="input-group">
                <span className="input-label">Portfolio / GitHub Link</span>
                <input 
                  type="text" 
                  className="text-input" 
                  placeholder="https://..." 
                />
              </div>
            </div>

            <div className="input-group">
              <span className="input-label">Certifications / Keywords (Optional)</span>
              <input 
                type="text" 
                className="text-input" 
                placeholder="AWS Certified, CCNA, React Dev Certification..." 
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1 }} 
                onClick={() => {
                  setParsing(true);
                  setTimeout(() => {
                    setProfile({
                      name: "Alex Dev",
                      currentRole: "IT Systems Intern",
                      targetRole: "Cloud Engineer",
                      readiness: 65,
                      skills: ["Linux", "Git", "Networking"],
                      missingSkills: ["AWS", "Docker", "Terraform", "Kubernetes"],
                      education: "Undergraduate Student",
                      experience: "None",
                      certifications: certInput ? [certInput] : [],
                      linkedin: linkedinUrl || "linkedin.com/in/alex",
                      portfolio: "github.com/alex"
                    });
                    setParsing(false);
                  }, 1000);
                }}
              >
                Parse Profile
              </button>
              <button className="btn-secondary" onClick={loadSample}>
                Load Demo Profile (DevOps target)
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Profile Display & AI Analysis (Step 2 & 10)
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '28px', margin: '0', textAlign: 'left' }}>Welcome, {profile.name}</h1>
              <p style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>Your Career Operating System is synchronized.</p>
            </div>
            <button className="btn-secondary" onClick={resetProfile} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <RefreshCw style={{ width: '14px', height: '14px' }} />
              Reset & Upload New CV
            </button>
          </div>

          <div className="dashboard-grid">
            {/* Left: AI Analysis */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Profile Card */}
              <div className="glass-card">
                <div className="glass-card-title">
                  <Briefcase style={{ color: 'var(--color-primary)' }} />
                  <span>AI Profile Extraction Summary</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Stated Role</div>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>{profile.currentRole}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Role Goal</div>
                    <div style={{ fontWeight: '600', color: 'var(--color-primary)', marginTop: '4px' }}>{profile.targetRole}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Education</div>
                    <div style={{ fontWeight: '500', fontSize: '13px', marginTop: '4px' }}>{profile.education}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Latest Experience</div>
                    <div style={{ fontWeight: '500', fontSize: '13px', marginTop: '4px' }}>{profile.experience}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Link2 style={{ width: '14px', height: '14px', color: 'var(--color-info)' }} />
                    <span>{profile.linkedin}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText style={{ width: '14px', height: '14px', color: 'var(--color-info)' }} />
                    <span>{profile.portfolio}</span>
                  </div>
                  {profile.certifications.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award style={{ width: '14px', height: '14px', color: 'var(--color-warning)' }} />
                      <span>{profile.certifications.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="glass-card" style={{ textAlign: 'left' }}>
                <div className="glass-card-title">
                  <Award style={{ color: 'var(--color-primary)' }} />
                  <span>Step 2: Skill Inventory & Gap Assessment</span>
                </div>
                
                <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Your Strengths ({profile.skills.length})</h4>
                <div className="skills-list" style={{ marginBottom: '20px' }}>
                  {profile.skills.map(s => (
                    <span key={s} className="skill-tag strength">
                      <CheckCircle2 style={{ width: '12px', height: '12px', color: 'var(--color-success)' }} />
                      {s}
                    </span>
                  ))}
                </div>

                <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>AI Identified Skill Gaps ({profile.missingSkills.length})</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Acquiring these skills will unlock match matches for 90%+ of {profile.targetRole} opportunities.
                </p>
                <div className="skills-list">
                  {profile.missingSkills.map(s => (
                    <span key={s} className="skill-tag missing">
                      <AlertCircle style={{ width: '12px', height: '12px', color: 'var(--color-danger)' }} />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Readiness and Salary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Readiness Score Card */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="glass-card-title" style={{ alignSelf: 'flex-start' }}>
                  <TrendingUp style={{ color: 'var(--color-primary)' }} />
                  <span>Target Role Readiness</span>
                </div>
                
                <div className="progress-circle-container">
                  <svg className="progress-circle-svg">
                    <circle className="progress-circle-bg" cx="70" cy="70" r="55" />
                    <circle 
                      className="progress-circle-fill" 
                      cx="70" 
                      cy="70" 
                      r="55" 
                      strokeDasharray={`${2 * Math.PI * 55}`}
                      strokeDashoffset={`${2 * Math.PI * 55 * (1 - profile.readiness / 100)}`}
                    />
                  </svg>
                  <div className="progress-text-overlay">
                    <span className="progress-percentage">{profile.readiness}%</span>
                    <span className="progress-label">Score</span>
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Ready to apply for junior/mid-level **{profile.targetRole}** positions. Address gaps to approach senior roles.
                </div>
              </div>

              {/* Step 10: Salary Intelligence */}
              <div className="glass-card" style={{ textAlign: 'left' }}>
                <div className="glass-card-title">
                  <DollarSign style={{ color: 'var(--color-success)' }} />
                  <span>Step 10: Salary Intelligence</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <MapPin style={{ width: '14px', height: '14px' }} />
                  <span>{profile.targetRole} (Colombo / Remote)</span>
                </div>

                <div className="salary-chart-sim">
                  <div className="salary-bar-col">
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>LKR 120k</span>
                    <div className="salary-bar-fill" style={{ height: '35%', width: '100%' }}></div>
                    <span className="salary-bar-label">Entry</span>
                  </div>
                  <div className="salary-bar-col">
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>LKR 180k</span>
                    <div className="salary-bar-fill highlight" style={{ height: '55%', width: '100%' }}></div>
                    <span className="salary-bar-label">Average</span>
                  </div>
                  <div className="salary-bar-col">
                    <span style={{ fontSize: '10px', color: 'var(--text-primary)', fontWeight: 'bold' }}>LKR 220k</span>
                    <div className="salary-bar-fill" style={{ height: '70%', width: '100%', background: 'var(--color-primary)' }}></div>
                    <span className="salary-bar-label" style={{ fontWeight: 'bold' }}>Expected</span>
                  </div>
                  <div className="salary-bar-col">
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>LKR 320k+</span>
                    <div className="salary-bar-fill" style={{ height: '95%', width: '100%' }}></div>
                    <span className="salary-bar-label">Top 25%</span>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Colombo Market Range:</span>
                    <span style={{ fontWeight: '600' }}>LKR 150k - LKR 350k</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Remote (USD equivalent):</span>
                    <span style={{ fontWeight: '600', color: 'var(--color-success)' }}>$1,500 - $3,200 / mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
