import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, RefreshCw } from 'lucide-react';

export default function CareerCopilot({ profile, setTab, applications, setApplications }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hi Mohammed, I'm your JobSphere AI Copilot. I can search matching roles, automate applications, recommend skill roadmaps, or prepare you for interviews. What can I help you with today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      const lowerMsg = userMsg.toLowerCase();

      if (lowerMsg.includes('apply to the top') || lowerMsg.includes('apply to top')) {
        // Trigger auto apply mock
        const newApps = [
          {
            id: `app-copilot-1-${Date.now()}`,
            jobId: 'job-1',
            title: 'Junior DevOps Engineer',
            company: 'LSEG Sri Lanka',
            location: 'Colombo (Hybrid)',
            salary: 'LKR 190,000',
            matchScore: 87,
            status: 'applied',
            appliedDate: new Date().toLocaleDateString(),
            notes: 'Auto-applied via Career Copilot Chat command.'
          },
          {
            id: `app-copilot-2-${Date.now()}`,
            jobId: 'job-3',
            title: 'Remote Site Reliability Engineer',
            company: 'Sysco Labs',
            location: 'Remote (US Hours)',
            salary: '$2,400 / mo',
            matchScore: 92,
            status: 'applied',
            appliedDate: new Date().toLocaleDateString(),
            notes: 'Auto-applied via Career Copilot Chat command.'
          }
        ];
        
        // Add to main applications pipeline without repeating
        setApplications(prev => {
          const currentIds = prev.map(a => a.jobId);
          const filteredNew = newApps.filter(n => !currentIds.includes(n.jobId));
          return [...prev, ...filteredNew];
        });

        aiText = "Done! I have compiled your CV details, tailored cover letters, and applied to LSEG Sri Lanka (87% Match) and Sysco Labs (92% Match). I have tracked these in the 'Applied' column of your CRM.";
      } 
      else if (lowerMsg.includes('jobs paying above') || lowerMsg.includes('find me jobs') || lowerMsg.includes('jobs')) {
        aiText = "I found 3 matching jobs paying above LKR 150,000 / $2,000 remote: \n1. Junior DevOps Engineer at LSEG (LKR 190,000)\n2. Cloud Engineer at WSO2 (LKR 210,000)\n3. Remote SRE at Sysco Labs ($2,400/mo).\n\nWould you like me to apply to the top 2 matches?";
      } 
      else if (lowerMsg.includes('interview') || lowerMsg.includes('prepare') || lowerMsg.includes('quiz')) {
        aiText = "Sure! I have initialized mock interview sessions. Go to the 'AI Coach' tab, where we can start a Voice Simulator mock interview or practice with Technical Quizzes.";
        setTimeout(() => setTab('coach'), 2000);
      } 
      else if (lowerMsg.includes('skill') || lowerMsg.includes('learn') || lowerMsg.includes('docker') || lowerMsg.includes('kubernetes')) {
        aiText = "Looking at your target role (DevOps Engineer) gaps, I highly recommend building Docker proficiency first, then advancing to Kubernetes clusters. I have populated a full roadmap in the 'Skill Academy' tab.";
        setTimeout(() => setTab('academy'), 2000);
      } 
      else if (lowerMsg.includes('salary') || lowerMsg.includes('colombo') || lowerMsg.includes('lkr')) {
        aiText = "In Colombo, DevOps average salaries are LKR 180,000 for mid-level, with top 25% earning LKR 320,000+. Your current expectations are LKR 220,000. I can negotiate remote offers reaching $2,500+.";
      }
      else {
        aiText = "I understand. I can help search jobs matching your criteria, parse your CV keywords, draft emails to recruiters, or automate follow-ups. Try asking: 'Find me remote DevOps jobs' or 'Apply to the top jobs'.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="panel-body" style={{ height: '100%', padding: '0', display: 'flex', flexDirection: 'column' }}>
      <div className="chat-window">
        {/* Chat Header */}
        <div style={{ background: 'var(--bg-sidebar)', padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <Sparkles style={{ color: 'var(--color-primary)', width: '18px', height: '18px' }} />
            <div>
              <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--text-primary)' }}>JobSphere AI Copilot</span>
              <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-success)' }}>● Agent online</span>
            </div>
          </div>
        </div>

        {/* Messages list */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '10px', color: msg.sender === 'ai' ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)' }}>
                {msg.sender === 'ai' ? <Sparkles style={{ width: '10px', height: '10px' }} /> : <User style={{ width: '10px', height: '10px' }} />}
                <span>{msg.sender === 'ai' ? 'AI' : 'You'}</span>
              </div>
              <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message ai" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <RefreshCw className="autopilot-pulse" style={{ width: '14px', height: '14px', color: 'var(--color-primary)' }} />
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="chat-input-area">
          <input 
            type="text" 
            className="chat-input"
            placeholder="Ask AI e.g., 'Find me remote DevOps jobs', 'Apply to the top matches'..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <button 
            className="btn-primary" 
            style={{ borderRadius: '20px', padding: '10px' }}
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
          >
            <Send style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
