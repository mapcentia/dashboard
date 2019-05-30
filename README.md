# MapCentia Geocloud 2 Dashboard

Progressive web-application for Geocloud 2 REST API (https://github.com/mapcentia/geocloud2)

## Installation

1. Check out the repository;
2. Create `config.js` from `config.js.sample` (fill out the API and Vidi URL);
3. Run `npm install` to install all modules;
4. Run `npm start` to run development version or `npm run start:production` to run production version.
5. (optional) If the application is installed in `/public/dashboard` folder, then the `/public/.htaccess` has to be populated with following

```
...
<IfModule mod_rewrite.c>
RewriteEngine On

# Rewrite rules for React app, located in dashboard subdirectory - return
# the index.html unless the requested file / directory exists
RewriteRule ^dashboard/index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^dashboard/(.*) dashboard/index.html [L]

...
```