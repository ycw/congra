// dependency
// - congra.js

ConGra.parser = (function () {

    function normalizeUnit(valueStr, unitStr) {
        switch (unitStr) {
            case 'deg': return Number.parseFloat(valueStr) / 360;
            case '%': return Number.parseFloat(valueStr) / 100;
            case 'turn': return Number.parseFloat(valueStr);
            default: throw `failed to normalize unit`;
        }
    }

    function normalizeAngle(valueStr, unitStr) {
        try {
            return normalizeUnit(valueStr, unitStr);
        } catch (e) {
            throw `failed to normalize angle`;
        }
    }

    function normalizeStopOffset(valueStr, unitStr) {
        try {
            return normalizeUnit(valueStr, unitStr);
        } catch (e) {
            throw `failed to normalize stop offset`;
        }
    }

    function parseColorStopList(str) {
        const stops = [];

        // find all `rgba(r,g,b,a) <offset>`s 
        const stopStrs = str.match(/rgba\(([\s\S]+?)\)(\s+[^,\s]+)*/g);

        if (stopStrs === null) {
            throw `failed to parse color stop list`;
        }

        // Parsing stopOffset and stopColor for each stopStr
        // If stopOffset is not provided, set it to NaN temporarily.
        let tempStops = [];
        for (const stopStr of stopStrs) {
            const match = stopStr.match(/rgba\(\s*([^,]+)\s*,*\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*\)\s*(([^\s]+)(deg|turn|%))*/m);
            const color = [match[1] / 255, match[2] / 255, match[3] / 255, match[4]];
            const offset = match[5] ? normalizeStopOffset(match[6], match[7]) : NaN;
            tempStops.push({ color, offset });
        }

        // Clean up the tempStops[] 
        // 1) remove stops that hv smaller offset comparing to its preceeding stops
        // 2) calculate actual value for offset=NaN, e.g. prev+avg(prev, next)
        let cleanTempStops = [];
        let lastStopOffset = 0.0;
        for (const stop of tempStops) { //#1
            if (Number.isNaN(stop.offset)) {
                cleanTempStops.push(stop);
            }
            else if (stop.offset >= lastStopOffset) {
                cleanTempStops.push(stop);
                lastStopOffset = stop.offset;
            }
        }
        for (const [i, stop] of cleanTempStops.entries()) { //#2
            if (Number.isNaN(stop.offset)) {
                if (i === 0) {
                    stop.offset = 0.0;
                    continue;
                }
                if (i === cleanTempStops.length - 1) {
                    stop.offset = 1.0;
                    continue;
                }
                
                // (red 0.25, green, blue, black)
                //   0          1    2     3
                //              i    cur
                //              i          cur
                let cursor = i + 1;
                let nextStop = cleanTempStops[cursor];
                
                while (Number.isNaN(nextStop.offset)) {
                    if (cursor === cleanTempStops.length - 1) {
                        break;
                    }
                    else {
                        cursor += 1;
                        nextStop = cleanTempStops[cursor];
                    }
                }
                
                const prevStop = cleanTempStops[i - 1];
                const lastStop = cleanTempStops[cleanTempStops.length - 1];
                if (nextStop === lastStop) {
                    stop.offset = prevStop.offset + (1.0 - prevStop.offset) / (cursor - i + 1);
                }
                else {
                    stop.offset = prevStop.offset + (nextStop.offset - prevStop.offset) / (cursor - i + 1);
                }
            }
        }

        return cleanTempStops;
    }

    function isBracesInPair(str) {
        let counter = 0;
        for (const c of str) {
            if (c === '(') counter += 1;
            else if (c === ')') counter -= 1;
        }
        return counter === 0;
    }

    function parseCssStringIntoCongraData(str) {
        const data = {
            angle: 0.0,
            position: [0.5, 0.5],
            stops: [],
            isRepeat: false
        };

        let stringInBraces;

        // Detect Repeating and 
        // Extract string in braces
        {
            const match = str.match(/(repeating-)*conic-gradient\(([\s\S]+)\)/m);
            if (match === null) {
                throw `failed to parse "conic-gradient()" pattern`; 
            }
            if (!isBracesInPair(match[2])) {
                throw `failed to parse "conic-gradient()" pattern; braces not match`;
            }
            data.isRepeat = Boolean(match[1]);
            stringInBraces = match[2];

        }

        // Parse string in braces:
        // Determine angle(if any), position(if any) and a color stop list
        {
            const match = stringInBraces.match(/\s*(from\s+?(.+?)(turn|deg|%))*\s*(at\s+([^\s]+)%\s+([^\s]+)%)*\s*,*\s*([\s\S]*)$/m);
            if (match === null) {
                throw `failed to parse definition`;
            }
            if (match[7] === null) {
                throw `color stop list is empty`;
            }
            // 0: "from 45deg at 40% 41%, blue, pink"
            // 1: "from 45deg"
            // 2: "45"
            // 3: "deg"
            // 4: "at 40% 41%,"
            // 5: "40"
            // 6: "41"
            // 7: " blue, pink"

            // Angle
            if (match[1] && match[2] && match[3]) {
                data.angle = normalizeAngle(match[2], match[3]);
            }

            // Position (only support %)
            if (match[4]) {
                if (match[5] !== undefined) {
                    data.position[0] = Number.parseFloat(match[5]) / 100;
                }
                if (match[6] !== undefined) {
                    data.position[1] = Number.parseFloat(match[6]) / 100;
                }
            }

            // Stops 
            data.stops = parseColorStopList(match[7]);
        }

        // return 
        return data
    }

    return {
        parse: parseCssStringIntoCongraData
    }
}());