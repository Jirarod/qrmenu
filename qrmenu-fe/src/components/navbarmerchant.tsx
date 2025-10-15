
import React from "react";
import '../css/management-style.css';

const NavbarMerchant: React.FC = () => {
    return (
        <nav className="navbar-merchant" style={{
            background: "var(--color-accent2)",
            color: "var(--color-text)",
            fontFamily: "var(--font-main)",
            boxShadow: "0 2px 8px rgba(244, 172, 183, 0.10)",
            padding: "0.75rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "0 0 18px 18px"
        }}>
            <div className="navbar-logo" style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "var(--color-text)"
            }}>
                QRMenu
            </div>
            <ul className="navbar-links" style={{
                display: "flex",
                gap: "1.5rem",
                listStyle: "none",
                margin: 0,
                padding: 0
            }}>
                <li><a href="/dashboard" style={{
                    color: "var(--color-text)",
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "background 0.2s"
                }}>Dashboard</a></li>
                <li><a href="/menu" style={{
                    color: "var(--color-text)",
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "background 0.2s"
                }}>Menu</a></li>
                <li><a href="/orders" style={{
                    color: "var(--color-text)",
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "background 0.2s"
                }}>Orders</a></li>
                <li><a href="/settings" style={{
                    color: "var(--color-text)",
                    fontWeight: 500,
                    textDecoration: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "background 0.2s"
                }}>Settings</a></li>
            </ul>
            <div className="navbar-profile" style={{
                background: "var(--color-accent)",
                borderRadius: "10px",
                padding: "0.5rem 1rem",
                boxShadow: "0 2px 8px rgba(244, 172, 183, 0.10)"
            }}>
                <a href="/profile" style={{
                    color: "var(--color-card)",
                    fontWeight: 600,
                    textDecoration: "none"
                }}>Profile</a>
            </div>
        </nav>
    );
};

export default NavbarMerchant;