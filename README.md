# Creative Developer Portfolio 🚀

A modern, highly interactive, and responsive developer portfolio featuring a **Sleek Dark Fusion** design system, glassmorphic UI cards, scroll spy navigation, mouse cursor spotlight, and smooth keyframe animations.

---

## 🛠️ Tech Stack & Features
*   **HTML5 & CSS3** (Vanilla CSS for performance and custom styling control).
*   **Vanilla JS (ES6)** (Modern APIs: Intersection Observer, Scroll Spy, Fetch).
*   **Spotlight cursor follower** tracking mouse movement in the hero section.
*   **Responsive layouts** adapting to Desktop, Tablet, and Mobile displays.
*   **AJAX Contact Form** connected directly to [FormSubmit](https://formsubmit.co).

---

## 💻 Running the Project Locally

Since this is a static site, you can open `Index.html` directly in your browser. However, to enable all features (like AJAX form submissions and proper relative asset loads), we recommend running a local development server.

### Option 1: VS Code extension (Recommended)
Install the **Live Server** extension in VS Code, open the project folder, and click **"Go Live"** in the bottom status bar.

### Option 2: Node.js (npx)
If you have Node.js installed, open your terminal in the project directory and run:
```bash
npx serve .
```
Then open `http://localhost:3000` in your web browser.

### Option 3: Python
If you have Python installed:
```bash
# Python 3.x
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 🚀 Deployment Preparations & Instructions

### 1. Initialize a Local Git Repository
To deploy to platforms like GitHub Pages, Vercel, or Netlify, it's best to track your project with Git:
```bash
git init
git add .
git commit -m "Initial commit: Portfolio Webpage"
```

---

### 2. Deploy to GitHub Pages (Free)
1. Create a new repository on GitHub (e.g., `portfolio`).
2. Link your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository settings on GitHub.
4. Navigate to the **Pages** tab on the left sidebar.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Set the branch to `main` and folder to `/ (root)`. Click **Save**.
7. In a few minutes, your site will be live at `https://your-username.github.io/portfolio/`.

---


## 📬 Activating the Contact Form
Your form is configured to send emails to `roshan047007@gmail.com` using FormSubmit.
1. Fill out and submit the contact form once the site is deployed.
2. FormSubmit will send a confirmation email to `roshan047007@gmail.com`.
3. Click the **Activate** link in that email.
4. Subsequent submissions will land directly in your inbox.
