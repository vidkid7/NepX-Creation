# Deploy NepX Creation to Railway

Follow these steps to deploy your site to Railway.

---

## 1. Push your code to GitHub

Make sure your project is in a GitHub repository. If not:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 2. Create a Railway project

1. Go to **[railway.app](https://railway.app)** and sign in (GitHub is easiest).
2. Click **"New Project"**.
3. Choose **"Deploy from GitHub repo"**.
4. Select your **NepX Creation** repository (you may need to grant Railway access to GitHub first).
5. Railway will create a new **service** from your repo and start building.

---

## 3. Add PostgreSQL

1. In your project dashboard, click **"+ New"**.
2. Select **"Database"** → **"PostgreSQL"**.
3. Railway creates a Postgres service. You don’t need to copy the URL yet if you link it in the next step.

---

## 4. Connect the database to your app

1. Click your **app service** (the one with your repo name, not the Postgres one).
2. Go to the **"Variables"** tab.
3. Click **"+ New Variable"** or **"Add variable"** / **"Raw Editor"**.
4. Add a reference to the database:
   - Click **"Add reference"** (or **"Connect"**).
   - Choose your **PostgreSQL** service.
   - Select **`DATABASE_URL`**.
   - This will add `DATABASE_URL` to your app using the Postgres connection string.

If your UI doesn’t have “Add reference”, go to the **PostgreSQL** service → **Variables** tab, copy **`DATABASE_URL`**, then in your app service → Variables, add:

- **Variable:** `DATABASE_URL`
- **Value:** (paste the copied URL)

---

## 5. Add the rest of the environment variables

Still in your **app service** → **Variables**, add:

| Variable | Value |
|----------|--------|
| **NEXTAUTH_URL** | Your app’s public URL. After the first deploy, Railway shows it (e.g. `https://nepx-creation-production.up.railway.app`). Use that exact URL. For the first deploy you can use a placeholder like `https://nepx-creation.up.railway.app` and update it after you see the real URL. |
| **NEXTAUTH_SECRET** | A long random string. Generate one: run `openssl rand -base64 32` in a terminal and paste the result. |

**Optional (only if you run the seed):**

- **ADMIN_EMAIL** – `admin@nepxcreation.com`
- **ADMIN_PASSWORD** – `admin123` (change later in production)

Save the variables. Railway will redeploy when you change them.

---

## 6. Get your app URL

1. Click your **app service**.
2. Open the **"Settings"** tab.
3. Under **"Networking"** or **"Domains"**, click **"Generate Domain"** if you don’t have one yet.
4. Copy the URL (e.g. `https://nepx-creation-production.up.railway.app`).
5. If you hadn’t set **NEXTAUTH_URL** yet, go back to **Variables** and set:
   - **NEXTAUTH_URL** = that URL (e.g. `https://nepx-creation-production.up.railway.app`).

---

## 7. Run database setup (first time only)

After the app has deployed at least once:

1. In your **app service**, open the **"Shell"** tab (or **"Settings"** → run a one-off command if your plan supports it).
2. In the shell, run:

```bash
npx prisma db push
npx prisma db seed
```

3. Wait for both commands to finish. This creates the tables and the admin user.

If Railway doesn’t give you a Shell, use the **Railway CLI** from your computer (with the same project linked) and run the same commands there so they run in Railway’s environment.

---

## 8. Run the seed (required for admin login)

**If you get "Invalid email or password" or "Wrong credentials", the database has no admin user yet.** Run the seed **from Railway’s environment** (not from your PC with `railway run` and a local `.env`, or you’ll hit “Can’t reach database at localhost”).

**Option A – Railway Dashboard (recommended)**

1. In [Railway](https://railway.app), open your **project** → your **app service** (the one from the repo).
2. Open the **"Shell"** tab (or **"Settings"** → run a one-off command if your plan has it).
3. In that shell, run:

```bash
npx prisma db push
npx prisma db seed
```

4. Wait until both finish. You should see `✅ Created admin user: admin@nepxcreation.com` and `🎉 Seed completed successfully!`
5. Log in at **your-app-url/admin** with **admin@nepxcreation.com** / **admin123**.

**Option B – From your PC using the public database URL**

`postgres.railway.internal` only works **inside** Railway. To run Prisma from your PC you must use the **public** URL.

1. In Railway, open your **PostgreSQL** service (not the app).
2. Go to **Variables** (or **Connect**).
3. Find **`DATABASE_PUBLIC_URL`** and copy its value. (If you don’t see it, check the **Connect** tab or enable **Public networking** for the Postgres service.)
4. On your PC, in the project folder, run **one** of the following.

   **PowerShell (Windows):**
   ```powershell
   $env:DATABASE_URL="<paste DATABASE_PUBLIC_URL here>"; npx prisma db push; npx prisma db seed
   ```
   Replace `<paste DATABASE_PUBLIC_URL here>` with the actual URL (in quotes).

   **Cmd or Git Bash:**
   ```bash
   set DATABASE_URL=<paste DATABASE_PUBLIC_URL here>
   npx prisma db push
   npx prisma db seed
   ```
   (In Git Bash use `export DATABASE_URL="..."` then the two `npx` commands.)

5. Do **not** put the public URL in your `.env` file; keep `.env` for local dev (e.g. `localhost` or SQLite). The deployed app should keep using the internal `DATABASE_URL` from Railway.

---

## 9. Open your site and admin

1. Open your app URL in the browser (e.g. `https://nepx-creation-production.up.railway.app`).
2. Admin panel: **`https://your-app-url.up.railway.app/admin`**
3. Log in with (only works **after** you ran the seed in step 8):
   - **Email:** `admin@nepxcreation.com`
   - **Password:** `admin123`
4. Change the admin password after first login (e.g. via a future “change password” feature or by re-seeding with a new password).

---

## Summary checklist

- [ ] Code on GitHub
- [ ] Railway project created from GitHub repo
- [ ] PostgreSQL database added
- [ ] `DATABASE_URL` set on app (via reference or copy-paste)
- [ ] `NEXTAUTH_URL` set to your Railway app URL
- [ ] `NEXTAUTH_SECRET` set (long random string)
- [ ] App domain generated and URL noted
- [ ] `npx prisma db push` and `npx prisma db seed` run once
- [ ] Site and `/admin` open and login works

If a deploy fails, check the **Deployments** tab and the build logs for errors (e.g. missing env vars or Prisma errors).

---

## Admin panel not working like localhost?

If the admin panel loads but login fails, redirects in a loop, or sessions don’t stick:

1. **NEXTAUTH_URL** (app service → Variables) must be **exactly** your app URL:
   - `https://your-app-name.up.railway.app` (no trailing slash)
   - Same as the URL you use in the browser. If you use a custom domain, use that.
2. **NEXTAUTH_SECRET** must be set (long random string).
3. **DATABASE_URL** must be set and the **seed must have been run** so the admin user exists (see step 8).
4. Redeploy after changing variables (Railway usually redeploys automatically).

If login works but pages are blank or data doesn’t save: the app uses the database for auth and (where implemented) for content; ensure the database is connected and migrated (`npx prisma db push` and `npx prisma db seed` run once).
