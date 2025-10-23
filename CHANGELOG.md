# 📝 Changelog - TARMAQ Website

## [Version 1.1] - 2025-01-21

### ✅ Modifications effectuées

#### Coordonnées mises à jour
- ✅ **Email** : `bastien@bdi-solutions.com` (remplace info@tarmaq.ch)
- ✅ **Téléphone** : `+41 79 670 77 43` (remplace +41 22 XXX XX XX)
- ✅ **Adresse** : `Perspectives Jeunesse, 11 avenue Eugène-Pittard, 1206 Genève` (remplace ancienne adresse)
- ✅ **Lien agenda** : Intégration du lien HubSpot pour réservation rendez-vous
  - URL : https://meetings-eu1.hubspot.com/bdumont?uuid=a342bacf-b1c4-4182-82dd-64b39fa7b307
  - Emplacement : contact.html (section rendez-vous)

#### Modifications partenaires
- ✅ **Suppression Fondation Wilsdorf** : Mentions retirées de toutes les pages
- ✅ **Ville de Genève** : Désormais partenaire principal unique dans section fondateurs
- ✅ **Budget 2025** : Répartition mise à jour
  - Ville de Genève : 500K CHF (42%)
  - Fondations privées : 300K CHF (25%)
  - Partenaires privés : 250K CHF (21%)
  - Dons et contributions : 150K CHF (12%)

### 📄 Fichiers modifiés

1. **index.html** - Footer (coordonnées)
2. **projet.html** - Footer (coordonnées)
3. **contact.html** - Section contact complète + lien agenda
4. **activites.html** - Footer (coordonnées)
5. **impact.html** - Footer (coordonnées)
6. **financement.html** - Budget + section partenaires + footer
7. **README.md** - Informations contact
8. **CONTENT-TODO.md** - Checklist mise à jour

### 🎯 Status actuel

#### ✅ Complété
- Coordonnées réelles (email, téléphone, adresse)
- Lien agenda HubSpot intégré
- Retrait mentions Fondation Wilsdorf
- Mise à jour partenaires et budget
- Documentation actualisée

#### ⏳ À faire (selon CONTENT-TODO.md)
- Connecter formulaire de contact (Netlify Forms/Formspree)
- Ajouter logo Ville de Genève
- Intégrer Google Maps sur page contact
- Configurer liens réseaux sociaux
- Uploader rapports PDF
- Ajouter photos réelles

---

## [Version 1.0] - 2025-01-21

### 🎉 Version initiale

#### Fonctionnalités
- ✅ 6 pages HTML complètes (Accueil, Projet, Activités, Impact, Financement, Contact)
- ✅ Page 404 personnalisée
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Système multilingue (FR/EN/DE)
- ✅ Logo et favicon TARMAQ
- ✅ Animations et transitions fluides
- ✅ Navigation avec menu mobile
- ✅ Formulaire de contact avec validation
- ✅ SEO optimisé

#### Documentation
- ✅ README.md complet
- ✅ DEPLOYMENT.md (guide déploiement)
- ✅ CONTENT-TODO.md (checklist contenu)
- ✅ Configuration Netlify (netlify.toml, _headers)
- ✅ Configuration Git (.gitignore, .editorconfig)

#### Design
- Couleur principale : #DA2F2C (rouge TARMAQ)
- Typographie : Inter (Google Fonts)
- Framework : Tailwind CSS (CDN)
- Icônes : Font Awesome 6.4.0

---

## 📌 Notes de version

### Structure du projet
```
tarmaq.ch/
├── 6 pages HTML (index, projet, activites, impact, financement, contact)
├── 1 page 404.html
├── /css/style.css
├── /js/i18n.js + main.js
├── /assets/logo.svg + logo-white.svg + favicon.svg
└── Documentation (README, DEPLOYMENT, CONTENT-TODO, CHANGELOG)
```

### Technologies
- HTML5
- CSS3 + Tailwind CSS (CDN)
- JavaScript Vanilla (ES6+)
- Google Fonts (Inter)
- Font Awesome 6.4.0

### Hébergement recommandé
- Netlify (recommandé)
- Vercel
- GitHub Pages
- Tout hébergement statique

---

**Prochaine version prévue : 1.2**
- Intégration Google Maps
- Formulaire contact connecté
- Logos partenaires réels
- Photos espaces TARMAQ

---

*Dernière mise à jour : 2025-01-21*