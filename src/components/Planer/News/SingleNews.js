import classes from "./SingleNews.module.css";
const SingleNews = (props)=>{

    return (
        <div className={classes.news}>
            <h1 className={classes.title}>{props.title}</h1>
            <p className={classes.content}>{props.content}</p>
        </div>
    )
}

export default SingleNews;