import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./slider.css";

export default class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            minVal: props.min,
            maxVal: props.max
        }
        // this.minValRef = useRef(null);
        // this.maxValRef = useRef(null);
        // this.range = useRef(null);
    }
    // Convert to percentage
    getPercent = useCallback(
        (value) => Math.round(((value - this.props.min) / (this.props.max - this.props.min)) * 100),
        [this.props.min, this.props.max]
    );

    //     // Set width of the range to decrease from the left side
    //     useEffect(() => {
    //         if (maxValRef.current) {
    //             const minPercent = getPercent(minVal);
    //             const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

    //             if (range.current) {
    //                 range.current.style.left = `${minPercent}%`;
    //                 range.current.style.width = `${maxPercent - minPercent}%`;
    //             }
    //         }
    //     }, [minVal, getPercent]);

    // // Set width of the range to decrease from the right side
    // useEffect(() => {
    //     if (minValRef.current) {
    //         const minPercent = getPercent(+minValRef.current.value);
    //         const maxPercent = getPercent(maxVal);

    //         if (range.current) {
    //             range.current.style.width = `${maxPercent - minPercent}%`;
    //         }
    //     }
    // }, [maxVal, getPercent]);

    // // Get min and max values when their state changes
    // useEffect(() => {
    //     onChange({ min: minVal, max: maxVal });
    // }, [minVal, maxVal, onChange]);

    render() {
        return (
            <>
                <div style={{ "textAlign": "center", 'marginBottom': '1%' }}>Prince range?</div>
                <div className="container">
                    <input
                        type="range"
                        min={this.props.min}
                        max={this.props.max}
                        value={this.state.minVal}
                        //ref={this.state.minValRef}
                        onChange={(event) => {
                            const value = Math.min(+event.target.value, this.state.maxVal - 1);
                            this.setState({ minVal: value })
                            event.target.value = value.toString();
                        }}
                        className={classnames("thumb thumb--zindex-3", {
                            "thumb--zindex-5": this.state.minVal > this.props.max - 100
                        })}
                    />
                    <input
                        type="range"
                        min={this.props.min}
                        max={this.props.max}
                        value={this.state.maxVal}
                        //ref={this.state.maxValRef}
                        onChange={(event) => {
                            const value = Math.max(+event.target.value, this.state.minVal + 1);
                            this.setState({maxVal: value});
                            event.target.value = value.toString();
                        }}
                        className="thumb thumb--zindex-4"
                    />

                    <div className="slider">
                        <div className="slider__track" />
                        { /*<div ref={range} className="slider__range" /> */ }
                        <div className="slider__left-value">{this.state.minVal}</div>
                        <div className="slider__right-value">{this.state.maxVal}</div>
                    </div>
                </div>
            </>
        )
    }
}