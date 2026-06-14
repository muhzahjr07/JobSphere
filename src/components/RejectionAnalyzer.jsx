import React, { useState } from 'react';
import { 
  ShieldAlert, Activity, TrendingDown, BarChart3, Compass, CheckCircle, RefreshCw
} from 'lucide-react';

export default function RejectionAnalyzer({ profile }) {
  const [pastedEmail, setPastedEmail] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [customFeedback, setCustomFeedback] = useState(null);

  // Global rejection analytics (Step 6 competitors don't have details)
  const [stats, setStats] = useState({
    sent: 50,
    responses: 2,
    rejections: 18,
    reasons: {
      skills: 40,
      experience: 35,
      ats: 25
    }
  });

  const analyzeEmail = () => {
    if (!pastedEmail.trim()) {
      alert("Please paste a rejection email to analyze!");
      return;
    }

    setAnalyzing(true);
    
    setTimeout(() => {
      let reasonType = 'skills';
      let extractText = '';
      let keywords = [];

      const lowerEmail = pastedEmail.toLowerCase();
      if (lowerEmail.includes('experience') || lowerEmail.includes('years')) {
        reasonType = 'experience';
        extractText = "The email references an experience gap (we require candidates with extensive hands-on operational practice).";
        keywords = ['3+ years in ops', 'handled staging scaling', 'production incident management'];
      } else if (lowerEmail.includes('kubernetes') || lowerEmail.includes('terraform') || lowerEmail.includes('docker')) {
        reasonType = 'skills';
        extractText = "Identified missing tech stack skills: specifically Docker/Kubernetes/Terraform configurations.";
        keywords = ['Kubernetes Pods & Ingress', 'Terraform Provisioning', 'Docker Multi-stage Builds'];
      } else {
        reasonType = 'ats';
        extractText = "Generic layout and boilerplate text suggests early-stage automated ATS filtering. The format or file layout may not be readable by scanning parsers.";
        keywords = ['Use clean PDF layout', 'Remove CSS graphics in raw CV', 'Incorporate exact role keyword matches'];
      }

      setCustomFeedback({
        reason: reasonType,
        explanation: extractText,
        recommendedKeywords: keywords
      });

      // Update counters to simulate adding to the database
      setStats(prev => {
        const nextRejections = prev.rejections + 1;
        const nextReasons = { ...prev.reasons };
        nextReasons[reasonType] = Math.round(((prev.reasons[reasonType] * prev.rejections + 100) / nextRejections));
        return {
          ...prev,
          rejections: nextRejections,
          sent: prev.sent + 1,
          reasons: nextReasons
        };
      });

      setAnalyzing(false);
    }, 1200);
  };

  const loadSampleRejection = () => {
    setPastedEmail(`Dear Mohammed Zaharan,

Thank you for your interest in the DevOps Engineer position at WSO2. We were impressed with your systems background; however, we are looking for someone with stronger hands-on experience in Kubernetes configurations and Terraform scripts. 

Therefore, we have decided to proceed with other candidates whose technical skills align more closely with our stack. We wish you the best in your career.

Best Regards,
WSO2 Talent Team`);
  };

  if (!profile) {
    return (
      <div className="panel-body">
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Profile Not Created</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
            Initialize your profile to run rejection assessments.
          </p>
        </div>
      </div>
    );
  }

  const responseRate = Math.round((stats.responses / stats.sent) * 100);

  return (
    <div className="panel-body">
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Rejection Intelligence & Application Health</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Analyze rejection email patterns and check your overall CV-to-ATS health.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px', textAlign: 'left', alignItems: 'flex-start' }}>
        
        {/* Left: Overall Health Dashboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card">
            <div className="glass-card-title">
              <Activity style={{ color: 'var(--color-primary)' }} />
              <span>Job Application Health Score</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '12px 0 20px 0' }}>
              <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Applications Sent</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>{stats.sent}</div>
              </div>
              <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Response Rate</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: responseRate < 10 ? 'var(--color-danger)' : 'var(--color-success)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>{responseRate}%</div>
              </div>
            </div>

            {responseRate < 10 && (
              <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#fca5a5', lineHeight: '1.4' }}>
                <strong>Critical Issue Identified:</strong>
                <p style={{ marginTop: '4px' }}>Your response rate of {responseRate}% is below the industry standard (15%). Our diagnosis suggests your CV is failing automated ATS filtering.</p>
              </div>
            )}
          </div>

          {/* Rejection Factors Pie simulated chart */}
          <div className="glass-card">
            <div className="glass-card-title">
              <BarChart3 style={{ color: 'var(--color-secondary)' }} />
              <span>AI Rejection Distribution ({stats.rejections} Cases)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <span>Missing Skills</span>
                  <span style={{ fontWeight: 'bold' }}>{stats.reasons.skills}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${stats.reasons.skills}%`, height: '100%', background: 'var(--color-danger)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <span>Experience Gaps</span>
                  <span style={{ fontWeight: 'bold' }}>{stats.reasons.experience}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${stats.reasons.experience}%`, height: '100%', background: 'var(--color-warning)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <span>ATS Screening Discard</span>
                  <span style={{ fontWeight: 'bold' }}>{stats.reasons.ats}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${stats.reasons.ats}%`, height: '100%', background: 'var(--color-primary)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Analyzer tool */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-card-title" style={{ justifyContent: 'space-between', width: '100%', display: 'flex' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert style={{ color: 'var(--color-warning)' }} />
                AI Rejection Analyzer
              </span>
              <button 
                className="control-btn" 
                style={{ fontSize: '10px', padding: '2px 8px' }}
                onClick={loadSampleRejection}
              >
                Load Sample Email
              </button>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Paste a rejection email below. Our AI will analyze the reason and recommend concrete keyword or skill adjustments.
            </p>

            <textarea 
              className="text-input" 
              style={{ width: '100%', height: '120px', fontSize: '12px', resize: 'none', fontFamily: 'var(--font-mono)' }}
              placeholder="Paste email headers and body text here..."
              value={pastedEmail}
              onChange={(e) => setPastedEmail(e.target.value)}
              disabled={analyzing}
            />

            <button 
              className="btn-primary" 
              onClick={analyzeEmail} 
              disabled={analyzing || !pastedEmail.trim()}
              style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
            >
              {analyzing ? (
                <>
                  <RefreshCw className="autopilot-pulse" style={{ width: '16px', height: '16px' }} /> Analyzing...
                </>
              ) : (
                'Analyze Rejection Reason'
              )}
            </button>
          </div>

          {/* Analysis Report Output */}
          {customFeedback && (
            <div className="glass-card" style={{ borderLeft: '4px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass style={{ color: 'var(--color-primary)' }} />
                <span>AI Rejection Feedback Report</span>
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                <strong>Extracted Issue:</strong> {customFeedback.explanation}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Recommended CV Optimizations</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {customFeedback.recommendedKeywords.map((kw, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                      <CheckCircle style={{ width: '14px', height: '14px', color: 'var(--color-success)', flexShrink: 0 }} />
                      <span>Add keyword: <strong style={{ color: 'var(--text-primary)' }}>"{kw}"</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
