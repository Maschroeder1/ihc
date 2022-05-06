import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./slider.css";

const Slider = ({ min, max, text, filterName, id, renameAttempt, parentId }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [useCount, setUseCount] = useState(0);
    const [showSkipButton, setShowSkipButton] = useState(true)
    const _text = text
    const _filter_name = filterName
    const innerId = id
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        const firstUse = useCount < 2
        const timer = setTimeout(() => {
            renameAttempt(minVal == min ? -1 : minVal, maxVal == max ? -1 : maxVal, firstUse ? -1 : innerId, _filter_name)
            if (!firstUse) {
                setShowSkipButton(false)
            }
        }, 500)

        setUseCount(useCount + 1)
        return () => clearTimeout(timer)
    }, [minVal, maxVal, renameAttempt]);

    return (
        <div style={{'marginBottom': '10%'}}> { parentId >= innerId &&
        <div> 
            <div style={{ "textAlign": "center", 'marginBottom': '1%', "fontSize": "25px" }}>{_text}</div>
            <div className="container">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event) => {
                        const value = Math.min(+event.target.value, maxVal - 1);
                        setMinVal(value);
                        event.target.value = value.toString();
                    }}
                    className={classnames("thumb thumb--zindex-3", {
                        "thumb--zindex-5": minVal > max - 100
                    })}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event) => {
                        const value = Math.max(+event.target.value, minVal + 1);
                        setMaxVal(value);
                        event.target.value = value.toString();
                    }}
                    className="thumb thumb--zindex-4"
                />

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value">{minVal === min ? "Sem mínimo" : minVal}</div>
                    <div className="slider__right-value">{maxVal === max ? "Sem máximo" : maxVal}</div>
                </div>
            </div>
            {showSkipButton &&
                <div style={{ "textAlign": "center" }}>
                    <button onClick={() => {setShowSkipButton(false); renameAttempt(-1, -1, innerId, _filter_name)}} style={{ "background": '#9fe5e1', "height": "80px", "width": "10%", 'fontSize': '18px' }}>Skip</button>
                </div>}
        </div>
        }</div>
    );
};

export default Slider;
