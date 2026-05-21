# Plan for Nairobi Hustle Board

## Project Goal:
Create Kenya’s fastest and simplest “daily jobs marketplace” where users can find and apply to jobs within seconds using WhatsApp.

## Target Users:
Job seekers, Employers, Recruiters.

## Core Features to Implement (Frontend Focus):

1.  **Job Listings Page:**
    *   Responsive card-based layout for jobs.
    *   Each card to display: Job title, Location (Nairobi + specific area), Pay rate, Job type category, "Apply via WhatsApp" button, Posted time.
    *   Utilize dummy data for now.

2.  **Job Categories & Filters:**
    *   Implement filter UI for: Casual Jobs, Cleaning & House Help, Construction & Fundis, Security Jobs, Events & Hospitality, Driving & Delivery, Retail & Sales.

3.  **Post a Job Page:**
    *   Create a user-friendly, mobile-first form for employers to submit job details: title, description, location, pay, contact number, duration.

4.  **Job Details Page:**
    *   Display full job details, requirements, payment terms.
    *   Include a prominent "Apply on WhatsApp" button with pre-filled message functionality.

5.  **WhatsApp Integration:**
    *   Implement click-to-chat links for all "Apply" buttons using `https://wa.me/<contact_number>?text=Hello%2C%20I%20am%20interested%20in%20the%20job%3A%20[Job%20Title]%20in%20[Location]`.

6.  **Featured Jobs Section:**
    *   Design and implement a visual section for featured jobs.
    *   Add a "Featured" badge to these listings.

7.  **UI/UX Style:**
    *   Clean, mobile-first design.
    *   Prominent use of WhatsApp green accents.
    *   Large buttons, simple cards.
    *   Optimize for speed and low data usage.

8.  **SEO Structure:**
    *   Ensure components and routing are set up to support dynamic SEO-friendly URLs (e.g., `/jobs-nairobi`, `/casual-jobs-nairobi`).

## Future Considerations (Backend/Admin):
*   Job posting persistence (database).
*   Admin dashboard for job approval/rejection, featuring, and removal.
*   Monetization features (pay-per-posting, featured listing fees, subscriptions).
*   Recruiter features.

## Initial Agent Assignment:
*   `frontend_engineer`: To implement all frontend features outlined above.
    *   **Action:** `frontend_engineer` must run `generate_images_bulk` FIRST before writing any code or files.