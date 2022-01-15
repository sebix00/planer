import { useEffect, useState } from "react";
import SingleNews from "./SingleNews";
import classes from "./News.module.css";
import Welcome from "../Welcome/Welcome";
import Card from "../../UI/Card";

const News = (props) => {
  const [news, setNews] = useState([]);

  const apiKey = "12d7363698444c5897410133dd756a32";
  useEffect(() => {
    const getFact = () => {
      fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data.articles);
          setNews(data.articles);
        });
    };
    getFact();
  }, []);

  let content;
  // useEffect(() => {
  //   content = news.map((singleNews) => (
  //     <SingleNews title={singleNews.title} content={singleNews.description} />
  //   ));
  // }, [news]);
  if (news.length > 0) {
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
        {content}
        <Welcome />
      </div>
      ;
    </Card>
  );
};

export default News;
