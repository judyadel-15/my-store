function Header({title ,count}) {

    return (
        <header className="header" >
            <h1>{title}</h1>
            <p> Number of tasks: {count}</p>
        </header>
    )
}

export default Header;