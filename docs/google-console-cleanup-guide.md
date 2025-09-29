# Google Search Console Cleanup Guide - The Right Way

## 🎯 Goal: Clean up old URLs and set up your new Vercel URL properly

### **Your Current Situation:**
- **NEW URL (Keep):** `https://numera-finance-lk9a.vercel.app`
- **OLD URLs (Remove):** All Netlify, GitHub Pages, old Vercel URLs

---

## **Phase 1: BEFORE Removing Anything**

### **Step 1: Document Current Properties**
1. Go to: https://search.google.com/search-console
2. Click property selector dropdown (top-left)
3. **Take a screenshot** of all properties listed
4. **Write down each URL** you see

### **Step 2: Export Important Data**
For each OLD property that has data:
1. Go to **Performance** → **Search results**
2. Click **"Export"** → Download data
3. Save these reports for your records

### **Step 3: Check Current Rankings**
1. In each old property, note any pages with good rankings
2. Search Google for: `site:old-domain.com` to see what's still indexed

---

## **Phase 2: Add Your New Vercel Property FIRST**

### **Step 1: Add New Property**
1. In Search Console, click property selector
2. Look for **"Add property"** or **"+"**
3. Choose **"URL prefix"**
4. Enter: `https://numera-finance-lk9a.vercel.app`

### **Step 2: Verify Ownership**
**Method A - HTML Tag (Recommended):**
1. Google will give you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123..." />
   ```
2. **Share this with me** - I'll add it to your HTML immediately
3. Click "Verify" in Search Console

**Method B - HTML File:**
1. Google gives you a file to upload
2. Share the filename/content with me
3. I'll create it in your docs folder

### **Step 3: Submit Your Sitemap**
1. After verification, go to **"Sitemaps"**
2. Enter: `sitemap.xml`
3. Click **"Submit"**

---

## **Phase 3: Set Up Proper Redirects (The Right Way)**

### **For Netlify (if still accessible):**
1. Add to `_redirects` file:
   ```
   https://old-netlify-url.netlify.app/* https://numera-finance-lk9a.vercel.app/:splat 301!
   ```

### **For GitHub Pages (if used):**
1. In your GitHub repo settings
2. Add custom 404.html with redirect script

### **Note:** I can help create these redirect files if needed

---

## **Phase 4: Monitor the Transition (Wait 2-4 Weeks)**

### **Week 1-2: Monitor New Property**
1. Check if new Vercel URL gets indexed
2. Watch for traffic in new property
3. **Don't remove old properties yet**

### **Week 2-4: Check Traffic Transfer**
1. Compare traffic between old and new properties
2. Search for your main keywords to see which URL ranks
3. Check: `site:numera-finance-lk9a.vercel.app` in Google

---

## **Phase 5: Safe Removal of Old Properties**

### **Only Remove When:**
- ✅ New Vercel property is verified and working
- ✅ Sitemap is submitted and processed
- ✅ New URL appears in search results
- ✅ Traffic is flowing to new URL
- ✅ Old properties show declining traffic

### **How to Remove:**
1. Select old property from dropdown
2. Go to **Settings** (gear icon)
3. **Property Settings** → **Remove Property**
4. Follow confirmation steps

---

## **Phase 6: Final Verification**

### **Check These Items:**
- [ ] New Vercel property verified
- [ ] Sitemap submitted and processed  
- [ ] Pages appearing in Google search
- [ ] Analytics tracking the new domain
- [ ] Old URLs redirect to new ones
- [ ] No critical data lost from old properties

---

## **🚨 Safety Checklist - Don't Remove Until:**

- [ ] New URL indexed by Google
- [ ] Traffic flowing to new site
- [ ] All important pages ranking
- [ ] Redirects working properly
- [ ] Analytics showing data
- [ ] At least 4 weeks have passed

---

## **Need Help? What I Can Do:**

### **✅ I Can Help With:**
1. **Add verification meta tag** to your HTML
2. **Create redirect files** for old platforms
3. **Update any remaining old URLs** in your code
4. **Monitor your sitemap** structure
5. **Check if your new URL is working** properly

### **🔒 You Must Do:**
1. **Access Google Search Console** (requires your login)
2. **Add the new property** 
3. **Remove old properties** when safe
4. **Monitor the transition**

---

## **Quick Start Actions:**

### **Right Now:**
1. **Go to Google Search Console**
2. **Add your Vercel URL as new property**
3. **Get the verification meta tag**
4. **Share it with me** - I'll add it immediately

### **This Week:**
1. **Submit sitemap** after verification
2. **Monitor indexing** of new URL
3. **Keep old properties** active for now

### **Next Month:**
1. **Check traffic transfer**
2. **Safely remove old properties**
3. **Celebrate clean setup!** 🎉

---

**Ready to start? Get the verification meta tag from Google Search Console and share it with me!**