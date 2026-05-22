🚀 DigitalSoft ERP Cloud:Full-Stack Smart Admin Dashboard

Hello! This is my finalized submission for the DigitalSoft Technical Assignment. I have evolved this project from a frontend prototype into a Full-Stack enterprise solution powered by Supabase and Google Gemini AI.

🌟 The Vision
The goal was to build a system that feels like a "Neural Core" for business management. It isn't just a static dashboard; it’s a living environment where switching between Alpha Traders, Smart Mart, or City Pharmacy instantly re-configures the entire cloud infrastructure—scoped data, brand aesthetics, staff directories, and AI intelligence.

🏗️ The Full-Stack Architecture
I implemented a modern, high-performance stack designed for scale:
Framework: Next.js 14 (App Router) for optimized Server-Side Rendering.
Backend-as-a-Service: Supabase (PostgreSQL). I architected a relational database schema to handle multi-tenant isolation, staff persistence, and real-time activity logs.
State Management: Zustand with persistence, acting as the bridge between the Supabase cloud and the local UI state.
Intelligence Engine: Google Gemini 1.5 (Pro/Flash). I moved the AI logic to a secure Next.js API route to provide real-time, data-aware business insights.
🧠 Neural AI Integration (RAG)
Unlike standard chatbots, this AI is Context-Aware.
Data-Driven: The AI backend performs parallel fetches from Supabase (employees, analytics, notifications) to inform its responses.
Role-Aware: The AI checks user permissions. If a "Viewer" asks for financial secrets, the backend logic blocks the request.
Strategic: It analyzes your real revenue numbers and suggests "Expansion" or "Scaling" strategies based on current database values.
🔐 Hybrid Identity Management
I built a dual-layer authentication system:
Master Admins: Dedicated profiles for global system management.
Staff Logins: Every employee added to the directory is automatically granted a secure login as a Viewer, turning the ERP into its own Identity Provider.
RBAC (Role-Based Access Control): The UI dynamically morphs based on the user. Viewers can see data, but the "Add" and "Edit" buttons are physically removed from the system for security.
🛠️ Getting Started
Clone the Repo: git clone <https://github.com/kjtechbrothers/admindashboard>
Install Deps: npm install
Launch: npm run dev
🔑 Verified Access Keys
Role	Email	Password
Master Admin	kashifjavedbhatti786@gmail.com	K@shif9249
Guest Viewer	guest@digitalsoft.com	guest123
✨ Core Features
Multi-Tenant Scoping: Zero data leakage between companies.
staff CRUD: Full Create, Read, Update, and Filter operations with database persistence.
Secure Visibility: Password masking and "Eye" toggles across login and employee lists.
Smart Pagination: Optimized data rendering for large staff directories.
Real-time Simulation: Automated market sync notifications saved directly to the database history.
🚧 Challenges I Faced
The Hydration & Synchronization Puzzle:
The biggest challenge was handling the "Full-Stack Refresh." When a user refreshes the page, the server doesn't initially know the user's identity. I solved this by implementing a custom Hydration Guard in the layout, ensuring the system "waits" for the Zustand-Supabase handshake before making routing decisions. This eliminated the common "flash of unauthenticated content" and created a seamless enterprise experience.
🦾 AI-Assisted Productivity
I leveraged AI to:
Generate the initial complex PostgreSQL relational schema.
Rapidly prototype the high-end "Premium Dark" Tailwind configurations.
Debug the "Neural Link" between the API routes and Google Gemini.
Thank you for reviewing my work. I am ready to bring this Full-Stack architectural mindset to the DigitalSoft team!