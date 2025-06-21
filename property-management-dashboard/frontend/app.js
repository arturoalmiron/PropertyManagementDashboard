// Paraguay Property Management Dashboard - Frontend JavaScript
const API_BASE = 'http://localhost:3001/api';
let currentLanguage = 'es';

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

async function initializeApp() {
    console.log('Inicializando PropiedadesPY Dashboard...');
    await loadDashboardData();
    await updateExchangeRate();
    setInterval(updateExchangeRate, 300000);
}

// Navigation Functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');
    loadSectionData(sectionId);
}

async function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'dashboard': await loadDashboardData(); break;
        case 'properties': await loadProperties(); break;
        case 'tenants': await loadTenants(); break;
        case 'payments': await loadPayments(); break;
        case 'maintenance': await loadMaintenance(); break;
    }
}

// Dashboard Functions
async function loadDashboardData() {
    try {
        const response = await fetch(`${API_BASE}/dashboard/summary`);
        const data = await response.json();

        document.getElementById('totalProperties').textContent = data.totalProperties || '0';
        document.getElementById('occupancyRate').textContent = `${data.occupancyRate || 0}%`;
        document.getElementById('monthlyIncome').textContent = formatCurrency(data.monthlyIncome || 0, 'PYG');
        document.getElementById('pendingPayments').textContent = data.pendingPayments || '0';

        await loadRecentActivity();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

async function loadRecentActivity() {
    try {
        const response = await fetch(`${API_BASE}/payments?limit=5`);
        const payments = await response.json();
        const container = document.getElementById('recentActivity');

        if (payments.length === 0) {
            container.innerHTML = '<p class="text-center py-8">No hay actividad reciente</p>';
            return;
        }

        const activityHTML = payments.map(payment => `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${getPaymentStatusColor(payment.status)}">
                    <i class="fas fa-credit-card"></i>
                </div>
                <div class="activity-content">
                    <h4>Pago ${getPaymentStatusText(payment.status)}</h4>
                    <p>${payment.tenant?.firstName} ${payment.tenant?.lastName} - ${formatCurrency(payment.amount, payment.currency)}</p>
                </div>
                <div class="activity-time">${formatDate(payment.dueDate)}</div>
            </div>
        `).join('');

        container.innerHTML = activityHTML;
    } catch (error) {
        console.error('Error loading recent activity:', error);
        document.getElementById('recentActivity').innerHTML = '<p>Error cargando actividad reciente</p>';
    }
}

// Load Properties
async function loadProperties() {
    try {
        const response = await fetch(`${API_BASE}/properties`);
        const properties = await response.json();
        const container = document.getElementById('propertiesList');

        if (properties.length === 0) {
            container.innerHTML = '<p class="text-center py-8">No hay propiedades registradas</p>';
            return;
        }

        const tableHTML = `
            <table class="table">
                <thead>
                    <tr><th>Nombre</th><th>Dirección</th><th>Departamento</th><th>Unidades</th><th>Ocupación</th></tr>
                </thead>
                <tbody>
                    ${properties.map(property => `
                        <tr>
                            <td><strong>${property.name}</strong></td>
                            <td>${property.address}</td>
                            <td>${property.department}</td>
                            <td>${property.units?.length || 0}</td>
                            <td><span class="badge badge-success">${property.occupancyRate || 0}%</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        container.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error loading properties:', error);
    }
}

// Load Tenants
async function loadTenants() {
    try {
        const response = await fetch(`${API_BASE}/tenants`);
        const tenants = await response.json();
        const container = document.getElementById('tenantsList');

        if (tenants.length === 0) {
            container.innerHTML = '<p class="text-center py-8">No hay inquilinos registrados</p>';
            return;
        }

        const tableHTML = `
            <table class="table">
                <thead>
                    <tr><th>Nombre</th><th>Email</th><th>WhatsApp</th><th>Cédula</th><th>Estado</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    ${tenants.map(tenant => `
                        <tr>
                            <td><strong>${tenant.firstName} ${tenant.lastName}</strong></td>
                            <td>${tenant.email}</td>
                            <td>${tenant.whatsapp ? `<a href="https://wa.me/${tenant.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i> ${tenant.whatsapp}</a>` : '-'}</td>
                            <td>${tenant.cedula || '-'}</td>
                            <td><span class="badge badge-success">Activo</span></td>
                            <td>
                                <button class="btn-edit" onclick="editTenant('${tenant.id}')" title="Editar">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-delete" onclick="deleteTenant('${tenant.id}')" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        container.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error loading tenants:', error);
    }
}

// Load Payments
async function loadPayments() {
    try {
        const response = await fetch(`${API_BASE}/payments`);
        const payments = await response.json();
        const container = document.getElementById('paymentsList');

        if (payments.length === 0) {
            container.innerHTML = '<p class="text-center py-8">No hay pagos registrados</p>';
            return;
        }

        const tableHTML = `
            <table class="table">
                <thead>
                    <tr><th>Inquilino</th><th>Monto</th><th>Vencimiento</th><th>Estado</th></tr>
                </thead>
                <tbody>
                    ${payments.map(payment => `
                        <tr>
                            <td><strong>${payment.tenant?.firstName} ${payment.tenant?.lastName}</strong></td>
                            <td>${formatCurrency(payment.amount, payment.currency)}</td>
                            <td>${formatDate(payment.dueDate)}</td>
                            <td><span class="badge badge-${getPaymentStatusClass(payment.status)}">${getPaymentStatusText(payment.status)}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        container.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error loading payments:', error);
    }
}

// Load Maintenance
async function loadMaintenance() {
    try {
        const response = await fetch(`${API_BASE}/maintenance`);
        const requests = await response.json();
        const container = document.getElementById('maintenanceList');

        if (requests.length === 0) {
            container.innerHTML = '<p class="text-center py-8">No hay solicitudes de mantenimiento</p>';
            return;
        }

        const tableHTML = `
            <table class="table">
                <thead>
                    <tr><th>Título</th><th>Propiedad</th><th>Prioridad</th><th>Estado</th><th>Fecha</th></tr>
                </thead>
                <tbody>
                    ${requests.map(request => `
                        <tr>
                            <td><strong>${request.title}</strong></td>
                            <td>${request.property?.name}</td>
                            <td><span class="badge badge-${getPriorityClass(request.priority)}">${getPriorityText(request.priority)}</span></td>
                            <td><span class="badge badge-${getMaintenanceStatusClass(request.status)}">${getMaintenanceStatusText(request.status)}</span></td>
                            <td>${formatDate(request.createdAt)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        container.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error loading maintenance requests:', error);
    }
}

// Language Functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    document.getElementById('languageText').textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-es]').forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) element.textContent = text;
    });
}

// Exchange Rate Functions
async function updateExchangeRate() {
    try {
        const response = await fetch(`${API_BASE}/currency/rates`);
        const data = await response.json();
        if (data.usdToPyg) {
            const rate = Math.round(data.usdToPyg.rate);
            document.getElementById('exchangeRate').textContent = `1 USD = ₲${rate.toLocaleString('es-PY')}`;
        }
    } catch (error) {
        console.error('Error updating exchange rate:', error);
    }
}

// Utility Functions
function formatCurrency(amount, currency = 'PYG') {
    const numAmount = parseFloat(amount);
    if (currency === 'PYG') {
        return `₲${numAmount.toLocaleString('es-PY', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    } else if (currency === 'USD') {
        return `$${numAmount.toLocaleString('es-PY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${currency} ${numAmount.toLocaleString('es-PY')}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PY', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getPaymentStatusText(status) {
    const statusMap = { 'PENDING': 'Pendiente', 'PAID': 'Pagado', 'LATE': 'Atrasado', 'PARTIAL': 'Parcial' };
    return statusMap[status] || status;
}

function getPaymentStatusClass(status) {
    const classMap = { 'PENDING': 'warning', 'PAID': 'success', 'LATE': 'danger', 'PARTIAL': 'warning' };
    return classMap[status] || 'warning';
}

function getPaymentStatusColor(status) {
    const colorMap = { 'PENDING': '#f59e0b', 'PAID': '#10b981', 'LATE': '#ef4444', 'PARTIAL': '#f59e0b' };
    return colorMap[status] || '#6b7280';
}

function getPriorityText(priority) {
    const priorityMap = { 'LOW': 'Baja', 'MEDIUM': 'Media', 'HIGH': 'Alta', 'URGENT': 'Urgente' };
    return priorityMap[priority] || priority;
}

function getPriorityClass(priority) {
    const classMap = { 'LOW': 'success', 'MEDIUM': 'warning', 'HIGH': 'danger', 'URGENT': 'danger' };
    return classMap[priority] || 'warning';
}

function getMaintenanceStatusText(status) {
    const statusMap = { 'OPEN': 'Abierto', 'IN_PROGRESS': 'En Progreso', 'COMPLETED': 'Completado', 'CANCELLED': 'Cancelado' };
    return statusMap[status] || status;
}

function getMaintenanceStatusClass(status) {
    const classMap = { 'OPEN': 'warning', 'IN_PROGRESS': 'warning', 'COMPLETED': 'success', 'CANCELLED': 'danger' };
    return classMap[status] || 'warning';
}

// Mobile Functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

window.addEventListener('resize', function () {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
});

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');

    // Populate dropdowns when opening modals
    if (modalId === 'paymentModal') {
        populateTenantsDropdown();
    } else if (modalId === 'maintenanceModal') {
        populatePropertiesDropdown();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');

    // Reset form
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
    }

    // Restore body scroll
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Populate Dropdowns
async function populateTenantsDropdown() {
    try {
        const response = await fetch(`${API_BASE}/tenants`);
        const tenants = await response.json();
        const select = document.getElementById('paymentTenant');

        select.innerHTML = '<option value="">Seleccionar inquilino</option>';
        tenants.forEach(tenant => {
            const option = document.createElement('option');
            option.value = tenant.id;
            option.textContent = `${tenant.firstName} ${tenant.lastName}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading tenants for dropdown:', error);
    }
}

async function populatePropertiesDropdown() {
    try {
        const response = await fetch(`${API_BASE}/properties`);
        const properties = await response.json();
        const select = document.getElementById('maintenanceProperty');

        select.innerHTML = '<option value="">Seleccionar propiedad</option>';
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property.id;
            option.textContent = property.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading properties for dropdown:', error);
    }
}

// Form Submission Functions
async function submitTenantForm(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    const form = event.target;
    const editId = form.dataset.editId;
    const isEdit = !!editId;

    try {
        const formData = {
            firstName: document.getElementById('tenantFirstName').value,
            lastName: document.getElementById('tenantLastName').value,
            email: document.getElementById('tenantEmail').value,
            phone: document.getElementById('tenantPhone').value,
            whatsapp: document.getElementById('tenantWhatsapp').value,
            cedula: document.getElementById('tenantCedula').value
        };

        const url = isEdit ? `${API_BASE}/tenants/${editId}` : `${API_BASE}/tenants`;
        const method = isEdit ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showAlert(isEdit ? 'Inquilino actualizado exitosamente' : 'Inquilino agregado exitosamente', 'success');
            closeModal('tenantModal');
            await loadTenants(); // Refresh the list

            // Reset form for next use
            if (isEdit) {
                delete form.dataset.editId;
                document.querySelector('#tenantModal .modal-header h2').textContent = 'Agregar Nuevo Inquilino';
                document.querySelector('#tenantForm button[type="submit"] span').textContent = 'Guardar Inquilino';
            }
        } else {
            const error = await response.json();
            showAlert(error.error || (isEdit ? 'Error al actualizar inquilino' : 'Error al agregar inquilino'), 'error');
        }
    } catch (error) {
        console.error('Error submitting tenant form:', error);
        showAlert(isEdit ? 'Error al actualizar inquilino' : 'Error al ingresar inquilino', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
}

async function submitPropertyForm(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    try {
        const formData = {
            name: document.getElementById('propertyName').value,
            address: document.getElementById('propertyAddress').value,
            city: document.getElementById('propertyCity').value,
            department: document.getElementById('propertyDepartment').value,
            type: document.getElementById('propertyType').value,
            description: document.getElementById('propertyDescription').value
        };

        const response = await fetch(`${API_BASE}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showAlert('Propiedad agregada exitosamente', 'success');
            closeModal('propertyModal');
            await loadProperties(); // Refresh the list
        } else {
            const error = await response.json();
            showAlert(error.message || 'Error al agregar propiedad', 'error');
        }
    } catch (error) {
        console.error('Error submitting property form:', error);
        showAlert('Error al agregar propiedad', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
}

async function submitPaymentForm(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    try {
        const formData = {
            tenantId: document.getElementById('paymentTenant').value,
            amount: parseFloat(document.getElementById('paymentAmount').value),
            currency: document.getElementById('paymentCurrency').value,
            dueDate: document.getElementById('paymentDueDate').value,
            status: document.getElementById('paymentStatus').value,
            type: document.getElementById('paymentType').value,
            notes: document.getElementById('paymentNotes').value
        };

        const response = await fetch(`${API_BASE}/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showAlert('Pago registrado exitosamente', 'success');
            closeModal('paymentModal');
            await loadPayments(); // Refresh the list
            await loadDashboardData(); // Update dashboard
        } else {
            const error = await response.json();
            showAlert(error.message || 'Error al registrar pago', 'error');
        }
    } catch (error) {
        console.error('Error submitting payment form:', error);
        showAlert('Error al registrar pago', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
}

async function submitMaintenanceForm(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    try {
        const formData = {
            propertyId: document.getElementById('maintenanceProperty').value,
            title: document.getElementById('maintenanceTitle').value,
            description: document.getElementById('maintenanceDescription').value,
            priority: document.getElementById('maintenancePriority').value,
            status: document.getElementById('maintenanceStatus').value
        };

        const response = await fetch(`${API_BASE}/maintenance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showAlert('Solicitud de mantenimiento creada exitosamente', 'success');
            closeModal('maintenanceModal');
            await loadMaintenance(); // Refresh the list
        } else {
            const error = await response.json();
            showAlert(error.message || 'Error al crear solicitud', 'error');
        }
    } catch (error) {
        console.error('Error submitting maintenance form:', error);
        showAlert('Error al crear solicitud de mantenimiento', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
}

// Alert Functions
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Insert at the top of main content
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(alert, mainContent.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Edit Tenant Function
async function editTenant(tenantId) {
    try {
        // Get tenant data
        const response = await fetch(`${API_BASE}/tenants/${tenantId}`);
        if (!response.ok) {
            showAlert('Error al cargar datos del inquilino', 'error');
            return;
        }

        const tenant = await response.json();

        // Populate form with tenant data
        document.getElementById('tenantFirstName').value = tenant.firstName;
        document.getElementById('tenantLastName').value = tenant.lastName;
        document.getElementById('tenantEmail').value = tenant.email;
        document.getElementById('tenantPhone').value = tenant.phone;
        document.getElementById('tenantWhatsapp').value = tenant.whatsapp || '';
        document.getElementById('tenantCedula').value = tenant.cedula || '';

        // Change form title and button text
        document.querySelector('#tenantModal .modal-header h2').textContent = 'Editar Inquilino';
        document.querySelector('#tenantForm button[type="submit"] span').textContent = 'Actualizar Inquilino';

        // Store tenant ID for update
        document.getElementById('tenantForm').dataset.editId = tenantId;

        // Open modal
        openModal('tenantModal');
    } catch (error) {
        console.error('Error loading tenant for edit:', error);
        showAlert('Error al cargar datos del inquilino', 'error');
    }
}

// Delete Tenant Function
async function deleteTenant(tenantId) {
    if (!confirm('¿Está seguro de que desea eliminar este inquilino? Esta acción no se puede deshacer.')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/tenants/${tenantId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showAlert('Inquilino eliminado exitosamente', 'success');
            await loadTenants(); // Refresh the list
        } else {
            const error = await response.json();
            showAlert(error.error || 'Error al eliminar inquilino', 'error');
        }
    } catch (error) {
        console.error('Error deleting tenant:', error);
        showAlert('Error al eliminar inquilino', 'error');
    }
}
