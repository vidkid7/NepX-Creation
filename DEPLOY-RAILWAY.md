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

## 8. Open your site and admin

1. Open your app URL in the browser (e.g. `https://nepx-creation-production.up.railway.app`).
2. Admin panel: **`https://your-app-url.up.railway.app/admin`**
3. Log in with:
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
