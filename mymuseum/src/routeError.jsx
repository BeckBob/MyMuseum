const RouteError = (props) => {
    const { message } = props

    return <div className="error-message"><h2>Error!</h2>
        <p>{message}</p></div>
}

export default RouteError