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
            childrenButtons: []
        }
    }

    isVisible() {
        return this.state.id <= this.props.fatherId
    }

    gridItems(buttons) {
        let a = [
            <TieredButtonButton text="child 1" filterName={"" + this.state.id + "TEMP4"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP4" children={[]} />,
            <TieredButtonButton text="child 2" filterName={"" + this.state.id + "TEMP5"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP5" children={[]} />
        ]
        let b = [
            <TieredButtonButton text="child 3" filterName={"" + this.state.id + "TEMP6"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP6" children={[]} />,
            <TieredButtonButton text="child 4" filterName={"" + this.state.id + "TEMP7"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP7" children={[]} />
        ]
        let c = [
            <TieredButtonButton text="child 5" filterName={"" + this.state.id + "TEMP8"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP8" children={[]} />,
            <TieredButtonButton text="child 6" filterName={"" + this.state.id + "TEMP9"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP9" children={[]} />
        ]
        let d = [
            <TieredButtonButton text="child 7" filterName={"" + this.state.id + "TEMP10"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP10" children={[]} />,
            <TieredButtonButton text="child 8" filterName={"" + this.state.id + "TEMP11"} parentVisibleFunction={this.somethingFilterFunction} key="TEMP11" children={[]} />
        ]
        return (
            <>
                <section style={{ flexDirection: "row", height: '200px', "margin": "2%", "textAlign": "center"}}>
                        <TieredButtonButton text="button 1" filterName="TEMP0" parentVisibleFunction={this.somethingFilterFunction} children={a} />
                        <TieredButtonButton text="button 2" filterName="TEMP1" parentVisibleFunction={this.somethingFilterFunction} children={b} />
                        <TieredButtonButton text="button 3" filterName="TEMP2" parentVisibleFunction={this.somethingFilterFunction} children={c} />
                        <TieredButtonButton text="button 4" filterName="TEMP3" parentVisibleFunction={this.somethingFilterFunction} children={d} />
                </section>
            </>
        )
    }

    // more spaghetti than an italian restaurant
    somethingFilterFunction = (arg1, arg2) => {
        if (arg2 !== null) {
        
            this.modifyVisibleChildren(arg1, arg2)
        } else {
            this.childFlip(arg1)
        }
    }

    modifyVisibleChildren = (childrenToAdd, childrenToRemove) => {
        let visibleChildren = this.state.childrenButtons.map((child) => child)
        visibleChildren.push(...childrenToAdd)

        visibleChildren = visibleChildren.filter((child) => !childrenToRemove.includes(child))

        this.setState({ childrenButtons: visibleChildren })
        this.state.fatherStateFunction(this.state.id, visibleChildren.map((child) => child.props.filterName))
    }

    childFlip = (filterName) => {
        this.state.fatherStateFunction(this.state.id, [filterName])
    }

    render() {
        return (
            <>
            {this.isVisible() &&
                <div> { this.gridItems(this.state.buttons) } </div>
            }
            {this.isVisible() &&
                <div> { this.state.childrenButtons } </div>
            }
            </>
        )
    }
}