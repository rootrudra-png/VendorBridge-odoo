from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Quotation

router = APIRouter(prefix="/quotations", tags=["Quotations"])

@router.post("/")
def submit_quotation(rfq_id: int, vendor_id: int, unit_price: float, quantity: int, delivery_days: int, notes: str, db: Session = Depends(get_db)):
    total = unit_price * quantity
    q = Quotation(rfq_id=rfq_id, vendor_id=vendor_id, unit_price=unit_price, total_price=total, delivery_days=delivery_days, notes=notes)
    db.add(q)
    db.commit()
    return {"message": "Quotation submitted"}

@router.get("/rfq/{rfq_id}")
def get_quotations_by_rfq(rfq_id: int, db: Session = Depends(get_db)):
    return db.query(Quotation).filter(Quotation.rfq_id == rfq_id).all()

@router.get("/")
def get_all_quotations(db: Session = Depends(get_db)):
    return db.query(Quotation).all()

@router.put("/{quotation_id}/status")
def update_quotation_status(quotation_id: int, status: str, db: Session = Depends(get_db)):
    q = db.query(Quotation).filter(Quotation.id == quotation_id).first()
    q.status = status
    db.commit()
    return {"message": "Quotation status updated"}