import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"


import Overview from "./list"
import MessageIdDetail from "./messageIdDetail"
import HeightDetail from "./heightDetail"
import SenderDetail from "./senderDetail"
import BlockDetail from "./blockDetail"
import NodeIdDetail from "./nodeIdDetail";

export default class MinerOverview extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/overview" component={Overview} />
                    <Route path="/overview/messageIdDetail" component={MessageIdDetail} />
                    <Route path="/overview/heightDetail" component={HeightDetail} />
                    <Route path="/overview/senderDetail" component={SenderDetail} />
                    <Route path="/overview/blockDetail" component={BlockDetail} />
                    <Route path="/overview/nodeIdDetail" component={NodeIdDetail} />
                </Switch>
            </div>
        )
    }
}