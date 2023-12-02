import { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { articleMeta } from "../../Types/taskTypes";
import { useLayout } from "../../Layout/LayoutContext";
import { tasksService } from "../../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import ArticleContent from "./ArticleContent";

interface IProps {
  id: string;
}

export default function Article({ id }: IProps) {
  const [article, setArticle] = useState<articleMeta | undefined>(undefined);
  const layout = useLayout();

  const { isAuthenticated, user } = useAuth0();

  //@ts-ignore
  const isAdmin = isAuthenticated && user["https://zisk-go.com/roles"].includes("admin");

  useEffect(() => {
    tasksService.get(
      "/articles/meta",
      { id: id },
      {
        success: setArticle,
        error: () => layout.error("Při načítání článku došlo k chybě."),
      }
    );
    // eslint-disable-next-line
  }, [id]);

  return (
    (article && (isAdmin || article.published) && (
      <Container maxWidth="xl">
        <br />
        <Typography variant="h3">{article.title}</Typography>
        <br />
        {
          // TODO Header
        }
        <br />
        <ArticleContent id={id} />
        <br />
        {article.photos.length > 1 && (
          <>
            <Typography variant="h6">Fotogalerie</Typography>
            <br />
            {
              // TODO photos
            }
          </>
        )}
      </Container>
    )) || <></>
  );
}
