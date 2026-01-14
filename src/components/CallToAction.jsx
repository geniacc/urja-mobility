import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Mail, Phone, Calendar } from 'lucide-react';

const CallToAction = () => {
  return (
    <section style={{ 
      padding: '5rem 2rem', 
      background: 'linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '300px',
        height: '300px',
        background: 'var(--primary)',
        opacity: 0.05,
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '300px',
        height: '300px',
        background: 'var(--accent)',
        opacity: 0.05,
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          alignItems: 'center' 
        }}>
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(var(--primary-rgb), 0.1)',
              color: 'var(--primary)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              <Zap size={16} fill="currentColor" />
              <span>Ready to Switch?</span>
            </div>
            
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '1.5rem',
              lineHeight: 1.2,
              background: 'linear-gradient(90deg, var(--foreground) 0%, var(--muted) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Power Your Future <br /> With Urja
            </h2>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--muted)', 
              marginBottom: '2rem',
              maxWidth: '500px',
              lineHeight: 1.6
            }}>
              Join thousands of businesses and homeowners who have switched to our advanced energy storage solutions. Sustainable, reliable, and efficient.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(var(--primary-rgb), 0.3)'
                }}
              >
                Get a Quote <ArrowRight size={18} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2rem',
                  background: 'transparent',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Calendar size={18} /> Schedule Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side: Interactive Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'var(--bg-1)',
              padding: '2.5rem',
              borderRadius: '24px',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Contact Sales</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ 
                  padding: '0.8rem', 
                  background: 'var(--bg-2)', 
                  borderRadius: '12px',
                  color: 'var(--primary)'
                }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.2rem' }}>Email Us</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>sales@urjaglobal.in</p>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>support@urjaglobal.in</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ 
                  padding: '0.8rem', 
                  background: 'var(--bg-2)', 
                  borderRadius: '12px',
                  color: 'var(--accent)'
                }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.2rem' }}>Call Us</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>+91-11-25279143</p>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Mon-Sat, 9am - 6pm IST</p>
                </div>
              </div>
              
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                background: 'rgba(16, 185, 129, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Zap size={16} fill="currentColor" />
                <span>Typical response time: &lt; 2 hours</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;
