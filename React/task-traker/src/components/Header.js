import Button from './Button'

const Header = ({title,onAdd,showAdd}) => {
    return (
    <div>
      <header className="header">
        <h1>{title}</h1>
        <Button color={showAdd?"red":"green"} text={showAdd? "close":"add"} onClick={onAdd}/>
      </header>
    </div>
  )
}
Header.defaultProps = {
    title: "Task Tracker"
}
export default Header
