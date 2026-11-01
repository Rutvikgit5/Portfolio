# Rutvik's portfolio: Vercel package

## What is in this folder

- `index.html` is the whole website. Open it in any text editor to change text, projects or links.
- `api/films.js` is a small function that reads your public Letterboxd diary and feeds the Interests and Stats pages.

## Before you deploy

Open `index.html` and find the `CONFIG` block near the top of the script.

- `formKey`: your free access key from https://web3forms.com. Until you add it, the contact page shows your LinkedIn instead of a form.
- `resume`: a link to a public resume. Leave it empty if you do not want one. Your CV contains a phone number and email, so share a version without them.
- `filmsApi` is already set to `/api/films`. Leave it.

## Deploy with GitHub and Vercel (free)

1. Create a free GitHub account and a new repository.
2. In the repository choose Add file, then Upload files. Drag in `index.html`, the `api` folder and this README. Commit.
3. Create a free Vercel account and sign in with GitHub.
4. Add New, then Project. Pick your repository. Keep the defaults (no framework, no build command). Deploy.
5. Vercel gives you a free `.vercel.app` address. Every time you change a file on GitHub, Vercel redeploys on its own.

## After you deploy, test these

1. Open the site on your phone and your laptop.
2. Open `your-address/api/films`. You should see JSON with your recent films. If you see `Feed unavailable`, Letterboxd is blocking the request. The Interests page then shows your Letterboxd link instead of the diary.
3. Send yourself a message through the contact form.
4. Try the search (Ctrl or Cmd plus K), the theme options and the Back to projects link.

## Adding photos and slides later

Create a `media` folder, upload your images, then add them to a project in `index.html`:

    media: [{ src: "media/poster-1.jpg", cap: "Club event poster" }],
    deck: { title: "Thesis defence", pdf: "media/thesis.pdf", pages: ["media/thesis-1.jpg", "media/thesis-2.jpg"] }

## Good to know

- Vercel's free Hobby plan is for personal, non-commercial use. A portfolio is fine. If you later use the site to sell something or promote a company, check Vercel's terms.
- The film feed code has not been tested against your real Letterboxd account. Check it with step 2 above.
