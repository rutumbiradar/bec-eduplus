// ============================================================
//  BEC ERP LOGIN SYSTEM  –  Basaveshwar Engineering College
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ─── DOM references ──────────────────────────────────────
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');

    // ─── Toast system (replaces alert) ──────────────────────
    function showToast(message, type = 'success') {
        // Remove any existing toast
        const oldToast = document.querySelector('.bec-toast');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = 'bec-toast';
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✅' : '⚠️'}</span>
            <span class="toast-msg">${message}</span>
        `;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: type === 'success' ? '#0b2a4a' : '#4a1e1e',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: '40px',
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: '15px',
            fontWeight: '500',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: '9999',
            opacity: '0',
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            pointerEvents: 'none',
            border: '1px solid rgba(255,255,255,0.15)'
        });
        document.body.appendChild(toast);

        // Fade in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Auto dismiss after 3.5s
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);

        // Click to dismiss immediately
        toast.addEventListener('click', () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        });
    }

    // ─── BEC ERP Demo Users ──────────────────────────────────
    const USERS = {
        admin: {
            username: 'admin',
            password: 'admin123',
            page: 'admin.html',
            displayName: 'Administrator'
        },
        principal: {
            username: 'principal',
            password: 'principal123',
            page: 'dashboard.html',
            displayName: 'Principal'
        },
        hod: {
            username: 'hod',
            password: 'hod123',
            page: 'dashboard.html',
            displayName: 'HOD'
        },
        faculty: {
            username: 'faculty',
            password: 'faculty123',
            page: 'dashboard.html',
            displayName: 'Faculty'
        },
        student: {
            username: 'student',
            password: 'student123',
            page: 'dashboard.html',
            displayName: 'Student'
        }
    };

    // ─── Role chip support (if you later switch to chips) ──
    // The script will also work with the <select> – but if you
    // have role chips with data-role, we can auto‑sync.
    function getSelectedRole() {
        // 1. Try the select element (traditional)
        if (roleSelect && roleSelect.value) {
            return roleSelect.value;
        }
        // 2. Try active role‑chip (if present)
        const activeChip = document.querySelector('.role-chip.active');
        if (activeChip) {
            return activeChip.dataset.role;
        }
        return null;
    }

    // ─── Login handler ──────────────────────────────────────
    function handleLogin(e) {
        e.preventDefault();

        const username = usernameInput ? usernameInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value.trim() : '';
        const role = getSelectedRole();

        // ── Validation ──
        if (!role) {
            showToast('Please select your role.', 'error');
            return;
        }
        if (!username) {
            showToast('Please enter your username.', 'error');
            return;
        }
        if (!password) {
            showToast('Please enter your password.', 'error');
            return;
        }

        const user = USERS[role];
        if (!user) {
            showToast('Invalid role selected.', 'error');
            return;
        }

        // ── Check credentials ──
        if (username === user.username && password === user.password) {
            // Save session
            localStorage.setItem('becLoggedIn', 'true');
            localStorage.setItem('becUsername', username);
            localStorage.setItem('becRole', role);
            localStorage.setItem('becDisplayName', user.displayName);

            showToast(`Welcome, ${user.displayName}! Redirecting…`, 'success');

            // Redirect after a short delay (so toast is seen)
            setTimeout(() => {
                window.location.href = user.page;
            }, 1000);
        } else {
            showToast('Invalid username or password. Please try again.', 'error');
        }
    }

    // ─── Attach event ──────────────────────────────────────
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    } else {
        console.warn('BEC ERP: #loginButton not found. Check your HTML.');
    }

    // ─── Optional: auto‑fill demo credentials on role select ──
    if (roleSelect) {
        roleSelect.addEventListener('change', function () {
            const role = this.value;
            const user = USERS[role];
            if (user && usernameInput) {
                usernameInput.value = user.username;
                // Optionally pre‑fill password? (better not for security)
                // But we can leave it empty.
            }
        });
    }

    // ─── If you use role‑chips, sync them with the select ──
    document.querySelectorAll('.role-chip').forEach(chip => {
        chip.addEventListener('click', function () {
            const role = this.dataset.role;
            if (roleSelect) {
                // Sync the select to match the chip
                const option = [...roleSelect.options].find(opt => opt.value === role);
                if (option) roleSelect.value = role;
                // Trigger the change event to fill username
                roleSelect.dispatchEvent(new Event('change'));
            }
        });
    });

    console.log('✅ BEC ERP Login System ready.');
});
