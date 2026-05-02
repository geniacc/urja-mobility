import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  CreditCard,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck
} from "lucide-react";
import { useCart } from "../context/CartContext";

const parsePrice = (price) => {
  const parsed = Number(String(price || "85999").replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 85999;
};

const formatCurrency = (value) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;

const cardStyle = {
  background: "linear-gradient(180deg, rgba(15,23,42,0.94), rgba(2,6,23,0.94))",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  boxShadow: "0 22px 50px rgba(0,0,0,0.32)"
};

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
    const shipping = subtotal > 0 ? 0 : 0;
    const service = subtotal > 0 ? Math.max(499, subtotal * 0.015) : 0;
    return {
      subtotal,
      shipping,
      service,
      total: subtotal + shipping + service
    };
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <main style={{ minHeight: "100vh", padding: "9rem 1rem 6rem", background: "var(--bg)" }}>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...cardStyle, maxWidth: "760px", margin: "0 auto", padding: "4rem 2rem", textAlign: "center" }}
        >
          <div style={{ width: 92, height: 92, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(34,197,94,0.12)", color: "var(--secondary)", marginBottom: "1.5rem" }}>
            <ShoppingBag size={42} />
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "0.8rem" }}>Your cart is empty</h1>
          <p style={{ color: "var(--text-muted)", maxWidth: 460, margin: "0 auto 2rem" }}>
            Add batteries, chargers, or solar products to prepare a clean order summary.
          </p>
          <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "var(--gradient-main)", color: "#fff", padding: "0.95rem 1.25rem", borderRadius: "12px", fontWeight: 800, boxShadow: "0 14px 30px rgba(59,130,246,0.25)" }}>
            Browse Products <ArrowRight size={18} />
          </Link>
        </motion.section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "8.5rem 1rem 6rem", background: "var(--bg)" }}>
      <div style={{ width: "min(1180px, 94vw)", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "2rem" }}>
          <p style={{ color: "var(--secondary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem", marginBottom: "0.45rem" }}>
            Review Order
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.05 }}>Shopping Cart</h1>
              <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} ready for checkout
              </p>
            </div>
            <button onClick={clearCart} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", color: "#fca5a5", padding: "0.75rem 1rem", borderRadius: "12px", fontWeight: 800 }}>
              <Trash2 size={17} /> Empty Cart
            </button>
          </div>
        </motion.div>

        <div className="cart-layout" style={{ display: "grid", gap: "1.5rem", alignItems: "start" }}>
          <section style={{ display: "grid", gap: "1rem" }}>
            {cartItems.map((item, index) => {
              const price = parsePrice(item.price);
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="cart-item-card"
                  style={{ ...cardStyle, padding: "1.25rem", display: "grid", gap: "1.25rem" }}
                >
                  <div style={{ aspectRatio: "1", borderRadius: "14px", border: "1px solid var(--border)", background: "radial-gradient(circle at 50% 30%, rgba(59,130,246,0.18), rgba(15,23,42,0.9))", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} style={{ width: "88%", height: "88%", objectFit: "contain" }} />
                    ) : (
                      <Battery size={48} color="var(--secondary)" />
                    )}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <div>
                        <Link to={`/product/${item.id}`} style={{ color: "var(--text)", fontSize: "1.1rem", fontWeight: 850, lineHeight: 1.3 }}>
                          {item.title || item.name}
                        </Link>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.3rem" }}>SKU: URJ-{item.id}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} aria-label="Remove item" style={{ width: 38, height: 38, borderRadius: "10px", border: "1px solid rgba(239,68,68,0.24)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "12px", background: "rgba(2,6,23,0.45)", overflow: "hidden" }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: 42, height: 42, border: "none", background: "transparent", color: "var(--text)" }}>
                          <Minus size={16} />
                        </button>
                        <span style={{ width: 46, textAlign: "center", fontWeight: 850 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 42, height: 42, border: "none", background: "transparent", color: "var(--text)" }}>
                          <Plus size={16} />
                        </button>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.35rem", fontWeight: 900 }}>{formatCurrency(price * item.quantity)}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{formatCurrency(price)} each</div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}

            <Link to="/products" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", color: "var(--primary)", fontWeight: 800, width: "fit-content", marginTop: "0.5rem" }}>
              <ArrowRight size={17} style={{ transform: "rotate(180deg)" }} /> Continue shopping
            </Link>
          </section>

          <aside style={{ ...cardStyle, padding: "1.35rem", position: "sticky", top: "110px" }}>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Order Summary</h2>
            <div style={{ display: "grid", gap: "0.85rem", color: "var(--text-muted)", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><strong style={{ color: "var(--text)" }}>{formatCurrency(totals.subtotal)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Delivery</span><strong style={{ color: "var(--secondary)" }}>Free</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Service & handling</span><strong style={{ color: "var(--text)" }}>{formatCurrency(totals.service)}</strong></div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0 1.2rem" }}>
              <span style={{ fontSize: "1.05rem", fontWeight: 850 }}>Total</span>
              <strong style={{ fontSize: "1.65rem", color: "var(--secondary)" }}>{formatCurrency(totals.total)}</strong>
            </div>

            <button style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", border: "none", borderRadius: "13px", background: "var(--gradient-main)", color: "#fff", padding: "1rem", fontWeight: 900, fontSize: "1rem", boxShadow: "0 16px 34px rgba(59,130,246,0.28)" }}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{ display: "grid", gap: "0.75rem", marginTop: "1.25rem" }}>
              {[
                [ShieldCheck, "Secure payment"],
                [Truck, "Free delivery coordination"],
                [PackageCheck, "Product checked before dispatch"],
                [CreditCard, "GST-ready order summary"]
              ].map(([Icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.65rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  <CheckCircle2 size={16} color="var(--secondary)" />
                  <Icon size={16} color="var(--primary)" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
