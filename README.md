# 🚆 Local Train Decision Support System

## 📌 Project Overview

Millions of local trains in India run late every day, and commuters often lack clear, real-time information to decide whether they should wait, switch trains, or take an alternate route. This project addresses that problem by building a **decision-support web application** that helps commuters make **informed travel decisions** using simulated real-time data and community input.

This is a **college-level project**, designed to focus on clarity, usability, and core problem-solving rather than complex infrastructure.

---

## 🎯 Problem Statement

**Millions of local trains in India run late daily; passengers rarely get real-time updates or reroutes. How might we create a system that helps commuters make informed, real-time decisions?**

Our solution does not just show train information — it **guides users on what action to take** based on delays, crowd levels, and alternate routes.

---

## 🧠 Key Idea

The system focuses on **decision support for commuters** by aggregating train status information, user inputs, and community feedback to recommend the best possible travel option at a given moment.

Rather than acting as a simple information display, the platform emphasizes **actionable guidance** — helping users decide whether to wait, switch trains, or choose an alternate route.

---

## ✨ Features Implemented

### 1️⃣ Decision-Focused Home Page

Users can:

* Select current station
* Select destination station
* Choose train line (Western / Central / Harbour)
* Choose travel time (Now / 15 min / 30 min)

The system then displays:

* Recommended train option
* Expected delay status
* Crowd level (Low / Medium / High)
* Clear suggestion such as:

  * *Wait for this train*
  * *Switch to next train*
  * *Change route for faster arrival*

---

### 2️⃣ Live Train Status (Simulated)

A dedicated page lists all available trains with:

* Train name / number
* Line and route
* Delay status
* Crowd indicator

Color-coded status:

* 🟢 On Time
* 🟡 Slight Delay
* 🔴 Heavy Delay

Filters allow users to quickly view trains by line or delay level.

---

### 3️⃣ 🚨 Community Delay Reporting (Unique Feature)

To make the system interactive and realistic, we added a **community-powered reporting section**.

#### 🔹 Report Delay

Users can submit:

* Selected train
* Observed delay range
* Optional additional comment

No login is required; reports are anonymous.

#### 🔹 View Reports

Other users can see:

* Recently reported delays
* Time of report (e.g., *5 minutes ago*)
* Indicator when multiple users report delays for the same train

This feature simulates crowdsourced real-time updates.

---

### 4️⃣ Smart Travel Suggestions

The system uses simple **rule-based logic**, for example:

* If delay > 15 minutes → suggest next train or alternate route
* If crowd level is high → recommend less crowded option

These suggestions are shown in a **Smart Suggestions panel**, helping users quickly decide their next step.

---

### 5️⃣ Route Comparison View

Users can compare multiple route options side-by-side:

* Direct route
* Alternate route via junction
* Next available train

Each option shows:

* Estimated delay
* Crowd level
* Recommendation tag (Best / Avoid / Acceptable)

---

## 🗂️ Project Structure

```
root
├── frontend
│   └── src
│       ├── app          # Pages and routing
│       ├── components   # Reusable UI components
│       └── lib          # Utility functions & rule logic
│
├── backend
│   ├── models           # MongoDB schemas
│   ├── routes           # API routes
│   ├── controllers      # Request handling logic
│   └── data             # Hardcoded train data
│
└── README.md
```

---

## 🗄️ Database Choice

We use **MongoDB** as the primary database.

### Why MongoDB?

* Flexible schema for evolving transport and reporting data
* Efficient handling of frequently updated records
* Well-suited for modern JavaScript-based web applications
* Easy scalability for future enhancements

### Stored Data

* Train information and schedules
* User-submitted delay reports
* Timestamps for report freshness

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Next.js
* **TypeScript** (type safety and scalability)
* **Tailwind CSS** (utility-first styling)
* HTML5, CSS3

### Backend

* Node.js
* Express.js
* **TypeScript**
* RESTful APIs

### Database & ORM

* MongoDB
* **Prisma ORM** (database modeling and type-safe queries)

### Validation & Utilities

* **Zod** (schema validation for APIs and forms)

### Other Tools & Libraries

* Git & GitHub (version control)
* npm (package management)
* Charting library for visual insights

---

## 🚀 How to Run the Project

```bash
npm install
npm run dev
```

The application runs locally and uses predefined data for demonstration.

---

## 📚 Academic Scope & Limitations

* Designed as an academic project for demonstrating system design and decision logic
* Does not rely on external railway data sources
* Focuses on usability and problem-solving rather than real-world deployment constraints

---

## 🧪 Future Enhancements (Optional)

* Authentication for frequent commuters
* Weighting reports based on number of users
* Integration with real-time APIs (future scope)
* Push notifications for heavy delays

---

## 🏁 Conclusion

This project demonstrates how **simple rules, good UI design, and community input** can solve a real-world problem. Instead of building a complex tracking system, we focus on **helping users decide what to do**, which is the core pain point for daily local train commuters.

> *A smart, commuter-first decision support system for local trains.*
