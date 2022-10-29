import live from './health'
import infoRoutes from './info'
import tennant from './tennant'


export default [...live, ...infoRoutes, ...tennant]