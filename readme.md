This is the homepage for the Algebra Explorer iOS app. It is a single page app, but comes in two versions; index.html is the English version, and index-se.html is the Swedish version.

These files should never be edited directly as they are generated through a build process! This is located inside the build folder. Navigate to that folder and execute `node build.js` to generate the files.

Inside the build folder there is a blocks folder, which contains files meant to be edited:

*    `skeleton.html` is the main html template used for the app.
*    `main-en.md` is a markdown file containing the main content in English. The build process will parse the markdown into html and build a language-specific file using the html skeleton.
*    `main-sv.md` is the same thing but in Swedish.

The build process will also use info from `texts_about.js` and `texts_count.js`, copied from the main app repo.