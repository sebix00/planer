import { useEffect, useState } from "react";
import SingleNews from "./SingleNews";
import classes from "./News.module.css";
import Welcome from "../Welcome/Welcome";
import Card from "../../UI/Card";

const News = (props) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getFact = () => {
      fetch(
        `https://newsdata.io/api/1/news?page=10&language=en&apikey=${process.env.REACT_APP_API_KEY_NEWS}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data.results);
          const articles = data.results.map((item) => {
            return { title: item.title, description: item.description };
          });
          setNews(articles);
        });
    };
    getFact();
  }, []);

  let content;

  //komentarz

  //komentraz 2

  if (news && news.length > 0) {
    content = news.map((singleNews, index) => (
      <SingleNews
        title={singleNews.title}
        content={singleNews.description}
        key={index}
      />
    ));
  }

  return (
    <Card className={props.className}>
      <div className={`${classes.container} `}>
        <p className={classes.title}>Wordl's news</p>
        {content}
      </div>
    </Card>
  );
};

export default News;
