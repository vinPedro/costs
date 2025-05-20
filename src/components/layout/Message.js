import { useEffect, useState } from "react";
import style from "./Message.module.css";

function Message({ type, msg}) {
    
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
  }, [msg?.key])

  return (
    <>
      {visible && (
        <div className={`${style.message} ${style[type]}`}>{msg.text}</div>
      )}
    </>
  )
}

export default Message;
