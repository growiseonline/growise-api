import live from './health'
import infoRoutes from './info'
import tennant from './tennant'
import user from './user'


export default [...live, ...infoRoutes, ...tennant, ...user]