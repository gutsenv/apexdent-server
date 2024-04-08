const UserController = require('../modules/user/user.controller');
const DentistController = require('../modules/dentist/dentist.controller');
const AppointmentController = require('../modules/appointment/appointment.controller');
const LoginController = require('../auth/login.controller');
const authenticateToken = require('../middleware/authenticate');
const { validateUserInput, validateDentistInput, validateAppointmentInput } = require('../middleware/schemaValidator');

const routes = async (app) => {
    /* Auth */
    app.post('/api/v1/login', LoginController.login);
    /* User CRUD */
    app.post('/api/v1/users', validateUserInput, UserController.create);
    app.get('/api/v1/users/:userId', authenticateToken, UserController.findById);
    app.patch('/api/v1/users/:userId', authenticateToken, UserController.findByIdAndUpdate);
    app.delete('/api/v1/users/:userId', authenticateToken, UserController.findByIdAndDelete);
    /* Dentist CRUD */
    app.post('/api/v1/dentists', validateDentistInput, DentistController.create);
    app.get('/api/v1/dentists/:dentistId', authenticateToken, DentistController.findById);
    app.patch('/api/v1/dentists/:dentistId', authenticateToken, DentistController.findByIdAndUpdate);
    app.delete('/api/v1/dentists/:dentistId', authenticateToken, DentistController.findByIdAndDelete);
    /* Appointment CRUD */
    app.post('/api/v1/appointments', authenticateToken, validateAppointmentInput, AppointmentController.create);
    app.get('/api/v1/appointments/:appointmentId', authenticateToken, AppointmentController.findById);
    app.get('/api/v1/appointments/patient/:patientId', authenticateToken, AppointmentController.findByPatientId);
    app.patch('/api/v1/appointments/:appointmentId', authenticateToken, AppointmentController.findByIdAndUpdate);
    app.patch('/api/v1/appointments/cancel/:appointmentId', authenticateToken, AppointmentController.findByIdAndCancel);
}

module.exports = routes;