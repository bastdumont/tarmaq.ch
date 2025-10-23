// i18n System for TARMAQ - Multilingual Support (FR, EN, DE, IT)

const translations = {
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.project': 'Le projet',
        'nav.activities': 'Activités',
        'nav.impact': 'Impact',
        'nav.support': 'Nous soutenir',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Catalyseur d\'excellence',
        'hero.subtitle': 'Un espace d\'innovation dédié à la formation, au mentorat et aux technologies émergentes pour les jeunes talents',
        'hero.cta1': 'Découvrir Tarmaq',
        'hero.cta2': 'Soutenir le projet',
        
        // Mission Section
        'mission.title': 'Notre mission',
        'mission.description': 'TARMAQ est un catalyseur d\'excellence qui vise à démocratiser l\'accès aux technologies émergentes et à accompagner les jeunes talents dans leur développement professionnel.',
        'mission.card1.title': 'Formation',
        'mission.card1.description': 'Programmes de formation en IA, blockchain, cybersécurité et technologies émergentes adaptés aux besoins du marché.',
        'mission.card2.title': 'Mentorat',
        'mission.card2.description': 'Accompagnement personnalisé par des professionnels expérimentés pour guider les jeunes dans leur parcours.',
        'mission.card3.title': 'Innovation',
        'mission.card3.description': 'Espace d\'expérimentation et d\'innovation pour développer des projets concrets et impactants.',
        
        // Statistics
        'stats.participants': 'Jeunes formés',
        'stats.mentors': 'Mentors actifs',
        'stats.projects': 'Projets réalisés',
        'stats.partners': 'Partenaires',
        
        // Programs
        'programs.title': 'Nos programmes',
        'programs.subtitle': 'Des formations et activités conçues pour développer les compétences du futur',
        'programs.ai.title': 'Formation IA',
        'programs.ai.description': 'Ateliers pratiques et théoriques sur l\'intelligence artificielle, le machine learning et les applications concrètes.',
        'programs.hackathon.title': 'Hackathons',
        'programs.hackathon.description': 'Événements intensifs pour développer des solutions innovantes en équipe sur des défis concrets.',
        'programs.travel.title': 'Voyages éducatifs',
        'programs.travel.description': 'Découverte des écosystèmes tech internationaux et rencontres avec des leaders de l\'industrie.',
        'programs.mentoring.title': 'Programme de mentorat',
        'programs.mentoring.description': 'Accompagnement individuel par des professionnels pour le développement de carrière.',
        'programs.learn_more': 'En savoir plus →',
        
        // CTA Section
        'cta.title': 'Rejoignez l\'aventure TARMAQ',
        'cta.description': 'Que vous soyez un jeune talent, un mentor, un partenaire ou un mécène, il y a une place pour vous dans notre écosystème.',
        'cta.btn1': 'Nous contacter',
        'cta.btn2': 'Devenir partenaire',
        
        // Footer
        'footer.about': 'Catalyseur d\'excellence pour les jeunes talents dans les technologies émergentes.',
        'footer.links': 'Liens rapides',
        'footer.contact': 'Contact',
        'footer.contact_title': 'Contact',
        'footer.follow': 'Suivez-nous',
        'footer.social': 'Suivez-nous',
        'footer.rights': 'Tous droits réservés.',
        
        // Support Page
        'support.page_title': 'Nous Soutenir - TARMAQ',
        'support.hero.badge': 'Rejoignez-nous',
        'support.hero.title': 'Soutenez la nouvelle génération',
        'support.hero.subtitle': 'Ensemble, construisons l\'avenir des jeunes talents en technologie',
        'support.intro.title': 'Pourquoi nous soutenir ?',
        'support.intro.description': 'TARMAQ est une initiative à but non lucratif qui vise à démocratiser l\'accès aux technologies émergentes pour les jeunes talents. Votre soutien nous permet de former, d\'accompagner et d\'inspirer la prochaine génération d\'innovateurs.',
        'support.ways.title': 'Comment nous aider ?',
        'support.ways.subtitle': 'Plusieurs façons de contribuer à notre mission',
        
        // Donations
        'support.donation.title': 'Donations financières',
        'support.donation.description': 'Vos dons nous permettent de financer nos programmes de formation, d\'acquérir du matériel pédagogique et d\'offrir des bourses aux jeunes talents.',
        'support.donation.item1': 'Financement de bourses',
        'support.donation.item2': 'Équipement pédagogique',
        'support.donation.item3': 'Voyages éducatifs',
        'support.donation.cta': 'Faire un don',
        
        // Mentoring
        'support.mentoring.title': 'Mentorat',
        'support.mentoring.description': 'Partagez votre expertise et votre expérience en devenant mentor. Accompagnez les jeunes dans leur parcours professionnel et le développement de leurs projets.',
        'support.mentoring.item1': '2-4h par mois',
        'support.mentoring.item2': 'En présentiel ou en ligne',
        'support.mentoring.item3': 'Formation fournie',
        'support.mentoring.cta': 'Devenir mentor',
        
        // Space
        'support.space.title': 'Prêt de locaux ou bureaux',
        'support.space.description': 'Mettez à disposition des espaces pour nos formations, hackathons, ou comme bureaux permanents. Un espace adéquat est essentiel à notre mission.',
        'support.space.item1': 'Salles de formation',
        'support.space.item2': 'Espaces de coworking',
        'support.space.item3': 'Bureaux permanents',
        'support.space.cta': 'Proposer un espace',
        
        // Equipment
        'support.equipment.title': 'Don de matériel informatique',
        'support.equipment.description': 'Donnez du matériel informatique (ordinateurs, tablettes, serveurs) pour équiper nos espaces de formation et permettre aux jeunes d\'accéder aux technologies.',
        'support.equipment.item1': 'Ordinateurs portables',
        'support.equipment.item2': 'Matériel réseau',
        'support.equipment.item3': 'Licences logicielles',
        'support.equipment.cta': 'Donner du matériel',
        
        // Events
        'support.events.title': 'Partenaires événements',
        'support.events.description': 'Participez à l\'organisation de nos événements (hackathons, conférences, meetups) en tant que sponsor, organisateur ou intervenant.',
        'support.events.item1': 'Sponsoring événements',
        'support.events.item2': 'Intervention speakers',
        'support.events.item3': 'Co-organisation',
        'support.events.cta': 'Devenir partenaire',
        
        // Community
        'support.community.title': 'Communauté de soutien',
        'support.community.description': 'Rejoignez notre communauté ! Partagez nos contenus, parlez de nous autour de vous, participez à nos événements et aidez à faire connaître TARMAQ.',
        'support.community.item1': 'Partage sur réseaux sociaux',
        'support.community.item2': 'Bouche-à-oreille',
        'support.community.item3': 'Bénévolat ponctuel',
        'support.community.cta': 'Rejoindre la communauté',
        
        // Impact
        'support.impact.title': 'L\'impact de votre soutien',
        'support.impact.subtitle': 'Chaque contribution fait une réelle différence',
        'support.impact.stat1': 'Jeunes formés chaque année',
        'support.impact.stat2': 'Taux d\'insertion professionnelle',
        'support.impact.stat3': 'Projets innovants lancés',
        
        // CTA
        'support.cta.title': 'Prêt à faire la différence ?',
        'support.cta.description': 'Contactez-nous dès aujourd\'hui pour discuter de la meilleure façon de contribuer à notre mission.',
        'support.cta.contact': 'Nous contacter',
        'support.cta.meeting': 'Réserver un rendez-vous'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.project': 'The Project',
        'nav.activities': 'Activities',
        'nav.impact': 'Impact',
        'nav.support': 'Support Us',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.title': 'Excellence Catalyst',
        'hero.subtitle': 'An innovation space dedicated to training, mentorship and emerging technologies for young talents',
        'hero.cta1': 'Discover Tarmaq',
        'hero.cta2': 'Support the Project',
        
        // Mission Section
        'mission.title': 'Our Mission',
        'mission.description': 'TARMAQ is an excellence catalyst that aims to democratize access to emerging technologies and support young talents in their professional development.',
        'mission.card1.title': 'Training',
        'mission.card1.description': 'Training programs in AI, blockchain, cybersecurity and emerging technologies adapted to market needs.',
        'mission.card2.title': 'Mentorship',
        'mission.card2.description': 'Personalized support by experienced professionals to guide young people in their journey.',
        'mission.card3.title': 'Innovation',
        'mission.card3.description': 'Experimentation and innovation space to develop concrete and impactful projects.',
        
        // Statistics
        'stats.participants': 'Trained Youth',
        'stats.mentors': 'Active Mentors',
        'stats.projects': 'Completed Projects',
        'stats.partners': 'Partners',
        
        // Programs
        'programs.title': 'Our Programs',
        'programs.subtitle': 'Training and activities designed to develop future skills',
        'programs.ai.title': 'AI Training',
        'programs.ai.description': 'Practical and theoretical workshops on artificial intelligence, machine learning and concrete applications.',
        'programs.hackathon.title': 'Hackathons',
        'programs.hackathon.description': 'Intensive events to develop innovative team solutions on concrete challenges.',
        'programs.travel.title': 'Educational Trips',
        'programs.travel.description': 'Discovery of international tech ecosystems and meetings with industry leaders.',
        'programs.mentoring.title': 'Mentorship Program',
        'programs.mentoring.description': 'Individual support by professionals for career development.',
        'programs.learn_more': 'Learn more →',
        
        // CTA Section
        'cta.title': 'Join the TARMAQ Adventure',
        'cta.description': 'Whether you are a young talent, a mentor, a partner or a patron, there is a place for you in our ecosystem.',
        'cta.btn1': 'Contact Us',
        'cta.btn2': 'Become a Partner',
        
        // Footer
        'footer.about': 'Excellence catalyst for young talents in emerging technologies.',
        'footer.links': 'Quick Links',
        'footer.contact': 'Contact',
        'footer.contact_title': 'Contact',
        'footer.follow': 'Follow Us',
        'footer.social': 'Follow Us',
        'footer.rights': 'All rights reserved.',
        
        // Support Page
        'support.page_title': 'Support Us - TARMAQ',
        'support.hero.badge': 'Join Us',
        'support.hero.title': 'Support the Next Generation',
        'support.hero.subtitle': 'Together, let\'s build the future of young tech talents',
        'support.intro.title': 'Why Support Us?',
        'support.intro.description': 'TARMAQ is a non-profit initiative aiming to democratize access to emerging technologies for young talents. Your support allows us to train, guide, and inspire the next generation of innovators.',
        'support.ways.title': 'How Can You Help?',
        'support.ways.subtitle': 'Multiple ways to contribute to our mission',
        
        // Donations
        'support.donation.title': 'Financial Donations',
        'support.donation.description': 'Your donations allow us to fund our training programs, acquire educational equipment, and offer scholarships to young talents.',
        'support.donation.item1': 'Scholarship funding',
        'support.donation.item2': 'Educational equipment',
        'support.donation.item3': 'Educational trips',
        'support.donation.cta': 'Make a Donation',
        
        // Mentoring
        'support.mentoring.title': 'Mentoring',
        'support.mentoring.description': 'Share your expertise and experience by becoming a mentor. Guide young people in their professional journey and project development.',
        'support.mentoring.item1': '2-4h per month',
        'support.mentoring.item2': 'In-person or online',
        'support.mentoring.item3': 'Training provided',
        'support.mentoring.cta': 'Become a Mentor',
        
        // Space
        'support.space.title': 'Space or Office Lending',
        'support.space.description': 'Provide spaces for our training sessions, hackathons, or as permanent offices. Adequate space is essential to our mission.',
        'support.space.item1': 'Training rooms',
        'support.space.item2': 'Coworking spaces',
        'support.space.item3': 'Permanent offices',
        'support.space.cta': 'Offer a Space',
        
        // Equipment
        'support.equipment.title': 'IT Equipment Donation',
        'support.equipment.description': 'Donate IT equipment (computers, tablets, servers) to equip our training spaces and allow young people to access technologies.',
        'support.equipment.item1': 'Laptops',
        'support.equipment.item2': 'Network equipment',
        'support.equipment.item3': 'Software licenses',
        'support.equipment.cta': 'Donate Equipment',
        
        // Events
        'support.events.title': 'Event Partners',
        'support.events.description': 'Participate in organizing our events (hackathons, conferences, meetups) as a sponsor, organizer, or speaker.',
        'support.events.item1': 'Event sponsoring',
        'support.events.item2': 'Speaker sessions',
        'support.events.item3': 'Co-organization',
        'support.events.cta': 'Become a Partner',
        
        // Community
        'support.community.title': 'Support Community',
        'support.community.description': 'Join our community! Share our content, talk about us around you, participate in our events and help spread the word about TARMAQ.',
        'support.community.item1': 'Social media sharing',
        'support.community.item2': 'Word of mouth',
        'support.community.item3': 'Occasional volunteering',
        'support.community.cta': 'Join the Community',
        
        // Impact
        'support.impact.title': 'The Impact of Your Support',
        'support.impact.subtitle': 'Every contribution makes a real difference',
        'support.impact.stat1': 'Youth trained each year',
        'support.impact.stat2': 'Professional placement rate',
        'support.impact.stat3': 'Innovative projects launched',
        
        // CTA
        'support.cta.title': 'Ready to Make a Difference?',
        'support.cta.description': 'Contact us today to discuss the best way to contribute to our mission.',
        'support.cta.contact': 'Contact Us',
        'support.cta.meeting': 'Book a Meeting'
    },
    
    de: {
        // Navigation
        'nav.home': 'Startseite',
        'nav.project': 'Das Projekt',
        'nav.activities': 'Aktivitäten',
        'nav.impact': 'Wirkung',
        'nav.support': 'Unterstützen Sie uns',
        'nav.contact': 'Kontakt',
        
        // Hero Section
        'hero.title': 'Katalysator für Exzellenz',
        'hero.subtitle': 'Ein Innovationsraum für Ausbildung, Mentoring und neue Technologien für junge Talente',
        'hero.cta1': 'Tarmaq entdecken',
        'hero.cta2': 'Projekt unterstützen',
        
        // Mission Section
        'mission.title': 'Unsere Mission',
        'mission.description': 'TARMAQ ist ein Katalysator für Exzellenz, der den Zugang zu neuen Technologien demokratisieren und junge Talente in ihrer beruflichen Entwicklung unterstützen möchte.',
        'mission.card1.title': 'Ausbildung',
        'mission.card1.description': 'Schulungsprogramme in KI, Blockchain, Cybersicherheit und neuen Technologien, angepasst an die Marktbedürfnisse.',
        'mission.card2.title': 'Mentoring',
        'mission.card2.description': 'Persönliche Betreuung durch erfahrene Fachleute, um junge Menschen auf ihrem Weg zu begleiten.',
        'mission.card3.title': 'Innovation',
        'mission.card3.description': 'Experimentier- und Innovationsraum zur Entwicklung konkreter und wirkungsvoller Projekte.',
        
        // Statistics
        'stats.participants': 'Ausgebildete Jugendliche',
        'stats.mentors': 'Aktive Mentoren',
        'stats.projects': 'Abgeschlossene Projekte',
        'stats.partners': 'Partner',
        
        // Programs
        'programs.title': 'Unsere Programme',
        'programs.subtitle': 'Schulungen und Aktivitäten zur Entwicklung von Zukunftskompetenzen',
        'programs.ai.title': 'KI-Training',
        'programs.ai.description': 'Praktische und theoretische Workshops zu künstlicher Intelligenz, maschinellem Lernen und konkreten Anwendungen.',
        'programs.hackathon.title': 'Hackathons',
        'programs.hackathon.description': 'Intensive Veranstaltungen zur Entwicklung innovativer Teamlösungen für konkrete Herausforderungen.',
        'programs.travel.title': 'Bildungsreisen',
        'programs.travel.description': 'Entdeckung internationaler Tech-Ökosysteme und Treffen mit Branchenführern.',
        'programs.mentoring.title': 'Mentoring-Programm',
        'programs.mentoring.description': 'Individuelle Betreuung durch Fachleute für die Karriereentwicklung.',
        'programs.learn_more': 'Mehr erfahren →',
        
        // CTA Section
        'cta.title': 'Treten Sie dem TARMAQ-Abenteuer bei',
        'cta.description': 'Ob Sie ein junges Talent, ein Mentor, ein Partner oder ein Mäzen sind, es gibt einen Platz für Sie in unserem Ökosystem.',
        'cta.btn1': 'Kontaktieren Sie uns',
        'cta.btn2': 'Partner werden',
        
        // Footer
        'footer.about': 'Katalysator für Exzellenz für junge Talente in neuen Technologien.',
        'footer.links': 'Schnelllinks',
        'footer.contact': 'Kontakt',
        'footer.contact_title': 'Kontakt',
        'footer.follow': 'Folgen Sie uns',
        'footer.social': 'Folgen Sie uns',
        'footer.rights': 'Alle Rechte vorbehalten.',
        
        // Support Page
        'support.page_title': 'Unterstützen Sie uns - TARMAQ',
        'support.hero.badge': 'Machen Sie mit',
        'support.hero.title': 'Unterstützen Sie die nächste Generation',
        'support.hero.subtitle': 'Gemeinsam bauen wir die Zukunft junger Tech-Talente auf',
        'support.intro.title': 'Warum uns unterstützen?',
        'support.intro.description': 'TARMAQ ist eine gemeinnützige Initiative, die darauf abzielt, den Zugang zu aufkommenden Technologien für junge Talente zu demokratisieren. Ihre Unterstützung ermöglicht es uns, die nächste Generation von Innovatoren auszubilden, zu begleiten und zu inspirieren.',
        'support.ways.title': 'Wie können Sie helfen?',
        'support.ways.subtitle': 'Mehrere Möglichkeiten, zu unserer Mission beizutragen',
        
        // Donations
        'support.donation.title': 'Finanzielle Spenden',
        'support.donation.description': 'Ihre Spenden ermöglichen es uns, unsere Ausbildungsprogramme zu finanzieren, pädagogisches Material zu erwerben und Stipendien für junge Talente anzubieten.',
        'support.donation.item1': 'Stipendienfinanzierung',
        'support.donation.item2': 'Pädagogische Ausrüstung',
        'support.donation.item3': 'Bildungsreisen',
        'support.donation.cta': 'Spenden',
        
        // Mentoring
        'support.mentoring.title': 'Mentoring',
        'support.mentoring.description': 'Teilen Sie Ihre Expertise und Erfahrung, indem Sie Mentor werden. Begleiten Sie junge Menschen auf ihrem beruflichen Weg und bei der Entwicklung ihrer Projekte.',
        'support.mentoring.item1': '2-4 Stunden pro Monat',
        'support.mentoring.item2': 'Persönlich oder online',
        'support.mentoring.item3': 'Schulung inbegriffen',
        'support.mentoring.cta': 'Mentor werden',
        
        // Space
        'support.space.title': 'Raum- oder Bürovermietung',
        'support.space.description': 'Stellen Sie Räume für unsere Schulungen, Hackathons oder als dauerhafte Büros zur Verfügung. Angemessener Raum ist für unsere Mission unerlässlich.',
        'support.space.item1': 'Schulungsräume',
        'support.space.item2': 'Coworking-Spaces',
        'support.space.item3': 'Dauerhafte Büros',
        'support.space.cta': 'Raum anbieten',
        
        // Equipment
        'support.equipment.title': 'IT-Gerätespende',
        'support.equipment.description': 'Spenden Sie IT-Geräte (Computer, Tablets, Server), um unsere Schulungsräume auszustatten und jungen Menschen den Zugang zu Technologien zu ermöglichen.',
        'support.equipment.item1': 'Laptops',
        'support.equipment.item2': 'Netzwerkausrüstung',
        'support.equipment.item3': 'Softwarelizenzen',
        'support.equipment.cta': 'Geräte spenden',
        
        // Events
        'support.events.title': 'Event-Partner',
        'support.events.description': 'Beteiligen Sie sich an der Organisation unserer Veranstaltungen (Hackathons, Konferenzen, Meetups) als Sponsor, Organisator oder Redner.',
        'support.events.item1': 'Event-Sponsoring',
        'support.events.item2': 'Speaker-Sessions',
        'support.events.item3': 'Mitorganisation',
        'support.events.cta': 'Partner werden',
        
        // Community
        'support.community.title': 'Support-Community',
        'support.community.description': 'Treten Sie unserer Community bei! Teilen Sie unsere Inhalte, sprechen Sie über uns, nehmen Sie an unseren Veranstaltungen teil und helfen Sie, TARMAQ bekannt zu machen.',
        'support.community.item1': 'Social-Media-Sharing',
        'support.community.item2': 'Mundpropaganda',
        'support.community.item3': 'Gelegentliche Freiwilligenarbeit',
        'support.community.cta': 'Der Community beitreten',
        
        // Impact
        'support.impact.title': 'Die Wirkung Ihrer Unterstützung',
        'support.impact.subtitle': 'Jeder Beitrag macht einen echten Unterschied',
        'support.impact.stat1': 'Jugendliche jährlich ausgebildet',
        'support.impact.stat2': 'Berufliche Vermittlungsquote',
        'support.impact.stat3': 'Innovative Projekte gestartet',
        
        // CTA
        'support.cta.title': 'Bereit, einen Unterschied zu machen?',
        'support.cta.description': 'Kontaktieren Sie uns heute, um den besten Weg zu besprechen, wie Sie zu unserer Mission beitragen können.',
        'support.cta.contact': 'Kontaktieren Sie uns',
        'support.cta.meeting': 'Termin buchen'
    },
    
    it: {
        // Navigation
        'nav.home': 'Home',
        'nav.project': 'Il Progetto',
        'nav.activities': 'Attività',
        'nav.impact': 'Impatto',
        'nav.support': 'Sostienici',
        'nav.contact': 'Contatti',
        
        // Hero Section
        'hero.title': 'Catalizzatore di Eccellenza',
        'hero.subtitle': 'Uno spazio di innovazione dedicato alla formazione, al mentoring e alle tecnologie emergenti per giovani talenti',
        'hero.cta1': 'Scopri Tarmaq',
        'hero.cta2': 'Sostieni il Progetto',
        
        // Mission Section
        'mission.title': 'La Nostra Missione',
        'mission.description': 'TARMAQ è un catalizzatore di eccellenza che mira a democratizzare l\'accesso alle tecnologie emergenti e ad accompagnare i giovani talenti nel loro sviluppo professionale.',
        'mission.card1.title': 'Formazione',
        'mission.card1.description': 'Programmi di formazione in IA, blockchain, cybersecurity e tecnologie emergenti adattati alle esigenze del mercato.',
        'mission.card2.title': 'Mentoring',
        'mission.card2.description': 'Accompagnamento personalizzato da parte di professionisti esperti per guidare i giovani nel loro percorso.',
        'mission.card3.title': 'Innovazione',
        'mission.card3.description': 'Spazio di sperimentazione e innovazione per sviluppare progetti concreti e di impatto.',
        
        // Statistics
        'stats.participants': 'Giovani Formati',
        'stats.mentors': 'Mentor Attivi',
        'stats.projects': 'Progetti Completati',
        'stats.partners': 'Partner',
        
        // Programs
        'programs.title': 'I Nostri Programmi',
        'programs.subtitle': 'Formazioni e attività progettate per sviluppare le competenze del futuro',
        'programs.ai.title': 'Formazione IA',
        'programs.ai.description': 'Workshop pratici e teorici sull\'intelligenza artificiale, il machine learning e le applicazioni concrete.',
        'programs.hackathon.title': 'Hackathon',
        'programs.hackathon.description': 'Eventi intensivi per sviluppare soluzioni innovative in team su sfide concrete.',
        'programs.travel.title': 'Viaggi Educativi',
        'programs.travel.description': 'Scoperta degli ecosistemi tech internazionali e incontri con i leader del settore.',
        'programs.mentoring.title': 'Programma di Mentoring',
        'programs.mentoring.description': 'Accompagnamento individuale da parte di professionisti per lo sviluppo della carriera.',
        'programs.learn_more': 'Scopri di più →',
        
        // CTA Section
        'cta.title': 'Unisciti all\'Avventura TARMAQ',
        'cta.description': 'Che tu sia un giovane talento, un mentor, un partner o un mecenate, c\'è un posto per te nel nostro ecosistema.',
        'cta.btn1': 'Contattaci',
        'cta.btn2': 'Diventa Partner',
        
        // Footer
        'footer.about': 'Catalizzatore di eccellenza per giovani talenti nelle tecnologie emergenti.',
        'footer.links': 'Link Rapidi',
        'footer.contact': 'Contatti',
        'footer.contact_title': 'Contatti',
        'footer.follow': 'Seguici',
        'footer.social': 'Seguici',
        'footer.rights': 'Tutti i diritti riservati.',
        
        // Support Page
        'support.page_title': 'Sostienici - TARMAQ',
        'support.hero.badge': 'Unisciti a Noi',
        'support.hero.title': 'Sostieni la Nuova Generazione',
        'support.hero.subtitle': 'Insieme, costruiamo il futuro dei giovani talenti nella tecnologia',
        'support.intro.title': 'Perché Sostenerci?',
        'support.intro.description': 'TARMAQ è un\'iniziativa no-profit che mira a democratizzare l\'accesso alle tecnologie emergenti per i giovani talenti. Il tuo sostegno ci permette di formare, accompagnare e ispirare la prossima generazione di innovatori.',
        'support.ways.title': 'Come Puoi Aiutarci?',
        'support.ways.subtitle': 'Diversi modi per contribuire alla nostra missione',
        
        // Donations
        'support.donation.title': 'Donazioni Finanziarie',
        'support.donation.description': 'Le tue donazioni ci permettono di finanziare i nostri programmi di formazione, acquisire materiale didattico e offrire borse di studio ai giovani talenti.',
        'support.donation.item1': 'Finanziamento borse di studio',
        'support.donation.item2': 'Attrezzatura didattica',
        'support.donation.item3': 'Viaggi educativi',
        'support.donation.cta': 'Fai una Donazione',
        
        // Mentoring
        'support.mentoring.title': 'Mentoring',
        'support.mentoring.description': 'Condividi la tua esperienza e competenza diventando mentor. Accompagna i giovani nel loro percorso professionale e nello sviluppo dei loro progetti.',
        'support.mentoring.item1': '2-4 ore al mese',
        'support.mentoring.item2': 'In presenza o online',
        'support.mentoring.item3': 'Formazione fornita',
        'support.mentoring.cta': 'Diventa Mentor',
        
        // Space
        'support.space.title': 'Prestito di Locali o Uffici',
        'support.space.description': 'Metti a disposizione spazi per le nostre formazioni, hackathon, o come uffici permanenti. Uno spazio adeguato è essenziale per la nostra missione.',
        'support.space.item1': 'Sale di formazione',
        'support.space.item2': 'Spazi di coworking',
        'support.space.item3': 'Uffici permanenti',
        'support.space.cta': 'Proponi uno Spazio',
        
        // Equipment
        'support.equipment.title': 'Donazione di Attrezzature Informatiche',
        'support.equipment.description': 'Dona attrezzature informatiche (computer, tablet, server) per equipaggiare i nostri spazi di formazione e permettere ai giovani di accedere alle tecnologie.',
        'support.equipment.item1': 'Computer portatili',
        'support.equipment.item2': 'Attrezzature di rete',
        'support.equipment.item3': 'Licenze software',
        'support.equipment.cta': 'Dona Attrezzature',
        
        // Events
        'support.events.title': 'Partner Eventi',
        'support.events.description': 'Partecipa all\'organizzazione dei nostri eventi (hackathon, conferenze, meetup) come sponsor, organizzatore o speaker.',
        'support.events.item1': 'Sponsorizzazione eventi',
        'support.events.item2': 'Interventi speaker',
        'support.events.item3': 'Co-organizzazione',
        'support.events.cta': 'Diventa Partner',
        
        // Community
        'support.community.title': 'Comunità di Sostegno',
        'support.community.description': 'Unisciti alla nostra comunità! Condividi i nostri contenuti, parla di noi intorno a te, partecipa ai nostri eventi e aiutaci a far conoscere TARMAQ.',
        'support.community.item1': 'Condivisione sui social',
        'support.community.item2': 'Passaparola',
        'support.community.item3': 'Volontariato occasionale',
        'support.community.cta': 'Unisciti alla Comunità',
        
        // Impact
        'support.impact.title': 'L\'Impatto del Tuo Sostegno',
        'support.impact.subtitle': 'Ogni contributo fa una vera differenza',
        'support.impact.stat1': 'Giovani formati ogni anno',
        'support.impact.stat2': 'Tasso di inserimento professionale',
        'support.impact.stat3': 'Progetti innovativi lanciati',
        
        // CTA
        'support.cta.title': 'Pronto a Fare la Differenza?',
        'support.cta.description': 'Contattaci oggi per discutere del miglior modo per contribuire alla nostra missione.',
        'support.cta.contact': 'Contattaci',
        'support.cta.meeting': 'Prenota un Appuntamento'
    }
};

// Get current language from localStorage or default to French
let currentLanguage = localStorage.getItem('tarmaq_language') || 'fr';

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('tarmaq_language', lang);
    document.documentElement.lang = lang;
    updatePageContent();
    updateActiveLanguageButton();
}

// Function to update all text content on the page
function updatePageContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[currentLanguage][key];
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Function to update active language button
function updateActiveLanguageButton() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const langButtons = {
        'fr': 0,
        'en': 1,
        'de': 2,
        'it': 3
    };
    
    const buttons = document.querySelectorAll('.lang-btn');
    if (buttons[langButtons[currentLanguage]]) {
        buttons[langButtons[currentLanguage]].classList.add('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updatePageContent();
    updateActiveLanguageButton();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { changeLanguage, translations, currentLanguage };
}