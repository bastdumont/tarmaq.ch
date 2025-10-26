# 🌟 TARMAQ Website - Documentation Complète

**Version**: 3.1 - Static HTML Pure  
**Date**: 2025-10-22  
**Status**: ✅ Production Ready

---

## 📋 Table des Matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [🚀 Démarrage Rapide](#-démarrage-rapide)
- [📁 Structure du Projet](#-structure-du-projet)
- [🌍 Multilingue (4 langues)](#-multilingue-4-langues)
- [✨ Animations & Effets](#-animations--effets)
- [📧 Système de Charte](#-système-de-charte)
- [📄 Pages Disponibles](#-pages-disponibles)
- [🎨 Design System](#-design-system)
- [🔧 Développement](#-développement)
- [📊 Historique des Versions](#-historique-des-versions)
- [📞 Support](#-support)

---

## 🎯 Vue d'ensemble

**TARMAQ** est un site web statique multilingue pour une organisation jeunesse tech basée à Genève. Le site présente les activités, programmes et valeurs de TARMAQ avec un focus sur l'innovation, l'entrepreneuriat et la formation technologique.

### ✨ Caractéristiques Principales

- 🌐 **4 langues** : Français, English, Deutsch, Italiano
- 📱 **Responsive** : Mobile-first design
- ⚡ **Performance** : HTML pur, CDN uniquement
- 🎨 **Animations** : 15+ effets CSS modernes
- 📧 **Charte interactive** : Signatures + notifications email
- 🚀 **Déploiement simple** : Drag & drop, aucun build

---

## 🚀 Démarrage Rapide

### Installation (Aucune !)

```bash
# Option 1: Python (recommandé)
python -m http.server 8000

# Option 2: Node.js
npx serve

# Option 3: PHP
php -S localhost:8000

# Option 4: Ouvrir directement
open index.html
```

Puis ouvrir `http://localhost:8000`

### Déploiement

```bash
# Netlify
Drag & drop le dossier → Terminé !

# Vercel
Importer depuis GitHub → Terminé !

# GitHub Pages
Push vers repo → Activer dans settings

# FTP classique
Uploader tous les fichiers → Terminé !
```

---

## 📁 Structure du Projet

```
tarmaq-website/
│
├── 🌐 Pages HTML (7)
│   ├── index.html              # Accueil
│   ├── projet.html             # Le projet
│   ├── activites.html          # Activités & Programmes
│   ├── impact.html             # Impact & Témoignages
│   ├── soutenir.html           # Nous soutenir (6 façons)
│   ├── contact.html            # Contact & Rendez-vous
│   ├── charte.html             # Charte d'engagement
│   └── 404.html                # Page d'erreur
│
├── 🎨 Styles & Assets
│   ├── css/style.css           # Styles + animations (14KB)
│   ├── assets/logo.png         # Logo principal
│   └── assets/image.png        # Images
│
├── ⚡ JavaScript (3)
│   ├── js/i18n.js              # Système multilingue
│   ├── js/main.js              # Interactions + scroll reveal
│   └── js/charter.js            # Gestion charte + email
│
└── 📚 Documentation
    ├── README.md               # Ce fichier
    ├── CHANGELOG.md            # Historique versions
    ├── claude.md               # Context pour Claude AI
    └── EMAIL_SETUP.md          # Configuration email
```

**Total**: 16 fichiers essentiels (~95 KB)

---

## 🌍 Multilingue (4 langues)

### Langues Supportées

| Langue | Code | Drapeau | Status |
|--------|------|---------|--------|
| Français | `fr` | 🇫🇷 | ✅ Complet |
| English | `en` | 🇬🇧 | ✅ Complet |
| Deutsch | `de` | 🇩🇪 | ✅ Complet |
| Italiano | `it` | 🇮🇹 | ✅ Complet |

### Comment Changer de Langue

**Interface** : Cliquer sur les drapeaux dans le header

**Programmatiquement** :
```javascript
changeLanguage('fr'); // Français
changeLanguage('en'); // English
changeLanguage('de'); // Deutsch
changeLanguage('it'); // Italiano
```

**Persistance** : La langue est sauvegardée dans `localStorage`

### Traductions Disponibles

- ✅ Navigation (7 liens)
- ✅ Page d'accueil (hero, mission, stats, programmes)
- ✅ Page projet (vision, valeurs, objectifs 2030)
- ✅ Page activités (formations, hackathons, voyages)
- ✅ Page impact (statistiques, témoignages)
- ✅ Page soutenir (6 façons d'aider)
- ✅ Page contact (formulaire, coordonnées)
- ✅ Page charte (texte complet + formulaire)
- ✅ Footer et éléments communs

**Total** : ~200 clés de traduction × 4 langues = 800 traductions

---

## ✨ Animations & Effets

### Animations d'Entrée

```css
.animate-fade-in-up      /* Apparition depuis le bas */
.animate-fade-in-down    /* Apparition depuis le haut */
.animate-fade-in-left    /* Apparition depuis la gauche */
.animate-fade-in-right   /* Apparition depuis la droite */
.animate-scale-in        /* Zoom progressif */
.animate-rotate-in       /* Rotation + apparition */
.animate-slide-up-bounce /* Glissement avec rebond */
```

### Animations Continues

```css
.animate-float           /* Flottement doux */
.animate-wiggle          /* Oscillation */
.animate-pulse-slow      /* Pulsation douce */
.gradient-text           /* Texte avec gradient animé */
.gradient-bg-animated    /* Fond avec gradient flow */
```

### Délais d'Animation

```css
.animate-delay-100       /* 0.1s */
.animate-delay-200       /* 0.2s */
.animate-delay-300       /* 0.3s */
.animate-delay-400       /* 0.4s */
.animate-delay-500       /* 0.5s */
.animate-delay-600       /* 0.6s */
```

### Scroll Reveal Automatique

```html
<!-- Les éléments apparaissent automatiquement au scroll -->
<div class="scroll-reveal">
    Contenu qui apparaîtra au scroll
</div>
```

### Effets de Survol

- **Cartes** : Lift 3D + ombre dynamique
- **Boutons** : Effet de pression + glow
- **Images** : Zoom + rotation légère
- **Navigation** : Underline animé

### Accessibilité

```css
@media (prefers-reduced-motion: reduce) {
    /* Toutes les animations désactivées */
}
```

---

## 📧 Système de Charte

### Fonctionnalités

✅ **Signatures sauvegardées** : localStorage du navigateur  
✅ **Notifications email** : Email automatique à `bastien@balder-app.com`  
✅ **Informations complètes** : Nom, email, date/heure, total signataires

### Configuration Email

#### Option 1: EmailJS (Recommandé)

1. **Créer compte** : [EmailJS.com](https://www.emailjs.com/)
2. **Configurer service** : Gmail, Outlook, etc.
3. **Créer template** : ID `template_charter_signature`
4. **Obtenir clé publique** : Account > General
5. **Mettre à jour code** : `js/charter.js`

```javascript
// Dans js/charter.js
const serviceId = 'service_tarmaq';        // Votre Service ID
const templateId = 'template_charter_signature';
const publicKey = 'your_public_key';      // Votre clé publique
```

#### Option 2: Webhook (Plus simple)

1. **Créer webhook** : [webhook.site](https://webhook.site/)
2. **Configurer Zapier/Make** : Webhook → Email
3. **Mettre à jour URL** : `js/charter.js`

### Template Email

```
Sujet: Nouvelle signature de la charte TARMAQ - {{signatory_name}}

Bonjour,

Une nouvelle personne a signé la charte TARMAQ !

Détails :
- Nom : {{signatory_name}}
- Email : {{signatory_email}}
- Date et heure : {{signature_date}}
- Nombre total de signataires : {{total_signatures}}

Message :
{{message}}

---
TARMAQ - Système automatique
```

---

## 📄 Pages Disponibles

### 1. 🏠 Accueil (`index.html`)
- Hero avec call-to-action
- Mission & valeurs (3 cartes)
- Statistiques d'impact
- Programmes principaux
- Témoignages

### 2. 🎯 Le Projet (`projet.html`)
- Vision TARMAQ
- Valeurs fondamentales
- Objectifs 2030
- Équipe & partenaires

### 3. 🚀 Activités (`activites.html`)
- **Formation IA** : Libre en ligne + Résidentiel (3 places)
- **Hackathons** : Défis 24h-48h
- **Bootcamps** : Tech, Innovation & Entrepreneuriat
- **Échanges inter-écoles** : Challenges collaboratifs
- **Voyages éducatifs** : Silicon Valley, Londres, Beijing, Shanghai
- **Programme mentorat** : 1-to-1 + sessions groupe

### 4. 📈 Impact (`impact.html`)
- Statistiques de réussite
- Témoignages d'étudiants
- Projets réalisés
- Partenaires entreprises

### 5. 🤝 Nous Soutenir (`soutenir.html`)
**6 façons d'aider TARMAQ :**

1. 💰 **Donations financières** - Bourses, équipement, voyages
2. 👨‍🏫 **Mentorat** - 2-4h/mois, présentiel/online
3. 🏢 **Prêt de locaux** - Salles formation, coworking, bureaux
4. 💻 **Don de matériel** - Ordinateurs, réseau, licences
5. 🎪 **Partenaires événements** - Sponsoring, speakers, co-organisation
6. 👥 **Communauté** - Partage réseaux sociaux, bouche-à-oreille

### 6. 📞 Contact (`contact.html`)
- Formulaire de contact
- Coordonnées complètes
- Intégration HubSpot (rendez-vous)
- Localisation Genève

### 7. 📜 Charte (`charte.html`)
- Texte complet de la charte (5 articles)
- Formulaire de signature
- Liste des signataires
- Notifications email automatiques

---

## 🎨 Design System

### Couleurs

```css
Primary: #DA2F2C    /* Rouge TARMAQ - NE PAS CHANGER */
Secondary: #111827  /* Gris foncé */
Accent: #F3F4F6     /* Gris clair */
```

### Typographie

- **Police principale** : Inter (Google Fonts)
- **Police signatures** : Caveat (cursive)
- **Poids disponibles** : 300, 400, 500, 600, 700, 800

### Composants

- **Cartes** : `rounded-xl`, `shadow-lg`, hover effects
- **Boutons** : `bg-primary`, `hover:bg-red-700`, transitions
- **Sections** : `py-20`, `container mx-auto`, responsive grid
- **Navigation** : Fixed header, mobile menu, language switcher

### Responsive Breakpoints

```css
sm: 640px    /* Mobile large */
md: 768px    /* Tablette */
lg: 1024px   /* Desktop */
xl: 1280px   /* Desktop large */
```

---

## 🔧 Développement

### Workflow Simple

```bash
1. Éditer HTML/CSS/JS dans votre éditeur
2. Sauvegarder
3. Rafraîchir le navigateur
4. Terminé !
```

### Ajouter du Contenu

**Pour du texte traduisible :**
1. Ajouter `data-i18n="unique.key"` à l'élément HTML
2. Ajouter traductions dans `js/i18n.js` pour les 4 langues
3. Tester toutes les langues

**Exemple :**
```html
<h2 data-i18n="section.title">Titre par défaut</h2>
```

```javascript
// Dans js/i18n.js
fr: { 'section.title': 'Titre français' },
en: { 'section.title': 'English title' },
de: { 'section.title': 'Deutscher Titel' },
it: { 'section.title': 'Titolo italiano' }
```

### Ajouter une Nouvelle Page

1. Créer `nouvelle-page.html`
2. Copier structure d'une page existante
3. Mettre à jour navigation dans TOUTES les pages HTML
4. Ajouter traductions dans `js/i18n.js`
5. Tester responsive et toutes les langues

### Modifier les Styles

**Tailwind (recommandé) :**
```html
<div class="bg-primary text-white px-6 py-4 rounded-lg hover:shadow-xl transition">
```

**CSS personnalisé :**
Ajouter dans `css/style.css` - animations et effets existants disponibles.

---

## 📊 Historique des Versions

### v3.1 (2025-10-22) - Animations + Italien
- ✨ 15+ nouvelles animations CSS
- 🇮🇹 Support complet de l'italien
- 🎨 Effets de survol avancés (3D, glow, lift)
- 📱 Scroll reveal automatique
- ♿ Support `prefers-reduced-motion`

### v3.0 (2025-10-22) - Simplification Majeure
- ❌ Suppression complète du CMS (Tina/Netlify)
- ❌ Suppression des build tools (npm)
- ✅ Site 100% statique HTML
- 📄 Nouvelle page "Nous soutenir" (6 façons)
- 🌍 Traductions complètes FR/EN/DE
- 📧 Système de charte avec email

### v2.1 (2025-10-22) - Page Soutenir
- ❌ Suppression `financement.html`
- ✅ Création `soutenir.html` avec 6 sections
- 🔄 Mise à jour navigation dans toutes les pages
- 🌍 70+ nouvelles traductions

### v2.0 - Avec CMS
- ✅ Tina CMS + Netlify CMS
- ✅ Build tools (npm, webpack)
- ✅ Contenu Markdown
- ❌ Complexité élevée

---

## 🚨 Points d'Attention

### ✅ Ce qui fonctionne
- Système multilingue complet (4 langues)
- Design responsive mobile-first
- Animations CSS performantes
- Formulaire de contact fonctionnel
- Charte interactive avec email
- Déploiement ultra-simple

### ⚠️ Limitations actuelles
- Signatures charte : localStorage uniquement (pas de persistance serveur)
- Pas de base de données (contenu en HTML)
- Pas de système de build (modifications manuelles)

### 🔮 Améliorations futures possibles
- Base de données pour signatures charte
- Système de build optionnel
- Plus d'animations personnalisées
- Intégration analytics
- SEO avancé

---

## 📞 Support

### Contact Principal
- **Email** : bastien@bdi-solutions.com
- **Téléphone** : +41 79 670 77 43
- **Adresse** : Perspectives Jeunesse, 11 avenue Eugène-Pittard, 1206 Genève

### Documentation Technique
- **README.md** : Ce fichier (documentation complète)
- **claude.md** : Context pour Claude AI
- **EMAIL_SETUP.md** : Configuration email charte
- **CHANGELOG.md** : Historique détaillé des versions

### Dépanage Rapide

**Problème** : Traductions ne s'affichent pas  
**Solution** : Vérifier `data-i18n` et clés dans `js/i18n.js`

**Problème** : Animations ne fonctionnent pas  
**Solution** : Vérifier `css/style.css` chargé et classes CSS

**Problème** : Email charte ne fonctionne pas  
**Solution** : Suivre EMAIL_SETUP.md pour configurer EmailJS

**Problème** : Site ne se charge pas  
**Solution** : Utiliser serveur local (`python -m http.server 8000`)

---

## 🎉 Résultat Final

✅ **Site web 100% statique**  
✅ **4 langues complètes**  
✅ **Animations modernes**  
✅ **Charte interactive**  
✅ **6 façons de soutenir**  
✅ **Performance maximale**  
✅ **Maintenance ultra-simple**  
✅ **Déploiement instantané**  

**Prêt à être utilisé et déployé immédiatement !** 🚀

---

*Documentation créée le 2025-10-22 par Claude AI*  
*TARMAQ - Catalyseur d'excellence pour les jeunes talents*