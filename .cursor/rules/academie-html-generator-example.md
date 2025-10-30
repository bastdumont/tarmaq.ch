# Académie HTML Generator - Usage Example

## How to Use the Subagent

### **Activation Prompt**
```
@academie-html-generator Create a new course page based on this text content: [PASTE_YOUR_TEXT_HERE]
```

### **Example Input Text**
```
Title: Introduction to React Hooks
Duration: 45 minutes
Level: Intermediate
Category: IA & Technologie

This course covers the fundamentals of React Hooks, including useState, useEffect, and custom hooks. Students will learn how to refactor class components to functional components using hooks, manage state effectively, and handle side effects in React applications.

Key topics:
- Understanding the useState hook
- Managing side effects with useEffect
- Creating custom hooks
- Best practices and common pitfalls
- Performance optimization with useMemo and useCallback

Tools needed:
- Node.js and npm
- Code editor (VS Code recommended)
- React Developer Tools browser extension

Practical exercises:
1. Build a counter component using useState
2. Create a data fetching component with useEffect
3. Develop a custom hook for form handling
```

### **Expected Output**
The subagent would generate a complete HTML file named `introduction-react-hooks.html` with:

1. **Proper HTML structure** with all required meta tags and CDN links
2. **Consistent styling** matching the Académie brand colors and design
3. **Navigation bar** with the new course highlighted
4. **Hero section** with React-themed icon and course metadata
5. **Content sections** including:
   - Executive summary
   - Key learning points (6 cards for the main topics)
   - Step-by-step guide (3 main exercises broken down)
   - Tools and resources (with links to Node.js, VS Code, React docs)
   - Use cases (web applications, dashboards, interactive UIs)
   - Learning challenges (3 difficulty levels)
6. **Call-to-action** with links to React documentation and practice resources
7. **Footer** with course-specific credits

### **Automatic Index Integration**
The subagent would also:
1. Add a new course link in the "IA & Technologie" section of `index.html`
2. Use appropriate React icon (`fab fa-react`)
3. Include category tag "React Development"

## **Advanced Usage**

### **For Video-Based Content**
```
@academie-html-generator Create a course page for this YouTube video analysis:

Video: "Advanced TypeScript Patterns" by Tech Talks
URL: https://youtube.com/watch?v=example
Duration: 32:15
Presenter: Sarah Johnson
Views: 15,432

The video covers advanced TypeScript patterns including:
- Generic constraints and conditional types
- Mapped types and template literal types
- Utility types and their practical applications
- Building type-safe APIs
- Advanced decorators and metadata reflection

Key takeaways:
- How to leverage TypeScript's type system for better code safety
- Practical patterns for enterprise applications
- Performance considerations with complex types
```

### **For Tool/Resource Compilation**
```
@academie-html-generator Create a comprehensive guide page:

Title: 10 Essential VS Code Extensions for Web Developers
Category: IA & Technologie
Type: Resource Guide

Content should include:
- Extension overview and installation
- Configuration tips
- Practical use cases
- Productivity benefits
- Alternative options

Extensions to cover:
1. Prettier - Code formatter
2. ESLint - JavaScript linter
3. Live Server - Local development server
4. GitLens - Git integration
5. Auto Rename Tag - HTML tag editing
6. Bracket Pair Colorizer - Code readability
7. Thunder Client - API testing
8. Path Intellisense - File path autocomplete
9. Material Icon Theme - File icons
10. Emmet - HTML/CSS shortcuts
```

## **Quality Assurance**

The subagent will automatically:
- ✅ Validate HTML structure
- ✅ Ensure responsive design
- ✅ Check brand color consistency
- ✅ Verify navigation integration
- ✅ Test all external links
- ✅ Optimize for mobile devices
- ✅ Include proper meta tags for SEO
- ✅ Add appropriate FontAwesome icons

## **Customization Options**

### **Override Default Settings**
```
@academie-html-generator Create a course page with these customizations:

[YOUR_CONTENT]

Customizations:
- Hero icon: fas fa-database (instead of default)
- Primary color: Use blue accent for this course
- Add video embed section
- Include downloadable resources section
- Create 5 learning challenges instead of 3
```

### **Specify Target Audience**
```
@academie-html-generator Create a beginner-friendly course page:

[YOUR_CONTENT]

Target audience: Complete beginners
- Use simpler language
- Add more explanatory content
- Include prerequisite section
- Add troubleshooting section
- Create easier practice exercises
```

This subagent will dramatically speed up the creation of consistent, high-quality course pages for the Académie section while maintaining the established design standards and user experience.
