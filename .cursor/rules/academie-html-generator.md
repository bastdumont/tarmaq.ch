# Académie HTML Page Generator Subagent

---
description: Specialized subagent for generating HTML course pages in the Académie format and style
globs: adémie/*.html
alwaysApply: false
---

## **Purpose**
This subagent generates complete HTML course pages for the Académie section following the established design patterns, styling, and content structure.

## **Core Requirements**

### **File Structure**
- **Location**: All generated pages must be placed in the `adémie/` directory
- **Naming**: Use descriptive kebab-case filenames (e.g., `guide-react-hooks.html`)
- **Language**: All content in French (`lang="fr"`)

### **HTML Template Structure**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[COURSE_TITLE]</title>
    <!-- Required CDN Links -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" />
    
    <!-- Required Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        /* [STANDARD_STYLES] */
    </style>
</head>
<body class="bg-gray-50">
    <!-- [NAVIGATION] -->
    <!-- [HERO_SECTION] -->
    <!-- [CONTENT_SECTIONS] -->
    <!-- [FOOTER] -->
</body>
</html>
```

## **Required CSS Styles**

### **Core Brand Colors**
```css
:root {
    --brand-primary: #E30007;
    --brand-secondary: #CC0006;
    --brand-light: #F4999C;
}

.gradient-bg {
    background: linear-gradient(135deg, #E30007 0%, #CC0006 100%);
}

.text-brand {
    color: #E30007;
}
```

### **Standard Component Styles**
```css
/* Navigation Styles */
.btn-secondary {
    background: rgba(255, 255, 255, 0.9);
    color: #2a2a2a;
    padding: 14px 24px;
    border-radius: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
    border: 1px solid #e8e8ec;
    cursor: pointer;
}

.btn-gradient {
    background: linear-gradient(140deg, #F4999C, #E30007);
    color: white;
    padding: 14px 24px;
    border-radius: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

/* Card Hover Effects */
.card-hover {
    transition: all 0.3s ease;
}
.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

## **Required Components**

### **1. Navigation Bar**
```html
<nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <a href="index.html" class="font-semibold text-brand" style="color: #E30007;">Cours Libre</a>
            </div>
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                    <a href="index.html" class="text-gray-600 hover:text-brand px-3 py-2 rounded-md text-sm font-medium transition-colors">Accueil</a>
                    <!-- Add other navigation links -->
                    <a href="[CURRENT_PAGE].html" class="text-brand px-3 py-2 rounded-md text-sm font-medium" style="color: #E30007;">[CURRENT_TITLE]</a>
                </div>
            </div>
        </div>
    </div>
</nav>
```

### **2. Hero Section**
```html
<div class="gradient-bg text-white py-16">
    <div class="max-w-6xl mx-auto px-6 text-center">
        <i class="fas fa-[ICON] text-6xl mb-6 opacity-90"></i>
        <h1 class="text-5xl font-bold mb-6">[COURSE_TITLE]</h1>
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto">
            <p><strong>Catégorie :</strong> [CATEGORY]</p>
            <p><strong>Durée :</strong> [DURATION]</p>
            <p><strong>Niveau :</strong> [LEVEL]</p>
            <!-- Optional: Video/Source link -->
        </div>
    </div>
</div>
```

### **3. Content Sections**

#### **Executive Summary**
```html
<section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">📋 Résumé Exécutif</h2>
    <div class="highlight-box">
        <h4>🎯 Objectif du cours</h4>
        <p>[COURSE_OBJECTIVE]</p>
    </div>
    <div class="bg-white rounded-xl p-6 shadow-lg">
        <p><strong>Ce que vous apprendrez :</strong></p>
        <ul class="list-disc ml-8 mt-2">
            <li>[LEARNING_POINT_1]</li>
            <li>[LEARNING_POINT_2]</li>
            <li>[LEARNING_POINT_3]</li>
        </ul>
    </div>
</section>
```

#### **Key Learning Points**
```html
<section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">🎓 Points Clés d'Apprentissage</h2>
    <div class="key-points">
        <div class="point-card">
            <h4>[POINT_NUMBER]. [POINT_TITLE]</h4>
            <p>[POINT_DESCRIPTION]</p>
        </div>
        <!-- Repeat for each key point -->
    </div>
</section>
```

#### **Step-by-Step Guide**
```html
<section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">📝 Guide Étape par Étape</h2>
    <ol class="steps">
        <li>
            <strong>[STEP_TITLE]</strong>
            <p>[STEP_DESCRIPTION]</p>
            <!-- Optional: Code block -->
            <div class="code-block">
                <code>[CODE_EXAMPLE]</code>
            </div>
        </li>
        <!-- Repeat for each step -->
    </ol>
</section>
```

#### **Tools and Resources**
```html
<section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">🛠️ Outils et Ressources</h2>
    <div class="resource-grid">
        <div class="resource-card">
            <div class="icon">[ICON]</div>
            <h4>[TOOL_NAME]</h4>
            <a href="[TOOL_URL]" target="_blank">[TOOL_DESCRIPTION]</a>
        </div>
        <!-- Repeat for each tool -->
    </div>
</section>
```

#### **Use Cases**
```html
<section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">💡 Cas d'Usage</h2>
    <div class="use-cases">
        <div class="use-case-tag">[USE_CASE_1]</div>
        <div class="use-case-tag">[USE_CASE_2]</div>
        <!-- Add more use case tags -->
    </div>
    
    <div class="highlight-box">
        <h4>🌟 Pourquoi c'est important ?</h4>
        <ul class="list-disc ml-6 space-y-1">
            <li><strong>[BENEFIT_1_TITLE]:</strong> [BENEFIT_1_DESCRIPTION]</li>
            <li><strong>[BENEFIT_2_TITLE]:</strong> [BENEFIT_2_DESCRIPTION]</li>
        </ul>
    </div>
</section>
```

#### **Learning Challenges**
```html
<section class="mb-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">🎯 Défis d'Apprentissage Recommandés</h2>
    
    <div class="challenge-box">
        <h4>[CHALLENGE_TITLE] <span class="difficulty [easy|medium|hard]">[DIFFICULTY_LEVEL]</span></h4>
        <p><strong>Objectif :</strong> [CHALLENGE_OBJECTIVE]</p>
        <p><strong>Compétences :</strong> [REQUIRED_SKILLS]</p>
        <p><strong>Temps estimé :</strong> [ESTIMATED_TIME]</p>
        <p><strong>Critères de succès :</strong></p>
        <ul class="list-disc ml-6 mt-2">
            <li>✅ [SUCCESS_CRITERIA_1]</li>
            <li>✅ [SUCCESS_CRITERIA_2]</li>
        </ul>
    </div>
</section>
```

### **4. Call to Action**
```html
<div class="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-center text-white">
    <h2 class="text-3xl font-bold mb-4">🎯 [CTA_TITLE]</h2>
    <p class="text-xl opacity-90 mb-6">[CTA_DESCRIPTION]</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="[PRIMARY_LINK]" class="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            [PRIMARY_BUTTON_TEXT]
        </a>
        <a href="[SECONDARY_LINK]" class="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors">
            [SECONDARY_BUTTON_TEXT]
        </a>
    </div>
</div>
```

### **5. Footer**
```html
<footer class="bg-gray-900 text-white py-12 mt-16">
    <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
            <div>
                <h3 class="text-xl font-bold mb-4">Cours Libre</h3>
                <p class="text-gray-400">
                    Votre hub d'apprentissage complet pour le développement professionnel et la montée en compétences.
                </p>
            </div>
            <!-- Add other footer columns -->
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cours Libre. [COURSE_SPECIFIC_CREDIT]</p>
        </div>
    </div>
</footer>
```

## **Content Generation Guidelines**

### **Text Content Requirements**
- **Language**: All content in French
- **Tone**: Professional but accessible, educational
- **Structure**: Use clear headings, bullet points, and numbered lists
- **Length**: Comprehensive but scannable (aim for 2000-4000 words)

### **Icon Usage**
- **FontAwesome**: Use appropriate FontAwesome icons for each section
- **Consistency**: Maintain consistent icon usage across similar content types
- **Examples**:
  - 🚀 or `fas fa-rocket` for getting started
  - 🎓 or `fas fa-graduation-cap` for learning
  - 🛠️ or `fas fa-tools` for tools
  - 💡 or `fas fa-lightbulb` for use cases
  - 🎯 or `fas fa-bullseye` for objectives

### **Code Blocks**
```css
.code-block {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 15px 0;
    font-family: 'Courier New', monospace;
}
```

### **Highlight Boxes**
```css
.highlight-box {
    background: linear-gradient(135deg, #FFF5E1 0%, #FFE4B5 100%);
    border-left: 5px solid #FFA500;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
}
```

## **Responsive Design Requirements**

### **Mobile-First Approach**
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Ensure all grids collapse to single column on mobile
- Test navigation menu responsiveness

### **Grid Layouts**
```css
.key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

@media (max-width: 768px) {
    .key-points,
    .resource-grid {
        grid-template-columns: 1fr;
    }
}
```

## **Index Page Integration**

### **After creating a new course page, ALWAYS:**

1. **Add navigation link** in the appropriate category section of `index.html`
2. **Use this template**:
```html
<a
  href="[NEW_PAGE_FILENAME].html"
  class="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
>
  <h3 class="font-semibold text-blue-800 mb-1">
    [COURSE_TITLE]
  </h3>
  <p class="text-sm text-blue-700">
    [COURSE_DESCRIPTION]
  </p>
  <div class="flex items-center mt-2 text-xs text-blue-600">
    <i class="fas fa-[APPROPRIATE_ICON] mr-1"></i>
    <span>[CATEGORY_TAG]</span>
  </div>
</a>
```

3. **Update navigation** in the new page to mark itself as active

## **Quality Checklist**

### **Before Finalizing Any Generated Page:**

- [ ] **HTML Validation**: Proper DOCTYPE, meta tags, and semantic structure
- [ ] **CSS Consistency**: All brand colors and styles match existing pages
- [ ] **Navigation**: Proper navigation with current page highlighted
- [ ] **Responsive**: Works on mobile, tablet, and desktop
- [ ] **Content Quality**: Comprehensive, well-structured, and valuable
- [ ] **Links**: All external links open in new tabs (`target="_blank"`)
- [ ] **Icons**: Appropriate FontAwesome icons used consistently
- [ ] **French Language**: All content properly written in French
- [ ] **Index Integration**: New course added to index.html
- [ ] **File Naming**: Descriptive kebab-case filename

## **Content Categories**

### **Available Categories for Classification:**
- **IA & Technologie**: AI tools, programming, automation
- **Marketing**: Digital marketing, growth strategies
- **Finance**: Investment, trading, financial analysis
- **Vente**: Sales techniques, CRM, negotiation
- **Éducation**: Learning methodologies, educational technology
- **Études de cas**: Case studies, real-world examples

## **Example Usage**

### **Input Text Processing:**
When given text content, extract and structure:
1. **Title and metadata** (duration, level, category)
2. **Key learning objectives**
3. **Step-by-step processes**
4. **Tools and resources mentioned**
5. **Practical applications**
6. **Learning challenges/exercises**

### **Content Enhancement:**
- Add relevant emojis and icons
- Create engaging section headers
- Structure information hierarchically
- Add practical examples and code snippets
- Include call-to-action elements
- Suggest related resources

## **Error Prevention**

### **Common Mistakes to Avoid:**
- ❌ Missing navigation integration
- ❌ Inconsistent color scheme
- ❌ Non-responsive design
- ❌ Missing FontAwesome icons
- ❌ English content in French site
- ❌ Broken internal links
- ❌ Missing meta tags
- ❌ Inconsistent file naming

### **Best Practices:**
- ✅ Always test on multiple screen sizes
- ✅ Validate HTML structure
- ✅ Use semantic HTML elements
- ✅ Maintain consistent spacing and typography
- ✅ Include alt text for images
- ✅ Optimize for loading speed
- ✅ Follow accessibility guidelines
- ✅ Keep content scannable and engaging

---

**Remember**: This subagent should create complete, production-ready HTML pages that seamlessly integrate with the existing Académie site structure and provide genuine educational value to users.
