import { Mail, Phone, MapPin, Send, Box } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="container section-padding animate-fade perspective-container">
            <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                {/* Contact Info & 3D Element */}
                <div className="card-3d">
                    <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Let's <span className="gradient-text">Connect</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '500px' }}>
                        Have questions? Our team is here to help you navigate your learning journey.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div className="glass" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Email Us</div>
                                <div style={{ color: 'var(--text-muted)' }}>hello@learnflow.ai</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div className="glass" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Call Us</div>
                                <div style={{ color: 'var(--text-muted)' }}>+1 (555) 000-FLOW</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div className="glass" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Visit Us</div>
                                <div style={{ color: 'var(--text-muted)' }}>123 Innovation Dr, SF, CA</div>
                            </div>
                        </div>
                    </div>

                    {/* Simple CSS 3D "Model" */}
                    <div className="animate-float-3d" style={{ marginTop: '4rem', width: '150px', height: '150px', position: 'relative', transformStyle: 'preserve-3d', margin: '4rem auto 0' }}>
                        <div className="glass" style={{ position: 'absolute', width: '100%', height: '100%', transform: 'translateZ(75px)', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box size={40} color="var(--primary)" />
                        </div>
                        <div className="glass" style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotateY(90deg) translateZ(75px)', opacity: 0.5 }}></div>
                        <div className="glass" style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotateY(-90deg) translateZ(75px)', opacity: 0.5 }}></div>
                        <div className="glass" style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotateX(90deg) translateZ(75px)', opacity: 0.5 }}></div>
                        <div className="glass" style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotateX(-90deg) translateZ(75px)', opacity: 0.5 }}></div>
                        <div className="glass" style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotateY(180deg) translateZ(75px)', opacity: 0.8 }}></div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass card-3d" style={{ padding: '3rem', boxShadow: 'var(--shadow)' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card-3d-content">
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Name</label>
                            <input type="text" className="glass" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }} placeholder="Your Name" />
                        </div>
                        <div className="card-3d-content">
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Email</label>
                            <input type="email" className="glass" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }} placeholder="Your Email" />
                        </div>
                        <div className="card-3d-content">
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Message</label>
                            <textarea className="glass" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid var(--glass-border)', minHeight: '150px' }} placeholder="How can we help?"></textarea>
                        </div>
                        <button type="submit" className="btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
