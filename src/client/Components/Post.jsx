import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Post = ({ data, config }) => {
  return (
    <List>
      {config.map((field) => (
        <ListItem key={field.id}>
          <ListItemText primary={field.title} secondary={data[field.id]} />
        </ListItem>
      ))}
    </List>
  );
};

export default Post;
