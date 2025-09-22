# 🆓 Free Domain Setup Guide

## Method 1: Freenom (Free .tk, .ml, .ga, .cf domains)

### Step 1: Choose Your Domain
1. Go to: https://freenom.com
2. Search for your desired domain name
3. Try these extensions:
   - `numera-finance.tk` (Tokelau)
   - `numera-finance.ml` (Mali)
   - `numera-finance.ga` (Gabon)
   - `numera-finance.cf` (Central African Republic)

### Step 2: Register
1. Click "Get it now!" for available domains
2. Select "12 Months @ FREE"
3. Click "Continue"
4. Create account or login
5. Complete registration

### Step 3: Configure DNS (Point to Netlify)
1. In Freenom dashboard, go to "Manage Domain"
2. Click "Manage Freenom DNS"
3. Add these records:

**For Netlify:**
```
Type: CNAME
Name: www
Target: your-site.netlify.app

Type: A
Name: @
Target: 75.2.60.5
```

### Step 4: Configure in Netlify
1. Go to your Netlify site dashboard
2. Settings → Domain Management
3. Click "Add custom domain"
4. Enter your free domain (e.g., numera-finance.tk)
5. Netlify will automatically provision SSL

---

## Method 2: GitHub Student Pack (Best Quality)

### Requirements:
- Valid student email (.edu)
- GitHub account
- Student verification

### Benefits:
- Free .me domain for 1 year
- Many other developer tools
- Professional domain extension

### Steps:
1. Go to: https://education.github.com/pack
2. Apply with student credentials
3. Get approved
4. Claim Namecheap .me domain
5. Point to Netlify

---

## Method 3: Keep Netlify Subdomain (Simplest)

### Benefits:
- ✅ Free forever
- ✅ Professional appearance
- ✅ No configuration needed
- ✅ Built-in SSL
- ✅ Global CDN

### Your URL:
```
https://numera-finance.netlify.app
```

---

## 🎯 Recommended Choice

**For a financial tools website, I recommend:**

1. **Start with Netlify subdomain** (free, professional)
2. **Later upgrade** to a paid domain ($10-15/year) when you're ready
3. **Popular paid options**: `.com`, `.finance`, `.money`, `.tools`

**Good paid domain ideas:**
- `numera.finance` ($50/year)
- `numera-tools.com` ($12/year)
- `financecalc.tools` ($25/year)
- `mycalculator.money` ($30/year)