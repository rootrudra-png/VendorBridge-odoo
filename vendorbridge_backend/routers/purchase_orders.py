from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import PurchaseOrder, Quotation, ActivityLog
import datetime
import random

router = APIRouter(prefix="/purchase-orders", tags=["Purchase Orders"])

@router.post("/")
def create_po(quotation_id: int, user_id: int, db: Session = Depends(get_db)):
    quotation = db.query(Quotation).filter(Quotation.id == quotation_id).first()
    if not quotation:
        return {"error": "Quotation not found"}
    po_number = f"PO-{datetime.datetime.utcnow().strftime('%Y%m%d')}-{random.randint(1000,9999)}"
    po = PurchaseOrder(
        po_number=po_number,
        quotation_id=quotation_id,
        vendor_id=quotation.vendor_id,
        total_amount=quotation.total_price,
        created_at=str(datetime.datetime.utcnow())
    )
    db.add(po)
    db.commit()
    log = ActivityLog(action="PO_CREATED", description=f"Purchase Order {po_number} created", user_id=user_id, created_at=str(datetime.datetime.utcnow()))
    db.add(log)
    db.commit()
    return {"message": "Purchase Order created", "po_number": po_number}

@router.get("/")
def get_all_pos(db: Session = Depends(get_db)):
    return db.query(PurchaseOrder).all()

@router.get("/{po_id}")
def get_po(po_id: int, db: Session = Depends(get_db)):
    return db.query(PurchaseOrder).filter(PurchaseOrder.id == po_id).first()

@router.put("/{po_id}/status")
def update_po_status(po_id: int, status: str, db: Session = Depends(get_db)):
    po = db.query(PurchaseOrder).filter(PurchaseOrder.id == po_id).first()
    po.status = status
    db.commit()
    return {"message": "PO status updated"}