import React, { useState, useEffect } from 'react';
import DesktopChrome from './components/DesktopChrome';
import AndroidChrome from './components/AndroidChrome';
import Dashboard from './components/Dashboard';
import JobEngine from './components/JobEngine';
import ApplicationCRM from './components/ApplicationCRM';
import AICoach from './components/AICoach';
import SkillAcademy from './components/SkillAcademy';
import Networking from './components/Networking';
import RejectionAnalyzer from './components/RejectionAnalyzer';
import Autopilot from './components/Autopilot';
import CareerCopilot from './components/CareerCopilot';
import { 
  LayoutDashboard, Search, Layers, Mic, BookOpen, Users, 
  ShieldAlert, Zap, MessageSquare, Laptop, Smartphone, Globe, Sun, Moon
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [viewMode, setViewMode] = useState('desktop'); // desktop, android, web
  const [tab, setTab] = useState('dashboard');
  
  // Profile state - starts empty so user can experience Step 1: parser upload
  const [profile, setProfile] = useState(null);
  
  // Applications list database shared with CRM, Discovery, Autopilot, and Copilot
  const [applications, setApplications] = useState([
    {
      id: 'app-init-1',
      jobId: 'job-1',
      title: 'Junior DevOps Engineer',
      company: 'LSEG Sri Lanka',
      location: 'Colombo (Hybrid)',
      salary: 'LKR 190,000',
      matchScore: 87,
      status: 'applied',
      appliedDate: '6/7/2026', // Applied 7 days ago (follow up due!)
      notes: 'Passed first HR screening call. Awaiting technical round scheduling.',
      contact: 'Sarah Perera (Recruiter)',
      contactEmail: 'sperera@lseg.com',
      coverLetter: '',
      emailDraft: ''
    },
    {
      id: 'app-init-2',
      jobId: 'job-2',
      title: 'Associate Cloud Engineer',
      company: 'WSO2',
      location: 'Colombo (On-site)',
      salary: 'LKR 210,000',
      matchScore: 78,
      status: 'saved',
      appliedDate: '',
      notes: 'Need to review AWS ECS deployments before applying.',
      contact: 'Dilan Fernando (HR Manager)',
      contactEmail: 'dilan@wso2.com',
      coverLetter: '',
      emailDraft: ''
    }
  ]);

  // Sync theme attribute to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const acquireSkill = (skillName) => {
    if (!profile) return;
    setProfile(prev => {
      if (prev.skills.includes(skillName)) return prev;
      
      const newSkills = [...prev.skills, skillName];
      const newMissing = prev.missingSkills.filter(s => s !== skillName);
      // Increase readiness rating
      const newScore = Math.min(prev.readiness + 7, 100);
      
      return {
        ...prev,
        skills: newSkills,
        missingSkills: newMissing,
        readiness: newScore
      };
    });
  };

  // Render Sidebar
  const renderSidebar = () => {
    const navItems = [
      { id: 'dashboard', name: 'AI Dashboard', icon: LayoutDashboard },
      { id: 'jobs', name: 'Job Discovery', icon: Search },
      { id: 'crm', name: 'Application CRM', icon: Layers },
      { id: 'coach', name: 'AI Coach', icon: Mic },
      { id: 'academy', name: 'Skill Academy', icon: BookOpen },
      { id: 'networking', name: 'Networking', icon: Users },
      { id: 'rejection', name: 'Rejection Intel', icon: ShieldAlert },
      { id: 'autopilot', name: 'Autopilot Agent', icon: Zap },
      { id: 'copilot', name: 'AI Copilot Chat', icon: MessageSquare }
    ];

    return (
      <div className="jobsphere-sidebar">
        <div className="sidebar-brand">
          <h1>
            <span className="brand-icon">J</span>
            <span className="brand-name">JobSphere AI</span>
          </h1>
        </div>
        <div className="sidebar-nav">
          {navItems.map(item => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className={`nav-item ${tab === item.id ? 'active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                <IconComponent className="nav-item-icon" />
                <span className="nav-text">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Switch tabs
  const renderActiveTabContent = () => {
    switch (tab) {
      case 'dashboard':
        return <Dashboard profile={profile} setProfile={setProfile} />;
      case 'jobs':
        return <JobEngine profile={profile} applications={applications} setApplications={setApplications} />;
      case 'crm':
        return <ApplicationCRM applications={applications} setApplications={setApplications} />;
      case 'coach':
        return <AICoach />;
      case 'academy':
        return <SkillAcademy profile={profile} acquireSkill={acquireSkill} />;
      case 'networking':
        return <Networking profile={profile} />;
      case 'rejection':
        return <RejectionAnalyzer profile={profile} />;
      case 'autopilot':
        return <Autopilot profile={profile} applications={applications} setApplications={setApplications} />;
      case 'copilot':
        return <CareerCopilot profile={profile} setTab={setTab} applications={applications} setApplications={setApplications} />;
      default:
        return <Dashboard profile={profile} setProfile={setProfile} />;
    }
  };

  // Main UI shell
  const renderMainApp = () => (
    <>
      {renderSidebar()}
      <div className="jobsphere-main-panel">
        <div className="panel-header">
          <h2 style={{ textTransform: 'capitalize' }}>
            {tab === 'crm' ? 'Application CRM Pipeline' : tab.replace('-', ' ')}
          </h2>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {profile && (
              <span style={{ fontSize: '11px', background: 'var(--bg-badge)', color: 'var(--color-primary)', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
                🎯 DevOps Readiness: {profile.readiness}%
              </span>
            )}
            <button className="control-btn" onClick={toggleTheme} style={{ padding: '6px' }}>
              {theme === 'dark' ? <Sun style={{ width: '14px', height: '14px' }} /> : <Moon style={{ width: '14px', height: '14px' }} />}
            </button>
          </div>
        </div>
        
        {renderActiveTabContent()}
      </div>
    </>
  );

  return (
    <div className="app-container">
      {/* Top Simulator Selection Bar */}
      <div className="simulator-selector-bar">
        <div className="brand-title-area">
          <div className="brand-icon">J</div>
          <div className="brand-name">JobSphere AI Simulator</div>
        </div>

        <div className="simulator-controls">
          <button 
            className={`control-btn ${viewMode === 'desktop' ? 'active' : ''}`}
            onClick={() => setViewMode('desktop')}
          >
            <Laptop style={{ width: '12px', height: '12px' }} />
            Windows Desktop App
          </button>
          <button 
            className={`control-btn ${viewMode === 'android' ? 'active' : ''}`}
            onClick={() => setViewMode('android')}
          >
            <Smartphone style={{ width: '12px', height: '12px' }} />
            Android Mobile App
          </button>
          <button 
            className={`control-btn ${viewMode === 'web' ? 'active' : ''}`}
            onClick={() => setViewMode('web')}
          >
            <Globe style={{ width: '12px', height: '12px' }} />
            Web Application View
          </button>
        </div>
      </div>

      {/* Frame Rendering Wrapper */}
      {viewMode === 'desktop' && (
        <DesktopChrome>
          {renderMainApp()}
        </DesktopChrome>
      )}

      {viewMode === 'android' && (
        <AndroidChrome>
          {renderMainApp()}
        </AndroidChrome>
      )}

      {viewMode === 'web' && (
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          {renderMainApp()}
        </div>
      )}
    </div>
  );
}
