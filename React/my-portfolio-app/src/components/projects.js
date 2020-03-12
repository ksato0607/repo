import React, { Component } from "react";
import {
  Tabs,
  Tab,
  Grid,
  Cell,
  Card,
  CardTitle,
  CardActions,
  Button,
  CardMenu,
  CardText,
  IconButton
} from "react-mdl";
import projects from "../projects.json";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  toggleCategories() {
    const category = projects[this.state.activeTab];
    const type = category.type;
    return category.projects.map(project => (
      <Card shadow={5} style={{ width: "350px", margin: "auto" }}>
        <CardTitle
          style={{
            color: "#fff",
            height: "176px",
            background: `${project.url} center / cover`
          }}
        >
          {/* {type} Project #{project.title} */}
        </CardTitle>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          sagittis pellentesque lacus eleifend lacinia... #{project.created_at}
        </CardText>
        <CardActions border>
          <Button colored>Github</Button>
          <Button colored>CodePen</Button>
          <Button colored>LiveDemo</Button>
        </CardActions>
        <CardMenu style={{ color: "#fff" }}>
          <IconButton name="share" />
        </CardMenu>
      </Card>
    ));
  }
  render() {
    return (
      <div className="category-tabs">
        <Tabs
          activeTab={this.state.activeTab}
          onChange={tabId => this.setState({ activeTab: tabId })}
          ripple
        >
          {projects.map(category => (
            <Tab>{category.type}</Tab>
          ))}
        </Tabs>

        <Grid>
          <Cell col={12}>
            <div className="content">
              <div className="projects-grid">{this.toggleCategories()}</div>
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default Projects;
