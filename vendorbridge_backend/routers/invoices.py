from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Invoice, PurchaseOrder, ActivityLog
import datetime
import random

router = APIRouter(prefix="/invoices", tags=["Invoices"])

TAX_RATE = 0.18  # 18% GST

@router.post("/")
def create_invoice(po_id: int, user_id: int, db: Session = Depends(get_db)):
    po = db.query(PurchaseOrder).filter(PurchaseOrder.id == po_id).first()
    if not po:
        return {"error": "Purchase Order not found"}
    subtotal = po.total_amount
    tax = round(subtotal * TAX_RATE, 2)
    total = round(subtotal + tax, 2)
    invoice_number = f"INV-{datetime.datetime.utcnow().strftime('%Y%m%d')}-{random.randint(1000,9999)}"
    invoice = Invoice(
        invoice_number=invoice_number,
        po_id=po_id,
        vendor_id=po.vendor_id,
        subtotal=subtotal,
        tax=tax,
        total=total,
        created_at=str(datetime.datetime.utcnow())
    )
    db.add(invoice)
    db.commit()
    log = ActivityLog(action="INVOICE_CREATED", description=f"Invoice {invoice_number} created", user_id=user_id, created_at=str(datetime.datetime.utcnow()))
    db.add(log)
    db.commit()
    return {"message": "Invoice created", "invoice_number": invoice_number, "total": total}

@router.get("/")
def get_all_invoices(db: Session = Depends(get_db)):
    return db.query(Invoice).all()

@router.get("/{invoice_id}")
def get_invoice(invoice_id: int, db: Session = Depends(get_db)):
    return db.query(Invoice).filter(Invoice.id == invoice_id).first()

@router.put("/{invoice_id}/status")
def update_invoice_status(invoice_id: int, status: str, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    invoice.status = status
    db.commit()
    return {"message": "Invoice status updated"}