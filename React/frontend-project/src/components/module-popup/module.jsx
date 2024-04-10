

export default function Module({id,header,body,footer,closeModule}){
    return <div id={id || "Module"} className="module">
        <div className="content">
            <div className="header">
                <span className="close-module-contnet" onClick={closeModule}>&times;</span>
                <h2>{header ? header : "Header"}</h2>
            </div>
            <div className="body">
                {
                    body ? body : <div>
                        <p>This is our module body</p>
                    </div>
                }
            </div>
            <div className="footer">
            {
                 footer ? footer : <div>
                     <h2>This is our footer</h2>
                 </div>
            }
            </div>
        </div>

    </div>
}