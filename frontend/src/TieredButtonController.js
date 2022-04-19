import React from "react";
import TieredButtonButton from "./TieredButtonButton";

export default class TieredButtonController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            id: props.id,
            filterName: props.filterName,
            wasClicked: false,
            selected: null,
            fatherStateFunction: props.fatherStateFunction,
            apiRequest: props.apiRequest,
            parentButtons: props.buttons,
            childrenButtons: {}
        }
    }

    isVisible() {
        return this.state.id <= this.props.fatherId
    }

    gridItems(buttons) {
        let a = [
            <TieredButtonButton text="child 1" filterName="TEMP4" parentVisibleFunction={() => {console.log("child 1")}} key="TEMP4" />,
            <TieredButtonButton text="child 2" filterName="TEMP5" parentVisibleFunction={() => {console.log("child 2")}} key="TEMP5" />
        ]
        let b = [
            <TieredButtonButton text="child 3" filterName="TEMP6" parentVisibleFunction={() => {console.log("child 3")}} key="TEMP6" />,
            <TieredButtonButton text="child 4" filterName="TEMP7" parentVisibleFunction={() => {console.log("child 4")}} key="TEMP7" />
        ]
        let c = [
            <TieredButtonButton text="child 5" filterName="TEMP8" parentVisibleFunction={() => {console.log("child 5")}} key="TEMP8" />,
            <TieredButtonButton text="child 6" filterName="TEMP9" parentVisibleFunction={() => {console.log("child 6")}} key="TEMP9" />
        ]
        let d = [
            <TieredButtonButton text="child 7" filterName="TEMP10" parentVisibleFunction={() => {console.log("child 7")}} key="TEMP10" />,
            <TieredButtonButton text="child 8" filterName="TEMP11" parentVisibleFunction={() => {console.log("child 8")}} key="TEMP11" />
        ]
        return (
            <>
                <section style={{ flexDirection: "row", height: '200px', "margin": "2%", "textAlign": "center"}}>
                        <TieredButtonButton text="button 1" filterName="TEMP0" parentVisibleFunction={this.modifyVisibleChildren} children={a} />
                        <TieredButtonButton text="button 2" filterName="TEMP1" parentVisibleFunction={this.modifyVisibleChildren} children={b} />
                        <TieredButtonButton text="button 3" filterName="TEMP2" parentVisibleFunction={this.modifyVisibleChildren} children={c} />
                        <TieredButtonButton text="button 4" filterName="TEMP3" parentVisibleFunction={this.modifyVisibleChildren} children={d} />
                </section>
            </>
        )
    }

    modifyVisibleChildren = (filterName, subButtonChildren) => {
        let visibleChildren = this.state.childrenButtons

        if (subButtonChildren.length === 0) {
            delete visibleChildren[filterName]
        } else {
            visibleChildren[filterName] = subButtonChildren
        }

        this.setState({ childrenButtons: visibleChildren })
    }

    getVisibleChildren() {
        let allChildren = []

        for (let key of Object.keys(this.state.childrenButtons)) {
            allChildren.push(...this.state.childrenButtons[key])
        }

        return allChildren
    }

    render() {
        let gridItems = this.gridItems(this.state.buttons)

        return (
            <>
                { gridItems }
                { this.getVisibleChildren() }
                {this.isVisible() &&
                    <div>ababa</div>
                }
            </>
        )
    }
}