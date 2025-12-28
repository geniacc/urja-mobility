import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-header">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Enter your credentials to access your account' : 'Sign up to get started with Urja'}</p>
          </div>

          <form className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="john@example.com" />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" />
            </div>

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="card-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button className="toggle-btn" onClick={toggleMode}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: radial-gradient(circle at center, var(--bg-2) 0%, var(--bg) 100%);
        }

        .login-container {
          width: 100%;
          max-width: 450px;
          perspective: 1000px;
        }

        .login-card {
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 3rem;
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gradient-main);
        }

        .card-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .card-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: var(--gradient-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text);
        }

        .form-group input {
          background: var(--bg-3);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          color: var(--text);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-glow);
        }

        .submit-btn {
          margin-top: 1rem;
          background: var(--gradient-main);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .card-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.95rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          padding: 0;
          margin-left: 0.5rem;
        }

        .toggle-btn:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
