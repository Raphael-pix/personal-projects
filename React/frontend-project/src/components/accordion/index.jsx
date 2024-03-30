import "./style.css";
import data from "./data";
import { useState } from "react";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multipleSelection, enableMultipleSelection] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultipleSelection(getCurrentId) {
    const cyptMultiple = [...multiSelect];
    const findIndexOfCurrentId = cyptMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) {
      cyptMultiple.push(getCurrentId);
    } else {
      cyptMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiSelect(cyptMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => enableMultipleSelection(!multipleSelection)}>
        Enable Multiple selection
      </button>
      <div className="accordion">
        {data && data.length ? (
          data.map((dataItem) => (
            <div className="item">
              <h3
                onClick={
                  multipleSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                {dataItem.question}
                <span>+</span>
              </h3>

              {multipleSelection
                ? multiSelect.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer} </div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
