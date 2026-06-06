from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from passlib.context import CryptContext
from jose import jwt
import datetime

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = "vendorbridge_secret"

@router.post("/signup")
def signup(name: str, email: str, password: str, role: str, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    user = User(name=name, email=email, password=pwd_context.hash(password), role=role)
    db.add(user)
    db.commit()
    return {"message": "User created successfully"}

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not pwd_context.verify(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode(
        {"id": user.id, "role": user.role, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)},
        SECRET,
        algorithm="HS256"
    )
    return {"token": token, "role": user.role, "name": user.name}