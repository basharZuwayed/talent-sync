import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
export default function App() {
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/health')
            .then((res) => res.json())
            .then((data) => {
            if (data.success) {
                setHealth(data.data);
            }
        })
            .catch((err) => console.error('Failed to connect to API:', err))
            .finally(() => setLoading(false));
    }, []);
    return (_jsx("main", { className: "simple-page-container", children: _jsxs("div", { className: "simple-card", children: [_jsx("div", { className: "brand-badge", children: "TalentSync" }), _jsx("h1", { className: "simple-title", children: "TalentSync" }), _jsx("p", { className: "simple-description", children: "A simple, modern workspace for talent synchronization and candidate intelligence." }), _jsxs("div", { className: "status-box", children: [_jsxs("div", { className: "status-header", children: [_jsx("span", { className: "status-dot", style: { backgroundColor: health ? '#10b981' : '#f59e0b' } }), _jsx("span", { className: "status-text", children: loading
                                        ? 'Connecting to backend API...'
                                        : health
                                            ? `API Connected (${health.service})`
                                            : 'Backend Offline' })] }), health && (_jsxs("div", { className: "status-meta", children: [_jsxs("span", { children: ["Environment: ", _jsx("strong", { children: health.environment })] }), _jsxs("span", { children: ["Status: ", _jsx("strong", { style: { color: '#10b981' }, children: health.status.toUpperCase() })] }), _jsxs("span", { children: ["Uptime: ", _jsxs("strong", { children: [health.uptimeSeconds, "s"] })] })] }))] })] }) }));
}
