import style from './Container.module.css'
import { Outlet } from 'react-router-dom'

function Container(props) {
    return <div className={`${style.container} ${style[props.customClass]}`}><Outlet/> {props.children}</div>
}

export default Container