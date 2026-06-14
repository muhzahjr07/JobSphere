import React, { useState } from 'react';
import { 
  Users, Send, Briefcase, GraduationCap, Copy, UserPlus, Sparkles, Check
} from 'lucide-react';

const MOCK_CONTACTS = [
  {
    id: 'c-1',
    name: 'Sarah Perera',
    role: 'Technical Recruiter at LSEG Sri Lanka',
    type: 'Recruiter',
    company: 'LSEG Sri Lanka',
    alumni: false,
    reason: 'Hiring for Junior DevOps Engineer role',
    context: 'LSEG'
  },
  {
    id: 'c-2',
    name: 'Dilan Fernando',
    role: 'HR Manager at WSO2',
    type: 'Recruiter',
    company: 'WSO2',
    alumni: false,
    reason: 'Hiring for Associate Cloud Engineer role',
    context: 'WSO2'
  },
  {
    id: 'c-3',
    name: 'Nilantha Silva',
    role: 'Lead Cloud Architect at Sysco Labs',
    type: 'Alumni',
    company: 'Sysco Labs',
    alumni: true,
    university: 'SLIIT',
    reason: 'Senior Alumnus in Cloud Engineering',
    context: 'Sysco Labs'
  },
  {
    id: 'c-4',
    name: 'Ruwan Jayasekara',
    role: 'DevOps Specialist at WSO2',
    type: 'Employee',
    company: 'WSO2',
    alumni: true,
    university: 'SLIIT',
    reason: 'SLIIT graduate working in target team',
    context: 'WSO2'
  },
  {
    id: 'c-5',
    name: 'Nisha Jayasinghe',
    role: 'HR Executive at Dialog Axiata',
    type: 'Recruiter',
    company: 'Dialog Axiata',
    alumni: false,
    reason: 'Hiring for DevOps Intern',
    context: 'Dialog Axiata'
  }
];

export default function Networking({ profile }) {
  const [selectedContact, setSelectedContact] = useState(MOCK_CONTACTS[0]);
  const [filterType, setFilterType] = useState('All');
  const [copied, setCopied] = useState(false);
  const [sentSim, setSentSim] = useState({});

  if (!profile) {
    return (
      <div className="panel-body">
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Profile Not Created</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
            Initialize your profile to suggest networking recommendations.
          </p>
        </div>
      </div>
    );
  }

  const generateInviteMessage = (contact) => {
    if (contact.type === 'Recruiter') {
      return `Hello ${contact.name.split(' ')[0]},\n\nI noticed you are recruiting for the DevOps/Cloud position at ${contact.company}. My background includes 3 years in IT Operations, specializing in ${profile.skills.slice(0, 3).join(', ')}. I'd appreciate the opportunity to connect and share my CV if you're still accepting applications.\n\nRegards,\nMohammed Zaharan`;
    } else if (contact.alumni) {
      return `Hi ${contact.name.split(' ')[0]},\n\nI noticed we both graduated from ${contact.university}. I'm currently working as an ${profile.currentRole} and looking to transition into DevOps at ${contact.company}. I'd love to connect to hear about your experience in the field and any advice you might have.\n\nBest regards,\nMohammed Zaharan`;
    } else {
      return `Hi ${contact.name.split(' ')[0]},\n\nI see you work in the DevOps/systems engineering team at ${contact.company}. I'm currently looking at opportunities there and would love to connect and learn about the engineering culture and tech stack in your department.\n\nCheers,\nMohammed Zaharan`;
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendSimulate = (contactId) => {
    setSentSim(prev => ({
      ...prev,
      [contactId]: true
    }));
  };

  const filteredContacts = MOCK_CONTACTS.filter(c => {
    if (filterType === 'All') return true;
    if (filterType === 'Recruiters') return c.type === 'Recruiter';
    if (filterType === 'Alumni') return c.alumni;
    return false;
  });

  return (
    <div className="panel-body">
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Networking Assistant</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Step 9: Smart recruiter suggestions, university alumni links, and customized connection templates.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px', textAlign: 'left', alignItems: 'flex-start' }}>
        
        {/* Contact List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            {['All', 'Recruiters', 'Alumni'].map(type => (
              <button 
                key={type}
                className={`control-btn ${filterType === type ? 'active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '4px' }}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Contacts mapped */}
          {filteredContacts.map(contact => {
            const isSelected = selectedContact.id === contact.id;
            const isSent = sentSim[contact.id];
            
            return (
              <div 
                key={contact.id}
                className={`glass-card ${isSelected ? 'active' : ''}`}
                style={{ 
                  padding: '12px 16px', cursor: 'pointer', display: 'flex', 
                  flexDirection: 'column', gap: '6px',
                  borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)'
                }}
                onClick={() => {
                  setSelectedContact(contact);
                  setCopied(false);
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{contact.name}</span>
                  {contact.alumni && (
                    <span style={{ fontSize: '9px', background: 'var(--color-info-bg)', color: '#22d3ee', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <GraduationCap style={{ width: '10px', height: '10px' }} /> {contact.university} Alumni
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{contact.role}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-primary)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Briefcase style={{ width: '10px', height: '10px' }} /> {contact.reason}
                </div>

                {isSent && (
                  <span style={{ alignSelf: 'flex-start', fontSize: '9px', color: 'var(--color-success)', fontWeight: 'bold', marginTop: '4px' }}>
                    ✓ Invite Sent (Simulated)
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Messaging Panel */}
        {selectedContact && (
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>Message to {selectedContact.name}</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Customized for connection context: {selectedContact.reason}</p>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI Connection Invite Draft</span>
                <button 
                  className="control-btn" 
                  style={{ padding: '2px 8px', fontSize: '10px' }}
                  onClick={() => handleCopy(generateInviteMessage(selectedContact))}
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>

              <textarea 
                readOnly
                className="text-input" 
                style={{ 
                  width: '100%', height: '160px', fontFamily: 'var(--font-mono)', 
                  fontSize: '11px', background: '#0a0a0f', color: '#c084fc', 
                  resize: 'none', lineHeight: '1.4' 
                }}
                value={generateInviteMessage(selectedContact)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1 }}
                onClick={() => handleSendSimulate(selectedContact.id)}
                disabled={sentSim[selectedContact.id]}
              >
                <UserPlus style={{ width: '14px', height: '14px' }} />
                {sentSim[selectedContact.id] ? 'Connection Pending' : 'Simulate LinkedIn Connect'}
              </button>
            </div>
            
            <div style={{ background: 'var(--bg-badge)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '12px', borderRadius: '8px', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Sparkles style={{ width: '14px', height: '14px' }} />
                AI Networking Tips:
              </strong>
              Outreach with personalized messages increases response rates by 68%. Direct referrals from university alumni are the #1 way Sri Lankan professionals bypass ATS filters.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
