import style from '../project/ProjectCard.module.css'

import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({id, name, valor, description, handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, valor)
    }

    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo Total: </span> R${valor}
            </p>
            <p>{description}</p>
            <div className={style.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard