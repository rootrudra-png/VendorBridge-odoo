from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import auth, vendors, rfq, quotations, approvals, purchase_orders, invoices

Base.metadata.create_all(bind=engine)

app = FastAPI(title="VendorBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(vendors.router)
app.include_router(rfq.router)
app.include_router(quotations.router)
app.include_router(approvals.router)
app.include_router(purchase_orders.router)
app.include_router(invoices.router)