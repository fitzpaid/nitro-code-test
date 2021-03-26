import React, { useState } from "react";
import { useQuery } from "react-query";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

import Form from "./Components/Form";
import TreeView from "./Components/TreeView";
import Select from "./Components/Select";
import Post from "./Components/Post";
import { getJson } from "./Services/treeview";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  cardRoot: {
    height: "100%",
  },
}));

dayjs.extend(weekOfYear);

const getDataForDisplay = (data) => {
  return data.map((d) => {
    const date = dayjs.unix(d.time);
    const week = date.week();
    const formattedData = date.format("YYYY-MM-DD");
    return {
      id: d.id,
      location: d.location,
      datePosted: formattedData,
      weekOfYear: week,
      author: d.author,
      text: d.text,
    };
  });
};

const groupByOption = (data, option) => {
  return Object.entries(
    data.reduce((acc, current) => {
      const value = current[option];
      if (!acc[value]) acc[value] = [current];
      else acc[value].push(current);
      return acc;
    }, {})
  );
};

const PostConfig = [
  {
    id: "author",
    title: "Authored by:",
  },
  {
    id: "text",
    title: "Comment: ",
  },
  {
    id: "location",
    title: "Location:",
  },
  {
    id: "datePosted",
    title: "Date Posted:",
  },
];

const options = [
  { text: "Location", value: "location" },
  { text: "Week Posted", value: "weekOfYear" },
  { text: "Author", value: "author" },
];

function App() {
  const classes = useStyles();
  const { data } = useQuery(["get-json"], getJson);
  const [selectedOption, setSelectedOption] = useState("weekOfYear");

  const displayData = getDataForDisplay(data);
  const [state, setState] = useState(displayData);

  const groupedPosts = groupByOption(state, selectedOption);

  const handleSubmit = (updatedInputs) => {
    const [author, location] = Object.entries(updatedInputs);
    const copy = [...state];
    const id = author[0].split("-");
    const indexToUpdate = copy.findIndex((c) => c.id === parseInt(id, 10));
    copy[indexToUpdate].author = author[1].value;
    copy[indexToUpdate].location = location[1].value;
    setState(copy);
  };

  const handleSelectionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <main className={classes.root}>
      <CssBaseline />
      <Select
        handleSelectionChange={handleSelectionChange}
        options={options}
        selectedOption={selectedOption}
      />
      <TreeView
        data={groupedPosts}
        selectedOption={selectedOption}
        renderLeafContent={(posts) => {
          return (
            <Grid container spacing={2}>
              {posts.map((post) => (
                <Grid key={`${post.id}`} item xs={12} lg={6} xl={4}>
                  <Card elevation={3} classes={{ root: classes.cardRoot }}>
                    <Post data={post} config={PostConfig} />
                    <Form
                      handleSubmit={handleSubmit}
                      inputsMap={{
                        [`${post.id}-author`]: {
                          value: post.author,
                          label: "Author",
                        },
                        [`${post.id}-location`]: {
                          value: post.location,
                          label: "Location",
                        },
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          );
        }}
      />
    </main>
  );
}

export default App;
