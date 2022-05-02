import React from "react";
import TieredButtonButton from "./TieredButtonButton";

export default class TieredButtonController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            id: props.id,
            filterName: props.filterName,
            parentStateFunction: props.parentStateFunction,
            buttons: this.asButtons(props.buttons),
            visibleChildren: [],
            mustBeInFilters: [],
            mustNotBeInFilters: [],
            showSkipButton: true
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
        if (arg1 === "") {
            this.setState({ showSkipButton: false })
            this.state.parentStateFunction(this.state.id, "", [], [])
            return
        }

        if (arg2 !== null) {
            this.modifyVisibleChildren(arg1, arg2)
        } else {
            this.childFlip(arg1)
        }
    }

    modifyVisibleChildren = (childrenToAdd, childrenToRemove) => {
        let visibleChildren = [...this.state.visibleChildren]
        visibleChildren.push(...childrenToAdd)
        visibleChildren = visibleChildren.filter((child) => !childrenToRemove.includes(child))

        const FILTER_MUST_BE_ADDED = this.childrenToFilterNames(childrenToAdd)
        const FILTER_MUST_BE_REMOVED = this.childrenToFilterNames(childrenToRemove)

        let mustBeInFilters = [...this.state.mustBeInFilters]
        mustBeInFilters.push(...FILTER_MUST_BE_ADDED)
        mustBeInFilters = mustBeInFilters.filter((filter) => !FILTER_MUST_BE_REMOVED.includes(filter))

        let mustNotBeInFilters = [...this.state.mustNotBeInFilters]
        mustNotBeInFilters.push(...FILTER_MUST_BE_REMOVED)
        mustNotBeInFilters = mustNotBeInFilters.filter((filter) => !FILTER_MUST_BE_ADDED.includes(filter))

        this.setState({ visibleChildren: visibleChildren, mustBeInFilters: mustBeInFilters, mustNotBeInFilters: mustNotBeInFilters, showSkipButton: false })
        this.state.parentStateFunction(this.state.id, this.state.filterName, mustBeInFilters, mustNotBeInFilters)
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

        this.setState({ mustBeInFilters: mustBeInFilters, mustNotBeInFilters: mustNotBeInFilters, showSkipButton: false})
        this.state.parentStateFunction(this.state.id, this.state.filterName, mustBeInFilters, mustNotBeInFilters)
    }

    render() {
        return (
            this.isVisible() &&
            <div>
                <div> { this.gridItems(this.state.buttons, '200px') } </div>
                <div> { this.gridItems(this.state.visibleChildren, '100px') } </div>
                {this.state.showSkipButton &&
                    <div> { this.gridItems(this.asButtons([{text:"skip", filterName:"", children:[]}]), '100px')} </div>}
            </div>
        )
    }

    isVisible() {
        return this.state.id <= this.props.parentId
    }

    gridItems(buttons, height) {
        const MAX_BUTTONS_PER_ROW = 4
        let sections = []

        for (let i=0; i < buttons.length; i += MAX_BUTTONS_PER_ROW) {
            sections.push(<section style={{ flexDirection: "row", height: height, "margin": "2%", "textAlign": "center"}} key={i}>
                { buttons.slice(i, i+MAX_BUTTONS_PER_ROW) }
            </section>)
        }

        return (<>{sections}</>)
    }
}