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
        `https://newsdata.io/api/1/news?page=10&language=en&apikey=pub_3656189d0f2ef3293050bbf3e731cf5f11e1`
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
