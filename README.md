# Rutvik's portfolio: Vercel package

## What is in this folder

- `index.html` is the whole website. Open it in any text editor to change text, projects or links.
- `api/films.js` reads your public Letterboxd diary and feeds the Recently watched posters on the Interests page.
- `api/stats.js` is the counter behind Total views and Appreciation count on the Stats page.
- `media/` holds your photos and slides.

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
2. Open `your-address/api/films`. You should see JSON with your recent films, and the Interests page shows the five latest posters.
3. Send yourself a message through the contact form.
4. Try the search (Ctrl or Cmd plus K), the theme options and the Back to projects link.

## Turn on the view and appreciation counters (free)

1. In Vercel open your project, then the Storage tab, then Create Database.
2. Choose Upstash Redis from the Marketplace list and pick the Free plan.
3. Connect it to your portfolio project. Vercel adds the keys on its own.
4. Redeploy once (Deployments tab, the three dots, Redeploy). The Stats page then shows live counts.

Views count once per browser. The heart button works once per browser.

## Adding photos and slides later

Create a `media` folder, upload your images, then add them to a project in `index.html`:

    media: [{ src: "media/poster-1.jpg", cap: "Club event poster" }],
    deck: { title: "Thesis defence", pdf: "media/thesis.pdf", pages: ["media/thesis-1.jpg", "media/thesis-2.jpg"] }

## Good to know

- Vercel's free Hobby plan is for personal, non-commercial use. A portfolio is fine. If you later use the site to sell something or promote a company, check Vercel's terms.
- Your repo is public, so anything in `index.html` can be read by anyone. Never paste passwords or private keys into it. The form access key is fine because it can only send messages to your inbox.

## The bucket-list world map

On the Interests page, tapping the plane opens a full-screen world map. The map code is in `media/map/bucket-map.js` and only loads when someone taps the plane, so it does not slow the rest of the site. You never need to edit that file.

To add places, edit `media/map/bucket.json`. Each key is a country name exactly as it appears in the map's "Jump to a country" list (for example "Italy" or "United States of America"). Each place needs a name, a latitude and a longitude, and can have a short note:

    {
      "Italy": [
        { "name": "The Dolomites", "lat": 46.4, "lon": 11.9, "note": "Hike the Alta Via 1." }
      ]
    }

Tap a country and its places appear as pins, with the list in the panel. Save the file on GitHub and the site updates after Vercel redeploys.
