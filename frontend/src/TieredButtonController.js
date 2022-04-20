import React from "react";
import TieredButtonButton from "./TieredButtonButton";

export default class TieredButtonController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            id: props.id,
            filterName: props.filterName,
            fatherStateFunction: props.fatherStateFunction,
            buttons: this.asButtons(props.buttons),
            visibleChildren: [],
            mustBeInFilters: [],
            mustNotBeInFilters: []
        }
    }

    asButtons(buttonObjects) {
        if (buttonObjects === undefined) {
            return []
        }

        return buttonObjects.map((buttonObject) => 
            <TieredButtonButton
                text={buttonObject.text}
                filterName={buttonObject.filterName}
                key={buttonObject.filterName}
                children={this.asButtons(buttonObject.children)}
                parentVisibleFunction={this.somethingFilterFunction}
                />)
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
        let visibleChildren = this.state.visibleChildren.map((child) => child)
        visibleChildren.push(...childrenToAdd)

        visibleChildren = visibleChildren.filter((child) => !childrenToRemove.includes(child))

        let childrenToAddFilters = this.childrenToFilterNames(childrenToAdd)
        let childrenToRemoveFilters = this.childrenToFilterNames(childrenToRemove)

        let mustBeInFilters = [...this.state.mustBeInFilters]
        mustBeInFilters.push(...childrenToAddFilters)
        mustBeInFilters = mustBeInFilters.filter((filter) => !childrenToRemoveFilters.includes(filter))

        let mustNotBeInFilters = [...this.state.mustNotBeInFilters]
        mustNotBeInFilters.push(...childrenToRemoveFilters)
        mustNotBeInFilters = mustNotBeInFilters.filter((filter) => !childrenToAddFilters.includes(filter))

        this.setState({ visibleChildren: visibleChildren, mustBeInFilters: mustBeInFilters, mustNotBeInFilters: mustNotBeInFilters })
        this.state.fatherStateFunction(this.state.id, this.state.filterName, mustBeInFilters, mustNotBeInFilters)
    }

    childrenToFilterNames(children) {
        return children.map((child) => child.props.filterName)
    }

    childFlip = (filterName) => {
        let mustBeInFilters = [...this.state.mustBeInFilters]
        let mustNotBeInFilters = [...this.state.mustNotBeInFilters]

        if (mustBeInFilters.includes(filterName)) {
            mustBeInFilters = mustBeInFilters.filter((filter) => filter !== filterName)
            mustNotBeInFilters.push(filterName)
        } else {
            mustBeInFilters.push(filterName)
            mustNotBeInFilters = mustNotBeInFilters.filter((filter) => filter !== filterName)
        }

        this.setState({ mustBeInFilters: mustBeInFilters, mustNotBeInFilters: mustNotBeInFilters})
        this.state.fatherStateFunction(this.state.id, this.state.filterName, mustBeInFilters, mustNotBeInFilters)
    }

    render() {
        return (
            <>
            {this.isVisible() &&
                <div> { this.gridItems(this.state.buttons, '200px') } </div>
            }
            {this.isVisible() &&
                <div> { this.gridItems(this.state.visibleChildren, '100px') } </div>
            }
            </>
        )
    }

    isVisible() {
        return this.state.id <= this.props.fatherId
    }

    gridItems(buttons, height) {
        const maxButtonsPerRow = 4
        let sections = []

        for (let i=0; i < buttons.length; i+= maxButtonsPerRow) {
            sections.push(<section style={{ flexDirection: "row", height: height, "margin": "2%", "textAlign": "center"}} key={i}>
                { buttons.slice(i, i+maxButtonsPerRow) }
            </section>)
        }

        return (<>{sections}</>)
    }
}