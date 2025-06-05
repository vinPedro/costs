import { useEffect, useState } from "react";
import style from "./Message.module.css";

function Message({msg}) {
    
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg?.text) {
      setVisible(false)
      return
    }

    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [msg?.key, msg?.text])

  return (
    <>
      {visible && (
        <div className={`${style.message} ${style[msg.type]}`}>{msg.text}</div>
      )}
    </>
  )
}

export default Message;
