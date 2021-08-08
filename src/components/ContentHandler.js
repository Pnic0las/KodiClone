import React from 'react';

function ContentHandler({ menu, activeKey, setExpanded }) {

    return (
        <div style={mainContainer}>
            {menu.map((elem, index) => {
                if (index === activeKey) {
                    const Component = elem.component;
                    return (
                        <Component key={index} setExpanded={setExpanded}></Component>
                    )
                }
                return null
            })}
        </div>
    )
}

const mainContainer = {
    padding: 20,
    width: "100%"
}

export default ContentHandler;