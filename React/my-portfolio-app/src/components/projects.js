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

const categories = [
  {
    type: "React",
    url:
      "url(data:image/png;base64,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)",
    projects: [1, 2, 3]
  },
  {
    type: "Angular",
    url:
      "url(https://www.essentialdesigns.net/wp-content/uploads/2018/05/AngularJS-e1487056257254-300x200.png)",
    projects: [1]
  },
  {
    type: "VueJS",
    url:
      "url(https://i.pinimg.com/originals/60/17/da/6017da3ed8f203fe979b16dae1ad2259.png)",
    projects: [1, 2]
  },
  {
    type: "MongoDB",
    url:
      "url(data:image/jpeg;base64,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)",
    projects: [1]
  }
];

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  toggleCategories() {
    const category = categories[this.state.activeTab];
    const type = category.type;
    const url = category.url;
    return category.projects.map(project => (
      <Card shadow={5} style={{ width: "350px", margin: "auto" }}>
        <CardTitle
          style={{
            color: "#fff",
            height: "176px",
            background: `${url} center / cover`
          }}
        >
          {type} Project #{project}
        </CardTitle>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          sagittis pellentesque lacus eleifend lacinia...
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
          {categories.map(category => (
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
