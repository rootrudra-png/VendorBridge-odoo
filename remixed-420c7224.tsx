import { useState, useEffect, useRef } from "react";

// ============================================================
// GLOBAL STYLES (injected via style tag)
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0c0e14;
      --surface: #13151f;
      --surface2: #1a1d2a;
      --surface3: #22263a;
      --border: #2a2f47;
      --border2: #363d5e;
      --accent: #6c63ff;
      --accent2: #ff6b6b;
      --accent3: #00d4aa;
      --accent4: #ffa94d;
      --text: #e8eaf6;
      --text2: #9ba3c7;
      --text3: #5a6280;
      --success: #00d4aa;
      --warning: #ffa94d;
      --danger: #ff6b6b;
      --info: #4fc3f7;
    }

    html, body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px; }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--surface); }
    ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideRight { from { transform: translateX(-12px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes glow { 0%,100% { box-shadow: 0 0 8px rgba(108,99,255,0.3); } 50% { box-shadow: 0 0 20px rgba(108,99,255,0.6); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes spin { to { transform: rotate(360deg); } }

    .fade-in { animation: fadeIn 0.35s ease forwards; }
    .slide-in { animation: slideRight 0.3s ease forwards; }

    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .badge-success { background: rgba(0,212,170,0.15); color: var(--success); border: 1px solid rgba(0,212,170,0.3); }
    .badge-warning { background: rgba(255,169,77,0.15); color: var(--warning); border: 1px solid rgba(255,169,77,0.3); }
    .badge-danger  { background: rgba(255,107,107,0.15); color: var(--danger); border: 1px solid rgba(255,107,107,0.3); }
    .badge-info    { background: rgba(79,195,247,0.15); color: var(--info); border: 1px solid rgba(79,195,247,0.3); }
    .badge-accent  { background: rgba(108,99,255,0.15); color: var(--accent); border: 1px solid rgba(108,99,255,0.3); }
    .badge-neutral { background: rgba(155,163,199,0.1); color: var(--text2); border: 1px solid var(--border); }

    .btn {
      display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px;
      border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
      cursor: pointer; border: none; transition: all 0.18s ease; white-space: nowrap;
    }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { background: #7c74ff; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(108,99,255,0.35); }
    .btn-success { background: var(--success); color: #0c0e14; }
    .btn-success:hover { background: #00e5b8; transform: translateY(-1px); }
    .btn-danger { background: var(--danger); color: #fff; }
    .btn-danger:hover { background: #ff8080; transform: translateY(-1px); }
    .btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border); }
    .btn-ghost:hover { background: var(--surface2); color: var(--text); border-color: var(--border2); }
    .btn-sm { padding: 5px 12px; font-size: 12px; }
    .btn-icon { padding: 7px; border-radius: 7px; }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; }

    input, select, textarea {
      background: var(--surface2); border: 1px solid var(--border); color: var(--text);
      border-radius: 8px; padding: 9px 13px; font-family: 'DM Sans', sans-serif; font-size: 13px;
      width: 100%; outline: none; transition: border-color 0.15s;
    }
    input:focus, select:focus, textarea:focus { border-color: var(--accent); }
    input::placeholder, textarea::placeholder { color: var(--text3); }

    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 11px 14px; font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid var(--border); }
    td { padding: 13px 14px; border-bottom: 1px solid rgba(42,47,71,0.5); font-size: 13px; color: var(--text2); vertical-align: middle; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(255,255,255,0.02); }

    .card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
      padding: 20px;
    }
    .section-title {
      font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
      color: var(--text); letter-spacing: 0.2px;
    }
    .tab-bar {
      display: flex; gap: 2px; background: var(--surface2); border-radius: 10px; padding: 3px;
    }
    .tab {
      padding: 7px 18px; border-radius: 8px; font-size: 13px; font-weight: 500;
      cursor: pointer; color: var(--text2); transition: all 0.18s; border: none; background: transparent;
    }
    .tab.active { background: var(--surface3); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
    .tab:hover:not(.active) { color: var(--text); }

    .highlight-low { background: rgba(0,212,170,0.08) !important; }
    .highlight-low td { color: var(--success) !important; }

    .timeline-dot {
      width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px;
    }
    .timeline-line {
      width: 1px; background: var(--border); flex: 1; min-height: 24px; margin: 2px 0 2px 4px;
    }

    .star { color: var(--accent4); font-size: 12px; }

    .tooltip { position: relative; }
    .tooltip:hover::after {
      content: attr(data-tip); position: absolute; bottom: calc(100% + 6px); left: 50%;
      transform: translateX(-50%); background: var(--surface3); color: var(--text);
      border: 1px solid var(--border2); border-radius: 6px; padding: 4px 10px;
      font-size: 11px; white-space: nowrap; z-index: 100; pointer-events: none;
    }

    .progress-bar {
      height: 4px; border-radius: 2px; background: var(--surface3); overflow: hidden;
    }
    .progress-fill {
      height: 100%; border-radius: 2px; transition: width 0.5s ease;
    }

    .notification-dot {
      width: 7px; height: 7px; border-radius: 50%; background: var(--danger);
      position: absolute; top: -1px; right: -1px; animation: pulse 2s infinite;
    }

    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 60px 20px; gap: 12px; color: var(--text3);
    }
    .empty-icon { font-size: 40px; opacity: 0.4; }
  `}</style>
);

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_QUOTATIONS = [
  { id: "Q001", rfq: "RFQ-2024-001", rfqTitle: "Office Stationery Supply", vendor: "TechMart Supplies", vendorId: "V001", price: 45000, gst: 18, total: 53100, delivery: 7, rating: 4.5, notes: "Includes branded packaging. Bulk discount applied.", status: "submitted", submittedAt: "2024-01-15 10:30", items: [{ name: "A4 Paper Ream", qty: 100, unit: 450 }, { name: "Ballpoint Pens", qty: 500, unit: 15 }] },
  { id: "Q002", rfq: "RFQ-2024-001", rfqTitle: "Office Stationery Supply", vendor: "OfficeHub India", vendorId: "V002", price: 42000, gst: 18, total: 49560, delivery: 10, rating: 3.8, notes: "Standard packaging. Free delivery above ₹40K.", status: "submitted", submittedAt: "2024-01-15 14:20", items: [{ name: "A4 Paper Ream", qty: 100, unit: 420 }, { name: "Ballpoint Pens", qty: 500, unit: 12 }] },
  { id: "Q003", rfq: "RFQ-2024-001", rfqTitle: "Office Stationery Supply", vendor: "PrimeProcure Co.", vendorId: "V003", price: 48500, gst: 18, total: 57230, delivery: 5, rating: 4.9, notes: "Priority shipping. ISO certified vendor.", status: "submitted", submittedAt: "2024-01-16 09:15", items: [{ name: "A4 Paper Ream", qty: 100, unit: 485 }, { name: "Ballpoint Pens", qty: 500, unit: 18 }] },
];

const MOCK_PO = {
  id: "PO-2024-0042", rfq: "RFQ-2024-001", quotationId: "Q002", vendor: "OfficeHub India",
  vendorGST: "27AABCO1234F1Z5", vendorAddress: "Plot 14, Industrial Area, Pune - 411018",
  vendorEmail: "billing@officehub.in", vendorPhone: "+91 98234 56789",
  buyer: "Acme Corp Pvt. Ltd.", buyerGST: "27AACCA5678G1Z3",
  buyerAddress: "Tower B, Biz Park, Mumbai - 400072",
  createdAt: "2024-01-18", dueDate: "2024-01-28",
  items: [{ name: "A4 Paper Ream (500 sheets)", qty: 100, unit: 420, gst: 18 }, { name: "Ballpoint Pens (Blue)", qty: 500, unit: 12, gst: 12 }],
  status: "approved", paymentTerms: "Net 30", approvedBy: "Rajan Sharma",
};

const MOCK_LOGS = [
  { id: 1, type: "rfq",      action: "RFQ Created",              user: "Priya Mehta",    role: "Procurement Officer", time: "2 min ago",  detail: "RFQ-2024-001 created for Office Stationery Supply",        icon: "📋" },
  { id: 2, type: "approval", action: "Quotation Approved",       user: "Rajan Sharma",   role: "Manager",             time: "18 min ago", detail: "Q002 from OfficeHub India approved. PO generated.",         icon: "✅" },
  { id: 3, type: "invoice",  action: "Invoice Sent",             user: "System",         role: "Auto",                time: "20 min ago", detail: "INV-2024-0042 emailed to billing@officehub.in",             icon: "📧" },
  { id: 4, type: "vendor",   action: "Vendor Registered",        user: "Aman Gupta",     role: "Admin",               time: "1 hr ago",   detail: "PrimeProcure Co. added with GST verification",              icon: "🏢" },
  { id: 5, type: "rfq",      action: "Quotation Submitted",      user: "TechMart Bot",   role: "Vendor",              time: "2 hr ago",   detail: "Q001 submitted for RFQ-2024-001 — ₹53,100",                icon: "📨" },
  { id: 6, type: "approval", action: "Approval Requested",       user: "Priya Mehta",    role: "Procurement Officer", time: "3 hr ago",   detail: "Comparison complete. Approval requested for Q002.",          icon: "⏳" },
  { id: 7, type: "po",       action: "PO Dispatched",            user: "System",         role: "Auto",                time: "4 hr ago",   detail: "PO-2024-0041 dispatched to Vendor via email",               icon: "🚚" },
  { id: 8, type: "invoice",  action: "Payment Marked",           user: "Finance Team",   role: "Finance",             time: "Yesterday",  detail: "INV-2024-0040 marked as PAID. ₹1,24,500",                   icon: "💰" },
  { id: 9, type: "rfq",      action: "RFQ Deadline Extended",    user: "Priya Mehta",    role: "Procurement Officer", time: "Yesterday",  detail: "RFQ-2024-002 deadline extended to Jan 25, 2024",            icon: "📅" },
  { id: 10, type: "approval", action: "Approval Rejected",       user: "Rajan Sharma",   role: "Manager",             time: "2 days ago", detail: "Q005 rejected — pricing exceeds budget by 18%",             icon: "❌" },
];

const ANALYTICS = {
  monthly: [
    { month: "Aug", spend: 320000, orders: 8 }, { month: "Sep", spend: 410000, orders: 11 },
    { month: "Oct", spend: 290000, orders: 7 }, { month: "Nov", spend: 510000, orders: 14 },
    { month: "Dec", spend: 380000, orders: 10 }, { month: "Jan", spend: 460000, orders: 12 },
  ],
  vendors: [
    { name: "TechMart Supplies", spend: 580000, orders: 15, rating: 4.5, onTime: 93 },
    { name: "OfficeHub India", spend: 420000, orders: 12, rating: 3.8, onTime: 78 },
    { name: "PrimeProcure Co.", spend: 310000, orders: 8, rating: 4.9, onTime: 97 },
    { name: "ValueVend Ltd.", spend: 190000, orders: 5, rating: 4.1, onTime: 85 },
  ],
  stats: { totalSpend: 1500000, poCount: 40, rfqCount: 52, avgSavings: 12.4, pendingApprovals: 3 }
};

// ============================================================
// HELPERS
// ============================================================
const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const Stars = ({ n }) => "★".repeat(Math.floor(n)) + (n % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(n));

const MiniBar = ({ value, max, color = "var(--accent)" }) => (
  <div className="progress-bar" style={{ width: 80 }}>
    <div className="progress-fill" style={{ width: `${(value / max) * 100}%`, background: color }} />
  </div>
);

const Sparkline = ({ data, color = "#6c63ff" }) => {
  const max = Math.max(...data), min = Math.min(...data), h = 36, w = 100;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={`${pts} ${w},${h} 0,${h}`} fill={color} opacity="0.1" />
    </svg>
  );
};

// ============================================================
// NAVIGATION
// ============================================================
const NAV_ITEMS = [
  { id: "quotation-submit", label: "Quotation Submit", icon: "📨" },
  { id: "quotation-compare", label: "Quote Comparison", icon: "⚖️" },
  { id: "approval", label: "Approvals", icon: "✅" },
  { id: "po-invoice", label: "PO & Invoice", icon: "🧾" },
  { id: "logs-reports", label: "Logs & Reports", icon: "📊" },
];

// ============================================================
// SCREEN 1: QUOTATION SUBMISSION
// ============================================================
function QuotationSubmitScreen() {
  const [form, setForm] = useState({ price: "", delivery: "", notes: "", discount: "", validity: "15" });
  const [items, setItems] = useState([
    { name: "A4 Paper Ream (500 sheets)", qty: 100, unitPrice: "", gst: 18 },
    { name: "Ballpoint Pens (Blue)", qty: 500, unitPrice: "", gst: 12 },
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const totalBase = items.reduce((s, i) => s + (parseFloat(i.unitPrice) || 0) * i.qty, 0);
  const totalGst = items.reduce((s, i) => s + ((parseFloat(i.unitPrice) || 0) * i.qty * i.gst) / 100, 0);
  const discount = ((totalBase + totalGst) * (parseFloat(form.discount) || 0)) / 100;
  const grandTotal = totalBase + totalGst - discount;

  const updateItem = (idx, field, val) => setItems(p => p.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  const handleSubmit = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSubmitted(true); }, 1400);
  };

  if (submitted) return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 20 }}>
      <div style={{ fontSize: 64 }}>🎉</div>
      <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "var(--success)" }}>Quotation Submitted!</div>
      <div style={{ color: "var(--text2)", textAlign: "center", maxWidth: 360 }}>Your quotation for <strong>RFQ-2024-001</strong> has been submitted successfully and is awaiting review.</div>
      <div className="badge badge-success">Q-{Date.now().toString().slice(-5)}</div>
      <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>Submit Another</button>
    </div>
  );

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* RFQ Info Banner */}
      <div style={{ background: "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.08))", border: "1px solid rgba(108,99,255,0.25)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1 }}>Responding to RFQ</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>RFQ-2024-001 — Office Stationery Supply</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[["Deadline", "Jan 20, 2024"], ["Items", "2 Products"], ["Buyer", "Acme Corp"]].map(([k, v]) => (
            <div key={k} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>{k}</div>
              <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Left: Line Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span className="section-title">Line Items</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setItems(p => [...p, { name: "", qty: 1, unitPrice: "", gst: 18 }])}>+ Add Row</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Product / Service</th>
                    <th>Qty</th>
                    <th>Unit Price (₹)</th>
                    <th>GST %</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => {
                    const amt = (parseFloat(item.unitPrice) || 0) * item.qty;
                    const gstAmt = (amt * item.gst) / 100;
                    return (
                      <tr key={idx}>
                        <td><input value={item.name} onChange={e => updateItem(idx, "name", e.target.value)} placeholder="Item name" style={{ minWidth: 160 }} /></td>
                        <td><input type="number" value={item.qty} onChange={e => updateItem(idx, "qty", e.target.value)} style={{ width: 70 }} /></td>
                        <td><input type="number" value={item.unitPrice} onChange={e => updateItem(idx, "unitPrice", e.target.value)} placeholder="0.00" style={{ width: 110 }} /></td>
                        <td>
                          <select value={item.gst} onChange={e => updateItem(idx, "gst", +e.target.value)} style={{ width: 80 }}>
                            {[0, 5, 12, 18, 28].map(g => <option key={g} value={g}>{g}%</option>)}
                          </select>
                        </td>
                        <td style={{ color: "var(--text)", fontWeight: 500 }}>
                          {amt ? fmt(amt + gstAmt) : "—"}
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setItems(p => p.filter((_, i) => i !== idx))} style={{ color: "var(--danger)" }}>✕</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: 14 }}>Terms & Conditions</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Delivery Days</label>
                <input type="number" value={form.delivery} onChange={e => setForm(p => ({ ...p, delivery: e.target.value }))} placeholder="e.g. 7" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Discount (%)</label>
                <input type="number" value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))} placeholder="0" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Quote Validity (days)</label>
                <input type="number" value={form.validity} onChange={e => setForm(p => ({ ...p, validity: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Payment Terms</label>
                <select>
                  {["Net 30", "Net 15", "Immediate", "50% Advance"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Notes / Remarks</label>
                <textarea rows={3} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any special terms, conditions, or remarks..." />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card" style={{ background: "linear-gradient(160deg, var(--surface2), var(--surface))" }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Quote Summary</div>
            {[["Subtotal", fmt(totalBase)], ["GST Amount", fmt(totalGst)], ["Discount", discount ? `-${fmt(discount)}` : "—"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13, color: "var(--text2)" }}>
                <span>{k}</span><span style={{ color: k === "Discount" ? "var(--success)" : "var(--text)" }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 8, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Syne", fontWeight: 700 }}>Grand Total</span>
              <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: "var(--accent)" }}>{fmt(grandTotal)}</span>
            </div>
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>Delivery Timeline</div>
            <div style={{ position: "relative", height: 60, background: "var(--surface2)", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${Math.min(100, (form.delivery / 30) * 100)}%`, background: "linear-gradient(90deg, rgba(108,99,255,0.4), rgba(0,212,170,0.3))", transition: "width 0.4s" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 700, fontSize: 22, color: form.delivery ? "var(--text)" : "var(--text3)" }}>
                {form.delivery ? `${form.delivery} Days` : "Enter Days"}
              </div>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 14 }} onClick={handleSubmit} disabled={saving || !grandTotal}>
            {saving ? <><span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} /> Submitting...</> : "Submit Quotation →"}
          </button>
          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>Save as Draft</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 2: QUOTATION COMPARISON
// ============================================================
function QuotationCompareScreen() {
  const [sort, setSort] = useState("price");
  const [selected, setSelected] = useState(null);

  const sorted = [...MOCK_QUOTATIONS].sort((a, b) =>
    sort === "price" ? a.total - b.total :
    sort === "delivery" ? a.delivery - b.delivery :
    b.rating - a.rating
  );
  const lowestId = [...MOCK_QUOTATIONS].sort((a, b) => a.total - b.total)[0].id;

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div className="section-title" style={{ fontSize: 18 }}>Quotation Comparison</div>
          <div style={{ color: "var(--text2)", fontSize: 12, marginTop: 2 }}>RFQ-2024-001 — Office Stationery Supply · {MOCK_QUOTATIONS.length} quotes received</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>Sort by:</span>
          {["price", "delivery", "rating"].map(s => (
            <button key={s} className={`btn btn-sm ${sort === s ? "btn-primary" : "btn-ghost"}`} onClick={() => setSort(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${MOCK_QUOTATIONS.length}, 1fr)`, gap: 12 }}>
        {sorted.map((q, idx) => {
          const isLow = q.id === lowestId;
          const gstAmt = (q.price * q.gst) / 100;
          return (
            <div key={q.id} className="card" style={{
              border: isLow ? "1.5px solid var(--success)" : selected === q.id ? "1.5px solid var(--accent)" : "1px solid var(--border)",
              position: "relative", transition: "border-color 0.2s, box-shadow 0.2s",
              boxShadow: selected === q.id ? "0 0 20px rgba(108,99,255,0.15)" : "none",
            }}>
              {isLow && <div style={{ position: "absolute", top: -1, right: 12, background: "var(--success)", color: "#0c0e14", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: "0 0 6px 6px", letterSpacing: 0.5 }}>LOWEST PRICE</div>}
              {idx === 0 && sort !== "price" && <div style={{ position: "absolute", top: -1, left: 12, background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: "0 0 6px 6px", letterSpacing: 0.5 }}>BEST {sort.toUpperCase()}</div>}

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 4 }}>{q.vendor}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{q.id} · Submitted {q.submittedAt.split(" ")[0]}</div>
              </div>

              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, color: isLow ? "var(--success)" : "var(--text)", marginBottom: 2 }}>{fmt(q.total)}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 16 }}>Base: {fmt(q.price)} + GST: {fmt(gstAmt)} ({q.gst}%)</div>

              {[["Delivery", `${q.delivery} days`, q.delivery <= 7 ? "success" : q.delivery <= 10 ? "warning" : "danger"], ["Rating", <span key="r">{Stars({ n: q.rating })}<span style={{ marginLeft: 4, color: "var(--text2)", fontSize: 11 }}>{q.rating}</span></span>, "neutral"]].map(([k, v, cls]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12, color: "var(--text3)" }}>{k}</span>
                  <span className={`badge badge-${cls}`} style={{ fontSize: 11 }}>{v}</span>
                </div>
              ))}

              {/* Item breakdown */}
              <div style={{ marginTop: 8, marginBottom: 14 }}>
                {q.items.map(it => (
                  <div key={it.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text2)", padding: "4px 0" }}>
                    <span>{it.name} ×{it.qty}</span>
                    <span>{fmt(it.unit * it.qty)}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 14, fontStyle: "italic", lineHeight: 1.5 }}>"{q.notes}"</div>

              <button
                className={`btn ${selected === q.id ? "btn-primary" : "btn-ghost"}`}
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setSelected(q.id === selected ? null : q.id)}
              >
                {selected === q.id ? "✓ Selected" : "Select Vendor"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: 14 }}>Side-by-Side Comparison</div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Criteria</th>
                {sorted.map(q => <th key={q.id} style={{ color: q.id === lowestId ? "var(--success)" : q.id === selected ? "var(--accent)" : undefined }}>{q.vendor}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ["Grand Total", q => fmt(q.total)],
                ["Base Price", q => fmt(q.price)],
                ["GST", q => `${q.gst}%`],
                ["Delivery", q => `${q.delivery} days`],
                ["Rating", q => `${q.rating}/5`],
              ].map(([label, fn]) => (
                <tr key={label}>
                  <td style={{ color: "var(--text2)", fontWeight: 500 }}>{label}</td>
                  {sorted.map(q => {
                    const vals = sorted.map(x => { const v = fn(x); return parseFloat(v.replace(/[^0-9.]/g, "")) || 0; });
                    const val = parseFloat(fn(q).replace(/[^0-9.]/g, "")) || 0;
                    const isBest = label !== "Rating" ? val === Math.min(...vals) : val === Math.max(...vals);
                    return (
                      <td key={q.id} style={{ color: isBest ? "var(--success)" : "var(--text)", fontWeight: isBest ? 600 : 400 }}>
                        {fn(q)} {isBest && "✓"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button className="btn btn-ghost" onClick={() => setSelected(null)}>Clear</button>
            <button className="btn btn-success">Initiate Approval for Selected →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 3: APPROVAL WORKFLOW
// ============================================================
function ApprovalScreen() {
  const [step, setStep] = useState(0); // 0=pending, 1=approved, 2=rejected
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("pending");

  const STEPS = [
    { label: "RFQ Created", by: "Priya Mehta", time: "Jan 15, 10:30 AM", done: true, icon: "📋" },
    { label: "Quotations Received", by: "System", time: "Jan 16, 09:15 AM", done: true, icon: "📨" },
    { label: "Comparison Done", by: "Priya Mehta", time: "Jan 17, 03:00 PM", done: true, icon: "⚖️" },
    { label: "Approval Requested", by: "Priya Mehta", time: "Jan 17, 03:30 PM", done: true, icon: "⏳" },
    { label: "Manager Review", by: "Rajan Sharma", time: step >= 1 ? "Jan 18, 11:00 AM" : "Pending", done: step >= 1, active: step === 0, icon: "👁️" },
    { label: "PO Generation", by: "System", time: step === 1 ? "Jan 18, 11:01 AM" : "—", done: step === 1, icon: "📄" },
  ];

  const handleAction = (approve) => {
    if (!remark.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(approve ? 1 : 2); }, 1500);
  };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <div className="tab-bar">
          {["pending", "history"].map(t => <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t === "pending" ? "Pending (1)" : "History"}</button>)}
        </div>
      </div>

      {tab === "pending" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
          {/* Main Approval Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {step === 0 ? (
              <div className="card" style={{ border: "1px solid rgba(255,169,77,0.3)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                  <div>
                    <div className="section-title" style={{ fontSize: 17 }}>Procurement Approval Request</div>
                    <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>APR-2024-0018 · Requested by Priya Mehta</div>
                  </div>
                  <span className="badge badge-warning">⏳ Awaiting Approval</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                  {[["RFQ", "RFQ-2024-001"], ["Vendor Selected", "OfficeHub India"], ["Quote Value", "₹49,560"], ["Budget", "₹52,000"], ["Category", "Stationery"], ["Requested", "Jan 17, 2024"]].map(([k, v]) => (
                    <div key={k} style={{ background: "var(--surface2)", borderRadius: 8, padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: "var(--text3)" }}>{k}</div>
                      <div style={{ fontWeight: 600, color: "var(--text)", marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "var(--surface2)", borderRadius: 8, padding: 14, marginBottom: 18 }}>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Selected Quotation Details</div>
                  <table>
                    <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead>
                    <tbody>
                      {MOCK_PO.items.map(it => (
                        <tr key={it.name}>
                          <td>{it.name}</td><td>{it.qty}</td><td>{fmt(it.unit)}</td>
                          <td style={{ color: "var(--text)", fontWeight: 500 }}>{fmt(it.unit * it.qty * (1 + it.gst / 100))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: "var(--text2)", display: "block", marginBottom: 6 }}>Approval Remarks <span style={{ color: "var(--danger)" }}>*</span></label>
                  <textarea rows={3} value={remark} onChange={e => setRemark(e.target.value)} placeholder="Add your remarks before approving or rejecting..." />
                  {!remark.trim() && <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>Remarks are required to proceed</div>}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-success" style={{ flex: 1, justifyContent: "center", padding: 12 }} onClick={() => handleAction(true)} disabled={loading || !remark.trim()}>
                    {loading ? "Processing..." : "✓ Approve"}
                  </button>
                  <button className="btn btn-danger" style={{ flex: 1, justifyContent: "center", padding: 12 }} onClick={() => handleAction(false)} disabled={loading || !remark.trim()}>
                    ✕ Reject
                  </button>
                  <button className="btn btn-ghost" style={{ padding: 12 }} title="Escalate">↑ Escalate</button>
                </div>
              </div>
            ) : (
              <div className="card fade-in" style={{ border: `1.5px solid ${step === 1 ? "var(--success)" : "var(--danger)"}`, textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>{step === 1 ? "✅" : "❌"}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: step === 1 ? "var(--success)" : "var(--danger)", marginBottom: 8 }}>
                  {step === 1 ? "Approved!" : "Rejected"}
                </div>
                <div style={{ color: "var(--text2)", marginBottom: 6 }}>APR-2024-0018 has been {step === 1 ? "approved" : "rejected"}</div>
                <div style={{ fontSize: 13, color: "var(--text3)", fontStyle: "italic" }}>"{remark}"</div>
                {step === 1 && <div className="badge badge-success" style={{ margin: "14px auto 0", display: "inline-flex" }}>PO-2024-0042 Generated</div>}
                <button className="btn btn-ghost" style={{ marginTop: 20 }} onClick={() => { setStep(0); setRemark(""); }}>Back</button>
              </div>
            )}
          </div>

          {/* Workflow Timeline */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: 16 }}>Workflow Timeline</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {STEPS.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div className="timeline-dot" style={{ background: s.done ? "var(--success)" : s.active ? "var(--warning)" : "var(--border2)", boxShadow: s.active ? "0 0 10px rgba(255,169,77,0.5)" : "none" }} />
                      {i < STEPS.length - 1 && <div className="timeline-line" />}
                    </div>
                    <div style={{ paddingBottom: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: s.done ? "var(--text)" : s.active ? "var(--warning)" : "var(--text3)" }}>{s.icon} {s.label}</div>
                      <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{s.by} · {s.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <table>
            <thead><tr><th>ID</th><th>RFQ</th><th>Vendor</th><th>Value</th><th>Action By</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {[
                ["APR-2024-0017", "RFQ-2023-048", "TechMart Supplies", "₹1,24,500", "Rajan Sharma", "approved", "Jan 10"],
                ["APR-2024-0016", "RFQ-2023-045", "ValueVend Ltd.", "₹62,300", "Rajan Sharma", "rejected", "Jan 08"],
                ["APR-2024-0015", "RFQ-2023-040", "PrimeProcure Co.", "₹89,700", "Sunita Joshi", "approved", "Jan 05"],
              ].map(([id, rfq, v, val, by, status, dt]) => (
                <tr key={id}>
                  <td style={{ color: "var(--accent)" }}>{id}</td><td>{rfq}</td><td>{v}</td>
                  <td style={{ color: "var(--text)" }}>{val}</td><td>{by}</td>
                  <td><span className={`badge badge-${status === "approved" ? "success" : "danger"}`}>{status}</span></td>
                  <td>{dt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SCREEN 4: PO & INVOICE
// ============================================================
function POInvoiceScreen() {
  const [view, setView] = useState("po"); // po | invoice
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const subtotal = MOCK_PO.items.reduce((s, i) => s + i.unit * i.qty, 0);
  const gstTotal = MOCK_PO.items.reduce((s, i) => s + (i.unit * i.qty * i.gst) / 100, 0);
  const grand = subtotal + gstTotal;

  const sendEmail = () => { setSending(true); setTimeout(() => { setSending(false); setEmailSent(true); }, 1600); };

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div className="section-title" style={{ fontSize: 18 }}>{view === "po" ? "Purchase Order" : "Invoice"}</div>
          <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{view === "po" ? `PO-2024-0042 · Generated from Q002` : `INV-2024-0042 · Linked to PO-2024-0042`}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="tab-bar">
            <button className={`tab ${view === "po" ? "active" : ""}`} onClick={() => setView("po")}>Purchase Order</button>
            <button className={`tab ${view === "invoice" ? "active" : ""}`} onClick={() => setView("invoice")}>Invoice</button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
        {/* Document */}
        <div className="card" style={{ background: "var(--surface)", fontFamily: "'DM Sans', sans-serif" }}>
          {/* Doc Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 900, fontSize: 22, color: "var(--accent)", letterSpacing: -0.5 }}>VendorBridge</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>Acme Corp Pvt. Ltd.</div>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>{MOCK_PO.buyerAddress}</div>
              <div style={{ fontSize: 11, color: "var(--text3)" }}>GST: {MOCK_PO.buyerGST}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 20, color: "var(--text)" }}>{view === "po" ? "PURCHASE ORDER" : "INVOICE"}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)", marginTop: 4 }}>{view === "po" ? MOCK_PO.id : `INV-2024-0042`}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>Date: {MOCK_PO.createdAt}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>Due: {MOCK_PO.dueDate}</div>
              <span className={`badge ${MOCK_PO.status === "approved" ? "badge-success" : "badge-warning"}`} style={{ marginTop: 6 }}>{MOCK_PO.status}</span>
            </div>
          </div>

          {/* Vendor Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {[["Bill To (Vendor)", [MOCK_PO.vendor, MOCK_PO.vendorAddress, `GST: ${MOCK_PO.vendorGST}`, MOCK_PO.vendorEmail]], ["Order Info", [`Approved by: ${MOCK_PO.approvedBy}`, `Payment: ${MOCK_PO.paymentTerms}`, `PO Ref: ${MOCK_PO.id}`, `RFQ Ref: ${MOCK_PO.rfq}`]]].map(([title, lines]) => (
              <div key={title} style={{ background: "var(--surface2)", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>{title}</div>
                {lines.map(l => <div key={l} style={{ fontSize: 12, color: "var(--text2)", marginBottom: 2 }}>{l}</div>)}
              </div>
            ))}
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: 20 }}>
            <table>
              <thead><tr><th>#</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>GST %</th><th>GST Amt</th><th>Total</th></tr></thead>
              <tbody>
                {MOCK_PO.items.map((it, i) => {
                  const base = it.unit * it.qty, gstAmt = (base * it.gst) / 100;
                  return (
                    <tr key={it.name}>
                      <td style={{ color: "var(--text3)" }}>{i + 1}</td>
                      <td style={{ color: "var(--text)" }}>{it.name}</td>
                      <td>{it.qty}</td>
                      <td>{fmt(it.unit)}</td>
                      <td><span className="badge badge-neutral">{it.gst}%</span></td>
                      <td>{fmt(gstAmt)}</td>
                      <td style={{ color: "var(--text)", fontWeight: 600 }}>{fmt(base + gstAmt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: 260 }}>
              {[["Subtotal", fmt(subtotal)], ["Total GST", fmt(gstTotal)]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--text2)" }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 16 }}>
                <span style={{ fontFamily: "Syne", fontWeight: 700 }}>Grand Total</span>
                <span style={{ fontFamily: "Syne", fontWeight: 800, color: "var(--accent)" }}>{fmt(grand)}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontStyle: "italic", textAlign: "right" }}>
                Amount in words: {grand === 49560 ? "Forty-Nine Thousand Five Hundred Sixty Only" : "See above"}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>This is a computer-generated document. No signature required.</div>
            <div className="badge badge-accent">VendorBridge ERP</div>
          </div>
        </div>

        {/* Actions Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn-primary" style={{ justifyContent: "center" }} onClick={() => window.print()}>🖨️ Print Document</button>
              <button className="btn btn-ghost" style={{ justifyContent: "center" }}>⬇️ Download PDF</button>
              <button className="btn btn-ghost" style={{ justifyContent: "center" }} onClick={sendEmail} disabled={sending || emailSent}>
                {sending ? "⏳ Sending..." : emailSent ? "✅ Email Sent!" : "📧 Send via Email"}
              </button>
              {emailSent && <div style={{ fontSize: 11, color: "var(--success)", textAlign: "center" }}>Sent to {MOCK_PO.vendorEmail}</div>}
            </div>
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>Document Status</div>
            {[["PO Status", "Approved", "success"], ["Invoice", view === "invoice" ? "Viewing" : "Ready", "accent"], ["Email", emailSent ? "Sent" : "Pending", emailSent ? "success" : "warning"], ["Payment", "Unpaid", "danger"]].map(([k, v, cls]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>{k}</span>
                <span className={`badge badge-${cls}`}>{v}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>Summary</div>
            {[["Subtotal", fmt(subtotal)], ["GST", fmt(gstTotal)], ["Grand Total", fmt(grand)]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "var(--text2)" }}>{k}</span>
                <span style={{ color: k === "Grand Total" ? "var(--accent)" : "var(--text)", fontWeight: k === "Grand Total" ? 700 : 400 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 5: ACTIVITY LOGS & REPORTS
// ============================================================
function LogsReportsScreen() {
  const [tab, setTab] = useState("logs");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_LOGS.filter(l =>
    (filter === "all" || l.type === filter) &&
    (l.action.toLowerCase().includes(search.toLowerCase()) || l.detail.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase()))
  );

  const maxSpend = Math.max(...ANALYTICS.monthly.map(m => m.spend));

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="tab-bar" style={{ width: "fit-content" }}>
        {["logs", "analytics"].map(t => <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
      </div>

      {tab === "logs" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
          {/* Logs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input placeholder="🔍  Search logs..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 160 }} />
              <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 140 }}>
                {[["all", "All Types"], ["rfq", "RFQ"], ["approval", "Approval"], ["invoice", "Invoice"], ["vendor", "Vendor"], ["po", "PO"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="section-title">Audit Log</span>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>{filtered.length} entries</span>
              </div>
              <div style={{ maxHeight: 460, overflowY: "auto" }}>
                {filtered.length === 0 ? (
                  <div className="empty-state"><span className="empty-icon">🔍</span><span>No logs match your search</span></div>
                ) : filtered.map((log, i) => (
                  <div key={log.id} className="slide-in" style={{ display: "flex", gap: 14, padding: "13px 16px", borderBottom: i < filtered.length - 1 ? "1px solid rgba(42,47,71,0.4)" : "none", animationDelay: `${i * 0.04}s` }}>
                    <div style={{ fontSize: 20, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface2)", borderRadius: 8, flexShrink: 0 }}>{log.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>{log.action}</span>
                        <span style={{ fontSize: 11, color: "var(--text3)", flexShrink: 0 }}>{log.time}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2, lineHeight: 1.5 }}>{log.detail}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
                        <span className="badge badge-neutral" style={{ fontSize: 10 }}>{log.user}</span>
                        <span className={`badge badge-${log.type === "approval" ? "warning" : log.type === "invoice" ? "info" : log.type === "rfq" ? "accent" : "neutral"}`} style={{ fontSize: 10 }}>{log.type.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Notifications */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="card">
              <div className="section-title" style={{ marginBottom: 12 }}>Notifications</div>
              {[
                { icon: "⏳", title: "Approval Pending", msg: "APR-2024-0018 awaiting your review", urgent: true, time: "Now" },
                { icon: "📋", title: "New RFQ Created", msg: "RFQ-2024-002 by Priya Mehta", urgent: false, time: "1h ago" },
                { icon: "📧", title: "Invoice Delivered", msg: "INV-2024-0042 delivered to vendor", urgent: false, time: "2h ago" },
                { icon: "💰", title: "Payment Due", msg: "INV-2024-0040 payment due Jan 25", urgent: true, time: "1d ago" },
              ].map((n, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ position: "relative", width: 32, height: 32, background: n.urgent ? "rgba(255,107,107,0.12)" : "var(--surface2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
                    {n.icon}
                    {n.urgent && <div className="notification-dot" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{n.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 1 }}>{n.msg}</div>
                  </div>
                  <span style={{ fontSize: 10, color: "var(--text3)" }}>{n.time}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="section-title" style={{ marginBottom: 12 }}>Quick Stats</div>
              {[["Total Activities", "247", "var(--text)"], ["Approvals Today", "3", "var(--warning)"], ["Invoices Sent", "12", "var(--info)"], ["Pending Actions", "5", "var(--danger)"]].map(([k, v, c]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--text2)" }}>{k}</span>
                  <span style={{ fontWeight: 700, color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ANALYTICS TAB */
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {[
              { label: "Total Spend", value: "₹15.0L", sub: "FY 2023-24", color: "var(--accent)", trend: [3.2, 4.1, 2.9, 5.1, 3.8, 4.6] },
              { label: "Purchase Orders", value: "40", sub: "This year", color: "var(--success)", trend: [6, 8, 5, 10, 7, 4] },
              { label: "Active RFQs", value: "52", sub: "Total initiated", color: "var(--info)", trend: [4, 7, 6, 9, 8, 11] },
              { label: "Avg Savings", value: "12.4%", sub: "vs budget", color: "var(--accent4)", trend: [10, 11, 9, 13, 12, 14] },
            ].map(k => (
              <div key={k.label} className="card" style={{ background: "linear-gradient(135deg, var(--surface), var(--surface2))" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>{k.label}</div>
                    <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: k.color }}>{k.value}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{k.sub}</div>
                  </div>
                  <Sparkline data={k.trend} color={k.color} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Monthly Spend Chart */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="section-title">Monthly Procurement Spend</span>
                <button className="btn btn-ghost btn-sm">⬇️ Export</button>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 140 }}>
                {ANALYTICS.monthly.map(m => (
                  <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 10, color: "var(--text3)" }}>{(m.spend / 100000).toFixed(1)}L</div>
                    <div style={{ width: "100%", background: "linear-gradient(180deg, var(--accent), rgba(108,99,255,0.4))", borderRadius: "4px 4px 0 0", height: `${(m.spend / maxSpend) * 100}px`, minHeight: 4, transition: "height 0.5s ease", cursor: "pointer", position: "relative" }}
                      title={`${m.month}: ${fmt(m.spend)}`}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.1)", borderRadius: "4px 4px 0 0", opacity: 0, transition: "opacity 0.15s" }} className="bar-hover" />
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text3)" }}>{m.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor Performance */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="section-title">Vendor Performance</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ANALYTICS.vendors.map(v => (
                  <div key={v.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{v.name}</span>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "var(--text3)" }}>{v.onTime}% on-time</span>
                        <span style={{ fontSize: 11, color: "var(--accent4)" }}>★ {v.rating}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${v.onTime}%`, background: v.onTime >= 90 ? "var(--success)" : v.onTime >= 80 ? "var(--warning)" : "var(--danger)" }} />
                      </div>
                      <span style={{ fontSize: 11, color: "var(--text3)", width: 50, textAlign: "right" }}>{fmt(v.spend).replace("₹", "₹")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spending Categories */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span className="section-title">Spending by Category</span>
              <button className="btn btn-ghost btn-sm">Full Report</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
              {[["Stationery", 28, "var(--accent)"], ["IT Hardware", 22, "var(--success)"], ["Services", 18, "var(--info)"], ["Furniture", 14, "var(--accent4)"], ["Utilities", 10, "var(--danger)"], ["Others", 8, "var(--text3)"]].map(([cat, pct, col]) => (
                <div key={cat} style={{ background: "var(--surface2)", borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid ${col}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontFamily: "Syne", fontWeight: 800, fontSize: 12, color: col }}>{pct}%</div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>{cat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [screen, setScreen] = useState("quotation-submit");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const screens = {
    "quotation-submit": <QuotationSubmitScreen />,
    "quotation-compare": <QuotationCompareScreen />,
    "approval": <ApprovalScreen />,
    "po-invoice": <POInvoiceScreen />,
    "logs-reports": <LogsReportsScreen />,
  };

  const titles = {
    "quotation-submit": "Quotation Submission",
    "quotation-compare": "Quotation Comparison",
    "approval": "Approval Workflow",
    "po-invoice": "PO & Invoice",
    "logs-reports": "Activity Logs & Reports",
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>
        {/* Sidebar */}
        <div style={{ width: sidebarOpen ? 230 : 60, background: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", transition: "width 0.2s ease", flexShrink: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 16px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border)" }}>
            {sidebarOpen && <div style={{ fontFamily: "Syne", fontWeight: 900, fontSize: 16, color: "var(--accent)", letterSpacing: -0.5, whiteSpace: "nowrap" }}>VendorBridge</div>}
            <button className="btn btn-ghost btn-icon btn-sm" style={{ marginLeft: "auto", flexShrink: 0 }} onClick={() => setSidebarOpen(p => !p)}>{sidebarOpen ? "◀" : "▶"}</button>
          </div>
          {sidebarOpen && (
            <div style={{ padding: "10px 14px 8px", fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>Member 4 Screens</div>
          )}
          <nav style={{ flex: 1, padding: "4px 8px", overflowY: "auto" }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setScreen(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 10px", borderRadius: 8, border: "none", background: screen === item.id ? "var(--surface3)" : "transparent", color: screen === item.id ? "var(--text)" : "var(--text2)", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", textAlign: "left", marginBottom: 2, transition: "all 0.15s", borderLeft: screen === item.id ? "2px solid var(--accent)" : "2px solid transparent" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
              </button>
            ))}
          </nav>
          {sidebarOpen && (
            <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>M4</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Member 4</div>
                  <div style={{ fontSize: 10, color: "var(--text3)" }}>Frontend · Advanced</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <div style={{ padding: "14px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", flexShrink: 0 }}>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>{titles[screen]}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 1 }}>VendorBridge ERP · Procurement Module</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <button className="btn btn-ghost btn-icon">🔔</button>
                <div className="notification-dot" />
              </div>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>M4</div>
            </div>
          </div>

          {/* Screen Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {screens[screen]}
          </div>
        </div>
      </div>
    </>
  );
}
