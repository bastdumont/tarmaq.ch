# TARMAQ - Site Web Statique 🚀

Site web officiel de **TARMAQ**, un espace d'innovation dédié à la formation, au mentorat et aux technologies émergentes pour les jeunes talents.

---

## 📋 À propos

**TARMAQ** est un catalyseur d'excellence qui vise à démocratiser l'accès aux technologies émergentes et à accompagner les jeunes talents dans leur développement professionnel.

### 🎯 Mission
- 🎓 **Formation** : Programmes en IA, blockchain, cybersécurité
- 👥 **Mentorat** : Accompagnement par des professionnels expérimentés
- 💡 **Innovation** : Espace d'expérimentation et de développement de projets

---

## 🌐 Pages du site

1. **index.html** - Page d'accueil
2. **projet.html** - Le projet TARMAQ
3. **activites.html** - Activités & Programmes
4. **impact.html** - Impact & Témoignages
5. **soutenir.html** - Comment nous soutenir
6. **contact.html** - Contact & Formulaire
7. **404.html** - Page d'erreur

---

## 🛠 Technologies

| Technologie | Usage |
|-------------|-------|
| **HTML5** | Structure sémantique |
| **CSS3** | Animations modernes + effets |
| **Tailwind CSS** | Framework CSS (CDN) |
| **JavaScript** | Interactivité et multilingue |
| **Google Fonts** | Typographie Inter |
| **Font Awesome** | Icônes |

## ✨ Nouvelles Fonctionnalités (v3.1)

### 🎨 Animations Modernes

- **15+ animations CSS** : fade, slide, scale, rotate, bounce, float, wiggle
- **Scroll reveal automatique** : les éléments apparaissent au scroll
- **Effets hover 3D** : lift, glow, zoom sur les cartes et images
- **Gradients animés** : texte et fond avec flux de couleurs
- **Transitions fluides** : cubic-bezier pour un rendu professionnel
- **Performance optimisée** : IntersectionObserver, GPU acceleration

### 🌍 Support Italien

- **Traductions complètes** : 130+ clés traduites en italien
- **Interface multilingue** : 4 langues (FR/EN/DE/IT)
- **Persistance** : la langue choisie est sauvegardée

Voir **[ANIMATIONS-ITALIAN-UPDATE.md](ANIMATIONS-ITALIAN-UPDATE.md)** pour les détails complets.

---

## 🚀 Installation & Utilisation

### Option 1 : Ouvrir directement dans le navigateur

Téléchargez les fichiers et ouvrez `index.html` dans votre navigateur. C'est tout ! ✨

### Option 2 : Serveur local (recommandé)

**Avec Python:**
```bash
python -m http.server 8000
```

**Avec Node.js:**
```bash
npx serve
```

**Avec PHP:**
```bash
php -S localhost:8000
```

Puis ouvrez : `http://localhost:8000`

---

## 🌍 Système multilingue

Le site supporte **4 langues** :
- 🇫🇷 Français (par défaut)
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇮🇹 Italiano ⭐ NOUVEAU

Le changement de langue se fait via les drapeaux en haut à droite.

### Ajouter une traduction

1. Ouvrez `js/i18n.js`
2. Ajoutez la clé dans les 3 langues (fr, en, de)
3. Utilisez `data-i18n="votre.cle"` dans le HTML

---

## 📁 Structure du projet

```
tarmaq-website/
├── index.html              # Page d'accueil
├── projet.html             # Le projet
├── activites.html          # Activités
├── impact.html             # Impact
├── soutenir.html           # Nous soutenir
├── contact.html            # Contact
├── 404.html                # Page d'erreur
│
├── css/
│   └── style.css          # Styles personnalisés
│
├── js/
│   ├── i18n.js            # Système multilingue
│   └── main.js            # JavaScript principal
│
├── assets/
│   ├── logo.svg           # Logo TARMAQ
│   ├── logo-white.svg     # Logo blanc
│   └── favicon.svg        # Favicon
│
└── README.md              # Ce fichier
```

---

## 🎨 Personnalisation

### Changer les couleurs

Dans les fichiers HTML, modifiez la config Tailwind :

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#DA2F2C',    // Rouge TARMAQ
                secondary: '#111827',   // Gris foncé
                accent: '#F3F4F6'       // Gris clair
            }
        }
    }
}
```

### Modifier le contenu

Éditez directement les fichiers HTML. Le contenu traduit utilise l'attribut `data-i18n`.

### Changer le logo

Remplacez les fichiers SVG dans `assets/` :
- `logo.svg` - Logo principal
- `logo-white.svg` - Logo blanc pour footer
- `favicon.svg` - Favicon

---

## 📧 Contact

- **Email** : bastien@bdi-solutions.com
- **Téléphone** : +41 79 670 77 43
- **Adresse** : Perspectives Jeunesse, 11 avenue Eugène-Pittard, 1206 Genève
- **Rendez-vous** : [Réserver un créneau](https://meetings-eu1.hubspot.com/bdumont?uuid=a342bacf-b1c4-4182-82dd-64b39fa7b307)

---

## 🚀 Déploiement

### Netlify (recommandé)

1. Créez un compte sur [Netlify](https://www.netlify.com)
2. Glissez-déposez le dossier du projet
3. Votre site est en ligne ! 🎉

### Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez le projet depuis GitHub ou glissez-déposez
3. Déployez automatiquement

### GitHub Pages

1. Créez un repository GitHub
2. Poussez les fichiers
3. Activez GitHub Pages dans Settings
4. Votre site sera accessible à `username.github.io/repo-name`

### Hébergement classique (FTP)

Uploadez tous les fichiers via FTP sur votre serveur web.

---

## 📄 Licence

© 2025 TARMAQ. Tous droits réservés.

---

## 🤖 Pour Claude AI

Si vous utilisez Claude AI pour continuer le développement :

- **claude.md** - Context complet du projet
- **subagent-content-editor.md** - Édition contenu et traductions
- **subagent-frontend-developer.md** - Développement frontend

---

**Made with ❤️ for young talents in tech**

*TARMAQ - Catalyseur d'excellence*
