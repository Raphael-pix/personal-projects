import "./theme.css"
import useLocalStorage from './useLocalStorage'


export default function Theme() {
    const [theme,setTheme]=useLocalStorage("theme","dark")

    function handleToggleTheme(){
        setTheme(theme === "light" ? "dark" : "light")
    }
    console.log(theme)
  return (
    <div className='theme-container' data-theme={theme}>
      <div className="container">
        <p>Hello world</p>
        <button onClick={()=>handleToggleTheme()}>Change Theme</button>
      </div>
    </div>
  )
}
