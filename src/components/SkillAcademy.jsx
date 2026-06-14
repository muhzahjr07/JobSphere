import React, { useState } from 'react';
import { 
  BookOpen, ExternalLink, Code2, CheckCircle, PlayCircle, Award, Check
} from 'lucide-react';

const SKILL_ROADMAPS = {
  'Docker': {
    time: '2 Weeks',
    level: 'Beginner',
    topics: ['Containers vs VMs', 'Dockerfile instructions', 'Multi-stage builds', 'Docker Compose files', 'Volume & Network binds'],
    project: 'Containerize a multi-service MERN application with Docker Compose and optimize image size from 800MB to 50MB.',
    cert: 'Docker Certified Associate (DCA)'
  },
  'Kubernetes': {
    time: '4 Weeks',
    level: 'Intermediate',
    topics: ['Pods & Deployments', 'Services & Ingress Controllers', 'ConfigMaps & Secrets', 'Persistent Volumes', 'Helm Charts basics'],
    project: 'Deploy a high-availability node app to a local Minikube cluster with horizontal autoscaling (HPA) and ingress routing.',
    cert: 'Certified Kubernetes Administrator (CKA)'
  },
  'Terraform': {
    time: '3 Weeks',
    level: 'Intermediate',
    topics: ['HCL Syntax & Providers', 'Variables & Output values', 'Terraform State Management', 'Modules reuse', 'Remote backends (S3)'],
    project: 'Write reusable Terraform modules to provision an AWS VPC with private subnets, EC2 instances, and an ALB.',
    cert: 'HashiCorp Certified: Terraform Associate'
  },
  'CI/CD Pipelines': {
    time: '3 Weeks',
    level: 'Intermediate',
    topics: ['Pipeline triggers & events', 'Build/Test/Deploy stages', 'GitHub Actions / GitLab CI', 'Runner configuration', 'Secret mask settings'],
    project: 'Configure a GitHub Actions workflow that runs Jest tests, builds a Docker image, and auto-pushes it to AWS ECR on git tag push.',
    cert: 'AWS Certified DevOps Engineer'
  },
  'Ansible': {
    time: '2 Weeks',
    level: 'Beginner',
    topics: ['Inventory files', 'Playbooks writing', 'Ad-hoc commands', 'Roles & Galaxy', 'Ansible Vault encryption'],
    project: 'Create playbooks to automatically configure and patch 3 Nginx servers and set up basic SSL directories.',
    cert: 'Red Hat Certified Specialist in Ansible Automation'
  }
};

export default function SkillAcademy({ profile, acquireSkill }) {
  const [selectedSkill, setSelectedSkill] = useState('Docker');
  const [completedSteps, setCompletedSteps] = useState({});

  if (!profile) {
    return (
      <div className="panel-body">
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Profile Not Created</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
            Initialize your career profile first to generate a personalized Skill Academy roadmap.
          </p>
        </div>
      </div>
    );
  }

  const toggleStep = (skillName, stepIdx) => {
    const key = `${skillName}-${stepIdx}`;
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcquire = (skillName) => {
    acquireSkill(skillName);
    alert(`Congratulations! "${skillName}" has been added to your profile skills. Your readiness score has increased!`);
  };

  // Compile list of skills to show roadmaps for
  const academySkills = [...profile.missingSkills, ...profile.skills].filter(s => SKILL_ROADMAPS[s]);

  return (
    <div className="panel-body">
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Skill Gap Academy</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Step 8: Specialized roadmaps and project checklists targeting your DevOps goals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'flex-start', textAlign: 'left' }}>
        
        {/* Left: Skill list selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '4px' }}>
            Recommended Roadmaps
          </div>
          {academySkills.map(skill => {
            const isMissing = profile.missingSkills.includes(skill);
            const roadmap = SKILL_ROADMAPS[skill];
            
            return (
              <div 
                key={skill}
                className={`glass-card ${selectedSkill === skill ? 'active' : ''}`}
                style={{ 
                  padding: '12px 16px', cursor: 'pointer', display: 'flex', 
                  justifyContent: 'space-between', alignItems: 'center',
                  borderColor: selectedSkill === skill ? 'var(--color-primary)' : 'var(--border-color)',
                  background: isMissing ? 'rgba(239, 68, 68, 0.02)' : 'rgba(16, 185, 129, 0.02)'
                }}
                onClick={() => setSelectedSkill(skill)}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{skill}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {roadmap.time} • {roadmap.level}
                  </div>
                </div>

                <span style={{ 
                  fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold',
                  background: isMissing ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.15)',
                  color: isMissing ? '#fca5a5' : '#10b981'
                }}>
                  {isMissing ? 'Gap' : 'Acquired'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Roadmap panel */}
        {selectedSkill && SKILL_ROADMAPS[selectedSkill] && (
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedSkill} Masterclass Roadmap</h4>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Estimate time: {SKILL_ROADMAPS[selectedSkill].time} | Level: {SKILL_ROADMAPS[selectedSkill].level}
                </div>
              </div>
              
              {profile.missingSkills.includes(selectedSkill) ? (
                <button 
                  className="btn-primary" 
                  style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--color-success)' }}
                  onClick={() => handleAcquire(selectedSkill)}
                >
                  Mark Skill as Acquired
                </button>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-success)', fontWeight: 'bold' }}>
                  <CheckCircle style={{ width: '16px', height: '16px' }} /> Acquired
                </span>
              )}
            </div>

            {/* Syllabus */}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Key Learning Objectives</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SKILL_ROADMAPS[selectedSkill].topics.map((topic, idx) => {
                  const isDone = completedSteps[`${selectedSkill}-${idx}`];
                  return (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', padding: '6px', background: 'rgba(255,255,255,0.01)', borderRadius: '4px' }}>
                      <input 
                        type="checkbox" 
                        checked={!!isDone} 
                        onChange={() => toggleStep(selectedSkill, idx)}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <span style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                        {topic}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Capstone project */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: 'var(--color-secondary)', marginBottom: '6px' }}>
                <Code2 style={{ width: '16px', height: '16px' }} />
                <span>Hands-on Capstone Project</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {SKILL_ROADMAPS[selectedSkill].project}
              </p>
            </div>

            {/* Certification recommendation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-input)', padding: '10px 14px', borderRadius: '6px', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award style={{ width: '16px', height: '16px', color: 'var(--color-warning)' }} />
                Target Certification:
              </span>
              <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                {SKILL_ROADMAPS[selectedSkill].cert}
              </span>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
