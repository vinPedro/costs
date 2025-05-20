import style from './Company.module.css'

import { FaGithub } from 'react-icons/fa';

function Company(){

    return(
        <div className={style.company}>
            <h1>Company</h1>
            <p><a href='https://github.com/vinPedro' target='_black' rel="noopener noreferrer"><FaGithub/></a></p>
        </div>
    )
}

export default Company;