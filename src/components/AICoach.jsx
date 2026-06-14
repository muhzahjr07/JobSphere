import React, { useState } from 'react';
import { 
  Mic, MicOff, MessageSquare, Code, Server, 
  UserCheck, Trophy, RotateCcw, Check, XCircle, Play, Sparkles
} from 'lucide-react';

const MOCK_QUESTIONS = {
  behavioral: [
    {
      q: "Tell me about a time you had a major production incident. How did you handle it and what did you learn?",
      idealPoints: ["Fast containment", "Communication with stakeholders", "Post-mortem / root cause analysis", "Preventative measures"]
    },
    {
      q: "How do you handle a conflict with a developer who insists their code works, but it breaks the deployment pipeline?",
      idealPoints: ["Objective data/logs review", "Collaborative troubleshooting", "Propose compromise / safety checks", "No-blame culture"]
    }
  ],
  coding: [
    {
      q: "Write a script to parse an Nginx access log file and output the top 5 IP addresses hitting the server with 5xx status codes.",
      idealPoints: ["awk/grep utility speed", "RegEx structure", "Handling large file overhead", "Sorting/counting logic"]
    }
  ],
  system: [
    {
      q: "Design a high-availability, auto-scaling deployment structure for a Web App on AWS. How do you manage databases and state?",
      idealPoints: ["Multi-AZ VPC subnets", "Load balancers (ALB)", "Auto-scaling groups (ASG)", "RDS Read Replicas / ElastiCache"]
    }
  ]
};

const MOCK_QUIZ = [
  {
    id: 1,
    question: "Which Docker instruction defines the default command executed when a container starts?",
    options: ["RUN", "ENTRYPOINT", "CMD", "ENV"],
    answer: 2, // CMD
    explanation: "CMD sets default commands and/or parameters, which can be overwritten from the command line, whereas ENTRYPOINT is meant to run the container as an executable."
  },
  {
    id: 2,
    question: "What is the primary purpose of a Terraform State file (.tfstate)?",
    options: [
      "To store credentials safely", 
      "To map real-world resources to your configuration", 
      "To specify cloud provider credentials", 
      "To act as a backup configuration file"
    ],
    answer: 1, // To map...
    explanation: "Terraform uses state to map real-world resources to your configuration, keep track of metadata, and improve performance for large infrastructures."
  }
];

export default function AICoach() {
  const [activeTab, setActiveTab] = useState('quiz'); // quiz, voice
  
  // Voice Simulation state
  const [sessionType, setSessionType] = useState('behavioral'); // behavioral, coding, system
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isMicOn, setIsMicOn] = useState(false);
  const [coachStatus, setCoachStatus] = useState('idle'); // idle, speaking, listening, evaluating
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const startVoiceSession = (type) => {
    setSessionType(type);
    setSessionStarted(true);
    setCurrentQuestionIdx(0);
    setUserAnswer('');
    setEvaluationResult(null);
    setCoachStatus('speaking');
    
    // Simulate coach reading the question
    setTimeout(() => {
      setCoachStatus('listening');
    }, 2000);
  };

  const handleMicSimulate = () => {
    setIsMicOn(true);
    setCoachStatus('listening');
    setTimeout(() => {
      // Input generic mock answer depending on type
      if (sessionType === 'behavioral') {
        setUserAnswer("In my last role, when our primary database crashed due to an index lock, my first step was to isolate the DB replica and update the AWS Route53 record to redirect read traffic. I worked with the dev team to kill the offending query, brought the system back online within 15 minutes, and then hosted a post-mortem meeting where we added queries limits to prevent repeat incidents.");
      } else if (sessionType === 'coding') {
        setUserAnswer("I would write a bash script using: cat access.log | grep ' 50[0-9] ' | awk '{print $1}' | sort | uniq -c | sort -rn | head -n 5. This extracts the IP addresses, sorts them by count, and shows the top 5.");
      } else {
        setUserAnswer("I would configure an Application Load Balancer in public subnets across 2 Availability Zones. The ALB routes requests to an Auto Scaling Group of EC2 instances in private subnets. For database storage, I'd use Amazon RDS with Multi-AZ deployment enabled, and add Redis Cache in front of it to cache heavy database reads.");
      }
      setIsMicOn(false);
    }, 1500);
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) {
      alert("Please provide an answer first!");
      return;
    }

    setCoachStatus('evaluating');
    
    setTimeout(() => {
      const score = Math.floor(Math.random() * 3) + 7; // 7, 8, or 9
      const question = MOCK_QUESTIONS[sessionType][currentQuestionIdx];
      
      setEvaluationResult({
        score: score,
        strengths: sessionType === 'behavioral' 
          ? "Clear chronological progression, solid incident containment focus, and excellent emphasis on post-incident action items."
          : "Technically sound methodology using native tools, correct operational flow, and good knowledge of AWS architectures.",
        weaknesses: sessionType === 'behavioral'
          ? "Could focus slightly more on how the downtime was communicated to customers during the incident."
          : "Didn't explicitly detail the metric threshold or resource alarms that triggered the alerts.",
        suggestions: "Try incorporating explicit key metrics (e.g., 'restored within 15 minutes', 'saved 20% in database load')."
      });
      setCoachStatus('idle');
    }, 1500);
  };

  const nextQuestion = () => {
    setUserAnswer('');
    setEvaluationResult(null);
    const questionsList = MOCK_QUESTIONS[sessionType];
    
    if (currentQuestionIdx + 1 < questionsList.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setCoachStatus('speaking');
      setTimeout(() => {
        setCoachStatus('listening');
      }, 2000);
    } else {
      // Session finished
      alert("Session completed! Great practice.");
      setSessionStarted(false);
    }
  };

  const resetSession = () => {
    setSessionStarted(false);
    setEvaluationResult(null);
    setUserAnswer('');
  };

  const handleQuizOption = (quizId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [quizId]: optionIdx
    }));
  };

  const scoreQuiz = () => {
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="panel-body">
      {/* Header Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', pb: '12px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>AI Interview Coach</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Step 7: Technical quizzes and voice interview simulation</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`control-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <Trophy style={{ width: '14px', height: '14px' }} />
            Technical Quiz
          </button>
          <button 
            className={`control-btn ${activeTab === 'voice' ? 'active' : ''}`}
            onClick={() => setActiveTab('voice')}
          >
            <Mic style={{ width: '14px', height: '14px' }} />
            Voice Simulator
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        /* QUIZ VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div className="glass-card">
            <div className="glass-card-title">
              <Sparkles style={{ color: 'var(--color-primary)' }} />
              <span>DevOps Competency Quiz</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Test your knowledge on core DevOps and container infrastructure topics. Explanations are provided automatically.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {MOCK_QUIZ.map((quiz, qIdx) => {
                const isSelected = quizAnswers[quiz.id] !== undefined;
                const isCorrect = quizAnswers[quiz.id] === quiz.answer;
                
                return (
                  <div key={quiz.id} style={{ borderBottom: qIdx < MOCK_QUIZ.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: '20px' }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '12px' }}>
                      {quiz.id}. {quiz.question}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {quiz.options.map((option, oIdx) => {
                        const isOptionSelected = quizAnswers[quiz.id] === oIdx;
                        let optionStyle = {
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-color)',
                          padding: '10px 14px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        };

                        if (isOptionSelected) {
                          optionStyle.borderColor = 'var(--color-primary)';
                          optionStyle.background = 'var(--bg-badge)';
                        }

                        if (quizSubmitted) {
                          if (oIdx === quiz.answer) {
                            optionStyle.borderColor = 'var(--color-success)';
                            optionStyle.background = 'var(--color-success-bg)';
                          } else if (isOptionSelected) {
                            optionStyle.borderColor = 'var(--color-danger)';
                            optionStyle.background = 'var(--color-danger-bg)';
                          }
                        }

                        return (
                          <div 
                            key={oIdx} 
                            style={optionStyle} 
                            onClick={() => handleQuizOption(quiz.id, oIdx)}
                          >
                            <span>{option}</span>
                            {quizSubmitted && oIdx === quiz.answer && <Check style={{ width: '16px', height: '16px', color: 'var(--color-success)' }} />}
                            {quizSubmitted && isOptionSelected && oIdx !== quiz.answer && <XCircle style={{ width: '16px', height: '16px', color: 'var(--color-danger)' }} />}
                          </div>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderLeft: '3px solid var(--color-primary)', borderRadius: '4px', marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        <strong>Explanation:</strong> {quiz.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              {!quizSubmitted ? (
                <button 
                  className="btn-primary" 
                  disabled={Object.keys(quizAnswers).length < MOCK_QUIZ.length}
                  onClick={scoreQuiz}
                >
                  Grade Quiz
                </button>
              ) : (
                <button className="btn-secondary" onClick={resetQuiz}>
                  <RotateCcw style={{ width: '14px', height: '14px' }} /> Retry Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* VOICE INTERVIEW SIMULATOR */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          {!sessionStarted ? (
            <div className="glass-card">
              <div className="glass-card-title">
                <Sparkles style={{ color: 'var(--color-primary)' }} />
                <span>Simulate Mock Technical & HR Interviews</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                Test your oral answers on specific subjects. The AI coach will read the questions and evaluate your responses based on standard technical keys.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '12px', padding: '20px' }} onClick={() => startVoiceSession('behavioral')}>
                  <UserCheck style={{ width: '32px', height: '32px', color: 'var(--color-primary)' }} />
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Behavioral Session</div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>HR & Leadership questions</span>
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}><Play style={{ width: '12px', height: '12px' }} /> Start</button>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '12px', padding: '20px' }} onClick={() => startVoiceSession('coding')}>
                  <Code style={{ width: '32px', height: '32px', color: 'var(--color-secondary)' }} />
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Scripting & Linux Quiz</div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Shell scripts & CLI tasks</span>
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}><Play style={{ width: '12px', height: '12px' }} /> Start</button>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '12px', padding: '20px' }} onClick={() => startVoiceSession('system')}>
                  <Server style={{ width: '32px', height: '32px', color: 'var(--color-info)' }} />
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>System Design Panel</div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AWS & Cloud scalability</span>
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}><Play style={{ width: '12px', height: '12px' }} /> Start</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="autopilot-pulse" style={{ backgroundColor: coachStatus === 'listening' ? 'var(--color-success)' : 'var(--color-primary)' }}></span>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {sessionType} Interview - Question {currentQuestionIdx + 1}/{MOCK_QUESTIONS[sessionType].length}
                  </span>
                </div>
                <button className="control-btn" onClick={resetSession} style={{ padding: '4px 10px', fontSize: '11px' }}>
                  Quit Session
                </button>
              </div>

              {/* Speaker Wave Display */}
              <div style={{ background: '#0a0a0f', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '16px', color: '#c084fc', padding: '0 12px' }}>
                  "{MOCK_QUESTIONS[sessionType][currentQuestionIdx].q}"
                </div>

                {/* Animated waves representing audio feedback */}
                {coachStatus === 'speaking' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                    <div className="wave-container">
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Coach is reading question...</span>
                  </div>
                )}

                {coachStatus === 'listening' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                    <Mic className="autopilot-pulse" style={{ color: 'var(--color-success)', width: '24px', height: '24px' }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Microphone open. Speak or type your answer below.</span>
                  </div>
                )}

                {coachStatus === 'evaluating' && (
                  <div>
                    <RefreshCw className="autopilot-pulse" style={{ width: '20px', height: '20px', color: 'var(--color-primary)' }} />
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>AI evaluates response context...</div>
                  </div>
                )}

                {coachStatus === 'idle' && !evaluationResult && (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Waiting to start response.</span>
                )}
              </div>

              {/* Answer Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Your Answer:</span>
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                    onClick={handleMicSimulate}
                    disabled={coachStatus === 'evaluating'}
                  >
                    <Mic style={{ width: '12px', height: '12px', color: 'var(--color-success)' }} />
                    Simulate Voice Input
                  </button>
                </div>

                <textarea 
                  className="text-input"
                  style={{ width: '100%', height: '100px', fontSize: '13px', resize: 'none' }}
                  placeholder="Type your explanation or click 'Simulate Voice Input' to generate a response..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={coachStatus === 'evaluating'}
                />

                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  <button 
                    className="btn-primary" 
                    onClick={submitAnswer}
                    disabled={!userAnswer.trim() || coachStatus === 'evaluating'}
                    style={{ flex: 1 }}
                  >
                    Submit & Evaluate Response
                  </button>
                </div>
              </div>

              {/* Evaluation Results */}
              {evaluationResult && (
                <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles style={{ width: '16px', height: '16px', color: 'var(--color-primary)' }} />
                      AI Evaluation Report
                    </h4>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>
                      Score: {evaluationResult.score}/10
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', background: 'rgba(255,255,255,0.01)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#34d399' }}>✓ Core Strengths:</span>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{evaluationResult.strengths}</p>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#fca5a5' }}>✗ Gaps Identified:</span>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{evaluationResult.weaknesses}</p>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#93c5fd' }}>💡 Coach Recommendation:</span>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{evaluationResult.suggestions}</p>
                    </div>
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', marginTop: '16px' }}
                    onClick={nextQuestion}
                  >
                    {currentQuestionIdx + 1 < MOCK_QUESTIONS[sessionType].length ? 'Next Question' : 'Complete Session'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
