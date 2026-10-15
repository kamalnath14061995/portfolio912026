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
          <source src="/videos/background-video.mp4" type="video/mp4" />
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
              <li className="nav-item dropdown">
                <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                  Download
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        const link = document.createElement('a');
                        link.href = '/resume.pdf';
                        link.download = 'Kamalnath_Murugan_Resume.pdf';
                        link.click();
                      }}
                    >
                      <i className="bi bi-file-earmark-pdf me-2"></i>Download Resume
                    </a>
                  </li>
                </ul>
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
                <h2 className="hero-subtitle luxury-subtitle">Software Testing Professional</h2>
                <p className="hero-description luxury-subtitle">
                  Software Testing professional with 4 years and 5 months of experience in manual and automation testing, API testing, 
                  UI testing, and web application testing. Experienced in Java, Selenium, Playwright, Postman, Cucumber, Karate, TestNG, and JUnit, 
                  as well as SharePoint Online and SPFx application testing. Strong understanding of Agile, STLC, integration, regression, UAT, and end-to-end testing.
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
                Software Testing professional focused on manual and automation testing, API testing, and SharePoint application testing, with experience across shipping, payment, and insurance domains.
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
                  Software Testing professional with 4 years and 5 months of experience in manual and automation testing, API testing, 
                  UI testing, and web application testing. Experienced in SharePoint Online and SharePoint SPFx application testing, 
                  including document storage and management solutions for shipping company operations.
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
                  Tested SharePoint Online and SPFx applications for a shipping company, and delivered API, UI, integration, regression, 
                  UAT, and end-to-end testing across payment and insurance domains including Paytabs, Paytm, and Barclays.
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
                      <p className="card-text"><i className="bi bi-phone text-warning me-2"></i>+91 8072287661</p>
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
            A journey through software testing roles across SharePoint, payments, and insurance, from manual and API testing to automation.</p>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">March 2026 - September 2026</div>
                <h3 className="timeline-title">Software Engineer</h3>
                <div className="timeline-company">Staunch Technologies Private Limited • Chennai, India</div>
                <p className="timeline-description">
                  Software Testing role focused on SharePoint Online and SharePoint SPFx applications. Performed functional and UI testing, validated workflows, user interactions, document management features, and data handling for a document storage solution built for a shipping company. Executed functional, regression, integration, and end-to-end testing; identified, documented, and tracked defects, and collaborated with developers to reproduce issues and validate fixes.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">November 2023 - March 2026</div>
                <h3 className="timeline-title">Career Break</h3>
                <p className="timeline-description">
                  Prepared for government examinations and upskilled my career; took up freelance assignments during this period before joining Staunch Technologies.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">November 2022 - November 2023</div>
                <h3 className="timeline-title">Software Engineer</h3>
                <div className="timeline-company">Paytabs - Ogs Paylabs Private Limited • Chennai, India</div>
                <p className="timeline-description">
                  Conducted testing documentation work and used Postman for API and UI testing. Performed mobile, web, and POS machine testing, along with manual and automation testing across payment-related application workflows.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">March 2022 - September 2022</div>
                <h3 className="timeline-title">Software Engineer</h3>
                <div className="timeline-company">Paytm - Codevik Technologies Private Limited</div>
                <p className="timeline-description">
                  Worked with various insurance products and performed integration testing for the Paytm application. Created test cases and test scenarios, executed end-to-end and regression testing for each release, performed API testing for insurance workflows, and carried out UAT for insurance products including Reliance and Royal Sundaram.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">September 2020 - March 2022</div>
                <h3 className="timeline-title">Career Break</h3>
                <p className="timeline-description">
                  Affected by the COVID-19 pandemic and lost my job when the project ended; upskilled during this period.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">May 2018 - September 2020</div>
                <h3 className="timeline-title">Software Associate</h3>
                <div className="timeline-company">Barclay's Private Limited - Kelly Services • Chennai, India</div>
                <p className="timeline-description">
                  Provided process advisory services within the banking sector, supporting payment protection insurance and prequalification applications for Barclays banking customers. Handled 40+ customer inquiries daily on insurance eligibility, policy coverage, claims, and application-related queries while maintaining a 98 percent satisfaction rate.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">May 2017 - May 2018</div>
                <h3 className="timeline-title">Customer Care Executive</h3>
                <div className="timeline-company">Exl Service</div>
                <p className="timeline-description">
                  Handled refund processes related to customer insurance applications, as well as insurance-related customer processes and application requests.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2016 - May 2017</div>
                <h3 className="timeline-title">Career Break</h3>
                <p className="timeline-description">
                  After completing college, upskilled and waited for an offer letter.
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
                Comprehensive expertise in manual and automation testing, API testing, SharePoint application testing, and testing frameworks.
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
                <p className="card-text mt-2">Java, JavaScript, Python</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="100">
                <div className="skill-icon">
                  <i className="bi bi-bug"></i>
                </div>
                <div className="skill-name">Testing &amp; Automation</div>
                <p className="card-text mt-2">Manual, Automation, API, UI, Integration, Performance Testing</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="200">
                <div className="skill-icon">
                  <i className="bi bi-robot"></i>
                </div>
                <div className="skill-name">Automation Tools</div>
                <p className="card-text mt-2">Claude AI, Java Selenium, Playwright, Postman, Karate, Cucumber</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="300">
                <div className="skill-icon">
                  <i className="bi bi-microsoft"></i>
                </div>
                <div className="skill-name">SharePoint</div>
                <p className="card-text mt-2">SharePoint Online, SharePoint SPFx, Application &amp; Document Management Testing</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="400">
                <div className="skill-icon">
                  <i className="bi bi-check2-square"></i>
                </div>
                <div className="skill-name">Testing Frameworks</div>
                <p className="card-text mt-2">BDD, TestNG, JUnit, STLC</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="500">
                <div className="skill-icon">
                  <i className="bi bi-database"></i>
                </div>
                <div className="skill-name">Databases</div>
                <p className="card-text mt-2">SQL, MongoDB, Microsoft SQL Server</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="600">
                <div className="skill-icon">
                  <i className="bi bi-tools"></i>
                </div>
                <div className="skill-name">Tools &amp; Build</div>
                <p className="card-text mt-2">JIRA, GitHub, Maven, Eclipse, VS Code, Figma</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="700">
                <div className="skill-icon">
                  <i className="bi bi-diagram-3"></i>
                </div>
                <div className="skill-name">Methodologies</div>
                <p className="card-text mt-2">Agile, UAT, Regression Testing, End-to-End Testing</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="skill-item" data-aos="zoom-in" data-aos-delay="800">
                <div className="skill-icon">
                  <i className="bi bi-pc-display"></i>
                </div>
                <div className="skill-name">Operating Systems</div>
                <p className="card-text mt-2">Ubuntu, Windows</p>
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
                Notable projects showcasing expertise in software testing and quality assurance
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-up">
                <div className="card-icon">
                  <i className="bi bi-ship"></i>
                </div>
                <h3 className="card-title">Shipping Company - SharePoint Document Storage Application</h3>
                <p className="card-text">
                  <strong>Duration:</strong> March 2026 - September 2026<br/>
                  Tested a SharePoint Online-based document storage and management application developed for a shipping company. Performed functional and UI testing of SharePoint Online and SharePoint SPFx components, validated document upload, storage, retrieval, and management workflows, and ran regression and end-to-end testing to ensure application stability.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">SharePoint Online</span>
                  <span className="badge bg-warning text-dark me-2">SharePoint SPFx</span>
                  <span className="badge bg-warning text-dark me-2">Functional Testing</span>
                  <span className="badge bg-warning text-dark">End-to-End Testing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-up" data-aos-delay="100">
                <div className="card-icon">
                  <i className="bi bi-credit-card"></i>
                </div>
                <h3 className="card-title">Broad Spectrum, Bijlipay, ATMC, Card Management System, Paytabs Shopify</h3>
                <p className="card-text">
                  <strong>Duration:</strong> November 2022 - November 2023<br/>
                  Performed automation for UI and API testing across payment-domain applications. Worked with issuing switch and acquiring switch transaction flows, and carried out POS machine, mobile, and web testing using Selenium, Postman, and automation frameworks.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">Payment Domain</span>
                  <span className="badge bg-warning text-dark me-2">Selenium</span>
                  <span className="badge bg-warning text-dark me-2">Postman</span>
                  <span className="badge bg-warning text-dark">POS Testing</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="luxury-card" data-aos="fade-up" data-aos-delay="200">
                <div className="card-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3 className="card-title">Paytm Insurance</h3>
                <p className="card-text">
                  <strong>Duration:</strong> March 2022 - September 2022<br/>
                  Worked on API testing for insurance-related application workflows and performed UAT for insurance products including Reliance and Royal Sundaram. Created test cases and scenarios, and performed integration, regression, and end-to-end testing.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">Insurance</span>
                  <span className="badge bg-warning text-dark me-2">API Testing</span>
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
                <h3 className="card-title">Barclay Card Payment Protection Insurance</h3>
                <p className="card-text">
                  <strong>Duration:</strong> May 2018 - September 2020<br/>
                  Worked with payment protection insurance processes, handled insurance cancellation processes, and identified and removed duplicate complaint logging issues.
                </p>
                <div className="mt-3">
                  <span className="badge bg-warning text-dark me-2">Banking</span>
                  <span className="badge bg-warning text-dark me-2">Insurance</span>
                  <span className="badge bg-warning text-dark me-2">Process Management</span>
                  <span className="badge bg-warning text-dark">Data Quality</span>
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
                        <a href="tel:+918072287661" className="contact-link">
                          +91 8072287661
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
                © 2026 Kamalnath Murugan. Crafted with passion for quality and excellence.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio