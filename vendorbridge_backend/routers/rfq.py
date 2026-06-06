from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import RFQ

router = APIRouter(prefix="/rfqs", tags=["RFQs"])

@router.post("/")
def create_rfq(title: str, description: str, quantity: int, deadline: str, created_by: int, db: Session = Depends(get_db)):
    rfq = RFQ(title=title, description=description, quantity=quantity, deadline=deadline, created_by=created_by)
    db.add(rfq)
    db.commit()
    return {"message": "RFQ created"}

@router.get("/")
def get_rfqs(db: Session = Depends(get_db)):
    return db.query(RFQ).all()

@router.get("/{rfq_id}")
def get_rfq(rfq_id: int, db: Session = Depends(get_db)):
    return db.query(RFQ).filter(RFQ.id == rfq_id).first()

@router.put("/{rfq_id}/status")
def update_rfq_status(rfq_id: int, status: str, db: Session = Depends(get_db)):
    rfq = db.query(RFQ).filter(RFQ.id == rfq_id).first()
    rfq.status = status
    db.commit()
    return {"message": "RFQ status updated"}