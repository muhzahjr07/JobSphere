import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, ArrowUpRight, Check, AlertTriangle, 
  FileText, Mail, Send, Play, CheckCircle2, ChevronRight, X
} from 'lucide-react';

const MOCK_JOBS = [
  {
    id: 'job-1',
    title: 'Junior DevOps Engineer',
    company: 'LSEG Sri Lanka',
    location: 'Colombo (Hybrid)',
    salary: 'LKR 190,000',
    type: 'Hybrid',
    experience: '1-2 Years',
    matchScore: 87,
    strengths: ['Linux', 'Networking', 'AWS', 'Python'],
    weaknesses: ['Kubernetes', 'CI/CD Pipelines'],
    contact: 'Sarah Perera (Talent Acquisition)',
    contactEmail: 'sperera@lseg.com',
    description: 'Looking for a Junior DevOps Engineer to assist in cloud deployments, automation scripts, and server provisioning. Knowledge of Linux bash scripting and cloud infrastructure is required.'
  },
  {
    id: 'job-2',
    title: 'Associate Cloud Engineer',
    company: 'WSO2',
    location: 'Colombo (On-site)',
    salary: 'LKR 210,000',
    type: 'On-site',
    experience: '2 Years',
    matchScore: 78,
    strengths: ['Linux', 'AWS', 'Python'],
    weaknesses: ['Terraform', 'Docker'],
    contact: 'Dilan Fernando (HR Manager)',
    contactEmail: 'dilan@wso2.com',
    description: 'Join our Cloud operations team. You will support infrastructure operations, monitor cloud health, and support product deployment cycles.'
  },
  {
    id: 'job-3',
    title: 'Remote Site Reliability Engineer',
    company: 'Sysco Labs',
    location: 'Remote (US Hours)',
    salary: '$2,400 / mo',
    type: 'Remote',
    experience: '2+ Years',
    matchScore: 92,
    strengths: ['Linux', 'AWS', 'Python', 'Bash', 'Docker'],
    weaknesses: ['Kubernetes', 'Terraform'],
    contact: 'Alex Mercer (Director of DevOps)',
    contactEmail: 'alex.mercer@syscolabs.com',
    description: 'We are hiring a Remote SRE to support global platforms. Expertise in shell scripting, Docker, cloud monitoring, and networking is crucial.'
  },
  {
    id: 'job-4',
    title: 'Azure Platform Administrator',
    company: 'Virtusa',
    location: 'Colombo (Hybrid)',
    salary: 'LKR 160,000',
    type: 'Hybrid',
    experience: '2-3 Years',
    matchScore: 54,
    strengths: ['Networking'],
    weaknesses: ['Linux', 'AWS', 'Terraform', 'Kubernetes'],
    contact: 'Kumara de Silva (Recruitment Lead)',
    contactEmail: 'kdesilva@virtusa.com',
    description: 'Seeking an Azure administrator with experience in Active Directory, PowerShell scripting, and Microsoft cloud resource provisioning.'
  },
  {
    id: 'job-5',
    title: 'DevOps Intern',
    company: 'Dialog Axiata',
    location: 'Colombo (Remote)',
    salary: 'LKR 90,000',
    type: 'Remote',
    experience: 'Internship',
    matchScore: 95,
    strengths: ['Linux', 'Networking', 'Python', 'Bash'],
    weaknesses: ['Kubernetes'],
    contact: 'Nisha Jayasinghe (HR executive)',
    contactEmail: 'nisha.j@dialog.lk',
    description: 'Seeking a proactive student or fresh graduate for a DevOps internship. Will work closely with SREs on container setups, cloud monitoring tools, and CI deployments.'
  }
];

export default function JobEngine({ profile, applications, setApplications }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [minScore, setMinScore] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Pack generation active tab
  const [packTab, setPackTab] = useState('cv'); // cv, cover, email
  const [customTailoring, setCustomTailoring] = useState(false);
  
  // Bulk apply simulation states
  const [bulkApplying, setBulkApplying] = useState(false);
  const [bulkLog, setBulkLog] = useState([]);
  const [bulkProgress, setBulkProgress] = useState(0);

  // Auto-generate application templates
  const generateCV = (job) => {
    if (!profile) return '';
    return `==========================================\n Mohammed Zaharan - ${profile.currentRole}\n ATS-Optimized Highlights for ${job.company}\n==========================================\n\n[SUMMARY]\nDevOps-focused engineer with 3+ years experience. Proven expertise in ${job.strengths.join(', ')}.\nAligned directly with ${job.company}'s requirements for ${job.title}.\n\n[HIGHLIGHTED SKILLS]\n- Infrastructure: ${job.strengths.filter(s => ['AWS','Linux','Networking'].includes(s)).join(', ') || 'Cloud Ops'}\n- Scripting & Logic: ${job.strengths.filter(s => ['Python','Bash'].includes(s)).join(', ') || 'Automation'}\n- Familiar with (Quick Learner): ${job.weaknesses.join(', ')} (Actively building projects in these areas)\n\n[EXPERIENCE]\nIT Operations Specialist - TechSys Lanka\n* Provisioned infrastructure components aligning with standard practices in ${job.strengths.includes('AWS') ? 'AWS environments' : 'on-premise labs'}.\n* Developed custom automation scripts using Bash/Python reducing deployment overhead.\n\n[PROJECTED VALUE FOR ${job.company.toUpperCase()}]\n* Ready to manage build environments immediately leveraging existing ${job.strengths.join(', ')} experience.\n* Currently training on ${job.weaknesses.join(' and ')} to support future pipeline upgrades.`;
  };

  const generateCoverLetter = (job) => {
    if (!profile) return '';
    return `Dear Hiring Team at ${job.company},\n\nI am writing to express my strong interest in the ${job.title} role. With over 3 years of experience as an ${profile.currentRole}, specializing in ${job.strengths.join(', ')}, I am excited about the opportunity to contribute to your operations team.\n\nI notice that ${job.company} is seeking expertise in cloud infrastructure and deployment management. At TechSys Lanka, I successfully maintained systems with 99.9% uptime and utilized ${job.strengths.includes('Python') ? 'Python and Bash' : 'scripting'} to automate daily checks. While my profile highlights robust skills in ${job.strengths.slice(0, 3).join(', ')}, I am also actively upskilling in ${job.weaknesses.join(', ')} to ensure I can support your full engineering cycle.\n\nThank you for considering my application. I look forward to discussing how my systems background and fast learning capacity align with your objectives.\n\nSincerely,\nMohammed Zaharan\n${profile.portfolio}`;
  };

  const generateEmail = (job) => {
    if (!profile) return '';
    return `Subject: Application for ${job.title} - Mohammed Zaharan\n\nDear ${job.contact.split(' ')[0] || 'Hiring Manager'},\n\nI hope you are doing well.\n\nI recently came across the opening for the ${job.title} position at ${job.company} and wanted to apply. My background includes 3 years of IT Operations experience with core strengths in ${job.strengths.join(', ')}.\n\nI have attached my tailored resume and cover letter. I would appreciate the opportunity to connect and discuss how my expertise can support your systems engineering team.\n\nThank you for your time and consideration.\n\nBest regards,\nMohammed Zaharan\n${profile.linkedin}\n${profile.portfolio}`;
  };

  // Filter jobs based on states
  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRemote = !showRemoteOnly || job.location.toLowerCase().includes('remote') || job.type === 'Remote';
    const matchesScore = job.matchScore >= minScore;
    return matchesSearch && matchesRemote && matchesScore;
  });

  const handleApplySingle = (job) => {
    // Add to applications list (stage 'applied' or 'saved')
    const alreadyApplied = applications.some(app => app.jobId === job.id);
    if (alreadyApplied) {
      alert("Already in your CRM pipeline!");
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      matchScore: job.matchScore,
      status: 'applied',
      appliedDate: new Date().toLocaleDateString(),
      notes: 'Applied directly from discovery board.',
      contact: job.contact,
      contactEmail: job.contactEmail,
      coverLetter: generateCoverLetter(job),
      emailDraft: generateEmail(job)
    };

    setApplications([...applications, newApp]);
    alert(`Added "${job.title}" to Applied pipeline stage!`);
    setSelectedJob(null);
  };

  const runBulkApply = () => {
    const highMatchJobs = filteredJobs.filter(j => j.matchScore >= 80);
    
    if (highMatchJobs.length === 0) {
      alert("No high match jobs (Match Score >= 80%) found in current filter!");
      return;
    }

    setBulkApplying(true);
    setBulkProgress(0);
    setBulkLog([]);

    const jobsToApply = [...highMatchJobs];
    let index = 0;
    const addedApps = [];

    const processNext = () => {
      if (index >= jobsToApply.length) {
        setTimeout(() => {
          setApplications(prev => {
            // Filter duplicates before adding
            const existingIds = prev.map(a => a.jobId);
            const filteredNew = addedApps.filter(a => !existingIds.includes(a.jobId));
            return [...prev, ...filteredNew];
          });
          setBulkLog(prev => [...prev, "✓ Smart Bulk Apply completed. CRM pipeline updated."]);
          setBulkProgress(100);
        }, 1000);
        return;
      }

      const currentJob = jobsToApply[index];
      const stepTime = 1200; // milliseconds

      setBulkLog(prev => [...prev, `[${currentJob.company}] Tailoring CV & cover letter...`]);
      setBulkProgress(Math.floor(((index * 2) / (jobsToApply.length * 2)) * 100));

      setTimeout(() => {
        setBulkLog(prev => [...prev, `[${currentJob.company}] Completing application portals & generating emails...`]);
        setBulkProgress(Math.floor(((index * 2 + 1) / (jobsToApply.length * 2)) * 100));
        
        const newApp = {
          id: `app-bulk-${Date.now()}-${index}`,
          jobId: currentJob.id,
          title: currentJob.title,
          company: currentJob.company,
          location: currentJob.location,
          salary: currentJob.salary,
          matchScore: currentJob.matchScore,
          status: 'applied',
          appliedDate: new Date().toLocaleDateString(),
          notes: 'Auto-applied via Smart Bulk Apply.',
          contact: currentJob.contact,
          contactEmail: currentJob.contactEmail,
          coverLetter: generateCoverLetter(currentJob),
          emailDraft: generateEmail(currentJob)
        };
        addedApps.push(newApp);

        setTimeout(() => {
          setBulkLog(prev => [...prev, `✓ Successfully submitted application for ${currentJob.title} at ${currentJob.company}!`]);
          index++;
          processNext();
        }, stepTime / 2);

      }, stepTime);
    };

    processNext();
  };

  return (
    <div className="panel-body">
      {/* Simulation popup for Bulk Apply */}
      {bulkApplying && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(10, 10, 15, 0.95)', zIndex: 999,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: '24px'
        }}>
          <div className="glass-card" style={{ maxWidth: '500px', width: '100%', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                <Play className="autopilot-pulse" style={{ color: 'var(--color-primary)', width: '16px', height: '16px' }} />
                <span>Smart Bulk Apply Automator</span>
              </div>
              {bulkProgress === 100 && (
                <button className="control-btn" onClick={() => setBulkApplying(false)}><X style={{ width: '14px', height: '14px' }} /></button>
              )}
            </div>
            
            {/* Progress Bar */}
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px', width: '100%', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ background: 'var(--color-primary)', height: '100%', width: `${bulkProgress}%`, transition: 'width 0.3s ease' }}></div>
            </div>

            {/* Console Log output */}
            <div style={{ 
              background: '#07070a', border: '1px solid var(--border-color)', 
              borderRadius: '8px', padding: '12px', height: '240px', overflowY: 'auto', 
              fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#a78bfa',
              display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              {bulkLog.map((log, idx) => (
                <div key={idx} style={{ 
                  color: log.startsWith('✓') ? '#10b981' : log.startsWith('[') ? '#e9d5ff' : '#9ca3af' 
                }}>
                  {log}
                </div>
              ))}
            </div>

            {bulkProgress === 100 && (
              <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={() => setBulkApplying(false)}>
                Return to Job Discovery
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Layout */}
      {!profile ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <AlertTriangle style={{ width: '48px', height: '48px', color: 'var(--color-warning)', marginBottom: '16px' }} />
          <h3>Profile Not Created</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '8px 0 20px' }}>
            Create your career profile first so the AI can evaluate job matches and generate materials.
          </p>
        </div>
      ) : (
        <>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Job Discovery Engine</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Matching DevOps roles with your profile</p>
            </div>
            
            <button 
              className="btn-primary" 
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
              onClick={runBulkApply}
            >
              <Play style={{ width: '14px', height: '14px' }} />
              Apply to all High Match Jobs ({filteredJobs.filter(j => j.matchScore >= 80).length})
            </button>
          </div>

          {/* Filters Area */}
          <div className="glass-card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flex: 1, minWidth: '240px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px', alignItems: 'center', gap: '8px' }}>
              <Search style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search jobs, company, skills..." 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '13px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <input 
                  type="checkbox" 
                  checked={showRemoteOnly} 
                  onChange={(e) => setShowRemoteOnly(e.target.checked)} 
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                Remote Only
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Min Match Score:</span>
                <select 
                  className="text-input" 
                  style={{ padding: '4px 8px', fontSize: '12px' }}
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                >
                  <option value="0">All Matches</option>
                  <option value="60">Medium (&gt;60%)</option>
                  <option value="80">High (&gt;80%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: selectedJob ? '1fr 1fr' : '1fr', gap: '24px', position: 'relative' }}>
            
            {/* Job List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredJobs.length === 0 ? (
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No jobs matches found matching filters.
                </div>
              ) : (
                filteredJobs.map(job => {
                  const isApplied = applications.some(a => a.jobId === job.id);
                  return (
                    <div 
                      key={job.id} 
                      className={`glass-card ${selectedJob?.id === job.id ? 'active' : ''}`}
                      style={{ 
                        textAlign: 'left', cursor: 'pointer', display: 'flex', 
                        justifyContent: 'space-between', alignItems: 'flex-start',
                        borderColor: selectedJob?.id === job.id ? 'var(--color-primary)' : 'var(--border-color)'
                      }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, paddingRight: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{job.title}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• {job.company}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '12px' }}>
                          <span>📍 {job.location}</span>
                          <span>💼 {job.experience}</span>
                          <span>💰 {job.salary}</span>
                        </p>
                        
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                          {job.strengths.slice(0, 3).map(s => (
                            <span key={s} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#a7f3d0' }}>
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                        {/* Match Badge */}
                        <div style={{
                          padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                          background: job.matchScore >= 80 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                          color: job.matchScore >= 80 ? '#34d399' : '#c084fc',
                          border: `1px solid ${job.matchScore >= 80 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`
                        }}>
                          {job.matchScore}% Match
                        </div>
                        
                        <span style={{ fontSize: '11px', color: isApplied ? '#10b981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {isApplied ? (
                            <>
                              <CheckCircle2 style={{ width: '12px', height: '12px' }} /> Applied
                            </>
                          ) : (
                            <>
                              View Pack <ChevronRight style={{ width: '12px', height: '12px' }} />
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Application Pack Details Pane */}
            {selectedJob && (
              <div className="glass-card" style={{ textAlign: 'left', position: 'sticky', top: '0', display: 'flex', flexDirection: 'column', gap: '16px', height: 'fit-content' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>{selectedJob.title}</h4>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{selectedJob.company} • {selectedJob.matchScore}% Match Rating</div>
                  </div>
                  <button className="control-btn" onClick={() => setSelectedJob(null)}>
                    <X style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>

                {/* Match Analysis */}
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>AI Match Breakdown</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#10b981', fontWeight: 'bold' }}>Strengths:</span> {selectedJob.strengths.join(', ')}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Weaknesses:</span> {selectedJob.weaknesses.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Application Pack Tabs */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Step 5: One-Click Application Pack</span>
                    
                    <button 
                      onClick={() => {
                        setCustomTailoring(true);
                        setTimeout(() => setCustomTailoring(false), 800);
                      }}
                      className="control-btn" 
                      style={{ padding: '2px 8px', fontSize: '10px' }}
                    >
                      {customTailoring ? 'Regenerating...' : 'Regenerate'}
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                    <button 
                      className={`control-btn ${packTab === 'cv' ? 'active' : ''}`} 
                      style={{ borderRadius: '4px', flex: 1 }} 
                      onClick={() => setPackTab('cv')}
                    >
                      <FileText style={{ width: '12px', height: '12px' }} /> Tailored CV
                    </button>
                    <button 
                      className={`control-btn ${packTab === 'cover' ? 'active' : ''}`} 
                      style={{ borderRadius: '4px', flex: 1 }} 
                      onClick={() => setPackTab('cover')}
                    >
                      <FileText style={{ width: '12px', height: '12px' }} /> Cover Letter
                    </button>
                    <button 
                      className={`control-btn ${packTab === 'email' ? 'active' : ''}`} 
                      style={{ borderRadius: '4px', flex: 1 }} 
                      onClick={() => setPackTab('email')}
                    >
                      <Mail style={{ width: '12px', height: '12px' }} /> Email Draft
                    </button>
                  </div>

                  {/* Code Editor view of tailored material */}
                  <textarea 
                    readOnly
                    className="text-input" 
                    style={{ 
                      width: '100%', height: '180px', fontFamily: 'var(--font-mono)', 
                      fontSize: '11px', background: '#0a0a0f', color: '#c084fc', 
                      resize: 'none', lineHeight: '1.4' 
                    }}
                    value={
                      packTab === 'cv' ? generateCV(selectedJob) :
                      packTab === 'cover' ? generateCoverLetter(selectedJob) :
                      generateEmail(selectedJob)
                    }
                  />
                </div>

                {/* Apply Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <button 
                    className="btn-primary" 
                    style={{ flex: 1, background: 'var(--color-success)' }} 
                    onClick={() => handleApplySingle(selectedJob)}
                  >
                    <Send style={{ width: '14px', height: '14px' }} />
                    Submit Application
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      // Add to CRM as Saved
                      const alreadyApplied = applications.some(app => app.jobId === selectedJob.id);
                      if (alreadyApplied) {
                        alert("Already in CRM!");
                        return;
                      }
                      const newApp = {
                        id: `app-saved-${Date.now()}`,
                        jobId: selectedJob.id,
                        title: selectedJob.title,
                        company: selectedJob.company,
                        location: selectedJob.location,
                        salary: selectedJob.salary,
                        matchScore: selectedJob.matchScore,
                        status: 'saved',
                        appliedDate: '',
                        notes: 'Saved for later.',
                        contact: selectedJob.contact,
                        contactEmail: selectedJob.contactEmail,
                        coverLetter: generateCoverLetter(selectedJob),
                        emailDraft: generateEmail(selectedJob)
                      };
                      setApplications([...applications, newApp]);
                      alert(`Saved "${selectedJob.title}" to Saved Pipeline!`);
                      setSelectedJob(null);
                    }}
                  >
                    Save to Track
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
