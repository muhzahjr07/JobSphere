import React, { useState } from 'react';
import { 
  Calendar, Users, Clock, FileText, MessageSquare, 
  Trash2, ChevronLeft, ChevronRight, CheckSquare, CornerDownRight, X
} from 'lucide-react';

const STAGES = [
  { id: 'saved', name: 'Saved' },
  { id: 'applied', name: 'Applied' },
  { id: 'assessment', name: 'Assessment' },
  { id: 'interview', name: 'Interview' },
  { id: 'offer', name: 'Offer' },
  { id: 'hired', name: 'Hired' }
];

export default function ApplicationCRM({ applications, setApplications }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeMobileStage, setActiveMobileStage] = useState('applied'); // for mobile single-column toggle
  
  // Custom states for notes and contact editing
  const [editNotes, setEditNotes] = useState('');
  const [showFollowupEmail, setShowFollowupEmail] = useState(false);

  const moveStage = (appId, direction) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      
      const currentIdx = STAGES.findIndex(s => s.id === app.status);
      let nextIdx = currentIdx + direction;
      
      if (nextIdx >= 0 && nextIdx < STAGES.length) {
        const nextStatus = STAGES[nextIdx].id;
        return { 
          ...app, 
          status: nextStatus,
          // Update applied date if transitioning to 'applied'
          appliedDate: nextStatus === 'applied' && !app.appliedDate ? new Date().toLocaleDateString() : app.appliedDate
        };
      }
      return app;
    }));

    // Update active modal selected app too
    if (selectedApp && selectedApp.id === appId) {
      const currentIdx = STAGES.findIndex(s => s.id === selectedApp.status);
      let nextIdx = currentIdx + direction;
      if (nextIdx >= 0 && nextIdx < STAGES.length) {
        setSelectedApp(prev => ({ ...prev, status: STAGES[nextIdx].id }));
      }
    }
  };

  const deleteApplication = (appId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications(prev => prev.filter(app => app.id !== appId));
      setSelectedApp(null);
    }
  };

  const saveNotes = (appId) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, notes: editNotes };
      }
      return app;
    }));
    alert("Notes saved successfully!");
  };

  const handleCardClick = (app) => {
    setSelectedApp(app);
    setEditNotes(app.notes || '');
    setShowFollowupEmail(false);
  };

  // Generate automated follow-up email text
  const getFollowupEmail = (app) => {
    return `Subject: Follow-up regarding application for ${app.title} - Mohammed Zaharan\n\nDear ${app.contact ? app.contact.split(' ')[0] : 'Hiring Manager'},\n\nI hope you are doing well.\n\nI wanted to follow up regarding the ${app.title} application I submitted on ${app.appliedDate || 'recently'}. I remain very interested in the opportunity to join the team at ${app.company} and would appreciate any updates on the recruitment process.\n\nIf there are any additional documents or references you require, please let me know. Thank you for your time and continued consideration.\n\nBest Regards,\nMohammed Zaharan\n${app.contactEmail ? `Cc: ${app.contactEmail}` : ''}`;
  };

  // Check if an application is due for a follow-up (e.g. applied more than 7 days ago)
  const isFollowupDue = (app) => {
    if (!app.appliedDate || app.status !== 'applied') return false;
    
    // Quick mock: if notes contain "simulate-due" or just random date difference
    try {
      const parts = app.appliedDate.split('/');
      if (parts.length === 3) {
        const appDate = new Date(parts[2], parts[0] - 1, parts[1]);
        const diff = Date.now() - appDate.getTime();
        return diff > 7 * 24 * 60 * 60 * 1000; // 7 days in ms
      }
    } catch (e) {}
    // default: fallback if it is a demo app
    return app.jobId === 'job-1'; // Mock LSEG due for follow-up as demo
  };

  return (
    <div className="panel-body" style={{ height: '100%' }}>
      {/* Detail Modal Overlay */}
      {selectedApp && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(10, 10, 15, 0.9)', zIndex: 998,
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'
        }}>
          <div className="glass-card" style={{ maxWidth: '600px', width: '100%', textAlign: 'left', maxHeight: '90%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedApp.title}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedApp.company} • {selectedApp.location}</div>
              </div>
              <button className="control-btn" onClick={() => setSelectedApp(null)}><X style={{ width: '14px', height: '14px' }} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              
              {/* Status Switcher */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-input)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Current Stage:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    className="control-btn" 
                    onClick={() => moveStage(selectedApp.id, -1)}
                    disabled={selectedApp.status === 'saved'}
                    style={{ padding: '4px 8px' }}
                  >
                    <ChevronLeft style={{ width: '14px', height: '14px' }} />
                  </button>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--color-primary)', textTransform: 'capitalize' }}>
                    {selectedApp.status}
                  </span>
                  <button 
                    className="control-btn" 
                    onClick={() => moveStage(selectedApp.id, 1)}
                    disabled={selectedApp.status === 'hired'}
                    style={{ padding: '4px 8px' }}
                  >
                    <ChevronRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>

              {/* Contacts */}
              <div style={{ fontSize: '13px' }}>
                <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Recruiter Contacts</div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                  <div>👨‍💼 {selectedApp.contact || 'No recruiter contact set'}</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '12px' }}>✉ {selectedApp.contactEmail || 'No email set'}</div>
                </div>
              </div>

              {/* CRM Application Notes */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>Application Notes</span>
                  <button 
                    className="control-btn" 
                    style={{ padding: '2px 8px', fontSize: '10px' }}
                    onClick={() => saveNotes(selectedApp.id)}
                  >
                    Save Notes
                  </button>
                </div>
                <textarea 
                  className="text-input" 
                  style={{ width: '100%', height: '80px', fontSize: '13px', resize: 'none' }}
                  placeholder="Add notes about interview questions, tech stacks, or response dates..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
              </div>

              {/* Follow-up Reminder / Generator */}
              {selectedApp.status === 'applied' && (
                <div style={{ 
                  background: isFollowupDue(selectedApp) ? 'var(--color-warning-bg)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isFollowupDue(selectedApp) ? 'var(--color-warning)' : 'var(--border-color)'}`,
                  padding: '12px', borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: isFollowupDue(selectedApp) ? '#f59e0b' : 'var(--text-primary)' }}>
                      <Clock style={{ width: '16px', height: '16px' }} />
                      <span>{isFollowupDue(selectedApp) ? 'Follow-up Email Due (7+ days since applying)' : 'AI Follow-up Engine Ready'}</span>
                    </div>
                    <button 
                      className="control-btn" 
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                      onClick={() => setShowFollowupEmail(!showFollowupEmail)}
                    >
                      {showFollowupEmail ? 'Hide Email' : 'Generate Email'}
                    </button>
                  </div>

                  {showFollowupEmail && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Copy this follow-up email and send to the hiring team:</p>
                      <textarea 
                        readOnly 
                        className="text-input" 
                        style={{ width: '100%', height: '140px', fontFamily: 'var(--font-mono)', fontSize: '11px', background: '#0a0a0f', color: '#f59e0b', resize: 'none' }}
                        value={getFollowupEmail(selectedApp)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Delete / Actions */}
              <div style={{ display: 'flex', justifyItems: 'flex-end', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                <button 
                  className="btn-secondary" 
                  style={{ color: 'var(--color-danger)', borderColor: 'rgba(239, 68, 68, 0.2)', padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => deleteApplication(selectedApp.id)}
                >
                  <Trash2 style={{ width: '14px', height: '14px' }} /> Delete Application Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Board view */}
      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Application CRM Pipeline</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Organize your applications through stages. Click on cards to access recruiter notes and generate follow-up reminders.
        </p>

        {/* Mobile Stage Selector (Only renders/adjusts if columns stack) */}
        <div className="mobile-stage-selector" style={{ display: 'none', gap: '6px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {STAGES.map(stage => {
            const count = applications.filter(a => a.status === stage.id).length;
            return (
              <button 
                key={stage.id} 
                className={`control-btn ${activeMobileStage === stage.id ? 'active' : ''}`}
                style={{ fontSize: '11px', padding: '6px 12px' }}
                onClick={() => setActiveMobileStage(stage.id)}
              >
                {stage.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Kanban Board Container */}
        <div className="pipeline-container">
          {STAGES.map(stage => {
            const stageApps = applications.filter(a => a.status === stage.id);
            return (
              <div 
                key={stage.id} 
                className="pipeline-column"
                style={{
                  // Hide column in mobile view if it is not active
                  display: 'flex'
                }}
              >
                <div className="column-header">
                  <span>{stage.name}</span>
                  <span className="column-count">{stageApps.length}</span>
                </div>

                <div className="column-cards">
                  {stageApps.length === 0 ? (
                    <div style={{ 
                      border: '1px dashed var(--border-color)', borderRadius: '8px', 
                      height: '80px', display: 'flex', alignItems: 'center', 
                      justifyContent: 'center', fontSize: '11px', color: 'var(--text-muted)' 
                    }}>
                      No jobs
                    </div>
                  ) : (
                    stageApps.map(app => {
                      const followupDue = isFollowupDue(app);
                      return (
                        <div 
                          key={app.id} 
                          className="crm-card"
                          onClick={() => handleCardClick(app)}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                            <span style={{ fontWeight: '600', fontSize: '12px', color: 'var(--text-primary)' }}>{app.title}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{app.matchScore}%</span>
                          </div>
                          
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            🏢 {app.company}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Calendar style={{ width: '10px', height: '10px' }} />
                              {app.appliedDate || 'No date'}
                            </span>
                            
                            {followupDue && (
                              <span style={{ 
                                background: 'var(--color-warning-bg)', color: '#f59e0b', 
                                padding: '1px 4px', borderRadius: '4px', display: 'flex', 
                                alignItems: 'center', gap: '2px', fontWeight: 'bold' 
                              }}>
                                ⏰ Follow-up
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
