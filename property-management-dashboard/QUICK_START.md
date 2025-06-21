# 🚀 Quick Start - PropiedadesPY

## ✅ Sistema Completo Funcionando

¡Tu sistema de gestión de propiedades para Paraguay está listo!

## 🎯 SOLUCIÓN RÁPIDA - Usar archivos .bat

### Opción Fácil: Doble clic en los archivos
1. **Doble clic** en `start-backend.bat` (inicia la API)
2. **Doble clic** en `start-frontend.bat` (inicia la web y abre el navegador)

¡Listo! El sistema se abre automáticamente en tu navegador.

## 📋 Pasos Manuales (Alternativa)

### 1. Abrir 2 ventanas de PowerShell

#### Ventana 1: Backend (API)
```powershell
cd D:\GitHub\PropertyManagementDashboard\property-management-dashboard\backend
node src/app.js
```
✅ **Resultado**: Servidor API corriendo en `http://localhost:3001`

#### Ventana 2: Frontend (Interfaz)
```powershell
cd D:\GitHub\PropertyManagementDashboard\property-management-dashboard\frontend
python -m http.server 8001
```
✅ **Resultado**: Frontend disponible en `http://localhost:8001`

## 🌐 Acceder al Sistema

### Frontend Principal
**URL**: http://localhost:8001

### Funcionalidades Disponibles
- ✅ **Dashboard** - Estadísticas en tiempo real
- ✅ **Propiedades** - 3 propiedades de prueba (Asunción, Lambaré, CDE)
- ✅ **Inquilinos** - Con WhatsApp y cédulas paraguayas
- ✅ **Pagos** - En Guaraníes (₲) con estados visuales
- ✅ **Mantenimiento** - Solicitudes con prioridades
- ✅ **Idiomas** - Español/Inglés (botón EN/ES)
- ✅ **Responsive** - Funciona en móvil, tablet, desktop

## 🎯 Datos de Prueba Incluidos

### Propiedades
- **Edificio Central Plaza** (Asunción) - 2 unidades, 50% ocupación
- **Casa Lambaré** (Lambaré) - 1 unidad, 100% ocupación  
- **Complejo Ciudad del Este** (Alto Paraná) - 1 unidad, 100% ocupación

### Inquilinos
- **María González** - WhatsApp: +595981234567, Cédula: 1234567
- **Carlos Rodríguez** - WhatsApp: +595987654321, Cédula: 7654321
- **Ana Silva** - WhatsApp: +595976543210, Cédula: 9876543

### Pagos
- **₲2,500,000** - Alquiler Edificio Central
- **₲3,000,000** - Alquiler Casa Lambaré
- **₲4,500,000** - Alquiler Local Comercial CDE

## 🔧 Solución de Problemas

### ❌ Error 404 "File not found"
**Problema**: El servidor Python está en el directorio incorrecto
**Solución**: 
- **Fácil**: Usar `start-frontend.bat`
- **Manual**: 
```powershell
cd property-management-dashboard\frontend
python -m http.server 8001
```

### ❌ Backend no responde
**Problema**: El servidor Node.js no está corriendo
**Solución**:
- **Fácil**: Usar `start-backend.bat`
- **Manual**:
```powershell
cd property-management-dashboard\backend
node src/app.js
```

### ❌ "Cannot find module"
**Problema**: Falta instalar dependencias
**Solución**:
```powershell
cd property-management-dashboard\backend
npm install
```

## 🎨 URLs Correctas

### ✅ Frontend (Interfaz Web)
- **URL**: http://localhost:8001
- **Puerto**: 8001 (cambiado para evitar conflictos)

### ✅ Backend (API)
- **URL**: http://localhost:3001
- **Puerto**: 3001

### ✅ Base de Datos (Opcional)
- **URL**: http://localhost:5555
- **Comando**: `npx prisma studio` (desde backend/)

## 📱 Características Destacadas

### 🇵🇾 Paraguay-Específico
- **Moneda**: Formato correcto para Guaraníes (₲)
- **WhatsApp**: Links directos para contactar inquilinos
- **Departamentos**: 18 departamentos de Paraguay
- **Tipo de cambio**: USD/PYG actualizado automáticamente

### 💻 Tecnología Simple
- **HTML puro** - Sin React, sin complicaciones
- **CSS moderno** - Responsive, colores profesionales
- **JavaScript vanilla** - Conexión directa con API
- **Sin build** - Editar y ver cambios inmediatamente

## 🎉 ¡Listo para usar!

Tu sistema está **100% funcional** y listo para gestionar propiedades en Paraguay.

### 🚀 Inicio Rápido:
1. Doble clic en `start-backend.bat`
2. Doble clic en `start-frontend.bat`
3. ¡El navegador se abre automáticamente!

**¿Necesitas agregar más funcionalidades o modificar algo?** ¡Es súper fácil editar los archivos HTML, CSS y JS! 