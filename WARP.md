# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Numera Financial Tools Suite** is a comprehensive web-based financial calculator application built with vanilla HTML, CSS, and JavaScript. It provides multiple financial calculators including EMI, SIP, Income Tax, Scientific Calculator, Currency Converter, Zakat Calculator, and Savings Goal Tracker.

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **Build Tools**: Node.js with npm scripts
- **Development Server**: live-server
- **Minification**: clean-css-cli and uglify-js
- **Deployment**: GitHub Pages via gh-pages
- **Analytics**: Google Analytics (gtag.js)
- **Monetization**: Google AdSense integration

## Common Development Commands

### Development Server
```powershell
# Start development server on port 3000
npm start
```

### Build and Optimization
```powershell
# Build production-ready files
npm run build

# Minify CSS only
npm run minify-css

# Minify JavaScript only
npm run minify-js
```

### Deployment
```powershell
# Deploy to GitHub Pages
npm run deploy
```

### File Structure Navigation
```powershell
# View main application files
ls index.html styles.css script.js

# View individual calculator pages
ls *-calculator.html

# View generated/docs folder (contains optimized versions)
ls financial-tools-suite/docs/
```

## Architecture Overview

### Core Application Structure

1. **Single Page Application (SPA)**: Main functionality is in `index.html` with modal-based calculator interfaces
2. **Separate Page Structure**: Individual calculators also have dedicated HTML pages for better SEO
3. **Progressive Web App (PWA)**: Includes `manifest.json` for installable web app capabilities

### Key Components

#### 1. Modal System (`script.js` lines 110-166)
- Centralized modal management for calculator interfaces
- Template-based calculator loading using HTML templates
- Accessibility features including keyboard navigation and focus management

#### 2. Calculator Engine (`script.js` lines 224-813)
- Individual calculator functions for each tool type
- Input validation with user-friendly error messages
- Consistent result formatting using utility functions
- Google Analytics tracking for calculator usage

#### 3. Theme System (`script.js` lines 22-44)
- Dark/light theme toggle with localStorage persistence
- CSS custom properties for theme variables
- Dynamic icon updates based on theme state

#### 4. Scientific Calculator (`script-new.js` lines 451-740)
- Advanced mathematical functions with angle mode support (DEG/RAD)
- Memory functions (MS, MR, MC)
- Keyboard input support
- Expression evaluation with safety measures

### JavaScript Architecture Patterns

#### 1. Module Pattern
- Global variables managed in controlled scope
- Initialization pattern with `DOMContentLoaded` event
- Function organization by feature/calculator type

#### 2. Event-Driven Architecture
- Centralized event handling setup in `initializeApp()`
- Delegated event handling for dynamic content
- Keyboard accessibility throughout

#### 3. Template System
- HTML templates stored in hidden divs
- Dynamic content loading via `innerHTML`
- Consistent UI patterns across calculators

## Important File Locations

### Core Application Files
- `index.html` - Main application entry point with all calculator templates
- `styles.css` - Complete stylesheet with theme support and responsive design
- `script.js` - Main application logic and calculator functions
- `script-new.js` - Enhanced version with scientific calculator

### Individual Calculator Pages
- `islamic-banking-calculator.html` - Shariah-compliant financial calculations
- `profit-rate-calculator.html` - ROI and investment return calculations
- `installment-calculator.html` - EMI and loan payment calculations
- `savings-calculator.html` - Savings goal tracking and planning

### Configuration Files
- `package.json` - npm scripts and dependencies
- `manifest.json` - PWA configuration
- Analytics and AdSense configurations embedded in HTML

## Development Patterns

### 1. Calculator Function Structure
All calculator functions follow this pattern:
```javascript
function calculateTOOL() {
    // 1. Input collection and parsing
    // 2. Validation with user-friendly error messages
    // 3. Mathematical calculations
    // 4. Result formatting and display
    // 5. Analytics tracking (Google Ads conversion)
}
```

### 2. Input Validation Pattern
```javascript
if (!validateInput(value, min, max)) {
    showError('User-friendly error message');
    return;
}
```

### 3. Result Display Pattern
All results use consistent HTML structure with `result-item` divs and highlight sections.

### 4. Analytics Integration
Each calculator tracks usage with `trackConversion(calculatorType)` for Google Ads optimization.

## SEO and Performance Considerations

1. **Structured Data**: Comprehensive JSON-LD markup for calculators and FAQ
2. **Meta Tags**: Extensive OpenGraph and Twitter Card optimization
3. **Content Security Policy**: Configured for Google Analytics and AdSense
4. **Progressive Web App**: Installable with service worker capabilities
5. **Mobile-First**: Responsive design with specific mobile optimizations

## Testing and Quality

### Manual Testing Checklist
- Test each calculator with valid and invalid inputs
- Verify theme switching functionality
- Check modal keyboard navigation (Escape, Tab, Enter)
- Validate responsive behavior on different screen sizes
- Test PWA installation and offline behavior

### Browser Support
- Modern browsers supporting ES6+ features
- CSS Grid and Flexbox support required
- Local Storage API for theme persistence

## Security Considerations

1. **Input Sanitization**: All user inputs are parsed through `parseFloat()` and validated
2. **CSP Headers**: Content Security Policy configured for external resources
3. **Expression Evaluation**: Scientific calculator uses safe `Function` constructor with strict mode
4. **Analytics Privacy**: IP anonymization enabled in Google Analytics

## Common Issues and Solutions

### Development Server Issues
```powershell
# If live-server is not found
npm install

# Alternative local server
python -m http.server 8000  # Python 3
# or
python -m SimpleHTTPServer 8000  # Python 2
```

### Build Optimization
- CSS and JS files are minified for production in separate directories
- Source maps can be generated by modifying npm scripts
- Images and assets are optimized inline using data URIs

### Calculator Accuracy
- All financial calculations use standard formulas
- Floating-point precision is handled with appropriate rounding
- Currency formatting follows Indian numbering system (lakhs/crores)

This codebase follows a pragmatic approach to web development with vanilla technologies, focusing on performance, SEO, and user experience while maintaining code simplicity and maintainability.