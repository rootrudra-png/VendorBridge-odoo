from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Approval, ActivityLog
import datetime

router = APIRouter(prefix="/approvals", tags=["Approvals"])

@router.post("/")
def create_approval(quotation_id: int, approved_by: int, db: Session = Depends(get_db)):
    approval = Approval(quotation_id=quotation_id, approved_by=approved_by, status="pending")
    db.add(approval)
    db.commit()
    log = ActivityLog(action="APPROVAL_CREATED", description=f"Approval created for quotation {quotation_id}", user_id=approved_by, created_at=str(datetime.datetime.utcnow()))
    db.add(log)
    db.commit()
    return {"message": "Approval workflow initiated"}

@router.put("/{approval_id}/approve")
def approve(approval_id: int, remarks: str, approved_by: int, db: Session = Depends(get_db)):
    approval = db.query(Approval).filter(Approval.id == approval_id).first()
    approval.status = "approved"
    approval.remarks = remarks
    db.commit()
    log = ActivityLog(action="APPROVED", description=f"Approval {approval_id} approved", user_id=approved_by, created_at=str(datetime.datetime.utcnow()))
    db.add(log)
    db.commit()
    return {"message": "Approved successfully"}

@router.put("/{approval_id}/reject")
def reject(approval_id: int, remarks: str, approved_by: int, db: Session = Depends(get_db)):
    approval = db.query(Approval).filter(Approval.id == approval_id).first()
    approval.status = "rejected"
    approval.remarks = remarks
    db.commit()
    log = ActivityLog(action="REJECTED", description=f"Approval {approval_id} rejected", user_id=approved_by, created_at=str(datetime.datetime.utcnow()))
    db.add(log)
    db.commit()
    return {"message": "Rejected successfully"}

@router.get("/")
def get_all_approvals(db: Session = Depends(get_db)):
    return db.query(Approval).all()

@router.get("/{approval_id}")
def get_approval(approval_id: int, db: Session = Depends(get_db)):
    return db.query(Approval).filter(Approval.id == approval_id).first()