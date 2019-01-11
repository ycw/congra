// dependency
// - congra.js
// - congra.parser.js

ConGra.polyfill = (function () {

    // Generate meta data for candidate elements
    // "--cg3:'conic-gradient(..)'" 
    // becomes
    // { 
    //    cssIndex: 3, 
    //    customPropName: '--cg3', 
    //    cssString:'conic-gradient(..)' 
    // }
    function genElmData({ root, inputPrefix, maxImage }) {
        const dataList = [];

        root.style.setProperty(`${inputPrefix}Allow`, `yes`);

        const elms = Array.from(root.querySelectorAll('*'));
        elms.unshift(root);

        for (const elm of elms) {
            const style = getComputedStyle(elm);

            // since css props are cascaded, by default,
            // elms with say, --cg1, no matter where it comes from,
            // will produce an image. To avoid creating useless img,
            // here is a strategy: 
            //   if --cgAllow: yes ... create
            //   if --cgAllow has other values or not set ... ignore
            //   Thus, if parent has --cgAllow: 0, it causes all descendant "off"
            //   By default, root has set --cgAllow to `yes`
            const isAllowString = style.getPropertyValue(`${inputPrefix}Allow`).trim().toLowerCase();
            if (isAllowString !== `yes`) {
                continue;
            }

            const data = {
                elm,
                cssStringDataList: [], // {cssindex, cssString}[]
                cgDataList: [] // cgData[]
            }

            for (const index of Array(maxImage).keys()) {
                const cssIndex = index + 1;
                const customPropName = `${inputPrefix}${cssIndex}`;
                const cssString = style.getPropertyValue(customPropName).trim();
                if (cssString.length) {
                    data.cssStringDataList.push({ cssIndex, cssString, customPropName });
                }
            }

            // including elms which hv at least one target custom props. eg --cg1
            if (data.cssStringDataList.length > 0) {
                dataList.push(data);
            }
        }

        // Parse cssString(i.e. `'conic-gradient(..)'`) into IGradient
        // Special Note
        //   Given {suffix} is empty string, then image url is put back to 
        //   same custom prop, 2nd parse throws Error. This is expected as 
        //   it doesn't match `conic-gradient(..)` pattern this time.
        //   
        for (const data of dataList) {
            for (const { cssString } of data.cssStringDataList) {
                //const d = parseCssStringIntoCgData(cssString);
                const d = ConGra.parser.parse(cssString);
                data.cgDataList.push(d);
            }
        }

        return dataList;
    }

    //
    // 
    //
    function polyfill({ inputPrefix, maxImage, outputSuffix, root }) {
        if (!root) {
            throw 'must provide "root" in option object'
        }
        const dataList = genElmData({ root, inputPrefix, maxImage });
        console.log(dataList);
        for (const data of dataList) {
            const elm = data.elm;
            const { width, height } = elm.getBoundingClientRect();
            let maxStops = 0;
            for (const cgData of data.cgDataList) {
                let minStopCount;
                if (cgData.isRepeat) {
                    minStopCount = cgData.stops.length;
                }
                else {
                    if (cgData.stops[cgData.stops.length - 1].offset != 1) {
                        minStopCount = cgData.stops.length + 1;
                    }
                    else {
                        minStopCount = cgData.stops.length;
                    }
                }
                if (minStopCount > maxStops) {
                    maxStops = minStopCount;
                }
            }

            // After determining the maxStops
            // We can create only 1 ConGra instance to draw all gradient images
            const congra = ConGra({ width, height, maxStops, twgl });
            for (const [i, cgData] of data.cgDataList.entries()) {
                //console.log(cgData)
                congra.render([cgData]);
                congra.toURL().then(url => {
                    const { customPropName } = data.cssStringDataList[i]
                    elm.style.setProperty(`${customPropName}${outputSuffix}`, `url(${url})`);
                });
            }
        }
    }

    return polyfill;

}());