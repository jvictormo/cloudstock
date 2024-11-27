import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hrRef = useRef<HTMLHRElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
      if(token) {
          navigate("/dashboard")
      }

    const hr = hrRef.current;
    if (!hr) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            hr.classList.add('visible');
          }, 500);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(hr);

    return () => {
      observer.disconnect();
    };
  }, []);

  const faqs = [
    {
      question: "O que é a CloudStock?",
      answer: "A CloudStock é uma solução de gestão de estoque baseada em nuvem que permite que empresas monitorem e gerenciem seus recursos de forma eficiente, acessando informações em tempo real de qualquer lugar."
    },
    {
      question: "Quais são os principais benefícios da CloudStock?",
      answer: "Os principais benefícios incluem acesso remoto e em tempo real, redução de custos operacionais, segurança avançada dos dados e uma interface intuitiva que simplifica a gestão de estoque."
    },
    {
      question: "A CloudStock é segura?",
      answer: "Sim! A CloudStock utiliza tecnologia avançada de segurança, incluindo criptografia de dados e backups regulares, para garantir a integridade e proteção das suas informações."
    },
    {
      question: "Como posso migrar meu sistema de gestão de estoque para a CloudStock?",
      answer: "A migração é simples e nossa equipe oferece suporte completo durante o processo. Fornecemos orientações passo a passo para garantir uma transição suave e sem complicações."
    },
    {
      question: "Existe suporte ao cliente disponível?",
      answer: "Sim, oferecemos suporte ao cliente 24/7 para ajudar com qualquer dúvida ou problema que você possa encontrar ao usar a CloudStock."
    }
  ];

  const handleQuestionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  function handleLogInRegister(typeOfPage: string) {
    if (typeOfPage == "login") {
      navigate('/login');
    } else {
      navigate('/register');
    }
  }

  return (
    <>
      <header className='landingpage-header'>
        <div className='landingpage-containers'>
          <img />
          <h3>CloudStock</h3>
        </div>
        <div className='landingpage-containers'>
          <button onClick={() => handleLogInRegister("login")}>Login</button>
          <button onClick={() => handleLogInRegister("register")}>Registrar</button>
        </div>
      </header>
      <div className='landingpage-main-cover'>
        <div>
          <div className='landingpage-cloud-stock-facility-class'>Cloud + Estoque + Facilidade</div>
          <h4>Mais Controle,<br />Menos Complicações</h4>
          <p>Simplifique a gestão de estoque com uma solução escalável e fácil de usar.</p>
          <button onClick={() => handleLogInRegister("register")}>Comece agora</button>
        </div>
        <img src={"Server-cuate.svg"} />
      </div>
      <div className='ladingpage-trustworth-companies'>
        <h4>Alcance o sucesso que você merece com a CloudStock!</h4>
        <h5>Empresas que confiam em nossos serviços</h5>
        <hr ref={hrRef} />
        <div className='landingpage-companies-container'>
          <div className='landingpage-companies-squares'>
            <img src="air-down-logo.png" />
          </div>
          <div className='landingpage-companies-squares'>
            <img src="compose-logo.png" />
          </div>
          <div className='landingpage-companies-squares'>
            <img src="siekens-logo.png" />
          </div>
        </div>
        <div className='landingpage-cloudstock-question'>
          <div>
            <h5>Promova sua empresa</h5>
            <h3>Porque usar a CloudStock e porque ela pode ajudar sua empresa a gerenciar seus recursos ?</h3>
            <p>
              Na era digital, a eficiência na gestão de recursos é essencial. CloudStock é a solução que sua empresa precisa para modernizar e simplificar o gerenciamento de estoque.
              <br />
              <b>CloudStock: Modernizando a Gestão de Estoque com Tecnologia em Nuvem</b>
              <br />
              Com o nosso aplicativo seguro, você poderá migrar seu sistema de gestão de estoque para a nuvem, garantindo acesso remoto e em tempo real às informações, de qualquer lugar.
            </p>
          </div>
          <div className='landingpage-cloudstock-question-image-container'>
            <img src={"Business-Plan-amico.svg"} />
          </div>
        </div>
      </div>
      <div className="landingpage-faq">
        <p>FAQ</p>
        <h4>Perguntas Frequentes</h4>
        <div className="landingpage-faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="landingpage-faq-item">
              <div className="landingpage-faq-question" onClick={() => handleQuestionClick(index)}>
                <label>{faq.question}</label>
                <img
                  src={"arrow.svg"}
                  className={`landingpage-arrow ${activeIndex === index ? 'open' : ''}`}
                  alt="arrow"
                />
              </div>
              <div className={`landingpage-faq-answer ${activeIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className='landingpage-footer'>
        <div className='ladingpage-footer-logo-container'>
          <div>
            <img /><h3>CloudStock</h3>
          </div>
          <p>2011-2024 © Todos os direitos reservados</p>
        </div>
        <div className='ladingpage-footer-text-container'>
          <p>Na CloudStock, você dispõe de ferramentas avançadas para criar, gerenciar e
            editar seus produtos com facilidade.</p>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
