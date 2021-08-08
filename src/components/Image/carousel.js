import React from 'react';
import { Paper } from '@material-ui/core';
const style = {
  padding: 10,
  margin: 10
};
const ImageThumbail = (props) => {
  return (
    <Paper style={style} elevation={1}>
      <img alt={props.name} src={props.src} height={400} />
    </Paper>
  )
}
export default ImageThumbail;