from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Vendor

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@router.post("/")
def add_vendor(name: str, email: str, phone: str, gst_number: str, category: str, db: Session = Depends(get_db)):
    vendor = Vendor(name=name, email=email, phone=phone, gst_number=gst_number, category=category)
    db.add(vendor)
    db.commit()
    return {"message": "Vendor added"}

@router.get("/")
def get_vendors(db: Session = Depends(get_db)):
    return db.query(Vendor).all()

@router.get("/{vendor_id}")
def get_vendor(vendor_id: int, db: Session = Depends(get_db)):
    return db.query(Vendor).filter(Vendor.id == vendor_id).first()

@router.put("/{vendor_id}/status")
def update_status(vendor_id: int, status: str, db: Session = Depends(get_db)):
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    vendor.status = status
    db.commit()
    return {"message": "Status updated"}

@router.delete("/{vendor_id}")
def delete_vendor(vendor_id: int, db: Session = Depends(get_db)):
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    db.delete(vendor)
    db.commit()
    return {"message": "Vendor deleted"}