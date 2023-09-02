import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { colorLuminance, createDisplayEngine, } from "@bigdots-io/display-engine";
export { solidColor, text, twinkle, meteorShower, marquee, } from "@bigdots-io/display-engine";
export function updateDot(element, { y, x, hex, brightness }) {
    var el = element.querySelectorAll(`[data-coordinates='${y}:${x}']`);
    if (el.length > 0) {
        if (!hex)
            return;
        el[0].style.background = colorLuminance(hex, (brightness * 10) / 100 - 1);
    }
}
function Row({ y, children, opacity, }) {
    return (_jsx("div", { style: {
            opacity,
            height: 10,
            lineHeight: 10,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }, children: children }));
}
function Column({ y, x, children, }) {
    return (_jsx("div", { style: {
            width: 10,
            height: 10,
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
        }, children: children }, `row_${y}_col_${x}`));
}
function Dot({ y, x }) {
    return (_jsx("div", { "data-coordinates": `${y}:${x}`, style: {
            backgroundColor: "#444",
            height: "60%",
            width: "60%",
            display: "inline-block",
            borderRadius: 100,
            boxShadow: "1px 1px 1px #AAA",
        } }));
}
export default function BigdotsDisplay({ layers, dimensions, }) {
    const ref = useRef(null);
    useEffect(() => {
        createDisplayEngine({
            macros: layers,
            dimensions: dimensions,
            onPixelChange: (pixel) => {
                if (ref.current === null)
                    return;
                updateDot(ref.current, pixel);
            },
        });
    }, [JSON.stringify(layers)]);
    const { height, width } = dimensions;
    var adjustedBrightness = (50 + 100 / 2) / 100;
    return (_jsx("div", { ref: ref, style: { background: "#000" }, children: [...Array(height).keys()].map((y) => (_jsx(Row, { y: y, opacity: adjustedBrightness, children: [...Array(width).keys()].map((x) => (_jsx(Column, { y: y, x: x, children: _jsx(Dot, { y: y, x: x }) }, `row_${y}_col_${x}`))) }, `row_${y}`))) }));
}