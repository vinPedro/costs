import style from './Contact.module.css'

import { MdEmail } from "react-icons/md";

function Contact(){

    return(
        <div className={style.contact}>
            <h1>Contact</h1>
            <p>
                Fale com a gete pelo <MdEmail/> : lopespedrovinicius@gmail.com
            </p>
        </div>
    )
}

export default Contact;