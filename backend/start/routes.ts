import router from '@adonisjs/core/services/router'

const HealthChecksController = () => import('#controllers/health_checks_controller')
const UsersController = () => import('#controllers/users_controller')
const TasksController = () => import('#controllers/tasks_controller')
const AuthController = () => import('#controllers/auth_controller')
const ReportsController = () => import('#controllers/reports_controller')

router.get('/health', [HealthChecksController])

router.get('/reports', [ReportsController])

router.post('/users', [UsersController, 'create'])

router.post('/auth', [AuthController, 'store'])

router.get('/tasks', [TasksController, 'index'])
router.post('/tasks', [TasksController, 'store'])
router.get('/tasks/:id', [TasksController, 'show']).where('id', router.matchers.number())
router.patch('/tasks/:id', [TasksController, 'update']).where('id', router.matchers.number())
router.delete('/tasks/:id', [TasksController, 'destroy']).where('id', router.matchers.number())
