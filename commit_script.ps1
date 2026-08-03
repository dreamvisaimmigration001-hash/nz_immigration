git add package.json package-lock.json eslint.config.mjs
git commit -m "chore: initial project configuration and dependencies"

git add src/app/globals.css src/app/layout.tsx
git commit -m "style: add global css and root layout"

git add public/icons/
git commit -m "chore: add application icons"

git add public/images/ public/*.png
git commit -m "chore: add static images and branding assets"

git add src/lib/
git commit -m "feat: add shared utilities and lib folder"

git add src/models/
git commit -m "feat: add mongoose database models"

git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat: add Navbar and Footer components"

git add src/components/
git commit -m "feat: add common UI components and Login modal"

git add src/app/api/auth/
git commit -m "feat: implement NextAuth API routes"

git add src/app/api/
git commit -m "feat: add API routes for visas, users, employees, sponsorships"

git add src/app/login/
git commit -m "feat: implement login page UI"

git add src/app/app.css src/app/\(main\)/page.tsx
git commit -m "feat: implement main landing page and app specific styles"

git add src/app/dashboard/
git commit -m "feat: add dashboard interface"

git add src/app/employers/
git commit -m "feat: implement employers portal for users and visas management"

git add src/app/sponsorships/
git commit -m "feat: add sponsorships pages"

git add src/app/visas/
git commit -m "feat: add visas application section"

git add src/app/\(main\)/live/ src/app/\(main\)/study/ src/app/\(main\)/visit/ src/app/\(main\)/work/ src/app/\(main\)/process-to-apply/
git commit -m "feat: add informational pages for various visa routes"

git add scripts/ make_admin.js
git commit -m "chore: add admin setup scripts"

git rm src/app/page.tsx
git commit -m "chore: remove default Next.js page"

git add .
git commit -m "chore: catch all remaining uncommitted files"
