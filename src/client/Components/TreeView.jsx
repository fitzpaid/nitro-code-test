import React from "react";
import Leaf from "./Leaf";

const TreeView = ({ data, renderLeafContent }) => {
  return (
    <div>
      {data.map((entry) => {
        const [leafName, contents] = entry;
        return (
          <Leaf
            key={leafName}
            leafName={leafName}
            renderContent={() => renderLeafContent(contents)}
          />
        );
      })}
    </div>
  );
};

export default TreeView;
