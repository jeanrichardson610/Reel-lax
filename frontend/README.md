NOTE: most anime DO NOT have high quality horizontal images for my horizontal hero image. That is why the hero images will be blurry while the vertical images are higher quality

Zenime: Anime & Manga Streaming Platform

Zenime is a modern anime and manga streaming platform built with React, Vite, and Tailwind CSS. It offers a seamless and responsive user experience, optimized for both desktop and mobile devices.

Key Features

User Authentication: Secure sign-in and sign-up functionality to personalize user experience (you won't go anywhere but it shows functionality.

Responsive Design: Fully responsive layout ensuring optimal viewing on all devices.

Dynamic Routing: Utilizes React Router for smooth navigation between pages.

Custom Backgrounds: Personalized backgrounds for different pages, enhancing visual appeal.

Modern UI Components: Interactive form elements and buttons with hover and focus effects for better user engagement.

Recommendations: Based on the anime you pick in the categories, you will be brought to the Animepage where you can see information and below recommendations. Click those to see more recommendations and new pages

Explore the live application here: [Zenime](https://jeanrichardson610.github.io/Zenime/)

Problem-Solving Journey

While building Zenime, I faced several challenges that tested both my coding and problem-solving skills. The Jikan API often returned rate-limit errors, so I carefully reduced simultaneous fetches by removing certain categories and delaying recommendation requests. Caching caused occasional stale or missing data, which I fixed by implementing timed, error-handled fetches. Routing on GitHub Pages was tricky—the homepage wouldn’t load correctly until I configured BrowserRouter with the proper basename. On the design side, hero images and posters needed careful layering and truncation to look clean and readable. Finally, deployment challenges arose due to incorrect root directories and missing files, which I solved by restructuring the project and adjusting build scripts. These hurdles taught me to balance functionality, performance, and user experience, resulting in a fully working, visually polished anime browsing site.


Challenges and Problem-Solving in Zenime

API Rate Limiting & Data Fetching

Problem: Jikan API was returning HTTP 429 Too Many Requests, causing errors when fetching multiple categories at once.

Solution: Removed the “Most Popular” and “Upcoming” categories to reduce simultaneous API calls. Introduced delayed fetches for recommendations to stay within API limits.

Caching Issues

Problem: Cache sometimes caused the bot or app to fail, leading to stale or missing data.

Solution: Implemented fetchWithCache with careful timing and error handling to ensure smooth data fetching without overloading the API.

Routing & Page Load Issues

Problem: Homepage didn’t load properly on GitHub Pages until the base path /Zenime was removed manually.

Solution: Configured BrowserRouter with the correct basename="/Zenime" to handle routing correctly for GitHub Pages deployment.

Hero & Anime Page Styling

Problem: Hero images were too large or long; vertical posters clashed with horizontal banners.

Solution:

Added a high-res blurred hero image with fallback.

Prioritized horizontal banners and layered vertical posters only when needed.

Truncated long anime descriptions for readability.

Recommendations Feature

Problem: Fetching full recommendations caused cache/API overload.

Solution: Limited recommendations to 4–5 items and delayed fetching after main anime load to prevent errors.

Deployment Challenges

Problem: Render and GitHub Pages initially failed due to incorrect root directories and missing package.json.

Solution: Adjusted project structure and deployment scripts; pushed changes correctly to both GitHub Pages and Render.
