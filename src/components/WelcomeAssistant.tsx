import { useState, useEffect } from 'react';
import { MessageSquare, X, ChevronRight } from 'lucide-react';
import chauffeurAvatar from '../assets/chauffeur_avatar.png';
import './WelcomeAssistant.css';

const WelcomeAssistant = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Bonjour ! Bienvenue chez EM Taxi Touristique. Je suis votre assistant virtuel. Nous sommes là pour assurer votre confort et votre sécurité lors de tous vos déplacements. Comment puis-je vous aider aujourd'hui ?";

    useEffect(() => {
        // Show the assistant after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isVisible && step < fullText.length) {
            const typingTimer = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText[step]);
                setStep((prev) => prev + 1);
            }, 30); // Typing speed
            return () => clearTimeout(typingTimer);
        }
    }, [isVisible, step]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setIsVisible(false);
        }
    };

    if (!isVisible && step === 0) return null;

    return (
        <div className={`welcome-assistant ${isVisible ? 'assistant-visible' : 'assistant-hidden'}`}>
            <div className="assistant-card">
                <button className="assistant-close" onClick={handleClose}>
                    <X size={16} />
                </button>

                <div className="assistant-header">
                    <div className="assistant-avatar">
                        <img src={chauffeurAvatar} alt="EM Assistant Chauffeur" />
                        <span className="online-indicator"></span>
                    </div>
                    <div className="assistant-info">
                        <h3>EM Assistant</h3>
                        <p>En ligne</p>
                    </div>
                </div>

                <div className="assistant-body">
                    <div className="message-bubble">
                        <p>{displayedText}<span className="cursor">|</span></p>
                    </div>
                </div>

                <div className="assistant-footer">
                    <button className="assistant-cta" onClick={scrollToContact}>
                        <span>Demander un trajet</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="assistant-toggle" onClick={() => setIsVisible(true)}>
                <MessageSquare size={24} />
            </div>
        </div>
    );
};

export default WelcomeAssistant;
