from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)

class Vendor(Base):
    __tablename__ = "vendors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    gst_number = Column(String)
    category = Column(String)
    status = Column(String, default="active")

class RFQ(Base):
    __tablename__ = "rfqs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    quantity = Column(Integer)
    deadline = Column(String)
    status = Column(String, default="open")
    created_by = Column(Integer, ForeignKey("users.id"))

class Quotation(Base):
    __tablename__ = "quotations"
    id = Column(Integer, primary_key=True, index=True)
    rfq_id = Column(Integer, ForeignKey("rfqs.id"))
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    unit_price = Column(Float)
    total_price = Column(Float)
    delivery_days = Column(Integer)
    notes = Column(String)
    status = Column(String, default="submitted")

class Approval(Base):
    __tablename__ = "approvals"
    id = Column(Integer, primary_key=True, index=True)
    quotation_id = Column(Integer, ForeignKey("quotations.id"))
    approved_by = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="pending")  # pending, approved, rejected
    remarks = Column(Text)
    created_at = Column(String, default=str(datetime.datetime.utcnow()))

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"
    id = Column(Integer, primary_key=True, index=True)
    po_number = Column(String, unique=True)
    quotation_id = Column(Integer, ForeignKey("quotations.id"))
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    total_amount = Column(Float)
    status = Column(String, default="issued")
    created_at = Column(String, default=str(datetime.datetime.utcnow()))

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True, index=True)
    invoice_number = Column(String, unique=True)
    po_id = Column(Integer, ForeignKey("purchase_orders.id"))
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    subtotal = Column(Float)
    tax = Column(Float)
    total = Column(Float)
    status = Column(String, default="unpaid")
    created_at = Column(String, default=str(datetime.datetime.utcnow()))

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    id = Column(Integer, primary_key=True, index=True)
    action = Column(String)
    description = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(String, default=str(datetime.datetime.utcnow()))