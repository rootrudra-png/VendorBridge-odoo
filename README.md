# VendorBridge 🏢
### Procurement & Vendor Management ERP System
> Odoo x KSV Hackathon 2026

A fully functional, cloud-deployed Procurement and Vendor Management ERP system that digitizes and streamlines the entire procurement workflow for organizations.

---

## 🔗 Live Links

| Service | Link |
|---|---|
| 🌐 Frontend (Web App) | https://vendorbridge-frontend.vercel.app |
| ⚙️ Backend API | https://vendorbridge-production.up.railway.app |
| 📖 API Documentation | https://vendorbridge-production.up.railway.app/docs |

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@vendorbridge.com | admin123 |
| Procurement Officer | officer@vendorbridge.com | officer123 |
| Manager | manager@vendorbridge.com | manager123 |
| Vendor | vendor@acme.com | vendor123 |

---

## ✅ Features

- 🔐 Role-based Authentication (Admin, Procurement Officer, Vendor, Manager)
- 🏢 Vendor Registration & Management with GST details
- 📋 RFQ Creation & Management
- 💬 Vendor Quotation Submission
- 📊 Side-by-side Quotation Comparison with lowest price highlighting
- ✅ Structured Approval Workflow
- 📄 Auto Purchase Order Generation
- 🧾 Invoice Generation with 18% GST Calculation
- 📈 Activity Logs & Reports
- 📱 Responsive UI

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, TypeScript, Tailwind CSS, Vite |
| Backend | FastAPI, Python |
| Database | SQLite with SQLAlchemy ORM |
| Authentication | JWT Token based |
| Frontend Deployment | Vercel |
| Backend Deployment | Railway |

---

## 📁 Project Structure
VendorBridge/
├── vendorbridge_backend/    # FastAPI Backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── routers/
│       ├── auth.py
│       ├── vendors.py
│       ├── rfq.py
│       ├── quotations.py
│       ├── approvals.py
│       ├── purchase_orders.py
│       └── invoices.py
└── vendorbridge/            # React Frontend
└── src/
└── app/
└── components/
---

## 📡 API Routes

| Module | Method | Endpoint |
|---|---|---|
| Auth | POST | /auth/signup |
| Auth | POST | /auth/login |
| Vendors | GET/POST | /vendors/ |
| RFQs | GET/POST | /rfqs/ |
| Quotations | GET/POST | /quotations/ |
| Approvals | GET/POST | /approvals/ |
| Purchase Orders | GET/POST | /purchase-orders/ |
| Invoices | GET/POST | /invoices/ |

---

## 👥 Team VendorBridge
Odoo x KSV Hackathon 2026 🚀
