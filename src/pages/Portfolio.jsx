import React, { useEffect, useRef, useState } from 'react'

const Portfolio = () => {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Initialize AOS animations
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      })
    }

    // Simple video play function
    const playVideo = () => {
      const video = videoRef.current
      if (video) {
        video.muted = true
        video.volume = 0
        video.play().then(() => {
          console.log('Video playing')
          setVideoLoaded(true)
        }).catch(error => {
          console.log('Video autoplay failed, will try on user interaction:', error)
        })
      }
    }

    // Try to play video immediately
    setTimeout(playVideo, 100)
    
    // Also try on any user interaction
    const handleInteraction = () => {
      playVideo()
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
    
    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="portfolio-container">
      {/* Dynamic Animated Background */}
      <div className="video-background">
        {/* Try to load video first */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          className="background-video"
          onLoadedData={() => {
            console.log('Video loaded successfully')
            setVideoLoaded(true)
          }}
          onError={(e) => {
            console.error('Video failed to load:', e)
            setVideoLoaded(false)
          }}
          style={{ opacity: videoLoaded ? 1 : 0 }}
        >
          <source src="videos/background-video.mp4" type="video/mp4" />
        </video>
        
        {/* Animated CSS Background as fallback */}
        <div 
          className="animated-bg-fallback"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: videoLoaded ? 0 : 1,
            transition: 'opacity 2s ease',
            background: `
              radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(44, 62, 80, 0.3) 0%, transparent 50%),
              linear-gradient(45deg, #2a2a2a 0%, #3c4e60 25%, #445566 50%, #3c4e60 75%, #2a2a2a 100%)
            `,
            backgroundSize: '400px 400px, 300px 300px, 100% 100%',
            animation: 'dynamicBackground 20s ease-in-out infinite',
            filter: 'brightness(1.3) contrast(1.1)'
          }}
        />
      </div>
      <div className="video-overlay"></div>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg luxury-navbar fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home">KM</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="hero-content" data-aos="fade-up">
                <h1 className="hero-title luxury-title">Kamalnath Murugan</h1>
                <h2 className="hero-subtitle luxury-subtitle">QA Testing Professional & Software Engineer</h2>
                <p className="hero-description luxury-subtitle">
                  Experienced QA Testing professional with 3+ years of expertise in Java, API testing, 
                  and automation frameworks. Specialized in Payment and Insurance domains with a proven 
                  track record of delivering high-quality software solutions.
                </p>
                <div className="hero-buttons">
                  <button 
                    className="btn btn-luxury me-3 mb-3"
                    onClick={() => scrollToSection('contact')}
                  >
                    Get In Touch
                  </button>
                  <button 
                    className="btn btn-outline-luxury mb-3"
                    onClick={() => scrollToSection('experience')}
                  >
                    View Experience
                  </button>
                  {!videoLoaded && (
                    <button 
                      className="btn btn-warning mb-3 ms-3"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.play().then(() => {
                            setVideoLoaded(true)
                          }).catch(e => console.log('Manual play failed:', e))
                        }
                      }}
                    >
                      🎬 Play Video
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="luxury-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title" data-aos="fade-up">About Me</h2>
              <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Passionate about quality assurance and delivering exceptional software experiences
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-right">
                <div className="card-icon">
                  <i className="bi bi-person-check"></i>
                </div>
                <h3 className="card-title">Professional Summary</h3>
                <p className="card-text">
                  QA Testing professional with comprehensive experience in manual and automated testing 
                  across Payment and Insurance domains. Proficient in API testing with Postman, 
                  automation frameworks including Selenium, Cucumber, and Karate.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-left">
                <div className="card-icon">
                  <i className="bi bi-award"></i>
                </div>
                <h3 className="card-title">Key Achievements</h3>
                <p className="card-text">
                  Successfully executed comprehensive testing for 50+ API endpoints, achieved 95% test coverage 
                  for payment processing workflows, and identified 80+ critical defects throughout project lifecycles.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="luxury-card" data-aos="fade-up">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="card-title">Education</h4>
                    <div className="mb-3">
                      <h5 className="text-warning">Bachelor's Degree in Mechanical Engineering</h5>
                      <p className="card-text">New Prince Shri Bhavani College of Engineering and Technology</p>
                      <p className="card-text">Chennai • 2016 • 7.23 CGPA</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 className="card-title">Contact Information</h4>
                    <div className="contact-details">
                      <p className="card-text"><i className="bi bi-geo-alt text-warning me-2"></i>Chennai, Tamil Nadu, India</p>
                      <p className="card-text"><i className="bi bi-envelope text-warning me-2"></i>kamalnath.qatesting@gmail.com</p>
                      <p className="card-text"><i className="bi bi-phone text-warning me-2"></i>+91 7200968104</p>
                      <p className="card-text"><i className="bi bi-linkedin text-warning me-2"></i>in/kamalnathmurugan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="luxury-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title" data-aos="fade-up">Professional Experience</h2>
              <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                A journey through diverse roles in software testing and quality assurance
              </p>
            </div>
          </div>
          <div className="timeline">
            {/* Current Role */}
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">July 2024 - January 2025</div>
                <h3 className="timeline-title">Freelance Tester</h3>
                <div className="timeline-company">Micole • Remote, Spain</div>
                <p className="timeline-description">
                  Executed manual and automation testing for European education platform connecting schools 
                  and parents for online admissions and subscription management. Performed API and UI testing 
                  using Postman and Figma designs on Ubuntu environment, identifying and documenting 60+ defects 
                  related to school listing and search functionality.
                </p>
              </div>
            </div>

            {/* Paytabs */}
            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">November 2022 - November 2023</div>
                <h3 className="timeline-title">Software Engineer</h3>
                <div className="timeline-company">Paytabs - Ogs Paylabs Private Limited • Chennai, India</div>
                <p className="timeline-description">
                  Executed comprehensive API testing using Postman for payment gateway integrations, validating 
                  50+ API endpoints across mobile, web, and POS systems. Designed and maintained test documentation 
                  including test plans, test cases, and defect reports, achieving 95% test coverage for payment 
                  processing workflows. Performed functional, regression, and integration testing for mobile 
                  applications, web platforms, and POS machine transactions.
                </p>
              </div>
            </div>

            {/* Paytm */}
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">March 2022 - September 2022</div>
                <h3 className="timeline-title">Software Engineer</h3>
                <div className="timeline-company">Paytm - Codevik Technologies Private Limited • Chennai, India</div>
                <p className="timeline-description">
                  Executed integration testing for Paytm mobile application, testing insurance products from 
                  multiple providers including Reliance and Royal Sundaram with 100% coverage. Conducted UAT 
                  testing and validation for insurance features, ensuring seamless user experience and compliance 
                  with business requirements.
                </p>
              </div>
            </div>

            {/* Barclays */}
            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">May 2018 - September 2020</div>
                <h3 className="timeline-title">Software Associate</h3>
                <div className="timeline-company">Barclay's Private Limited - Kelly Services • Chennai, India</div>
                <p className="timeline-description">
                  Provided payment protection insurance advisory services with prequal applications for Barclays 
                  banking customers, handling 40+ customer inquiries daily with 98% satisfaction rate. Processed 
                  insurance claims and policy modifications while ensuring compliance with banking sector regulations 
                  and company policies.
                </p>
              </div>
            </div>

            {/* EXL Service */}
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">May 2017 - May 2018</div>
                <h3 className="timeline-title">Customer Care Executive</h3>
                <div className="timeline-company">Exl Service • Chennai, India</div>
                <p className="timeline-description">
                  Managed insurance refund processing for customer applications, handling 30+ refund requests 
                  daily with 99% accuracy rate. Resolved customer queries and complaints related to refund status, 
                  maintaining detailed records in tracking systems for audit purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="luxury-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title" data-aos="fade-up">Technical Skills</h2>
              <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Comprehensive expertise in testing tools and technologies
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in">
                <div className="skill-icon">
                  <i className="bi bi-code-slash"></i>
                </div>
                <div className="skill-name">Programming</div>
                <p className="card-text mt-2">Java, JavaScript</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="100">
                <div className="skill-icon">
                  <i className="bi bi-bug"></i>
                </div>
                <div className="skill-name">Testing</div>
                <p className="card-text mt-2">UI, API, Database Testing</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="200">
                <div className="skill-icon">
                  <i className="bi bi-tools"></i>
                </div>
                <div className="skill-name">Tools</div>
                <p className="card-text mt-2">Postman, Eclipse, VS Code, JIRA</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="300">
                <div className="skill-icon">
                  <i className="bi bi-robot"></i>
                </div>
                <div className="skill-name">Automation</div>
                <p className="card-text mt-2">Selenium, JUnit, Cucumber, TestNG, Karate</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="400">
                <div className="skill-icon">
                  <i className="bi bi-database"></i>
                </div>
                <div className="skill-name">Databases</div>
                <p className="card-text mt-2">MySQL, MongoDB</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="500">
                <div className="skill-icon">
                  <i className="bi bi-git"></i>
                </div>
                <div className="skill-name">Version Control</div>
                <p className="card-text mt-2">GitHub, Maven</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="600">
                <div className="skill-icon">
                  <i className="bi bi-diagram-3"></i>
                </div>
                <div className="skill-name">Methodology</div>
                <p className="card-text mt-2">Agile Development</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="700">
                <div className="skill-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div className="skill-name">Domains</div>
                <p className="card-text mt-2">Payment Systems, Insurance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="luxury-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title" data-aos="fade-up">Key Projects</h2>
              <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Notable projects showcasing expertise in testing and quality assurance
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-up">
                <div className="card-icon">
                  <i className="bi bi-mortarboard"></i>
                </div>
                <h3 className="card-title">Micole Education Platform</h3>
                <p className="card-text">
                  <strong>Duration:</strong> August 2024 - January 2025<br/>
                  European education platform testing including API and UI testing using Figma designs. 
                  Utilized PHP technology on Ubuntu OS and identified numerous issues related to school 
                  listings and search functionality.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">API Testing</span>
                  <span className="badge bg-warning text-dark me-2">UI Testing</span>
                  <span className="badge bg-warning text-dark me-2">PHP</span>
                  <span className="badge bg-warning text-dark">Ubuntu</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-up" data-aos-delay="100">
                <div className="card-icon">
                  <i className="bi bi-credit-card"></i>
                </div>
                <h3 className="card-title">Paytabs Payment Gateway</h3>
                <p className="card-text">
                  <strong>Duration:</strong> November 2022 - November 2023<br/>
                  Comprehensive testing of payment gateway integrations including Bijlipay, ATMC, 
                  Card Management System, and Paytabs Shopify integration. Achieved 95% automation 
                  test accuracy across all applications.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">Payment Gateway</span>
                  <span className="badge bg-warning text-dark me-2">API Testing</span>
                  <span className="badge bg-warning text-dark me-2">Automation</span>
                  <span className="badge bg-warning text-dark">Shopify</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-up" data-aos-delay="200">
                <div className="card-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3 className="card-title">Paytm Insurance Testing</h3>
                <p className="card-text">
                  <strong>Duration:</strong> March 2022 - September 2022<br/>
                  Tested and validated 40+ REST APIs across multiple insurance products. Generated 
                  detailed test reports that improved data accuracy and reduced integration defects 
                  by 30%. Executed end-to-end UAT integration testing with 5+ third-party partners.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">Insurance</span>
                  <span className="badge bg-warning text-dark me-2">REST API</span>
                  <span className="badge bg-warning text-dark me-2">UAT Testing</span>
                  <span className="badge bg-warning text-dark">Integration</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-up" data-aos-delay="300">
                <div className="card-icon">
                  <i className="bi bi-bank"></i>
                </div>
                <h3 className="card-title">Barclays Payment Protection</h3>
                <p className="card-text">
                  <strong>Duration:</strong> May 2018 - September 2020<br/>
                  Refined the refund process for Barclays Card Payment Protection Insurance by 
                  automating application workflows. Enhanced accuracy and accelerated claim 
                  resolutions while maintaining comprehensive documentation for audit compliance.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">Banking</span>
                  <span className="badge bg-warning text-dark me-2">Insurance</span>
                  <span className="badge bg-warning text-dark me-2">Process Automation</span>
                  <span className="badge bg-warning text-dark">Compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="luxury-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title" data-aos="fade-up">Get In Touch</h2>
              <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Ready to discuss opportunities and collaborate on exciting projects
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-info" data-aos="fade-up" data-aos-delay="200">
                <div className="row">
                  <div className="col-md-6">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-envelope"></i>
                      </div>
                      <div className="contact-text">
                        <a href="mailto:kamalnath.qatesting@gmail.com" className="contact-link">
                          kamalnath.qatesting@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-phone"></i>
                      </div>
                      <div className="contact-text">
                        <a href="tel:+917200968104" className="contact-link">
                          +91 7200968104
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-linkedin"></i>
                      </div>
                      <div className="contact-text">
                        <a href="https://linkedin.com/in/kamalnathmurugan" target="_blank" rel="noopener noreferrer" className="contact-link">
                          linkedin.com/in/kamalnathmurugan
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <div className="contact-text">
                        Chennai, Tamil Nadu, India
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 text-center">
                    <button 
                      className="btn btn-luxury me-3 mb-3"
                      onClick={() => window.open('mailto:kamalnath.qatesting@gmail.com', '_blank')}
                    >
                      <i className="bi bi-envelope me-2"></i>Send Email
                    </button>
                    <button 
                      className="btn btn-outline-luxury mb-3"
                      onClick={() => window.open('https://linkedin.com/in/kamalnathmurugan', '_blank')}
                    >
                      <i className="bi bi-linkedin me-2"></i>Connect on LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="luxury-section py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="luxury-subtitle mb-0">
                © 2025 Kamalnath Murugan. Crafted with passion for quality and excellence.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio