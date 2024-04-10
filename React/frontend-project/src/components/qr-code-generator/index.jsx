import { useState } from "react"
import QRCode from "react-qr-code"


export default function QRCodeGenerator(){
    const [qrCode,setQRCode]=useState("")
    const [input,setInput]=useState("")

    function handleGenerateQRCode(){
        setQRCode(input)
        setInput("")
    }
    
    return <div>
        <h1>QR Code Generator</h1>
        <div className="input-container">
            <input type="text" value={input}  name="qr-code" placeholder="Enter here" onChange={(e)=>setInput(e.target.value)}/>
            <button onClick={()=>handleGenerateQRCode()} disabled={input && input.trim() ==="" ? true : false}>Generate</button>
        </div>
        <QRCode
        id="qr-code-value"
        value={qrCode}
        size={300}
        />
    </div>
}