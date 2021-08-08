import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


export default function MediaCard({ Newsdata, bool, url }) {

  const classes = useStyles();

  const Test = (linktwitch) => {
    console.log(Newsdata)
    url(linktwitch)
    bool(3)
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
         className={classes.media}
          image={Newsdata.image_preview}
          title={Newsdata.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {Newsdata.user_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {Newsdata.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
          Viewer: {Newsdata.viewer}
        </Typography>
        <Button size="small" color="primary" onClick={() => Test("https://twitch.tv/" + Newsdata.user_name)}>
          Go to Stream
        </Button>
      </CardActions>
    </Card>
  );
}